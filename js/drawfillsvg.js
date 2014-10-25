/**
 * Draw Fill SVG
 *
 * A plugin that simulates a "draw" effect on the stroke of an SVG, fades out
 * the stroke, and fades in a fill colour.
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Call Me Nick
 * http://callmenick.com
 */

(function( window ){

  'use strict';

  /**
   * Cross browser transition end events
   *
   * Use modernizr to detect cross browser transition end events. Make sure
   * to include Modernizr in your doc and have "Modernizr.prefixed()" checked
   * off in the extensibility section.
   */

  var transEndEventNames = {
    "WebkitTransition" : "webkitTransitionEnd",
    "MozTransition"    : "transitionend",
    "OTransition"      : "oTransitionEnd",
    "msTransition"     : "MSTransitionEnd",
    "transition"       : "transitionend"
  },
  transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

  /**
   * Extend obj function
   *
   */

  function extend( a, b ) {
    for( var key in b ) { 
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  /**
   * DrawFillSVG constructor
   *
   */

  function DrawFillSVG( options ) {
    this.options = extend( {}, this.options );
    extend( this.options, options );
    this._init();
  }

  /**
   * DrawFillSVG options
   *
   * Available options:
   * elementId - the ID of the element to draw
   */

  DrawFillSVG.prototype.options = {
    elementId : "svg"
  }

  /**
   * DrawFillSVG _init
   *
   * Initialise DrawFillSVG
   */

  DrawFillSVG.prototype._init = function() {
    this.svg = document.getElementById(this.options.elementId);
    this.paths = this.svg.querySelectorAll("path");
    this._initAnimation();
  }

  /**
   * DrawFillSVG _initAnimation()
   *
   * Reset some style properties on our paths, add some transitions, set the
   * stroke-dasharray to the length of the path, and the stroke-dashoffset to
   * the length of the path pushing it out of view initially. Then, set the 
   * stroke-dashoffset to 0, animating the strokes in a drawing manner. Then,
   * run the path filler sequence.
   */

  DrawFillSVG.prototype._initAnimation = function() {
    for ( var i = 0; i < this.paths.length; i++ ) {
      var path = this.paths[i];
      var length = path.getTotalLength();

      // reset opacities
      path.style.fillOpacity = 0;
      path.style.strokeOpacity = 1;

      // reset transitions
      path.style.transition = path.style.WebkitTransition = "none";

      // reset stroke dash array and stroke dash offset
      path.style.strokeDasharray = length + " " + length;
      path.style.strokeDashoffset = length;
      path.getBoundingClientRect();

      // apply new transitions
      path.style.transition = path.style.WebkitTransition = "stroke-dashoffset 2s ease-in-out";

      // go baby go
      path.style.strokeDashoffset = 0;

      // fill the path
      this._fillPath( path );
    }
  }

  /**
   * DrawFillSVG _fillPath()
   *
   * Resets the transition props, then fills the path and fades out the stroke
   * by updating the styles.
   */

  DrawFillSVG.prototype._fillPath = function( path ) {
    path.addEventListener( transEndEventName, function() {
      // reset transitions
      path.style.transition = path.style.WebkitTransition = "none";
      path.style.transition = path.style.WebkitTransition = "fill-opacity 1s ease-in-out, stroke-opacity 1s ease-in-out";

      // edit props
      path.style.fillOpacity = 1;
      path.style.strokeOpacity = 0;
    } );
  }

  /**
   * DrawFillSVG replay
   *
   * A public function that allows you to replay the animation if you want. For
   * example, click a button, and replay the animation.
   */

  DrawFillSVG.prototype.replay = function() {
    this._initAnimation();
  }

  /**
   * Add to global namespace
   */

  window.DrawFillSVG = DrawFillSVG;

})( window );