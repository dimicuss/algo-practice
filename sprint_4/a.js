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

function solve() {
  let n = readNumber()
  const map = new Map()

  while (n--) {
    const key = readLine()
    const value = map.get(key) || 0
    map.set(key, value + 1)
  }

  for (const [key] of map) {
    console.log(key)
  }
}


