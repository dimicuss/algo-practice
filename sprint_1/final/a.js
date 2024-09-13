// https://contest.yandex.ru/contest/22450/run-report/116526342/

const readline = require('readline')

const reader = readline.createInterface({
  input: process.stdin
})

const lines = []

reader.on('line', line => {
  lines.push(line);
})

process.stdin.on('end', solve)

function readLine(line) {
  return lines[line]
}

function readNumber(line) {
  return Number(readLine(line))
}

function readNumberArray(line) {
  return readLine(line).split(' ').map((item) => Number(item))
}

const FREEHOUSE = 0

function getDistanceMap(streetLength, streetMap) {
  let maximalLeftFreeHouse = Infinity
  let minimalRightFreeHouse = -Infinity
  const leftDistanceMap = []
  const rightDistanceMap = []

  let leftToRightI = 0
  let rightToLeftI = streetLength - 1

  while (leftToRightI < streetLength && rightToLeftI >= 0) {
    const fromLeftHouse = streetMap[leftToRightI]
    const fromRightHouse = streetMap[rightToLeftI]

    if (fromLeftHouse === FREEHOUSE) {
      maximalLeftFreeHouse = leftToRightI
      leftDistanceMap[leftToRightI] = fromLeftHouse
    } else {
      leftDistanceMap[leftToRightI] = Math.abs(maximalLeftFreeHouse - leftToRightI)
    }

    if (fromRightHouse === FREEHOUSE) {
      minimalRightFreeHouse = rightToLeftI
      rightDistanceMap[rightToLeftI] = fromRightHouse
    } else {
      rightDistanceMap[rightToLeftI] = Math.abs(minimalRightFreeHouse - rightToLeftI)
    }

    leftToRightI++
    rightToLeftI--
  }

  const distanceMap = []

  for (let i = 0; i < streetLength; i++) {
    distanceMap[i] = Math.min(leftDistanceMap[i], rightDistanceMap[i])
  }

  return distanceMap
}

function solve() {
  let streetLength = readNumber(0)
  let streetMap = readNumberArray(1)

  const distanceMap = getDistanceMap(streetLength, streetMap).join(' ')

  console.log(distanceMap)
}

