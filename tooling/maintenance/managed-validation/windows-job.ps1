param([Parameter(Mandatory=$true)][string]$Executable,[Parameter(Mandatory=$true)][string]$ArgumentsBase64,[Parameter(Mandatory=$true)][string]$WorkingDirectory)
$ErrorActionPreference = 'Stop'
Add-Type -TypeDefinition @'
using System;
using System.Text;
using System.Runtime.InteropServices;
using System.ComponentModel;
public static class ManagedValidationJob {
 [StructLayout(LayoutKind.Sequential)] struct BasicLimits { public long ProcessTime,JobTime; public uint Flags; public UIntPtr Minimum,Maximum; public uint ActiveProcesses; public UIntPtr Affinity; public uint Priority,Scheduling; }
 [StructLayout(LayoutKind.Sequential)] struct IoCounters { public ulong ReadOperations,WriteOperations,OtherOperations,ReadBytes,WriteBytes,OtherBytes; }
 [StructLayout(LayoutKind.Sequential)] struct ExtendedLimits { public BasicLimits Basic; public IoCounters Io; public UIntPtr ProcessMemory,JobMemory,PeakProcessMemory,PeakJobMemory; }
 [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)] struct Startup { public uint Size; public string Reserved,Desktop,Title; public uint X,Y,XSize,YSize,XCount,YCount,Fill,Flags; public ushort Show,ReservedBytes; public IntPtr ReservedData,Input,Output,Error; }
 [StructLayout(LayoutKind.Sequential)] struct ProcessInfo { public IntPtr Process,Thread; public uint ProcessId,ThreadId; }
 [DllImport("kernel32.dll",CharSet=CharSet.Unicode,SetLastError=true)] static extern IntPtr CreateJobObject(IntPtr attributes,string name);
 [DllImport("kernel32.dll",SetLastError=true)] static extern bool SetInformationJobObject(IntPtr job,int kind,ref ExtendedLimits limits,uint length);
 [DllImport("kernel32.dll",CharSet=CharSet.Unicode,SetLastError=true)] static extern bool CreateProcess(string application,StringBuilder command,IntPtr processAttributes,IntPtr threadAttributes,bool inherit,uint flags,IntPtr environment,string cwd,ref Startup startup,out ProcessInfo info);
 [DllImport("kernel32.dll",SetLastError=true)] static extern bool AssignProcessToJobObject(IntPtr job,IntPtr process);
 [DllImport("kernel32.dll")] static extern uint ResumeThread(IntPtr thread);
 [DllImport("kernel32.dll")] static extern uint WaitForSingleObject(IntPtr handle,uint timeout);
 [DllImport("kernel32.dll",SetLastError=true)] static extern bool GetExitCodeProcess(IntPtr process,out uint code);
 [DllImport("kernel32.dll")] static extern bool TerminateProcess(IntPtr process,uint code);
 [DllImport("kernel32.dll")] static extern bool CloseHandle(IntPtr handle);
 [DllImport("kernel32.dll")] static extern IntPtr GetStdHandle(int kind);
 static string Quote(string value) { var b=new StringBuilder("\"");int slashes=0;foreach(char c in value){if(c=='\\'){slashes++;continue;}if(c=='"')b.Append('\\',slashes*2+1);else b.Append('\\',slashes);slashes=0;b.Append(c);}b.Append('\\',slashes*2);return b.Append('"').ToString(); }
 public static int Run(string executable,string[] arguments,string cwd) {
  IntPtr job=CreateJobObject(IntPtr.Zero,null);if(job==IntPtr.Zero)throw new Win32Exception();var limits=new ExtendedLimits();limits.Basic.Flags=0x2000;var info=new ProcessInfo();bool started=false,assigned=false;
  try {
   if(!SetInformationJobObject(job,9,ref limits,(uint)Marshal.SizeOf(typeof(ExtendedLimits))))throw new Win32Exception();
   var startup=new Startup();startup.Size=(uint)Marshal.SizeOf(typeof(Startup));startup.Flags=0x100;startup.Input=GetStdHandle(-10);startup.Output=GetStdHandle(-11);startup.Error=GetStdHandle(-12);
   var command=new StringBuilder(Quote(executable));foreach(string argument in arguments)command.Append(' ').Append(Quote(argument));
   if(!CreateProcess(executable,command,IntPtr.Zero,IntPtr.Zero,true,0x08000004,IntPtr.Zero,cwd,ref startup,out info))throw new Win32Exception();started=true;
   if(!AssignProcessToJobObject(job,info.Process))throw new Win32Exception();assigned=true;
   if(ResumeThread(info.Thread)==0xffffffff)throw new Win32Exception();if(WaitForSingleObject(info.Process,0xffffffff)!=0)throw new Win32Exception();uint code;if(!GetExitCodeProcess(info.Process,out code))throw new Win32Exception();return unchecked((int)code);
  } finally { if(started&&!assigned)TerminateProcess(info.Process,125);CloseHandle(job);if(info.Thread!=IntPtr.Zero)CloseHandle(info.Thread);if(info.Process!=IntPtr.Zero)CloseHandle(info.Process); }
 }
}
'@
$argumentJson=[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($ArgumentsBase64))
$decodedArguments=ConvertFrom-Json -InputObject $argumentJson
$childArguments=New-Object 'System.Collections.Generic.List[string]'
foreach ($argument in $decodedArguments) { $childArguments.Add([string]$argument) }
$code=[ManagedValidationJob]::Run($Executable,$childArguments.ToArray(),$WorkingDirectory)
exit $code
