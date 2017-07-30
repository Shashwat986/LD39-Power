import gConsts from './game_constants';
import gameInfo from './game_info';
import { drawBorder, stopMovement, normalize, randomDirection, getMessage } from './compo_helpers';

function loseLife (msg) {
  if (this.lives > 0) {
    Crafty.scene('msg', {
      text: "You lose a life",
      info: msg,
      next: "main",
      attr: {
        currentLevel: this.level,
        currentLives: this.lives - 1
      }
    });
  } else {
    Crafty.scene('msg', {
      text: "Game Over",
      info: msg + "<p/>You reached Level " + this.level +
        " which is quite cool! Let's try to reach higher?",
      next: "start"
    });
  }
}

function drawNavbar (pc, hint = null) {
  Crafty.e("2D, Canvas, Text")
    .attr(gConsts.navbarX(17))
    .textFont('size', '20px')
    .text("Level: " + pc.level);

  for (var i = 0; i < gConsts.maxLives ; i++) {
    Crafty.e(
      "2D, Canvas, NavbarLives, " +
      ((i < pc.lives) ? "player_sprite" : "dead_sprite")
    )
      .attr(gConsts.navbarX(i));
  }

  if (hint) {
    Crafty.e("2D, DOM, Text")
      .attr(gConsts.navbarX(8))
      .attr({w: gConsts.tileWidth * 7})
      .textFont('size', '16px')
      .text("<b>Hint:</b> " + hint);
  }
}

function updateBattery(pc) {
  if (Crafty('NavbarBattery').length === 0) {
    var loc = gConsts.navbarX(4)

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

    var color = null;
    if (pc.batteryLife >= 50)
      color = 'green';
    else if (pc.batteryLife >= 25)
      color = 'yellow';
    else
      color = 'red';
    Crafty('NavbarBattery Color').get(0)
      .color(color)
      .attr({w: 0.85 * pc.batteryLife});    // TODO
  }
}

Crafty.scene('main', function (settings = null) {
  if (!settings || typeof settings !== 'object')
    settings = {};
  if (settings.currentLives == null)
    settings.currentLives = gConsts.maxLives;
  if (settings.currentLevel == null)
    settings.currentLevel = 1; //FIXME

  // Draw Background
  var bg = "bg" + (parseInt(Math.random() * 3) + 1);
  Crafty.e("2D, Canvas, " + bg)
    .attr({
      x: gConsts.edgeThickness,
      y: gConsts.headerHeight + gConsts.edgeThickness,
      w: gConsts.canvasWidth(),
      h: gConsts.canvasHeight()
    });

  drawBorder();

  var levelSettings = gameInfo.level[settings.currentLevel];

  if (levelSettings == null) {
    Crafty.scene('start');
    return;
  }

  // Draw Portal
  Crafty.e("2D, Canvas, Collision, portal_sprite")
    .attr(gConsts.spriteXY.apply(gConsts, levelSettings.portal));

  // Draw Charging Points
  for (var i = 0; levelSettings.charger != null && i < levelSettings.charger.length; i++) {
    var elem = levelSettings.charger[i];

    Crafty.e("2D, Canvas, Collision, Charger, charger_sprite")
      .attr(gConsts.spriteXY.apply(gConsts, elem));
  }

  // Draw one-time charging points
  for (var i = 0; levelSettings.oneTimeCharger != null && i < levelSettings.oneTimeCharger.length; i++) {
    var elem = levelSettings.oneTimeCharger[i];

    Crafty.e("2D, Canvas, Collision, Charger, one_time_charger_sprite")
      .attr({kind: "onetime"})
      .attr(gConsts.spriteXY.apply(gConsts, elem));
  }

  // Draw Enemy 1
  for (var i = 0; levelSettings.enemy1 != null && i < levelSettings.enemy1.length; i++) {
    var elem = levelSettings.enemy1[i];
    elem.speed = normalize(elem.speed);

    Crafty.e("2D, Canvas, Collision, Enemy, Motion, e1_sprite")
      .attr(gConsts.spriteXY.apply(gConsts, elem.pos))
      .attr({
        vx: elem.speed[0] * gConsts.e1Speed * (elem.scale || 1.0),
        vy: elem.speed[1] * gConsts.e1Speed * (elem.scale || 1.0)
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

    Crafty.e("2D, Canvas, Collision, Enemy, Motion, Delay, e2_sprite")
      .attr(gConsts.spriteXY.apply(gConsts, elem.pos))
      .attr({
        vx: elem.speed[0] * gConsts.e2Speed * (elem.scale || 1.0),
        vy: elem.speed[1] * gConsts.e2Speed * (elem.scale || 1.0)
      })
      .attr({bulletKind: (elem.bulletKind || null)})
      .onHit('Solid', function () {
        var dirBlocked = stopMovement.bind(this, 'Solid')();

        // TODO?
        // var newDir = randomDirection(gConsts.e1Speed);

        if (dirBlocked === 'X' || dirBlocked === 'XY')
          this.vx = -this.vx;
        if (dirBlocked === 'Y' || dirBlocked === 'XY')
          this.vy = -this.vy;
      })
      .delay(function () {
        var bulletKind = null;
        if (this.bulletKind != null)
          bulletKind = this.bulletKind
        else
          bulletKind = Math.random() < 0.5 ? 'killing' : 'freezing'

        var bullet = gameInfo.bullet(bulletKind);

        Crafty.e("2D, Canvas, Collision, Bullet, Motion, Color")
          .attr({
            x: this.x + (gConsts.tileWidth / 2),
            y: this.y + (gConsts.tileHeight / 2),
            h: 5, w: 5
          })
          .attr({kind: bullet.kind})
          .attr(randomDirection(gConsts.bulletSpeed))
          .onHit('Solid', function () {
            this.destroy();
          })
          .color(bullet.color);
      }, (elem.bulletFreq || gConsts.bulletFreq), -1);
  }

  // Draw PC
  var pcStarting = levelSettings.pc;
  if (pcStarting == null)
    pcStarting = [0, 0]
  var pc = Crafty.e("2D, Canvas, Fourway, Collision, player_sprite")
    .attr(gConsts.spriteXY.apply(gConsts, pcStarting))
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
        loseLife.bind(this, getMessage('battery'))();
        return;
      }

      updateBattery(this);
    })
    .onHit('Solid', function () {
      stopMovement.bind(this, 'Solid')();
    })
    .onHit('Enemy', function () {
      loseLife.bind(this, getMessage('enemy'))();
      return;
    })
    .onHit('Bullet', function (e) {
      var bulletKind = e[0].obj.kind;
      e[0].obj.destroy();

      switch (bulletKind) {
        case 'killing':
          loseLife.bind(this, getMessage('bullet'))();
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
    .onHit('Charger', function (e) {
      this.batteryLife = 100;

      if (e[0].obj.kind === 'onetime')
        e[0].obj.destroy();
    })
    .onHit('portal_sprite', function () {
      var info = "You have made it to the portal. " +
        "Let's take you to Level " + (this.level + 1);
      if (this.level === gameInfo.maxLevel) {
        info = "Congrats! You Won! " +
          "You had " + this.lives + " lives left! " +
          "Good Job!";
      }
      Crafty.scene('msg', {
        text: "Level Cleared",
        info: info,
        next: "main",
        attr: {
          currentLevel: this.level + 1,
          currentLives: this.lives
        }
      });
    });
  window.pc = pc;

  drawNavbar(pc, levelSettings.hint);
});

Crafty.scene('msg', function (settings) {
  Crafty.e("2D, DOM, Text, Mouse")
    .attr({
      x: 30 + gConsts.edgeThickness,
      y: gConsts.headerHeight,
      w: (gConsts.canvasWidth() - 2 * gConsts.edgeThickness) - 30
    })
    .textAlign('center')
    .textFont('size', '36px')
    .text(settings.text)
    .bind('Click', function () {
      Crafty.scene(settings.next, settings.attr);
    });

  if (settings.info) {
    Crafty.e("2D, DOM, Text, Mouse")
      .attr({
        x: 30 + gConsts.edgeThickness,
        y: gConsts.headerHeight + 50,
        w: (gConsts.canvasWidth() - 2 * gConsts.edgeThickness) - 30
      })
      .textAlign('center')
      .textFont('size', '20px')
      .text(settings.info)
      .bind('Click', function () {
        Crafty.scene(settings.next, settings.attr);
      });
  }

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
  var colWidth = (gConsts.canvasWidth() - 2 * gConsts.edgeThickness) / 3;

  Crafty.e("2D, Canvas, portal_sprite")
    .attr({
      x: gConsts.edgeThickness,
      y: gConsts.headerHeight + 50,
      w: colWidth,
      h: colWidth
    });

  Crafty.e("2D, DOM, Text")
    .attr({
      x: gConsts.edgeThickness,
      y: gConsts.headerHeight,
      w: colWidth
    })
    .textAlign("center")
    .text("This is the portal.")
    .textFont('size', '20px');

  Crafty.e("2D, Canvas, charger_sprite")
    .attr({
      x: gConsts.edgeThickness + colWidth,
      y: gConsts.headerHeight + 50,
      w: colWidth,
      h: colWidth
    });

  Crafty.e("2D, DOM, Text")
    .attr({
      x: gConsts.edgeThickness + colWidth,
      y: gConsts.headerHeight,
      w: colWidth
    })
    .textAlign("center")
    .text("This is a charging station")
    .textFont('size', '20px');

  Crafty.e("2D, Canvas, e1_sprite")
    .attr({
      x: gConsts.edgeThickness + 2 * colWidth,
      y: gConsts.headerHeight + 50,
      w: colWidth,
      h: colWidth
    });

  Crafty.e("2D, DOM, Text")
    .attr({
      x: gConsts.edgeThickness + 2 * colWidth,
      y: gConsts.headerHeight,
      w: colWidth
    })
    .textAlign("center")
    .text("This is a Jovian. BEWARE!")
    .textFont('size', '20px');

  Crafty.e("2D, DOM, Text")
    .attr({
      x: gConsts.edgeThickness,
      y: gConsts.headerHeight + 50 + colWidth,
      w: 3 * colWidth
    })
    .textAlign("center")
    .text(
      "Use arrow keys to move up, down, left, and right. " + "<br/>" +
      "Note that pressing two arrow keys to move diagonally will use the same " +
      "amount of battery as moving first one way then the other"
    )
    .textFont('size', '18px');

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
