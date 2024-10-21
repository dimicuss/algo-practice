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
  return [-1, ...readLine().split('').map((str) => Number(str))]
}

function readMatrix() {
  let [n, m] = readNumbers()

  const matrix = []

  while (n--) {
    matrix.push(readRow())
  }

  matrix.push(Array.from({length: m + 1}).fill(-1))

  return matrix
}


function findMaxPointsPath(matrix) {
  const dp = matrix.map((row) => row.map((value) => value > -1 ? 0 : value))

  for (let i = dp.length - 2; i >= 0; i--) {
    for (let j = 1; j < dp[i].length; j++) {
      const maximalSibling = Math.max(dp[i][j - 1], dp[i + 1][j])
      dp[i][j] = (maximalSibling > -1 ? maximalSibling : 0) + matrix[i][j]
    }
  }

  let row = 0
  let cell = dp[0].length - 1
  const result = []

  while (true) {
    const [direction, newRow, newCell, maxValue] = [
      ['R', row, cell - 1, dp[row][cell - 1]],
      ['U', row + 1, cell, dp[row + 1][cell]]
    ].sort((a, b) => b[3] - a[3])[0]

    if (maxValue === -1) {
      break
    }

    row = newRow
    cell = newCell
    result.push(direction)
  }


  return {
    maxPoints: dp[0][dp[0].length - 1],
    path: result.reverse().join('')
  }
}


function solve() {
  const matrix = readMatrix()
  const {maxPoints, path} = findMaxPointsPath(matrix)
  console.log(maxPoints)
  console.log(path)
}


