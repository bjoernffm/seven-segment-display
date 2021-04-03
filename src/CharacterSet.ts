interface Dictionary<T> {
    [Key: string]: T;
}
 
export class CharacterSet {
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