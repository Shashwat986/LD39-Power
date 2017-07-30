export default {
  gameWidth: 650,
  headerHeight: 42,
  headerPadding: 5,
  gameHeight: 330,
  tileWidth: 32,
  tileHeight: 32,
  edgeThickness: 5,

  maxLives: 3,
  batteryDrain: 1,
  playerSpeed: 200,

  e1Speed: 50,
  e2Speed: 50,
  bulletSpeed: 150,
  bulletFreq: 800,
  bulletFreezeTime: 500,

  canvas: function () {
    return {
      topLeft: [0, this.headerHeight],
      topRight: [this.gameWidth, this.headerHeight],
      bottomLeft: [0, this.headerHeight + this.gameHeight],
      bottomRight: [this.gameWidth, this.headerHeight + this.gameHeight]
    };
  },

  canvasHeight: function () {
    return this.headerHeight + this.gameHeight;
  },

  canvasWidth: function () {
    return this.gameWidth;
  },

  numX: function () {
    return parseInt((this.gameWidth - 2 * this.edgeThickness) / this.tileWidth) - 1;
  },

  numY: function () {
    return parseInt((this.gameHeight - 2 * this.edgeThickness) / this.tileHeight) - 1;
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
