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

function readNumberArray() {
  return readLine().split(' ').map((str) => Number(str))
}

function getBlocksCount(items, n) {
  let result = 0
  let firstInBlock = 0
  const sortedArray = []

  for (let i = 0; i < n; i++) {
    sortedArray.push(items[i])
    sortedArray.sort((a, b) => a > b && 1 || a < b && -1 || 0)

    if (sortedArray[firstInBlock] === firstInBlock && sortedArray[sortedArray.length - 1] === i) {
      firstInBlock = i + 1
      result++
    }
  }

  return result
}

function solve() {
  const n = readNumber()
  const items = readNumberArray()

  console.log(getBlocksCount(items, n))
}


