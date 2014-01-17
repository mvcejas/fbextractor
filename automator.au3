#include <Constants.au3>

AutoItSetOption("WinTitleMatchMode", 2)
AutoItSetOption("SendKeyDelay", 5)
AutoItSetOption("MouseCoordMode", 1)

WinWaitActive("[CLASS:Chrome_WidgetWin_1]")

MsgBox(0,"t",@ScriptDir & @CRLF & @ScriptFullPath)

Func Main()
   Send("!d")

   If WinActive("[CLASS:Chrome_WidgetWin_1]",Null) Then
	  MouseWheel("down",15)
	  MsgBox(0,"msgbox title","msgbox text")
   Else
	  MsgBox(0,"Error","This automate using Google Chrome browser.")
   EndIf
EndFunc