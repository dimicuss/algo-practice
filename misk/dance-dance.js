const u = require("util");

const log = (obj) => {
  console.log(u.inspect(obj, { colors: true, depth: null }));
};

const createMatrix = (str) => {
  const mtx = [];

  const rows = str.split("\n");
  let start;

  for (let i = 0; i < rows.length; i++) {
    const row = [];

    for (let j = 0; j < rows[i].length; j++) {
      const direction = rows[i][j];

      if (direction === "S") {
        start = [j, i];
      }

      row.push(direction);
    }

    mtx.push(row);
  }

  return { mtx, start };
};

const dirDegMap = {
  S: 0,
  "→": 0,
  "↗": 45,
  "↑": 90,
  "↖": 135,
  "←": 180,
  "↙": 225,
  "↓": 270,
  "↘": 315,
};

const degDirMap = {
  0: "→",
  45: "↗",
  90: "↑",
  135: "↖",
  180: "←",
  225: "↙",
  270: "↓",
  315: "↘",
};

const degCoordMap = {
  0: [1, 0],
  45: [1, -1],
  90: [0, -1],
  135: [-1, -1],
  180: [-1, 0],
  225: [-1, 1],
  270: [0, 1],
  315: [1, 1],
};

const mod = (n, m) => (n < 0 ? Math.abs(m + n) % m : n % m);

const key = (x, y) => [x, y].join("|");

const createCoordsGetter = (degrees) => (mtx, x, y) => {
  const dir = mtx[y][x];

  const dirDeg = dirDegMap[dir];
  const map = new Map();
  const list = [];

  for (const deg of degrees) {
    const nextDeg = mod(dirDeg + deg, 360);
    const [xD, yD] = degCoordMap[nextDeg];

    const nextX = x + xD;
    const nextY = y + yD;

    list.push([nextX, nextY, degDirMap[nextDeg]]);

    if (!map.has(nextX)) {
      map.set(nextX, new Set());
    }

    map.get(nextX).add(nextY);
  }

  return { list, map };
};

const getNextCoords = createCoordsGetter([90, 45, 0, -45, -90]);
const getStartCoords = createCoordsGetter([135, 90, 45, 0, -45, -90, -135, -180]);
const getRestrictedCoords = createCoordsGetter([45, 0, -45]);

const dance_ = (mtx, current, cb, visited = {}, result = "") => {
  const [x, y] = current;
  const { list } = mtx[y][x] === "S" ? getStartCoords(mtx, x, y) : getNextCoords(mtx, x, y);

  const nextVisited = {
    ...visited,
    [key(x, y)]: true,
  };

  for (const [nextX, nextY, nextDir] of list) {
    let nextPlate;
    nextPlate = (nextPlate = mtx[nextY]) && nextPlate[nextX];

    if (nextPlate) {
      const { map } = getRestrictedCoords(mtx, nextX, nextY);
      const inRestricted = map.has(x) && map.get(x).has(y);

      if (nextPlate === "S") {
        cb(result + nextDir);
      }

      if (!inRestricted && !nextVisited[key(nextX, nextY)]) {
        dance_(mtx, [nextX, nextY], cb, nextVisited, result + nextDir);
      }
    }
  }
};

const dance = (map) => {
  const { mtx, start } = createMatrix(map);

  let maxResult = "";

  dance_(mtx, start, (result) => {
    if (result.length > maxResult.length) {
      maxResult = result;
    }
  });

  return maxResult;
};

const map4x4 =
  "\
↓↑↘→\n\
←↑S↗\n\
↖↓↓↙\n\
←↓→↘";

const map5x5 =
  "\
↖→↓←↗\n\
↑←↓→↓\n\
↑→S←↓\n\
↑←↓→↓\n\
↙→↑←↘";

log(dance(map4x4));
log(dance(map5x5));
