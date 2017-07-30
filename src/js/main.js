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
  Crafty.scene("start");
});




