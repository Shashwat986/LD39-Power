/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var gameData = {
  headerHeight: 42,
  headerPadding: 5,
  numTilesX: 20,
  numTilesY: 10,
  tileWidth: 32,
  tileHeight: 32,
  edgeThickness: 5,

  maxLives: 3,
  batteryDrain: 1,
  playerSpeed: 200,

  e1Speed: 50,
  e2Speed: 50,
  bulletSpeed: 300,
  bulletFreq: 500,
  bulletFreezeTime: 500,

  gameWidth: function () {
    return this.tileWidth * this.numTilesX + 2 * this.edgeThickness;
  },
  gameHeight: function () {
    return this.tileHeight * this.numTilesY + 2 * this.edgeThickness;
  },

  canvas: function () {
    return {
      topLeft: [0, this.headerHeight],
      topRight: [this.gameWidth(), this.headerHeight],
      bottomLeft: [0, this.headerHeight + this.gameHeight()],
      bottomRight: [this.gameWidth(), this.headerHeight + this.gameHeight()]
    };
  },

  canvasHeight: function () {
    return this.headerHeight + this.gameHeight();
  },

  canvasWidth: function () {
    return this.gameWidth();
  },

  numX: function () {
    return this.numTilesX - 1;
  },

  numY: function () {
    return this.numTilesY - 1;
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

var scaleFeatures = [
  'tileWidth', 'tileHeight',
  'playerSpeed', 'e1Speed', 'e2Speed', 'bulletSpeed'
];

for (var i = 0; i < scaleFeatures.length ; i++) {
  gameData[scaleFeatures[i]] *= 1.5;
}

/* harmony default export */ __webpack_exports__["a"] = (gameData);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets__ = __webpack_require__(5);


var gameObject = document.getElementById('game');
gameObject.innerHTML = "";
Crafty.init(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasWidth(), __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasHeight(), gameObject);
Crafty.background('#cba053');

Crafty.paths({
  images: 'src/images/',
  audio: 'src/audio/'
});

__webpack_require__(2);


Crafty.load(__WEBPACK_IMPORTED_MODULE_1__assets__["a" /* default */], function () {
  Crafty.audio.play('bg', -1);

  window.mb = Crafty.e("2D, DOM, Text, Persist, Mouse")
    .attr({x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasWidth() - 25, y: 0, w: 25, h: 20})
    .attr({paused: false})
    .css({'cursor': 'pointer'})
    .text("Mute")
    .bind('Click', function () {
      if (this.paused) {
        Crafty.audio.unpause('bg');
        this.css({'text-decoration': 'none'});
        this.paused = false;
      } else {
        Crafty.audio.pause('bg');
        this.css({'text-decoration': 'line-through'});
        this.paused = true;
      }
    });

  Crafty.scene("start");
});






/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_info__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__compo_helpers__ = __webpack_require__(4);




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
    .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].navbarX(17))
    .textFont('size', '20px')
    .text("Level: " + pc.level);

  for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].maxLives ; i++) {
    Crafty.e(
      "2D, Canvas, NavbarLives, " +
      ((i < pc.lives) ? "player_sprite" : "dead_sprite")
    )
      .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].navbarX(i));
  }

  if (hint) {
    Crafty.e("2D, DOM, Text")
      .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].navbarX(8))
      .attr({w: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].tileWidth * 7})
      .textFont('size', '16px')
      .text("<b>Hint:</b> " + hint);
  }
}

function updateBattery(pc) {
  if (Crafty('NavbarBattery').length === 0) {
    var loc = __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].navbarX(4)

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
    settings.currentLives = __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].maxLives;
  if (settings.currentLevel == null)
    settings.currentLevel = 1; //FIXME

  // Draw Background
  var bg = "bg" + (parseInt(Math.random() * 3) + 1);
  Crafty.e("2D, Canvas, " + bg)
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight + __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      w: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasWidth(),
      h: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasHeight()
    });

  Object(__WEBPACK_IMPORTED_MODULE_2__compo_helpers__["a" /* drawBorder */])();

  var levelSettings = __WEBPACK_IMPORTED_MODULE_1__game_info__["a" /* default */].level[settings.currentLevel];

  if (levelSettings == null) {
    Crafty.scene('start');
    return;
  }

  // Draw Portal
  Crafty.e("2D, Canvas, Collision, portal_sprite")
    .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].spriteXY.apply(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */], levelSettings.portal));

  // Draw Charging Points
  for (var i = 0; levelSettings.charger != null && i < levelSettings.charger.length; i++) {
    var elem = levelSettings.charger[i];

    Crafty.e("2D, Canvas, Collision, Charger, charger_sprite")
      .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].spriteXY.apply(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */], elem));
  }

  // Draw one-time charging points
  for (var i = 0; levelSettings.oneTimeCharger != null && i < levelSettings.oneTimeCharger.length; i++) {
    var elem = levelSettings.oneTimeCharger[i];

    Crafty.e("2D, Canvas, Collision, Charger, one_time_charger_sprite")
      .attr({kind: "onetime"})
      .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].spriteXY.apply(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */], elem));
  }

  // Draw Enemy 1
  for (var i = 0; levelSettings.enemy1 != null && i < levelSettings.enemy1.length; i++) {
    var elem = levelSettings.enemy1[i];
    elem.speed = Object(__WEBPACK_IMPORTED_MODULE_2__compo_helpers__["c" /* normalize */])(elem.speed);

    Crafty.e("2D, Canvas, Collision, Enemy, Motion, e1_sprite")
      .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].spriteXY.apply(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */], elem.pos))
      .attr({
        vx: elem.speed[0] * __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].e1Speed * (elem.scale || 1.0),
        vy: elem.speed[1] * __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].e1Speed * (elem.scale || 1.0)
      })
      .onHit('Solid', function () {
        var dirBlocked = __WEBPACK_IMPORTED_MODULE_2__compo_helpers__["e" /* stopMovement */].bind(this, 'Solid')();

        if (dirBlocked === 'X' || dirBlocked === 'XY')
          this.vx = -this.vx;
        if (dirBlocked === 'Y' || dirBlocked === 'XY')
          this.vy = -this.vy;
      });
  }

  // Draw Enemy 2
  for (var i = 0; levelSettings.enemy2 != null && i < levelSettings.enemy2.length; i++) {
    var elem = levelSettings.enemy2[i];
    elem.speed = Object(__WEBPACK_IMPORTED_MODULE_2__compo_helpers__["c" /* normalize */])(elem.speed);

    Crafty.e("2D, Canvas, Collision, Enemy, Motion, Delay, e2_sprite")
      .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].spriteXY.apply(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */], elem.pos))
      .attr({
        vx: elem.speed[0] * __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].e2Speed * (elem.scale || 1.0),
        vy: elem.speed[1] * __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].e2Speed * (elem.scale || 1.0)
      })
      .attr({bulletKind: (elem.bulletKind || null)})
      .onHit('Solid', function () {
        var dirBlocked = __WEBPACK_IMPORTED_MODULE_2__compo_helpers__["e" /* stopMovement */].bind(this, 'Solid')();

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

        var bullet = __WEBPACK_IMPORTED_MODULE_1__game_info__["a" /* default */].bullet(bulletKind);

        Crafty.e("2D, Canvas, Collision, Bullet, Motion, Color")
          .attr({
            x: this.x + (__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].tileWidth / 2),
            y: this.y + (__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].tileHeight / 2),
            h: 5, w: 5
          })
          .attr({kind: bullet.kind})
          .attr(Object(__WEBPACK_IMPORTED_MODULE_2__compo_helpers__["d" /* randomDirection */])(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].bulletSpeed))
          .onHit('Solid', function () {
            this.destroy();
          })
          .color(bullet.color);
      }, (elem.bulletFreq || __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].bulletFreq), -1);
  }

  // Draw PC
  var pcStarting = levelSettings.pc;
  if (pcStarting == null)
    pcStarting = [0, 0]
  var pc = Crafty.e("2D, Canvas, Fourway, Collision, player_sprite")
    .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].spriteXY.apply(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */], pcStarting))
    .attr({
      batteryLife: 100,
      lives: settings.currentLives,
      level: settings.currentLevel,
      frozen: false
    })
    .fourway(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].playerSpeed)
    .bind('Moved', function (e) {
      if (this.frozen) {
        this[e.axis] = e.oldValue;
        return;   //TODO
      }

      this.batteryLife -= __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].batteryDrain;
    })
    .bind('EnterFrame', function () {
      if (this.batteryLife <= 0) {
        loseLife.bind(this, Object(__WEBPACK_IMPORTED_MODULE_2__compo_helpers__["b" /* getMessage */])('battery'))();
        return;
      }

      updateBattery(this);
    })
    .onHit('Solid', function () {
      __WEBPACK_IMPORTED_MODULE_2__compo_helpers__["e" /* stopMovement */].bind(this, 'Solid')();
    })
    .onHit('Enemy', function () {
      loseLife.bind(this, Object(__WEBPACK_IMPORTED_MODULE_2__compo_helpers__["b" /* getMessage */])('enemy'))();
      return;
    })
    .onHit('Bullet', function (e) {
      var bulletKind = e[0].obj.kind;
      e[0].obj.destroy();

      switch (bulletKind) {
        case 'killing':
          loseLife.bind(this, Object(__WEBPACK_IMPORTED_MODULE_2__compo_helpers__["b" /* getMessage */])('bullet'))();
          break;
        case 'freezing':
          //this.batteryLife -= 10;
          this.frozen = true;
          this.timeout(function () {
            this.frozen = false;
            // TODO: Sprite
          }, __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].bulletFreezeTime);
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
      if (this.level === __WEBPACK_IMPORTED_MODULE_1__game_info__["a" /* default */].maxLevel) {
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
      x: 30 + __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight,
      w: (__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasWidth() - 2 * __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness) - 30
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
        x: 30 + __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
        y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight + 50,
        w: (__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasWidth() - 2 * __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness) - 30
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
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasWidth() - 130,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasHeight() - 30,
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
    .attr({x: 0, y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight, w: 320, h: 320});

  Crafty.e("2D, Canvas, Text")
    .attr({x: 350, y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight})
    .text("Battery Pack")
    .textFont('size', '36px');

  Crafty.e("2D, DOM, Text") // Using DOM because that has word-wrap
    .attr({x: 350, y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight + 50, w: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasWidth() - 350 - 30})
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
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasWidth() - 70,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasHeight() - 30,
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
  var colWidth = (__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasWidth() - 2 * __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness) / 3;

  Crafty.e("2D, Canvas, portal_sprite")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight + 50,
      w: colWidth,
      h: colWidth
    });

  Crafty.e("2D, DOM, Text")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight,
      w: colWidth
    })
    .textAlign("center")
    .text("This is the portal.")
    .textFont('size', '20px');

  Crafty.e("2D, Canvas, charger_sprite")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness + colWidth,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight + 50,
      w: colWidth,
      h: colWidth
    });

  Crafty.e("2D, DOM, Text")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness + colWidth,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight,
      w: colWidth
    })
    .textAlign("center")
    .text("This is a charging station")
    .textFont('size', '20px');

  Crafty.e("2D, Canvas, e1_sprite")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness + 2 * colWidth,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight + 50,
      w: colWidth,
      h: colWidth
    });

  Crafty.e("2D, DOM, Text")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness + 2 * colWidth,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight,
      w: colWidth
    })
    .textAlign("center")
    .text("This is a Jovian. BEWARE!")
    .textFont('size', '20px');

  Crafty.e("2D, DOM, Text")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight + 50 + colWidth,
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
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasWidth() - 85,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasHeight() - 30,
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  bullet: function (kind) {
    var ans = {
      kind: kind
    };
    switch (kind) {
      case 'freezing':
        ans.color = 'cyan';
        break;
      case 'killing':
        ans.color = 'black';
        break;
      default:
    }

    return ans;
  },

  maxLevel: 10,
  level: {
    1: {
      hint: "The purple charging stations can be used only once! Tread carefully",
      portal: [19, 9],
      charger: [
        [6, 6],
        [9, 0],
        [5, 8]
      ],
      oneTimeCharger: [
        [14, 5],
        [16, 0],
        [10, 9]
      ]
    },
    2: {
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
          speed: [-1, 2],
          scale: 2
        },
        {
          pos: [17, 2],
          speed: [0, 1]
        },
        {
          pos: [14, 0],
          speed: [0, 1]
        }
      ]
    },
    3: {
      portal: [19, 9],
      charger: [
        [3, 6],
        [5, 9],
        [6, 2],
        [11, 8],
        [14, 4],
        [14, 0],
        [16, 8]
      ],
      enemy1: [
        {
          pos: [3, 9],
          speed: [-1, -2]
        },
        {
          pos: [3, 9],
          speed: [1, -2]
        },
        {
          pos: [7, 0],
          speed: [-1, 2]
        },
        {
          pos: [11, 9],
          speed: [1, -2]
        },
        {
          pos: [14, 0],
          speed: [-1, 2]
        },
        {
          pos: [16, 9],
          speed: [1, -2]
        },
        {
          pos: [19, 0],
          speed: [-1, 2]
        }
      ]
    },
    4: {
      hint: "Beware the Jovian bullets: the Blue bullets freeze the user, but the black ones KILL",
      portal: [19, 9],
      charger: [
        [6, 6],
        [9, 0],
        [5, 8]
      ],
      oneTimeCharger: [
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
    },
    5: {
      portal: [19, 9],
      oneTimeCharger: [
        [10, 3],
        [8, 4],
        [4, 8]
      ],
      charger: [
        [18, 4],
        [12, 9]
      ],
      enemy2: [
        {
          pos: [8, 0],
          speed: [0, 1],
          bulletKind: 'freezing'
        },
        {
          pos: [7, 9],
          speed: [0, -1],
          bulletKind: 'freezing'
        },
        {
          pos: [14, 0],
          speed: [0, 1],
          bulletKind: 'freezing'
        },
        {
          pos: [15, 9],
          speed: [0, -1],
          bulletKind: 'freezing'
        }
      ]
    },
    6: {
      pc: [0, 5],
      portal: [19, 5],
      charger: [
        [9, 2],
        [9, 9]
      ],
      oneTimeCharger: [
        [14, 5]
      ],
      enemy1: [
        {
          pos: [0, 2],
          speed: [1, 0]
        },
        {
          pos: [0, 9],
          speed: [1, 0]
        },
        {
          pos: [10, 4],
          speed: [0, 0]
        },
        {
          pos: [10, 5],
          speed: [0, 0]
        },
        {
          pos: [10, 6],
          speed: [0, 0]
        },
        {
          pos: [10, 7],
          speed: [0, 0]
        }
      ],
      enemy2: [
        {
          pos: [17, 5],
          speed: [0, 0],
          bulletKind: 'killing',
          bulletFreq: 300
        }
      ]
    },
    7: {
      hint: "Choose wisely! The first charger you go to may very well be your last!",
      portal: [19, 9],
      oneTimeCharger: [
        [13, 0],
        [9, 5],
        [5, 9],
        [18, 9]
      ]
    },
    8: {
      hint: "What're you looking at me for? RUN!!!",
      portal: [19, 9],
      charger: [
        [5, 3],
        [5, 7],
        [10, 5],
        [15, 3],
        [15, 7]
      ],
      enemy1: [
        {
          pos: [10, 0],
          speed: [-1, 0]
        },
        {
          pos: [10, 0],
          speed: [-1, 3],
          scale: 3
        },
        {
          pos: [10, 0],
          speed: [1, 3],
          scale: 3
        },
        {
          pos: [10, 9],
          speed: [-1, 2],
          scale: 4
        },
        {
          pos: [10, 9],
          speed: [1, 2],
          scale: 4
        },
        {
          pos: [10, 0],
          speed: [-1, 2],
          scale: 4
        },
        {
          pos: [10, 0],
          speed: [1, 2],
          scale: 4
        },
        {
          pos: [10, 0],
          speed: [-1, 1],
          scale: 4
        },
        {
          pos: [10, 0],
          speed: [1, 1],
          scale: 4
        }
      ]
    },
    9: {
      portal: [19, 9],
      charger: [
        [10, 0],
        [10, 9],
        [5, 3],
        [3, 5],
        [15, 4],
        [15, 6],
        [15, 9]
      ],
      enemy2: [
        {
          pos: [17, 7],
          speed: [0, 0],
          bulletKind: 'killing'
        },
        {
          pos: [19, 7],
          speed: [0, 0],
          bulletKind: 'killing'
        },
        {
          pos: [15, 7],
          speed: [0, 0],
          bulletKind: 'killing'
        },
        {
          pos: [10, 0],
          speed: [0, 1],
          bulletKind: 'freezing'
        },
        {
          pos: [10, 9],
          speed: [0, -1],
          bulletKind: 'freezing'
        }
      ]
    },
    10: {
      pc: [5, 5],
      portal: [15, 5]
    }
  }
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = drawBorder;
/* harmony export (immutable) */ __webpack_exports__["e"] = stopMovement;
/* harmony export (immutable) */ __webpack_exports__["c"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["d"] = randomDirection;
/* harmony export (immutable) */ __webpack_exports__["b"] = getMessage;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_constants__ = __webpack_require__(0);


function drawBorder () {
  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().topLeft[0],
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().topLeft[1],
      w: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].gameWidth(),
      h: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().topLeft[0],
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().topLeft[1],
      w: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      h: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].gameHeight()
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().topRight[0] - __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().topRight[1],
      w: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      h: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].gameHeight()
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().bottomLeft[0],
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().bottomLeft[1] - __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      w: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].gameWidth(),
      h: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness
    })
    .color('red');
}

function stopMovement(componentString) {
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

function normalize (list) {
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

function randomDirection (speed) {
  var x = 2 * (Math.random() - 0.5);
  var y = Math.sqrt(1 - x * x) * ((Math.random() < 0.5) ? -1 : 1);

  return {
    vx: x * speed,
    vy: y * speed
  };
}

function getMessage (situation) {
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


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  audio: {
    bg: ['sound.wav', 'sound.mp3', 'sound.ogg']
  },
  sprites: {
    'bg.png': {
      tile: 128,
      tileh: 128,
      map: {
        bg1: [0, 0],
        bg2: [0, 1],
        bg3: [1, 0]
      }
    },
    'player.png': {
      tile: 320,
      tileh: 320,
      map: {
        player_sprite: [0, 0]
      }
    },
    'dead.png': {
      tile: 320,
      tileh: 320,
      map: {
        dead_sprite: [0, 0]
      }
    },
    'one_time_charger.png': {
      tile: 257,
      tileh: 257,
      map: {
        one_time_charger_sprite: [0, 0]
      }
    },
    'charger.png': {
      tile: 257,
      tileh: 257,
      map: {
        charger_sprite: [0, 0]
      }
    },
    'portal.png': {
      tile: 493,
      tileh: 493,
      map: {
        portal_sprite: [0, 0]
      }
    },
    'enemy1.png': {
      tile: 429,
      tileh: 429,
      map: {
        e1_sprite: [0, 0]
      }
    },
    'enemy2.png': {
      tile: 416,
      tileh: 416,
      map: {
        e2_sprite: [0, 0]
      }
    }
  }
});


/***/ })
/******/ ]);