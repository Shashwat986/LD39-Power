import gConsts from './game_constants';
import { drawBorder, stopMovement, normalize } from './compo_helpers';

function loseLife (msg = "Battery Over") {
  if (this.lives > 0) {
    Crafty.scene('msg', {
      text: msg,
      next: "main",
      attr: {
        currentLevel: this.level,
        currentLives: this.lives - 1
      }
    });
    return;
  } else {
    // TODO: Change to better end screen
    Crafty.scene('start');
    return;
  }
}

function drawNavbar (pc) {
  if (Crafty('Level').length === 0) {
    Crafty.e("2D, Canvas, Text")
      .attr(gConsts.navbarX(17))
      .textFont('size', '20px')
      .text("Level: " + pc.level);
  }

  if (Crafty('NavbarLives').length === 0) {
    for (var i = 0; i < gConsts.maxLives ; i++) {
      var c = Crafty.e(
        "2D, Canvas, NavbarLives, " +
        ((i < pc.lives) ? "player_sprite" : "dead_sprite")
      )
        .attr(gConsts.navbarX(i));
    }
  }

  // TODO: Make this look better
  if (Crafty('NavbarBattery').length === 0) {
    Crafty.e("2D, Canvas, NavbarBattery, Text")
      .attr(gConsts.navbarX(8))
      .textFont('size', '14px')
      .text("Battery: " + pc.batteryLife);
  } else {
    // Update Battery indicator
    Crafty('NavbarBattery').get(0)
      .textFont('size', '14px')
      .text("Battery: " + pc.batteryLife);
  }
}

function getLevelSettings (level) {
  return {
    portal: [19, 9],
    charger: [
      [6, 6],
      [9, 0],
      [5, 8],
      [14, 5]
    ],
    enemy1: [
      {
        pos: [4, 4],
        speed: [-1, 2]
      },
      {
        pos: [17, 0],
        speed: [0, 1]
      }
    ],
    enemy2: [
      {
        pos: [14, 0],
        speed: [0, 1]
      }
    ]
  };
}

Crafty.scene('main', function (settings = null) {
  if (!settings || typeof settings !== 'object')
    settings = {};
  if (settings.currentLives == null)
    settings.currentLives = gConsts.maxLives;
  if (settings.currentLevel == null)
    settings.currentLevel = 1;

  drawBorder();

  var levelSettings = getLevelSettings(settings.currentLevel);

  // Draw Portal
  Crafty.e("2D, Canvas, Collision, portal_sprite")
    .attr(gConsts.spriteXY.apply(gConsts, levelSettings.portal));

  // Draw Charging Points
  for (var i = 0; i < levelSettings.charger.length; i++) {
    var elem = levelSettings.charger[i];

    Crafty.e("2D, Canvas, Collision, charger_sprite")
      .attr(gConsts.spriteXY.apply(gConsts, elem));
  }

  // Draw Enemy 1
  for (var i = 0; i < levelSettings.enemy1.length; i++) {
    var elem = levelSettings.enemy1[i];
    elem.speed = normalize(elem.speed);

    Crafty.e("2D, Canvas, Collision, Enemy, Motion, e1_sprite")
      .attr(gConsts.spriteXY.apply(gConsts, elem.pos))
      .attr({
        vx: elem.speed[0] * gConsts.e1Speed,
        vy: elem.speed[1] * gConsts.e1Speed
      })
      .onHit('Solid', function () {
        // TODO
        this.vx = -this.vx;
        this.vy = -this.vy;
      });
  }

  // Draw Enemy 2
  for (var i = 0; i < levelSettings.enemy2.length; i++) {
    var elem = levelSettings.enemy2[i];
    elem.speed = normalize(elem.speed);

    Crafty.e("2D, Canvas, Collision, Enemy, Motion, e2_sprite")
      .attr(gConsts.spriteXY.apply(gConsts, elem.pos))
      .attr({
        vx: elem.speed[0] * gConsts.e1Speed,
        vy: elem.speed[1] * gConsts.e1Speed
      })
      .onHit('Solid', function () {
        // TODO
        this.vx = -this.vx;
        this.vy = -this.vy;
      });
      // TODO: Make E2 fire bullets
  }

  // Draw PC
  var pc = Crafty.e("2D, Canvas, Fourway, Collision, player_sprite")
    .attr(gConsts.spriteXY(0, 0))
    .attr({
      batteryLife: 100,
      lives: settings.currentLives,
      level: settings.currentLevel
    })
    .fourway(200)
    .bind('Moved', function () {
      this.batteryLife -= gConsts.batteryDrain;
    })
    .bind('EnterFrame', function () {
      if (this.batteryLife <= 0) {
        loseLife.bind(this, "Battery Died")();
      }

      drawNavbar(this);
    })
    .onHit('Solid', function () {
      stopMovement.bind(this, 'Solid')();
    })
    .onHit('Enemy', function () {
      loseLife.bind(this, "You DED")();
    })
    .onHit('charger_sprite', function () {
      this.batteryLife = 100;
    })
    .onHit('portal_sprite', function () {
      Crafty.scene('msg', {
        text: "Congrats! Next Level",
        next: "main",
        attr: {
          currentLevel: this.level + 1,
          currentLives: gConsts.maxLives
        }
      });
    });
  window.pc = pc;

  drawNavbar(pc);
});

Crafty.scene('msg', function (settings) {
  Crafty.e("2D, Canvas, Text, Mouse")
    .attr({x: 30, y: gConsts.headerHeight})
    .text(settings.text)
    .textFont('size', '36px')
    .bind('Click', function () {
      Crafty.scene(settings.next, settings.attr);
    });
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
