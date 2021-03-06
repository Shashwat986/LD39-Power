export default {
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
};
