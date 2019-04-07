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

export function getBackInside() {
  var moved = false;
  if (this.x < gConsts.canvas().topLeft[0] + gConsts.edgeThickness) {
    this.x = gConsts.canvas().topLeft[0] + gConsts.edgeThickness + 1;
    moved = true;
  }
  if (this.y < gConsts.canvas().topLeft[1] + gConsts.edgeThickness) {
    this.y = gConsts.canvas().topLeft[1] + gConsts.edgeThickness + 1;
    moved = true;
  }
  if (this.x + this.w > gConsts.canvas().bottomRight[0] - gConsts.edgeThickness) {
    this.x = gConsts.canvas().bottomRight[0] - gConsts.edgeThickness - 1 - this.w;
    moved = true;
  }
  if (this.y + this.h > gConsts.canvas().bottomRight[1] - gConsts.edgeThickness) {
    this.y = gConsts.canvas().bottomRight[1] - gConsts.edgeThickness - 1 - this.h;
    moved = true;
  }

  return moved;
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

export function getMessage (situation) {
  switch (situation) {
    case 'battery':
      return "Your jetpack's battery has run out! " +
        "The only direction you're going now, " +
        "is straight down...";
    case 'enemy':
      return "You have been captured and eaten by " +
        "the Jovian. If it's any consolation, " +
        "you were delicious.";
    case 'bullet':
      return "You have been struck by a Jovian bullet. " +
        "Ideas may be bulletproof, but you sure aren't.";
  }
}
