const dirDegMap = {
    "→": 0,
    "↗": 45,
    "↑": 90,
    "↖": 135,
    "←": 180,
    "↙": 225,
    "↓": 270,
    "↘": 315,
};

const degCoordMap = {
    0: [1, 0],
    45: [1, 1],
    90: [0, 1],
    135: [-1, 1],
    180: [-1, 0],
    225: [-1, -1],
    270: [0, -1],
    315: [1, -1],
};

const mod = (n, m) => {
    const result = n < 0 ? Math.abs(m + n) % m : n % m;
    return result;
};

const createCoordGetter = (directions) => (dir) => {
    const dirDeg = dirDegMap[dir];

    const result = directions.map(
        (incr) => degCoordMap[mod(dirDeg + incr, 360)],
    );

    return result;
};

const getNextCoords = createCoordGetter([90, 45, 0, -45, -90]);
const getRestrictedCoords = createCoordGetter([-45, 0, 45]);

console.log(
    Object.keys(dirDegMap).map((dir) => [dir, getNextCoords(dir).join("|")]),
);

console.log(
    Object.keys(dirDegMap).map((dir) => [
        dir,
        getRestrictedCoords(dir).join("|"),
    ]),
);
