const readline = require('readline')

const reader = readline.createInterface({
  input: process.stdin
})

let line = 0
const lines = []

reader.on('line', line => {
  lines.push(line)
})

process.stdin.on('end', solve)

function readLine() {
  return lines[line++]
}

function readNumber() {
  return Number(readLine())
}

function readCoords() {
  const [x, y] = readLine().split(' ').map((str) => Number(str))
  return {x, y}
}

function getDistance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

const minimalDistance = 20

function createCoordsMap(coords) {
  const result = new Map()

  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i]

    if (!result.has(coord.x)) {
      result.set(coord.x, new Map())
    }

    const yCountMap = result.get(coord.x)
    yCountMap.set(coord.y, (yCountMap.get(coord.y) || 0) + 1)
  }

  return result
}

function getExitWithMaximalStops(exits, stops) {
  const stopCoordsMap = createCoordsMap(stops)
  let result = [undefined, -Infinity]

  for (let i = 0; i < exits.length; i++) {
    let stopsCount = 0
    const exit = exits[i]
    const minX = exit.x - minimalDistance
    const maxX = exit.x + minimalDistance
    const minY = exit.y - minimalDistance
    const maxY = exit.y + minimalDistance

    for (let x = minX; x <= maxX; x++) {
      const yCountMap = stopCoordsMap.get(x)
      if (yCountMap) {
        for (let y = minY; y <= maxY; y++) {
          const yCount = yCountMap.get(y)
          if (yCount !== undefined && getDistance(exit, {x, y}) <= minimalDistance) {
            stopsCount = stopsCount + yCount
          }
        }
      }
    }

    if (result[1] < stopsCount) {
      result = [i + 1, stopsCount]
    }
  }

  return result[0]
}

function solve() {
  let n = readNumber()
  const exits = []

  while (n--) {
    exits.push(readCoords())
  }

  let m = readNumber()
  const stops = []

  while (m--) {
    stops.push(readCoords())
  }

  console.log(getExitWithMaximalStops(exits, stops))
}

