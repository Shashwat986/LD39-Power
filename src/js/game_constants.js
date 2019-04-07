var tileWidth = (window.innerWidth - 100) / 20
var tileHeight = (window.innerHeight - 100) / 10

var tileSize = (tileWidth > tileHeight) ? tileHeight : tileWidth;

console.log(tileWidth, tileHeight, tileSize, window.innerWidth, window.innerHeight);


var gameData = {
  headerHeight: 42,
  headerPadding: 5,
  numTilesX: 20,
  numTilesY: 10,
  tileWidth: tileSize,
  tileHeight: tileSize,
  edgeThickness: 5,

  maxLives: 3,
  batteryDrain: 1,
  playerSpeed: 200,

  e1Speed: 50,
  e2Speed: 50,
  bulletSpeed: 300,
  bulletFreq: 500,
  bulletFreezeTime: 500,

  gameWidth: function () {
    return this.tileWidth * this.numTilesX + 2 * this.edgeThickness;
  },
  gameHeight: function () {
    return this.tileHeight * this.numTilesY + 2 * this.edgeThickness;
  },

  canvas: function () {
    return {
      topLeft: [0, this.headerHeight],
      topRight: [this.gameWidth(), this.headerHeight],
      bottomLeft: [0, this.headerHeight + this.gameHeight()],
      bottomRight: [this.gameWidth(), this.headerHeight + this.gameHeight()]
    };
  },

  canvasHeight: function () {
    return this.headerHeight + this.gameHeight();
  },

  canvasWidth: function () {
    return this.gameWidth();
  },

  numX: function () {
    return this.numTilesX - 1;
  },

  numY: function () {
    return this.numTilesY - 1;
  },

  spriteXY: function (x, y) {
    if (x > this.numX()) x = this.numX();
    if (x < 0) x = 0;
    if (y > this.numY()) y = this.numY();
    if (y < 0) y = 0;

    return {
      x: this.edgeThickness + x * this.tileWidth,
      y: this.edgeThickness + y * this.tileHeight + this.headerHeight,
      w: this.tileWidth,
      h: this.tileHeight
    }
  },

  navbarX: function (x) {
    if (x > this.numX()) x = this.numX();
    if (x < 0) x = 0;

    return {
      x: this.edgeThickness + x * this.tileWidth,
      y: this.headerPadding,
      w: this.headerHeight - 2 * this.headerPadding,
      h: this.headerHeight - 2 * this.headerPadding,
    }
  }
};

var scaleFeatures = [
  'tileWidth', 'tileHeight',
  'playerSpeed', 'e1Speed', 'e2Speed', 'bulletSpeed'
];

/*
for (var i = 0; i < scaleFeatures.length ; i++) {
  gameData[scaleFeatures[i]] *= 1.5;
}
*/

window.gd = gameData;

export default gameData;
