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

function readNumber() {
  return Number(readLine())
}

function readNumberArray() {
  return readLine().split(' ').map((str) => Number(str))
}

function solve() {
  const n = readNumber()
  const students = readNumberArray()
  const top = readNumber()

  const hash = new Map()

  for (let i = 0; i < n; i++) {
    const id = students[i]
    const counter = hash.get(id) || 0
    hash.set(id, counter + 1)
  }

  const sortedIds = [...hash.entries()].sort(([aId, a], [bId, b]) => {
    if (a > b) {
      return -1
    }

    if (a < b) {
      return 1
    }

    if (aId > bId) {
      return 1
    }

    if (aId < bId) {
      return -1
    }

    return 0
  })

  const result = []

  for (let i = 0; i < top; i++) {
    const pair = sortedIds[i]
    if (pair) {
      result.push(pair[0])
    }
  }

  console.log(
    result.join(' ')
  )
}


