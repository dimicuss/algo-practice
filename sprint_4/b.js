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

function readNumbers() {
  return readLine().split(' ').map((str) => Number(str))
}

function readNumber() {
  return Number(readLine())
}

function solve() {
  const n = readNumber()
  const results = readNumbers()

  let maximalSubArray = 0
  let partialSum = 0
  const hash = new Map([
    [0, [-1]]
  ])

  for (let i = 0; i < n; i++) {
    const result = results[i]

    if (result === 0) {
      partialSum--
    }

    if (result === 1) {
      partialSum++
    }

    if (hash.get(partialSum) === undefined) {
      hash.set(partialSum, [])
    }

    hash.get(partialSum).push(i)
  }

  for (const [_, value] of hash) {
    maximalSubArray = Math.max(maximalSubArray, value[value.length - 1] - value[0])
  }

  console.log(maximalSubArray)
}

