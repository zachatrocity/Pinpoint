; Installer Variables
#define AppName "Pinpoint"
#define AppVersion "0.0.1.0"
#define AppPublisher "Colossity"
#define AppURL "https://github.com/zachatrocity/Pinpoint"
#define AppExeName "Pinpoint.exe"


[Setup]
; DON'T MESS WITH THE APPID. This uniquely identifies this application, which is used to find the app if we need to update it.
AppId={{168216b9-0bd5-4619-bddb-149ee6e3daf5}

AppName={#AppName}
AppVersion={#AppVersion}
AppVerName={#AppName} {#AppVersion}
AppPublisher={#AppPublisher}
AppPublisherURL={#AppURL}
AppSupportURL={#AppURL}
AppUpdatesURL={#AppURL}

; Make the Installer nicer and Minimalistic
WindowResizable=no

; Don't ask for a install folder (it goes into \Users\Username\AppData\Roaming\Pinpoint\, which doesn't require admin privileges)
UsePreviousAppDir=no
DefaultDirName={code:GetDefaultDirName}
DisableDirPage=yes


; No Start Menu Folder picker (It's always created)
DefaultGroupName={#AppName}
DisableProgramGroupPage=yes

; We just need a Welcome Page and a Finish page. Nothing else.
DisableReadyPage=yes
DisableFinishedPage=no
DisableWelcomePage=no

; No UAC crap
PrivilegesRequired=none
; Put the uninstaller in the same folder, or else it'll go into Program Files, which requires Admin Privileges
UninstallFilesDir={code:GetDefaultDirName}

; Use the same language as the user (or ask otherwise)
ShowLanguageDialog=auto

; Compress the files nicely
Compression=lzma2
SolidCompression=yes

; Final Installer
OutputBaseFilename=PinpointInstaller_{#AppVersion}
OutputDir=.\


[Languages]
Name: "en"; MessagesFile: ".\English.isl"


[Files]
Source: "..\build\Pinpoint\win32\locales"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "..\build\Pinpoint\win32\pdf.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\Pinpoint\win32\nw.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\Pinpoint\win32\nw.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\Pinpoint\win32\libGLESv2.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\Pinpoint\win32\libEGL.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\Pinpoint\win32\icudtl.dat"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\Pinpoint\win32\d3dcompiler_47.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "pinpoint.ico"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files


[Icons]
; Add an Icon in the app folder as a reference
Name: "{app}\{#AppName}"; WorkingDir: "{app}"; Filename: "{app}\nw.exe"; Parameters:"""{app}\app"""; IconFilename: "{app}\pinpoint.ico"; Flags: runminimized preventpinning
; Another in the group (this one can be featured)
Name: "{group}\{#AppName}"; WorkingDir: "{app}"; Filename: "{app}\nw.exe"; Parameters:"""{app}\app"""; IconFilename: "{app}\pinpoint.ico"; Flags: runminimized
; Another in the desktop
Name: "{commondesktop}\{#AppName}"; WorkingDir: "{app}"; Filename: "{app}\nw.exe"; Parameters:"""{app}\app"""; IconFilename: "{app}\pinpoint.ico"; Flags: runminimized preventpinning

[Run]
; Run the app after installing
Filename: "{app}\nw.exe"; Description: Run Pinpoint; Flags: nowait postinstall skipifsilent

[Code]

function GetDefaultDirName(Param: string): string;
begin
  if IsAdminLoggedOn then
  begin
    Result := ExpandConstant('{pf}\Pinpoint');
  end
    else
  begin
    Result := ExpandConstant('{userappdata}\Pinpoint');
  end;
end;