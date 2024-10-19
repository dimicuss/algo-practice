const readline = require('readline')

const reader = readline.createInterface({
  input: process.stdin
})

let line = 0
const lines = []

reader.on('line', line => {
  lines.push(line);
})

process.stdin.on('end', solve)

function readLine() {
  return lines[line++]
}

const readNumber = () => {
  return Number(readLine())
}

const readTreasure = () => {
  const [cost, weight] = readLine().split(' ')
  return {cost: Number(cost), weight: Number(weight)}
}

function getMaximumTreasureCost(treasures, m) {
  let result = 0
  let w = m

  const sortedTreasures = [...treasures].sort((a, b) => b.cost - a.cost)

  for (const treasure of sortedTreasures) {
    const weight = Math.min(treasure.weight, w)
    if (weight > 0) {
      result += treasure.cost * weight
      w -= weight
    } else {
      return result
    }
  }

  return result
}

function solve() {
  const m = readNumber()
  let n = readNumber()
  const treasures = []
  while (n--) {
    treasures.push(readTreasure())
  }

  console.log(getMaximumTreasureCost(treasures, m))
}


