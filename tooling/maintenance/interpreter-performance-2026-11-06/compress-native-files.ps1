param([Parameter(Mandatory=$true)][string]$Plan,[Parameter(Mandatory=$true)][string]$ExpectedHash,[Parameter(Mandatory=$true)][string]$Output)
$ErrorActionPreference='Stop'
$bytes=[IO.File]::ReadAllBytes($Plan)
$hash=[BitConverter]::ToString([Security.Cryptography.SHA256]::Create().ComputeHash($bytes)).Replace('-','').ToLowerInvariant()
if($hash -ne $ExpectedHash){throw 'Compression plan identity changed'}
$document=[Text.Encoding]::UTF8.GetString($bytes)|ConvertFrom-Json
Add-Type -TypeDefinition @'
using System;using System.IO;using System.Text;using System.ComponentModel;using System.Runtime.InteropServices;using Microsoft.Win32.SafeHandles;
public static class ScopedCompression {
 [StructLayout(LayoutKind.Sequential)]struct Info {public uint Attr;public System.Runtime.InteropServices.ComTypes.FILETIME Created,Accessed,Written;public uint Volume,SizeHigh,SizeLow,Links,IndexHigh,IndexLow;}
 [DllImport("kernel32.dll",CharSet=CharSet.Unicode,SetLastError=true)]static extern SafeFileHandle CreateFileW(string name,uint access,uint share,IntPtr security,uint disposition,uint flags,IntPtr template);
 [DllImport("kernel32.dll",CharSet=CharSet.Unicode,SetLastError=true)]static extern uint GetFinalPathNameByHandleW(SafeFileHandle handle,StringBuilder name,uint count,uint flags);
 [DllImport("kernel32.dll",SetLastError=true)]static extern bool GetFileInformationByHandle(SafeFileHandle handle,out Info info);
 [DllImport("kernel32.dll",SetLastError=true)]static extern bool DeviceIoControl(SafeFileHandle handle,uint code,ref short input,int length,IntPtr output,int outputLength,out int returned,IntPtr overlapped);
 public static bool Compress(string path,string[] roots){
  string absolute=Path.GetFullPath(path);bool allowed=false;foreach(string root in roots)if(absolute.StartsWith(Path.GetFullPath(root).TrimEnd('\\')+"\\",StringComparison.OrdinalIgnoreCase))allowed=true;
  if(!allowed)throw new InvalidOperationException("Path outside explicitly scoped roots");
  string extended="\\\\?\\"+absolute;
  using(SafeFileHandle handle=CreateFileW(extended,0xC0000000,7,IntPtr.Zero,3,0x80,IntPtr.Zero)){
   if(handle.IsInvalid)throw new Win32Exception(Marshal.GetLastWin32Error());
   Info info;if(!GetFileInformationByHandle(handle,out info))throw new Win32Exception(Marshal.GetLastWin32Error());
   if((info.Attr&(0x10|0x400))!=0||info.Links!=1)throw new InvalidOperationException("Single-link regular file required");
   StringBuilder final=new StringBuilder(32768);uint count=GetFinalPathNameByHandleW(handle,final,32768,0);
   if(count==0||count>=32768)throw new Win32Exception(Marshal.GetLastWin32Error());
   if(!String.Equals(final.ToString(),extended,StringComparison.OrdinalIgnoreCase))throw new InvalidOperationException("Resolved handle path changed");
   if((info.Attr&0x800)!=0)return false;
   short format=2;int returned;if(!DeviceIoControl(handle,0x0009C040,ref format,2,IntPtr.Zero,0,out returned,IntPtr.Zero))throw new Win32Exception(Marshal.GetLastWin32Error());return true;
  }
 }
}
'@
$rows=New-Object System.Collections.Generic.List[object]
$index=0
foreach($row in $document.rows){
 try{$changed=[ScopedCompression]::Compress([string]$row.path,[string[]]$document.roots);$rows.Add(@{path=$row.path;changed=$changed;passed=$true})}
 catch{$rows.Add(@{path=$row.path;passed=$false;message=$_.Exception.Message})}
 $index++;if($index%500 -eq 0){Write-Output ('compressed-candidates '+$index+' / '+$document.rows.Count)}
}
@{observedAt=[DateTime]::UtcNow.ToString('o');planSha256=$hash;rows=@($rows.ToArray());recursive=$false;pathRemoval=$false;method='FSCTL_SET_COMPRESSION LZNT1; final handle path, regular type and link count checked'}|ConvertTo-Json -Depth 6|Set-Content -LiteralPath $Output -Encoding UTF8
