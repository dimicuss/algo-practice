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

function f(n) {
  if (n <= 1) {
    return 1
  }

  return f(n - 1) + f(n - 2)
}

function solve() {
  let n = readNumber()

  console.log(f(n))
}


