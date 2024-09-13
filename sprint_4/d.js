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
  const a = readNumber()
  const m = readNumber()
  const s = readLine()
  const n = s.length

  let result = 0
  let aPower = 1

  for (let i = n - 1; i >= 0; i--) {
    result += s[i].charCodeAt() * aPower % m
    aPower = aPower * a % m
  }

  console.log(result % m)
}

