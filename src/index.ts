import { Display } from "./Display";

let canvas1 = document.getElementById('display1') as HTMLCanvasElement;
let display1 = new Display(canvas1, 10, 10, 7);
display1.setContent("abc-123");