import gConsts from './game_constants';

var gameObject = document.getElementById('game');
gameObject.innerHTML = "";
Crafty.init(gConsts.canvasWidth(), gConsts.canvasHeight(), gameObject);
Crafty.background('#cba053');

Crafty.paths({
  images: 'src/images/',
  audio: 'src/audio/'
});

require('./scenes');

import assetsObject from './assets';
Crafty.load(assetsObject, function () {
  Crafty.audio.play('bg', -1);

  window.mb = Crafty.e("2D, DOM, Text, Persist, Mouse")
    .attr({x: gConsts.canvasWidth() - 25, y: 0, w: 25, h: 20})
    .attr({paused: false})
    .css({'cursor': 'pointer'})
    .text("Mute")
    .bind('Click', function () {
      if (this.paused) {
        Crafty.audio.unpause('bg');
        this.css({'text-decoration': 'none'});
        this.paused = false;
      } else {
        Crafty.audio.pause('bg');
        this.css({'text-decoration': 'line-through'});
        this.paused = true;
      }
    });

  Crafty.scene("start");
});




