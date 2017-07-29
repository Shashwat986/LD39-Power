import gConsts from './game_constants';

Crafty.scene('main', function () {
  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: 0,
      y: 0,
      w: gConsts.maxWidth,
      h: gConsts.edgeThickness
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: 0,
      y: 0,
      w: gConsts.edgeThickness,
      h: gConsts.maxHeight
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: gConsts.maxWidth - gConsts.edgeThickness,
      y: 0,
      w: gConsts.edgeThickness,
      h: gConsts.maxHeight
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: 0,
      y: gConsts.maxHeight - gConsts.edgeThickness,
      w: gConsts.maxWidth,
      h: gConsts.edgeThickness
    })
    .color('red');

  var small_sprite = Crafty.e("2D, Canvas, Fourway, Collision, player_sprite")
    .attr(gConsts.spriteXY(110, 0))
    .fourway(200)
    .onHit('Solid', function (e) {
      this.x -= this.dx;
      if (this.hit('Solid')) {
        this.x += this.dx;
      } else return;
      this.y -= this.dy;
      if (this.hit('Solid')) {
        this.y += this.dy;
      } else return;
      if (this.hit('Solid')) {
        this.x -= this.dx;
        this.y -= this.dy;
      }
      //this.resetMotion();
    });

});

Crafty.scene('start', function () {
  Crafty.e("2D, Canvas, player_sprite")
    .attr({x: 0, y: 0, w: 320, h: 320});

  Crafty.e("2D, Canvas, Text")
    .attr({x: 350, y: 0})
    .text("Battery Pack")
    .textFont('size', '36px');

  Crafty.e("2D, DOM, Text") // Using DOM because that has word-wrap
    .attr({x: 350, y: 50, w: 300})
    .text(
      "Leon is stranded on the planet Jupiter! " +
      "His battery has very limited power, and he can't travel without his jetpack." +
      "<p></p>" +
      "Help him get to each level's transporter without running out of battery. " +
      "There are lots of charging points that can be used to fill your battery, " +
      "but beware the evil Jovians who will try to eat Leon!"
    )
    .textFont('size', '18px');

  Crafty('2D').each(function() {
    this.addComponent('Mouse')
      .bind('Click', function () {
        Crafty.scene('main');
      });
  });
});
