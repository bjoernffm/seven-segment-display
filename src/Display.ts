import { SevenSegmentDisplay } from "./SevenSegmentDisplay";
import { CharacterSet } from "./CharacterSet";

export class Display {
    private _displays: Array<SevenSegmentDisplay>;
    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D;;
 
    constructor(canvas: HTMLCanvasElement, x: number, y: number, length: number) {
       this._canvas = canvas;
       this._context = canvas.getContext("2d");
       this._displays = [];
 
       for(let i: number = 0; i < length; i++) {
          this._displays.push(new SevenSegmentDisplay(this._context, x+i*90, y))
       }
    }
    
    public draw(): void {
       this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
       for(let i: number = 0; i < this._displays.length; i++) {
          this._displays[i].draw();
       }
    }
 
    public setContent(content: String): void {
       for(let i: number = 0; i < this._displays.length; i++) {
          if(content[i]) {
             this._displays[i].setCharacter(content[i]);
          } else {
             this._displays[i].setCharacter(" ");
          }
       }
       this.draw();
    }
 
    public setCharacterSet(charDict: CharacterSet) {
       for(let i: number = 0; i < this._displays.length; i++) {
          this._displays[i].setCharacterSet(charDict);
       }
    }
}