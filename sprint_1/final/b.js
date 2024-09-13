// https://contest.yandex.ru/contest/22450/run-report/116518254/

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

function readStringArray(line) {
  return readLine(line).split('')
}

const PLAYERS = 2

function countPoints(minimalPressCount, keyboard) {
  const hash = {}
  let points = 0

  for (let i = 0; i < keyboard.length; i++) {
    const row = keyboard[i]

    for (let j = 0; j < row.length; j++) {
      const key = row[j]

      if (key !== '.') {
        const keyCount = hash[key] || 0
        hash[key] = keyCount + 1
      }
    }
  }


  for (let key in hash) {
    const count = hash[key]

    if (count <= minimalPressCount * PLAYERS) {
      points++
    }
  }

  return points
}

function solve() {
  const minimalPressCount = readNumber(0)
  const keyboard = [
    readStringArray(1),
    readStringArray(2),
    readStringArray(3),
    readStringArray(4)
  ]

  const points = countPoints(minimalPressCount, keyboard)

  console.log(points)
}

