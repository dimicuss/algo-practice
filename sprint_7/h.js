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
  return [0, ...readLine().split('').map((str) => Number(str))]
}

function readMatrix() {
  let [n, m] = readNumbers()

  const matrix = []

  while (n--) {
    matrix.push(readRow())
  }

  matrix.push(Array.from({length: m + 1}).fill(0))

  return matrix
}


function findMaximalPath(matrix) {
  const dp = matrix.map((row) => row.map(() => 0))

  for (let i = dp.length - 2; i >= 0; i--) {
    for (let j = 1; j < dp[i].length; j++) {
      dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]) + matrix[i][j]
    }
  }

  const lastRow = dp[0]

  return lastRow[lastRow.length - 1]
}


function solve() {
  const matrix = readMatrix()
  console.log(findMaximalPath(matrix))
}


