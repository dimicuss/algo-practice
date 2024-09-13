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

function readStringArray() {
  return readLine().split(' ')
}

function transponate(matrix, n, m) {
  const result = []
  for (let i = 0; i < m; i++) {
    if (!result[i]) {
      result[i] = []
    }

    for (let j = 0; j < n; j++) {
      result[i][j] = matrix[j][i]
    }
  }

  return result
}

function solve() {
  let n = readNumber()
  let m = readNumber()

  const matrix = []

  for (let i = 0; i < n; i++) {
    matrix.push(readStringArray())
  }

  transponate(matrix, n, m).forEach((row) => {
    console.log(row.join(' '))
  })
}

