export default {
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
      hint: "You need to collect all the hearts, and then enter the portal before your battery runs out",
      portal: [19, 9],
      charger: [
        [6, 6],
        [9, 0],
        [5, 8],
        [14, 5],
        [16, 0],
        [10, 9]
      ]
    },
    2: {
      hint: "Beware the Jovians! They will eat you if they get a chance",
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
      hint: "You're doing great! Keep it up, cutie!",
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
      hint: "Beware the Jovian bullets: if you're hit, you'll be frozen for a little time.",
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
          speed: [0, 1],
          bulletKind: 'freezing'
        }
      ]
    },
    5: {
      portal: [19, 9],
      charger: [
        [10, 3],
        [8, 4],
        [4, 8],
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
        [9, 9],
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
          bulletKind: 'freezing',
          bulletFreq: 300
        }
      ]
    },
    7: {
      portal: [19, 9],
      charger: [
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
          bulletKind: 'freezing'
        },
        {
          pos: [19, 7],
          speed: [0, 0],
          bulletKind: 'freezing'
        },
        {
          pos: [15, 7],
          speed: [0, 0],
          bulletKind: 'freezing'
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
}
