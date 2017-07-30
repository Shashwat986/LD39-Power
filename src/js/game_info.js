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

  level: {
    1: {
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
    }
  }
}
