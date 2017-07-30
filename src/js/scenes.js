import gConsts from './game_constants';
import gameInfo from './game_info';
import { drawBorder, stopMovement, normalize, randomDirection } from './compo_helpers';

function loseLife (msg) {
  if (this.lives > 0) {
    Crafty.scene('msg', {
      text: msg,
      next: "main",
      attr: {
        currentLevel: this.level,
        currentLives: this.lives - 1
      }
    });
  } else {
    Crafty.scene('msg', {
      text: msg + ", Game Over!",
      next: "start"
    });
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

  if (Crafty('NavbarBattery').length === 0) {
    var loc = gConsts.navbarX(8)

    Crafty.e("2D, Canvas, NavbarBattery, Text")
      .attr({x: loc.x, y: loc.y + 16})
      .textFont('size', '14px');

    Crafty.e("2D, Canvas, NavbarBatteryContainer, Color")
      .attr(loc)
      .attr({h: 14, w: 87})   // TODO: Move to constants file
      .color('black');

    Crafty.e("2D, Canvas, NavbarBattery, Color")
      .attr({x: loc.x + 1, y: loc.y + 1})
      .attr({h: 12})          // TODO
      .color('green');
  } else {
    // Update Battery indicator
    Crafty('NavbarBattery Text').get(0)
      .text("Battery: " + pc.batteryLife + "%");

    Crafty('NavbarBattery Color').get(0)
      .attr({w: 0.85 * pc.batteryLife});    // TODO
  }
}

Crafty.scene('main', function (settings = null) {
  if (!settings || typeof settings !== 'object')
    settings = {};
  if (settings.currentLives == null)
    settings.currentLives = gConsts.maxLives;
  if (settings.currentLevel == null)
    settings.currentLevel = 1;

  drawBorder();

  var levelSettings = gameInfo.level[settings.currentLevel];

  // Draw Portal
  Crafty.e("2D, Canvas, Collision, portal_sprite")
    .attr(gConsts.spriteXY.apply(gConsts, levelSettings.portal));

  // Draw Charging Points
  for (var i = 0; levelSettings.charger != null && i < levelSettings.charger.length; i++) {
    var elem = levelSettings.charger[i];

    Crafty.e("2D, Canvas, Collision, charger_sprite")
      .attr(gConsts.spriteXY.apply(gConsts, elem));
  }

  // Draw Enemy 1
  for (var i = 0; levelSettings.enemy1 != null && i < levelSettings.enemy1.length; i++) {
    var elem = levelSettings.enemy1[i];
    elem.speed = normalize(elem.speed);

    Crafty.e("2D, Canvas, Collision, Enemy, Motion, e1_sprite")
      .attr(gConsts.spriteXY.apply(gConsts, elem.pos))
      .attr({
        vx: elem.speed[0] * gConsts.e1Speed,
        vy: elem.speed[1] * gConsts.e1Speed
      })
      .onHit('Solid', function () {
        var dirBlocked = stopMovement.bind(this, 'Solid')();

        if (dirBlocked === 'X' || dirBlocked === 'XY')
          this.vx = -this.vx;
        if (dirBlocked === 'Y' || dirBlocked === 'XY')
          this.vy = -this.vy;
      });
  }

  // Draw Enemy 2
  for (var i = 0; levelSettings.enemy2 != null && i < levelSettings.enemy2.length; i++) {
    var elem = levelSettings.enemy2[i];
    elem.speed = normalize(elem.speed);

    Crafty.e("2D, Canvas, Collision, Enemy, Motion, e2_sprite")
      .attr(gConsts.spriteXY.apply(gConsts, elem.pos))
      .attr({
        vx: elem.speed[0] * gConsts.e1Speed,
        vy: elem.speed[1] * gConsts.e1Speed
      })
      .attr({ timeSinceBullet: 0.0 })
      .onHit('Solid', function () {
        var dirBlocked = stopMovement.bind(this, 'Solid')();

        // TODO
        // var newDir = randomDirection(gConsts.e1Speed);

        if (dirBlocked === 'X' || dirBlocked === 'XY')
          this.vx = -this.vx;
        if (dirBlocked === 'Y' || dirBlocked === 'XY')
          this.vy = -this.vy;
      })
      .bind('EnterFrame', function (e) {
        this.timeSinceBullet += e.dt;
        if (this.timeSinceBullet > gConsts.bulletFreq) {
          this.timeSinceBullet = 0;

          var bullet = gameInfo.bullet(Math.random() < 0.5 ? 'killing' : 'freezing');

          Crafty.e("2D, Canvas, Collision, Bullet, Motion, Color")
            .attr({x: this.x, y: this.y, h: 5, w: 5})
            .attr({kind: bullet.kind})
            .attr(randomDirection(gConsts.bulletSpeed))
            .onHit('Solid', function () {
              this.destroy();
            })
            .color(bullet.color);
        }
      });
      // TODO: Make E2 fire bullets
  }

  // Draw PC
  var pc = Crafty.e("2D, Canvas, Fourway, Collision, player_sprite")
    .attr(gConsts.spriteXY(0, 0))
    .attr({
      batteryLife: 100,
      lives: settings.currentLives,
      level: settings.currentLevel,
      frozen: false
    })
    .fourway(gConsts.playerSpeed)
    .bind('Moved', function (e) {
      if (this.frozen) {
        this[e.axis] = e.oldValue;
        return;   //TODO
      }

      this.batteryLife -= gConsts.batteryDrain;
    })
    .bind('EnterFrame', function () {
      if (this.batteryLife <= 0) {
        loseLife.bind(this, "Battery Died")();
        return;
      }

      drawNavbar(this);
    })
    .onHit('Solid', function () {
      stopMovement.bind(this, 'Solid')();
    })
    .onHit('Enemy', function () {
      loseLife.bind(this, "A Jovian got you")();
      return;
    })
    .onHit('Bullet', function (e) {
      var bulletKind = e[0].obj.kind;
      e[0].obj.destroy();

      switch (bulletKind) {
        case 'killing':
          loseLife.bind(this, "A bullet got you")();
          break;
        case 'freezing':
          //this.batteryLife -= 10;
          this.frozen = true;
          this.timeout(function () {
            this.frozen = false;
            // TODO: Sprite
          }, gConsts.bulletFreezeTime);
          break;

        default:
      }
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

  Crafty.e("2D, DOM, Color, Text, Mouse")
    .attr({
      x: gConsts.canvasWidth() - 130,
      y: gConsts.canvasHeight() - 30,
      w: 150,
      h: 30
    })
    .color('green')
    .text('CONTINUE')
    .textFont('size', '20px')
    .css({
      "border": "1px solid",
      "border-radius": "4px",
      "cursor": "pointer",
      "padding": "5px"
    })
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

  Crafty.e("2D, DOM, Color, Text, Mouse")
    .attr({
      x: gConsts.canvasWidth() - 70,
      y: gConsts.canvasHeight() - 30,
      w: 100,
      h: 30
    })
    .color('green')
    .text('NEXT')
    .textFont('size', '20px')
    .css({
      "border": "1px solid",
      "border-radius": "4px",
      "padding": "5px",
      "cursor": "pointer"
    })
    .bind('Click', function () {
      Crafty.scene('start2');
    });
});

Crafty.scene('start2', function () {
  Crafty.e("2D, Canvas, portal_sprite")
    .attr({x: 0, y: gConsts.headerHeight + 50, w: 200, h: 200});

  Crafty.e("2D, DOM, Text")
    .attr({x: 0, y: gConsts.headerHeight, w: 200})
    .text("This is the portal.")
    .textFont('size', '20px');

  Crafty.e("2D, Canvas, charger_sprite")
    .attr({x: 210, y: gConsts.headerHeight + 50, w: 200, h: 200});

  Crafty.e("2D, DOM, Text")
    .attr({x: 210, y: gConsts.headerHeight, w: 200})
    .text("This is a charging station")
    .textFont('size', '20px');

  Crafty.e("2D, Canvas, e1_sprite")
    .attr({x: 420, y: gConsts.headerHeight + 50, w: 200, h: 200});

  Crafty.e("2D, DOM, Text")
    .attr({x: 420, y: gConsts.headerHeight, w: 200})
    .text("This is a Jovian. BEWARE!")
    .textFont('size', '20px');

  Crafty.e("2D, DOM, Color, Text, Mouse")
    .attr({
      x: gConsts.canvasWidth() - 85,
      y: gConsts.canvasHeight() - 30,
      w: 100,
      h: 30
    })
    .color('green')
    .text('START')
    .textFont('size', '20px')
    .css({
      "border": "1px solid",
      "border-radius": "4px",
      "cursor": "pointer",
      "padding": "5px"
    })
    .bind('Click', function () {
      Crafty.scene('main');
    });
});
