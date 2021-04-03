interface Dictionary<T> {
   [Key: string]: T;
}

class CharacterDictonary {
   private _characters: Dictionary<Array<boolean>>;

   constructor() {
      this._characters = {};
      this._characters["1"] = [false, true, true, false, false, false, false];
      this._characters["2"] = [true, true, false, true, true, false, true];
      this._characters["3"] = [true, true, true, true, false, false, true];
      this._characters["4"] = [false, true, true, false, false, true, true];
      this._characters["5"] = [true, false, true, true, false, true, true];
      this._characters["6"] = [true, false, true, true, true, true, true];
      this._characters["7"] = [true, true, true, false, false, false, false];
      this._characters["8"] = [true, true, true, true, true, true, true];
      this._characters["9"] = [true, true, true, true, false, true, true];
      this._characters["0"] = [true, true, true, true, true, true, false];
      this._characters["a"] = [true, true, true, false, true, true, true];
      this._characters["A"] = [true, true, true, false, true, true, true];
      this._characters["b"] = [false, false, true, true, true, true, true];
      this._characters["B"] = [false, false, true, true, true, true, true];
      this._characters["c"] = [true, false, false, true, true, true, false];
      this._characters["C"] = [true, false, false, true, true, true, false];
      this._characters["d"] = [false, true, true, true, true, false, true];
      this._characters["D"] = [false, true, true, true, true, false, true];
      this._characters["e"] = [true, false, false, true, true, true, true];
      this._characters["E"] = [true, false, false, true, true, true, true];
      this._characters["f"] = [true, false, false, false, true, true, true];
      this._characters["F"] = [true, false, false, false, true, true, true];
      this._characters["-"] = [false, false, false, false, false, false, true];
      this._characters[" "] = [false, false, false, false, false, false, false];
   }

   public getActiveSegmentsFor(char: string): Array<boolean> {
      if (char in this._characters) {
         return this._characters[char];
      }

      throw new Error("No character definition found for '"+char+"'");
   }

   public addCharacter(char: string, segments: Array<boolean>) {
      if(segments.length != 7) {
         throw new Error("Character definition needs exactly 7 segments");
      }

      this._characters[char] = segments;
   }
}

abstract class Segment {
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

class HorizontalSegment extends Segment {
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

class VerticalSegment extends Segment {
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

class SevenSegmentDisplay {
   private _segments: Array<Segment>;
   protected _charDict: CharacterDictonary;
   
   protected _x: number;
   protected _y: number;

   constructor(context: CanvasRenderingContext2D, x: number, y: number) {
      this._x = x;
      this._y = y;
      this._charDict = new CharacterDictonary();
      this.initializeSegments(context);
   }

   public setCharacterDictonary(charDict: CharacterDictonary) {
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

class Display {
   private _displays: Array<SevenSegmentDisplay>;
   protected _canvas: HTMLCanvasElement;
   protected _context: CanvasRenderingContext2D;;

   constructor(canvas: HTMLCanvasElement, x: number, y: number, length: number) {
      this._canvas = canvas;
      this._context = canvas.getContext("2d");
      this._displays = [];

      for(let i: number = 0; i < length; i++) {
         //
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

   public setCharacterDictonary(charDict: CharacterDictonary) {
      for(let i: number = 0; i < this._displays.length; i++) {
         this._displays[i].setCharacterDictonary(charDict);
      }
   }
}

let canvas = document.getElementById('canvas') as HTMLCanvasElement;
let test = new Display(canvas, 10, 10, 10);
test.setContent("abcdef");

let i = 0;
/*setInterval(() => {
   let content: String = i.toString();
   test.setContent(content.padStart(5, ' '));
   i++;
   test.draw();
}, 1000);*/

let charDict = new CharacterDictonary();
charDict.addCharacter("P", [true, true, false, false, true, true, true]);
charDict.addCharacter("L", [false, false, false, true, true, true, false]);
charDict.addCharacter("Y", [false, true, true, true, false, true, true]);
test.setCharacterDictonary(charDict);

test.setContent("PLAY CD");
