import gConsts from './game_constants';

export function drawBorder () {
  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: gConsts.canvas().topLeft[0],
      y: gConsts.canvas().topLeft[1],
      w: gConsts.gameWidth,
      h: gConsts.edgeThickness
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: gConsts.canvas().topLeft[0],
      y: gConsts.canvas().topLeft[1],
      w: gConsts.edgeThickness,
      h: gConsts.gameHeight
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: gConsts.canvas().topRight[0] - gConsts.edgeThickness,
      y: gConsts.canvas().topRight[1],
      w: gConsts.edgeThickness,
      h: gConsts.gameHeight
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: gConsts.canvas().bottomLeft[0],
      y: gConsts.canvas().bottomLeft[1] - gConsts.edgeThickness,
      w: gConsts.gameWidth,
      h: gConsts.edgeThickness
    })
    .color('red');
}

export function stopMovement(componentString) {
  this.x -= this.dx;
  if (this.hit(componentString)) {
    this.x += this.dx;
  } else return;
  this.y -= this.dy;
  if (this.hit(componentString)) {
    this.y += this.dy;
  } else return;
  if (this.hit(componentString)) {
    this.x -= this.dx;
    this.y -= this.dy;
  }
  //this.resetMotion();
}

export function normalize (list) {
  var val = 0.0;
  for (var i = 0; i < list.length; i++) {
    val += list[i] * list[i];
  }
  val = Math.sqrt(val);
  if (val == 0) return list;
  for (var i = 0; i < list.length; i++) {
    list[i] = list[i] / val;
  }

  return list;
}
