export abstract class Segment {
    protected _context: CanvasRenderingContext2D;
    protected _illuminated: boolean;
    protected _x: number;
    protected _y: number;
 
    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
       this._context = context;
       this._x = x;
       this._y = y;
    }
 
    public illuminate(): void {
       this._illuminated = true;
    }
 
    public dim(): void {
       this._illuminated = false;
    }
 
    protected initColor(): void {
       if(this._illuminated) {
          this._context.fillStyle = "#FF0000";
       } else {
          this._context.fillStyle = "#EEEEEE";
       }
    }
 
    public draw(): void {
       // to be implemented
    }
}
 
export class HorizontalSegment extends Segment {
    public draw() {
       this.initColor();
       this._context.beginPath();
       this._context.moveTo(this._x+0, this._y+5);
       this._context.lineTo(this._x+5, this._y+0);
       this._context.lineTo(this._x+55, this._y+0);
       this._context.lineTo(this._x+60, this._y+5);
       this._context.lineTo(this._x+55, this._y+10);
       this._context.lineTo(this._x+5, this._y+10);
       this._context.closePath();
       this._context.fill();
    }
}
 
export class VerticalSegment extends Segment {
    public draw() {
       this.initColor();
       this._context.beginPath();
       this._context.moveTo(this._x+5, this._y+0);
       this._context.lineTo(this._x+0, this._y+5);
       this._context.lineTo(this._x+0, this._y+55);
       this._context.lineTo(this._x+5, this._y+60);
       this._context.lineTo(this._x+10, this._y+55);
       this._context.lineTo(this._x+10, this._y+5);
       this._context.closePath();
       this._context.fill();
    }
}