import { Display } from "./Display";
import { CharacterSet } from "./CharacterSet";

let canvas1 = document.getElementById('display1') as HTMLCanvasElement;
let display1 = new Display(canvas1, 10, 10, 5);

let canvas2 = document.getElementById('display2') as HTMLCanvasElement;
let display2 = new Display(canvas2, 10, 10, 10);

let i = 10;
setInterval(() => {
   let content = i.toString();
   display1.setContent(content.padStart(5, ' '));
   i--;
}, 1000);

let charDict = new CharacterSet();
charDict.addCharacter("P", [true, true, false, false, true, true, true]);
charDict.addCharacter("L", [false, false, false, true, true, true, false]);
charDict.addCharacter("Y", [false, true, true, true, false, true, true]);
display2.setCharacterSet(charDict);

display2.setContent("PLAY CD 01");