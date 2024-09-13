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

function genBraces(n, o = 0, c = 0, result = '') {
  if (o + c < 2 * n) {
    if (o < n) {
      genBraces(n, o + 1, c, result + '(')
    }

    if (c < o) {
      genBraces(n, o, c + 1, result + ')')
    }
  } else {
    console.log(result)
  }
}

function solve() {
  const n = readNumber()
  genBraces(n)
}

