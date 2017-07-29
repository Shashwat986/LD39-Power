var gameObject = document.getElementById('game');
gameObject.innerHTML = "";
Crafty.init(650, 330, gameObject);
Crafty.background('#cba053');

Crafty.paths({
  images: 'src/images/'
});

require('./scenes');

import assetsObject from './assets';
Crafty.load(assetsObject, function () {
  Crafty.scene("start");
});




