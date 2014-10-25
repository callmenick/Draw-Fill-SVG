## Working Demo

You probably want to see a working demo for what this plugin does, so here it is - [http://callmenick.com/tutorial-demos/draw-fill-svg/](http://callmenick.com/tutorial-demos/draw-fill-svg/).

## About This Plugin

I couldn't think of a better name for my plugin, so I called it "Draw Fill SVG". In a nutshell, it performs three tasks: 

1. Applies a reset to the SVG attributes in question.
2. "Draws" the SVG by animating the strokes from 0 to 100%.
3. Fades out the stroke, and fades in the fill.

So how is all this achieved? SVG comes with a range of attributes and elements for us to leverage and manipulate. Of key importance will be the following:

* `fill` and `fill-opacity` - defines the fill colour of an SVG element, and that fill colour's opacity
* `stroke` and `stroke-opacity` - defines the stroke colour of an SVG element, and that stroke colour's opacity
* `stroke-dashoffset` - defines the distance into the dash pattern to start the dash
* `stroke-dasharray` - controls the pattern of dashes and gaps used to stroke paths

You can  read more about each of these properties on the [MDN attribute reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute).

## Resetting & Drawing The Stroke

Resetting and drawing the stroke is achieved by a very well documented technique which you can read about [here](http://jakearchibald.com/2013/animated-line-drawing-svg/). In a nutshell, it works like this:

1. Calculate the length of an SVG path.
2. Reset all transitions on the path to none.
3. This might seem like the confusing one, but give it a little thought and it will become clear. Set the `stroke-dasharray` to [length, length], and the `stroke-dashoffset` to [length], ultimately making the dash as long as the stroke itself, and offsetting it to the length of the stroke making it initially invisible. This is the technique mentioned in the link above.
4. Add a transition to the `stroke-dashoffset` property.
5. Set the `stroke-dashoffset` to 0, ultimately "drawing" the stroke.

This is all done via JavaScript, so all calculations and transitions are done dynamically, making it easy.

## Fade Out The Stroke, Fade In The Fill

This function leverages on transition event listeners, and listens for the ending of the stroke transition. Transition end events require prefixing due to different browser engines, and I'm using Modernizr to do take care of it in my function. You can read more about that in [this post](http://callmenick.com/2014/10/19/cross-browser-transition-animation-events-modernizr/). Once the stroke has finished drawing itself, the following happens:

1. Reset the transitions on the path to `none` again.
2. Set the transitions on the `fill-opacity` and `stroke-opacity` properties.
3. Change `fill-opacity` to 1.
4. Change `stroke-opacity` to 0.

## Replaying The Animation

In the plugin, I created a public `replay` function that restarts the animation from the beginning. This can be called easily on any new instance of the object. There's some demo code below to see how this works, so sit tight!

## Sample HTML

Here's some sample HTML that follows the pattern of what's required for the plugin to work. Note the following:

* To achieve the "draw" effect, SVG must have a stroke
* To achieve the fade-in fill effect, SVG must have a fill
* All shapes in the SVG must be defined as `path`s for the plugin to work

Sample HTML:

```xml
<svg xmlns="http://www.w3.org/2000/svg" id="svg" class="svg" viewBox="0 0 960 480" preserveAspectRatio="xMinYMin meet">
  <path fill="..." stroke="..." stroke-width="..."/>
  <path fill="..." stroke="..." stroke-width="..."/>
  <path fill="..." stroke="..." stroke-width="..."/>
  <path fill="..." stroke="..." stroke-width="..."/>
</svg>
```

## Creating A New Instance (Plugin Usage)

Creating a new instance is simple, and only one option is required - the `id` of the SVG. You can create the new instance as follows:

```xml
<script src="path/to/svgdrawfill.js"></script>
<script>
  (function() {
    var myAnimation = new DrawFillSVG({
      elementId: "svg"
    });
  })();
</script>
```

Creating the new instance automatically performs the animation.

## Using The Public `replay` Function

Using the `replay()` function is also very easy. Just call it on your new object instance. A real use case would be implementing a replay on a button click. Here's an example of that in action:

```xml
<button id="animate">animate again</button>
<script>
  (function() {
    var myAnimation = new DrawFillSVG({
      elementId: "svg"
    });
    document.getElementById("animate").addEventListener( "click", function() {
      myAnimation.replay();
    });
  })();
</script>
```

## Dependencies

It goes without saying that this plugin will only work in browsers that support SVGs and transitions. I also used Modernizr's `prefixed()` extension for cross-browser transition end events. This is my preferred method.

Another important point to note is that this plugin targets ONLY paths in the SVG, and not any other basic shapes like `circle` or `rect`. In order for the plugin to work properly, please convert all shapes to paths.

## Wrap Up

And that's about it. I hope you enjoy this plugin, and use it as an introduction to the wonderful world of SVG manipulation and animation!

## License

Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php