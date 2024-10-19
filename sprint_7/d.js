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


const mod = 1000000007

function fib(n) {
  if (n > 2) {
    let first = 1
    let second = 2

    for (let i = 3; i <= n; i++) {
      const next = (first + second) % mod
      first = second
      second = next
    }

    return second
  }

  if (n === 2) {
    return 2
  }

  return 1
}

function solve() {
  const n = readNumber()

  console.log(fib(n))
}


