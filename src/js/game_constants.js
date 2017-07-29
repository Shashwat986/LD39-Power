export default {
  maxWidth: 650,
  maxHeight: 330,
  tileWidth: 32,
  tileHeight: 32,
  edgeThickness: 5,

  spriteXY: function (x, y) {
    var numX = parseInt((this.maxWidth - 2 * this.edgeThickness) / this.tileWidth) - 1;
    var numY = parseInt((this.maxHeight - 2 * this.edgeThickness) / this.tileHeight) - 1;
    if (x > numX) x = numX;
    if (x < 0) x = 0;
    if (y > numY) y = numY;
    if (y < 0) y = 0;

    return {
      x: this.edgeThickness + x * this.tileWidth,
      y: this.edgeThickness + y * this.tileHeight,
      w: this.tileWidth,
      h: this.tileHeight
    }
  }
};
