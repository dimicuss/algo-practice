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

function countAllTreePermutations(n) {
  if (n < 2) {
    return 1
  }

  if (n === 2) {
    return 2
  }

  let result = 0

  for (let i = 0; i < n; i++) {
    result += countAllTreePermutations(i) * countAllTreePermutations(n - i - 1)
  }

  return result
}

function solve() {
  const n = readNumber()
  console.log(countAllTreePermutations(n))
}


