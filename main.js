var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CharacterDictonary = /** @class */ (function () {
    function CharacterDictonary() {
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
    CharacterDictonary.prototype.getActiveSegmentsFor = function (char) {
        if (char in this._characters) {
            return this._characters[char];
        }
        throw new Error("No character definition found for '" + char + "'");
    };
    CharacterDictonary.prototype.addCharacter = function (char, segments) {
        if (segments.length != 7) {
            throw new Error("Character definition needs exactly 7 segments");
        }
        this._characters[char] = segments;
    };
    return CharacterDictonary;
}());
var Segment = /** @class */ (function () {
    function Segment(context, x, y) {
        this._context = context;
        this._x = x;
        this._y = y;
    }
    Segment.prototype.illuminate = function () {
        this._illuminated = true;
    };
    Segment.prototype.dim = function () {
        this._illuminated = false;
    };
    Segment.prototype.initColor = function () {
        if (this._illuminated) {
            this._context.fillStyle = "#FF0000";
        }
        else {
            this._context.fillStyle = "#EEEEEE";
        }
    };
    Segment.prototype.draw = function () {
        // to be implemented
    };
    return Segment;
}());
var HorizontalSegment = /** @class */ (function (_super) {
    __extends(HorizontalSegment, _super);
    function HorizontalSegment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HorizontalSegment.prototype.draw = function () {
        this.initColor();
        this._context.beginPath();
        this._context.moveTo(this._x + 0, this._y + 5);
        this._context.lineTo(this._x + 5, this._y + 0);
        this._context.lineTo(this._x + 55, this._y + 0);
        this._context.lineTo(this._x + 60, this._y + 5);
        this._context.lineTo(this._x + 55, this._y + 10);
        this._context.lineTo(this._x + 5, this._y + 10);
        this._context.closePath();
        this._context.fill();
    };
    return HorizontalSegment;
}(Segment));
var VerticalSegment = /** @class */ (function (_super) {
    __extends(VerticalSegment, _super);
    function VerticalSegment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VerticalSegment.prototype.draw = function () {
        this.initColor();
        this._context.beginPath();
        this._context.moveTo(this._x + 5, this._y + 0);
        this._context.lineTo(this._x + 0, this._y + 5);
        this._context.lineTo(this._x + 0, this._y + 55);
        this._context.lineTo(this._x + 5, this._y + 60);
        this._context.lineTo(this._x + 10, this._y + 55);
        this._context.lineTo(this._x + 10, this._y + 5);
        this._context.closePath();
        this._context.fill();
    };
    return VerticalSegment;
}(Segment));
var SevenSegmentDisplay = /** @class */ (function () {
    function SevenSegmentDisplay(context, x, y) {
        this._x = x;
        this._y = y;
        this._charDict = new CharacterDictonary();
        this.initializeSegments(context);
    }
    SevenSegmentDisplay.prototype.setCharacterDictonary = function (charDict) {
        this._charDict = charDict;
    };
    SevenSegmentDisplay.prototype.initializeSegments = function (context) {
        this._segments = [];
        this._segments[0] = new HorizontalSegment(context, this._x + 7, this._y + 0);
        this._segments[1] = new VerticalSegment(context, this._x + 64, this._y + 7);
        this._segments[2] = new VerticalSegment(context, this._x + 64, this._y + 69);
        this._segments[3] = new HorizontalSegment(context, this._x + 7, this._y + 127);
        this._segments[4] = new VerticalSegment(context, this._x + 0, this._y + 69);
        this._segments[5] = new VerticalSegment(context, this._x + 0, this._y + 7);
        this._segments[6] = new HorizontalSegment(context, this._x + 7, this._y + 63);
    };
    SevenSegmentDisplay.prototype.draw = function () {
        for (var i_1 = 0; i_1 < this._segments.length; i_1++) {
            this._segments[i_1].draw();
        }
    };
    SevenSegmentDisplay.prototype.setCharacter = function (char) {
        try {
            this.setAllIllumination(this._charDict.getActiveSegmentsFor(char));
            this.draw();
        }
        catch (e) {
            console.log(e);
        }
    };
    SevenSegmentDisplay.prototype.setAllIllumination = function (list) {
        for (var i_2 = 0; i_2 < this._segments.length; i_2++) {
            if (list[i_2] == true) {
                this._segments[i_2].illuminate();
            }
            else {
                this._segments[i_2].dim();
            }
        }
    };
    return SevenSegmentDisplay;
}());
var Display = /** @class */ (function () {
    function Display(canvas, x, y, length) {
        this._canvas = canvas;
        this._context = canvas.getContext("2d");
        this._displays = [];
        for (var i_3 = 0; i_3 < length; i_3++) {
            //
            this._displays.push(new SevenSegmentDisplay(this._context, x + i_3 * 90, y));
        }
    }
    ;
    Display.prototype.draw = function () {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        for (var i_4 = 0; i_4 < this._displays.length; i_4++) {
            this._displays[i_4].draw();
        }
    };
    Display.prototype.setContent = function (content) {
        for (var i_5 = 0; i_5 < this._displays.length; i_5++) {
            if (content[i_5]) {
                this._displays[i_5].setCharacter(content[i_5]);
            }
            else {
                this._displays[i_5].setCharacter(" ");
            }
        }
        this.draw();
    };
    Display.prototype.setCharacterDictonary = function (charDict) {
        for (var i_6 = 0; i_6 < this._displays.length; i_6++) {
            this._displays[i_6].setCharacterDictonary(charDict);
        }
    };
    return Display;
}());
var canvas = document.getElementById('canvas');
var test = new Display(canvas, 10, 10, 10);
test.setContent("abcdef");
var i = 0;
/*setInterval(() => {
   let content: String = i.toString();
   test.setContent(content.padStart(5, ' '));
   i++;
   test.draw();
}, 1000);*/
var charDict = new CharacterDictonary();
charDict.addCharacter("P", [true, true, false, false, true, true, true]);
charDict.addCharacter("L", [false, false, false, true, true, true, false]);
charDict.addCharacter("Y", [false, true, true, true, false, true, true]);
test.setCharacterDictonary(charDict);
test.setContent("PLAY CD");
//# sourceMappingURL=main.js.map