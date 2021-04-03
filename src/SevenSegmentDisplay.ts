import { Segment, HorizontalSegment, VerticalSegment } from "./Segment";
import { CharacterSet } from "./CharacterSet";

export class SevenSegmentDisplay {
    private _segments: Array<Segment>;
    protected _charDict: CharacterSet;
    
    protected _x: number;
    protected _y: number;
 
    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
       this._x = x;
       this._y = y;
       this._charDict = new CharacterSet();
       this.initializeSegments(context);
    }
 
    public setCharacterSet(charDict: CharacterSet) {
       this._charDict = charDict;
    }
 
    private initializeSegments(context: CanvasRenderingContext2D): void {
       this._segments = [];
       this._segments[0] = new HorizontalSegment(context, this._x+7, this._y+0);
       this._segments[1] = new VerticalSegment(context, this._x+64, this._y+7);
       this._segments[2] = new VerticalSegment(context, this._x+64, this._y+69);
       this._segments[3] = new HorizontalSegment(context, this._x+7, this._y+127);
       this._segments[4] = new VerticalSegment(context, this._x+0, this._y+69);
       this._segments[5] = new VerticalSegment(context, this._x+0, this._y+7);
       this._segments[6] = new HorizontalSegment(context, this._x+7, this._y+63);
    }
 
    public draw(): void {
       for(let i: number = 0; i < this._segments.length; i++) {
          this._segments[i].draw();
       }
    }
 
    public setCharacter(char: string) {
       try {
          this.setAllIllumination(
             this._charDict.getActiveSegmentsFor(char)
          );
          
          this.draw();
       } catch(e) {
          console.log(e);
       }
    }
 
    private setAllIllumination(list: Array<boolean>) {
       for(let i: number = 0; i < this._segments.length; i++) {
          if(list[i] == true) {
             this._segments[i].illuminate();
          } else {
             this._segments[i].dim();
          }
       }
    }
 }