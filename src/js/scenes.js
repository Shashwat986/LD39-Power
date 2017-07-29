import gConsts from './game_constants';
import { drawBorder, stopMovement } from './compo_helpers';

function drawNavbar (pc) {
  if (Crafty('NavbarLives').length === 0) {
    for (var i = 0; i < gConsts.maxLives ; i++) {
      var c = Crafty.e(
        "2D, Canvas, NavbarLives, " +
        ((i < pc.lives) ? "player_sprite" : "dead_sprite")
      )
        .attr(gConsts.navbarX(i));
    }
  }

  if (Crafty('NavbarBattery').length === 0) {
    Crafty.e("2D, Canvas, NavbarBattery, Text")
      .attr(gConsts.navbarX(8))
      .text("Battery: " + pc.batteryLife);
  } else {
    Crafty('NavbarBattery').get(0)
      .text("Battery: " + pc.batteryLife);
  }
}

Crafty.scene('main', function (currentLives = null) {
  if (currentLives === null)
    currentLives = gConsts.maxLives;

  drawBorder();

  var pc = Crafty.e("2D, Canvas, Fourway, Collision, player_sprite")
    .attr(gConsts.spriteXY(0, 0))
    .attr({ batteryLife: 100, lives: currentLives})
    .fourway(200)
    .bind('Moved', function () {
      this.batteryLife -= 1;
    })
    .bind('EnterFrame', function () {
      if (this.batteryLife <= 0) {
        if (pc.lives > 0) {
          Crafty.scene('main', pc.lives - 1);
          return;
        } else {
          Crafty.scene('start');
          return;
        }
      }

      drawNavbar(pc);
    })
    .onHit('Solid', function () {
      stopMovement.bind(this, 'Solid')();
    });
  window.pc = pc;

  drawNavbar(pc);
});

Crafty.scene('start', function () {
  Crafty.e("2D, Canvas, player_sprite")
    .attr({x: 0, y: gConsts.headerHeight, w: 320, h: 320});

  Crafty.e("2D, Canvas, Text")
    .attr({x: 350, y: gConsts.headerHeight})
    .text("Battery Pack")
    .textFont('size', '36px');

  Crafty.e("2D, DOM, Text") // Using DOM because that has word-wrap
    .attr({x: 350, y: gConsts.headerHeight + 50, w: gConsts.canvasWidth() - 350 - 30})
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
