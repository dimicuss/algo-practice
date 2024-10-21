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

const readNumbers = () => {
  return readLine().split(' ').map((str) => Number(str))
}

const readRow = () => {
  return [-Infinity, ...readLine().split('').map((str) => Number(str))]
}

function readMatrix() {
  let [n, m] = readNumbers()

  const matrix = []

  while (n--) {
    matrix.push(readRow())
  }

  matrix.push(Array.from({length: m + 1}).fill(-Infinity))

  console.log(matrix)

  return matrix
}


function findMaximalPath(matrix) {
  for (let i = matrix.length - 2; i >= 0; i--) {
    const row = matrix[i]

    for (let j = 1; j < row.length; j++) {
      console.log(row[j])
    }
  }
}


function solve() {
  const matrix = readMatrix()
  findMaximalPath(matrix)
}


