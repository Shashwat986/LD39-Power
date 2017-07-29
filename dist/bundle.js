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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_constants__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets__ = __webpack_require__(1);


var gameObject = document.getElementById('game');
gameObject.innerHTML = "";
Crafty.init(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasWidth(), __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvasHeight(), gameObject);
Crafty.background('#cba053');

Crafty.paths({
  images: 'src/images/'
});

__webpack_require__(2);


Crafty.load(__WEBPACK_IMPORTED_MODULE_1__assets__["a" /* default */], function () {
  Crafty.scene("start");
});






/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  sprites: {
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_constants__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__compo_helpers__ = __webpack_require__(4);



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
      .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].navbarX(17))
      .textFont('size', '20px')
      .text("Level: " + pc.level);
  }

  if (Crafty('NavbarLives').length === 0) {
    for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].maxLives ; i++) {
      var c = Crafty.e(
        "2D, Canvas, NavbarLives, " +
        ((i < pc.lives) ? "player_sprite" : "dead_sprite")
      )
        .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].navbarX(i));
    }
  }

  // TODO: Make this look better
  if (Crafty('NavbarBattery').length === 0) {
    Crafty.e("2D, Canvas, NavbarBattery, Text")
      .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].navbarX(8))
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
    settings.currentLives = __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].maxLives;
  if (settings.currentLevel == null)
    settings.currentLevel = 1;

  Object(__WEBPACK_IMPORTED_MODULE_1__compo_helpers__["a" /* drawBorder */])();

  var levelSettings = getLevelSettings(settings.currentLevel);

  // Draw Portal
  Crafty.e("2D, Canvas, Collision, portal_sprite")
    .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].spriteXY.apply(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */], levelSettings.portal));

  // Draw Charging Points
  for (var i = 0; i < levelSettings.charger.length; i++) {
    var elem = levelSettings.charger[i];

    Crafty.e("2D, Canvas, Collision, charger_sprite")
      .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].spriteXY.apply(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */], elem));
  }

  // Draw Enemy 1
  for (var i = 0; i < levelSettings.enemy1.length; i++) {
    var elem = levelSettings.enemy1[i];
    elem.speed = Object(__WEBPACK_IMPORTED_MODULE_1__compo_helpers__["b" /* normalize */])(elem.speed);

    Crafty.e("2D, Canvas, Collision, Enemy, Motion, e1_sprite")
      .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].spriteXY.apply(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */], elem.pos))
      .attr({
        vx: elem.speed[0] * __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].e1Speed,
        vy: elem.speed[1] * __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].e1Speed
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
    elem.speed = Object(__WEBPACK_IMPORTED_MODULE_1__compo_helpers__["b" /* normalize */])(elem.speed);

    Crafty.e("2D, Canvas, Collision, Enemy, Motion, e2_sprite")
      .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].spriteXY.apply(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */], elem.pos))
      .attr({
        vx: elem.speed[0] * __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].e1Speed,
        vy: elem.speed[1] * __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].e1Speed
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
    .attr(__WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].spriteXY(0, 0))
    .attr({
      batteryLife: 100,
      lives: settings.currentLives,
      level: settings.currentLevel
    })
    .fourway(200)
    .bind('Moved', function () {
      this.batteryLife -= __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].batteryDrain;
    })
    .bind('EnterFrame', function () {
      if (this.batteryLife <= 0) {
        loseLife.bind(this, "Battery Died")();
      }

      drawNavbar(this);
    })
    .onHit('Solid', function () {
      __WEBPACK_IMPORTED_MODULE_1__compo_helpers__["c" /* stopMovement */].bind(this, 'Solid')();
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
          currentLives: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].maxLives
        }
      });
    });
  window.pc = pc;

  drawNavbar(pc);
});

Crafty.scene('msg', function (settings) {
  Crafty.e("2D, Canvas, Text, Mouse")
    .attr({x: 30, y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].headerHeight})
    .text(settings.text)
    .textFont('size', '36px')
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

  Crafty('2D').each(function() {
    this.addComponent('Mouse')
      .bind('Click', function () {
        Crafty.scene('main');
      });
  });
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  gameWidth: 650,
  headerHeight: 42,
  headerPadding: 5,
  gameHeight: 330,
  tileWidth: 32,
  tileHeight: 32,
  edgeThickness: 5,
  maxLives: 3,
  batteryDrain: 1,

  e1Speed: 50,
  e2Speed: 50,
  bulletSpeed: 150,

  canvas: function () {
    return {
      topLeft: [0, this.headerHeight],
      topRight: [this.gameWidth, this.headerHeight],
      bottomLeft: [0, this.headerHeight + this.gameHeight],
      bottomRight: [this.gameWidth, this.headerHeight + this.gameHeight]
    };
  },

  canvasHeight: function () {
    return this.headerHeight + this.gameHeight;
  },

  canvasWidth: function () {
    return this.gameWidth;
  },

  numX: function () {
    return parseInt((this.gameWidth - 2 * this.edgeThickness) / this.tileWidth) - 1;
  },

  numY: function () {
    return parseInt((this.gameHeight - 2 * this.edgeThickness) / this.tileHeight) - 1;
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
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = drawBorder;
/* harmony export (immutable) */ __webpack_exports__["c"] = stopMovement;
/* harmony export (immutable) */ __webpack_exports__["b"] = normalize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_constants__ = __webpack_require__(3);


function drawBorder () {
  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().topLeft[0],
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().topLeft[1],
      w: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].gameWidth,
      h: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().topLeft[0],
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().topLeft[1],
      w: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      h: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].gameHeight
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().topRight[0] - __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().topRight[1],
      w: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      h: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].gameHeight
    })
    .color('red');

  Crafty.e("2D, Canvas, Color, Collision, Solid")
    .attr({
      x: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().bottomLeft[0],
      y: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].canvas().bottomLeft[1] - __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness,
      w: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].gameWidth,
      h: __WEBPACK_IMPORTED_MODULE_0__game_constants__["a" /* default */].edgeThickness
    })
    .color('red');
}

function stopMovement(componentString) {
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


/***/ })
/******/ ]);