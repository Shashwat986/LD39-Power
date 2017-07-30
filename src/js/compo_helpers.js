import gConsts from './game_constants';

export function drawBorder () {
  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: gConsts.canvas().topLeft[0],
      y: gConsts.canvas().topLeft[1],
      w: gConsts.gameWidth(),
      h: gConsts.edgeThickness
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: gConsts.canvas().topLeft[0],
      y: gConsts.canvas().topLeft[1],
      w: gConsts.edgeThickness,
      h: gConsts.gameHeight()
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: gConsts.canvas().topRight[0] - gConsts.edgeThickness,
      y: gConsts.canvas().topRight[1],
      w: gConsts.edgeThickness,
      h: gConsts.gameHeight()
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: gConsts.canvas().bottomLeft[0],
      y: gConsts.canvas().bottomLeft[1] - gConsts.edgeThickness,
      w: gConsts.gameWidth(),
      h: gConsts.edgeThickness
    })
    .color('red');
}

export function stopMovement(componentString) {
  this.x -= this.dx;
  if (this.hit(componentString)) {
    this.x += this.dx;
  } else return "X";
  this.y -= this.dy;
  if (this.hit(componentString)) {
    this.y += this.dy;
  } else return "Y";

  this.x -= this.dx;
  this.y -= this.dy;
  return "XY";
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

export function randomDirection (speed) {
  var x = 2 * (Math.random() - 0.5);
  var y = Math.sqrt(1 - x * x) * ((Math.random() < 0.5) ? -1 : 1);

  return {
    vx: x * speed,
    vy: y * speed
  };
}
