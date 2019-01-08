"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rotations = {
  line: [[[-1, 1], [0, 0], [1, -1], [2, -2]], [[2, -1], [1, 0], [0, 1], [-1, 2]], [[-2, 2], [-1, 1], [0, 0], [1, -1]], [[1, -2], [0, -1], [-1, 0], [-2, 1]]],
  L: [[[1, 1], [0, 0], [-1, -1], [-2, 0]], [[-1, 1], [0, 0], [1, -1], [0, -2]], [[-1, -1], [0, 0], [1, 1], [2, 0]], [[1, -1], [0, 0], [-1, 1], [0, 2]]],
  revL: [[[-1, -1], [0, 0], [1, 1], [0, 2]], [[1, -1], [0, 0], [-1, 1], [-2, 0]], [[1, 1], [0, 0], [-1, -1], [0, -2]], [[-1, 1], [0, 0], [1, -1], [2, 0]]],
  T: [[[1, 1], [0, 0], [1, -1], [-1, 1]], [[-1, 1], [0, 0], [1, 1], [-1, -1]], [[-1, -1], [0, 0], [-1, 1], [1, -1]], [[1, -1], [0, 0], [-1, -1], [1, 1]]],
  Z: [[[-1, 1], [0, 0], [-1, -1], [0, -2]], [[-1, -1], [0, 0], [1, -1], [2, 0]], [[1, -1], [0, 0], [1, 1], [0, 2]], [[1, 1], [0, 0], [-1, 1], [-2, 0]]],
  revZ: [[[1, -1], [0, 0], [-1, -1], [-2, 0]], [[1, 1], [0, 0], [1, -1], [0, -2]], [[-1, 1], [0, 0], [1, 1], [2, 0]], [[-1, -1], [0, 0], [-1, 1], [0, 2]]],
  square: [[[0, 0], [0, 0], [0, 0], [0, 0]]]
};

exports.default = rotations;