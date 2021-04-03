# Seven Segment Display


![Example display](https://raw.githubusercontent.com/bjoernffm/seven-segment-display/main/assets/example2.png =250)

## Why using?
The [seven segment display](https://en.wikipedia.org/wiki/Seven-segment_display) has a unique and interesting look - worth a short afternoon project. Instead of using a font that looks like the real thing, my intention was to program the whole unit from scratch creating a ardoino like api for displays which is hope interesting for you guys. This library is written in Typescript.

## Getting started
### Basic usage
The basic usage is straight forward:
```html
<script src="main.js"></script>
...
<canvas id="display" width="1000" height="150"></canvas>
```
```javascript
let canvas = document.getElementById('display1');
let display = new Display(canvas, 10, 10, 5); // canvas, xPos, yPos, numberOfCharacters
display.setContent("abcdef");
```
![Example display](https://github.com/bjoernffm/seven-segment-display/blob/main/assets/example1.PNG?raw=true "Example display")
That's it! You can set the content whenever you want, the set method automatically triggers the render method to show the results in the canvas.

### Extending the character set
This library has a basic character set which includes digits from 0 to 9 and the and characters a to f which is useful for the representation of hexadecimal values and the "-". Sometimes you want to show other characters as well to show text within the display.

It is possible to extend the build in character set and add custom characters or even symbols. The segments a to f are ordered clockwise followed by the middle segment g and can be illuminated or dimmed.

![Segments](https://github.com/bjoernffm/seven-segment-display/blob/main/assets/explanation1.png?raw=true "Segments")

Let's assume we need the letter P and we want to add it to the default character set. The letter P needs the sements a, b, e, f, g to be illuminated and c, d  to be dimmed. When adding new characters, you specify the character and the mode of the segments (true = illuminated, false = dimmed).

![The letter P](https://github.com/bjoernffm/seven-segment-display/blob/main/assets/explanation2.png?raw=true "The letter P")

```html
<script src="main.js"></script>
...
<canvas id="display" width="1000" height="150"></canvas>
```
```javascript
let canvas = document.getElementById('display1');
let display = new Display(canvas, 10, 10, 5); // canvas, xPos, yPos, numberOfCharacters

let charset= new CharacterSet();
//                         a     b     c      d      e     f     g
charset.addCharacter("P", [true, true, false, false, true, true, true]);
display.setCharacterSet(charset);
display.setContent("P");
```

There you go! Now the "P" has been added to the character set and can be displayed.
## License

MIT

**Free Software, Hell Yeah!**