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

function readNumberPair() {
  const [n, m] = readLine().split(' ')

  return [Number(n), Number(m)]
}

function solve() {
  let [v, e] = readNumberPair()

  const matrix = []

  for (let i = 0; i < v; i++) {
    matrix[i] = []
    for (let j = 0; j < v; j++) {
      matrix[i][j] = 0
    }
  }

  while (e--) {
    const [v1, v2] = readNumberPair()
    matrix[v1 - 1][v2 - 1] = 1
  }

  matrix.forEach((row) => {
    console.log(row.join(' '))
  })
}

