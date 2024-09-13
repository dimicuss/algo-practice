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

function readNumberArray() {
  return readLine().split(' ').map((str) => Number(str))
}

function f(n, k) {
  let first = 1
  let second = 1

  for (let i = 2; i <= n; i++) {
    const newFib = (first + second) % 10 ** k
    first = second
    second = newFib
  }

  return second
}

function solve() {
  let [n, k] = readNumberArray()

  console.log(f(n, k))
}


