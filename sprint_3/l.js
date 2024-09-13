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

function find(items, itemToFind, left, right) {
  const mid = Math.floor((left + right) / 2)

  if (left < right) {
    const item = items[mid]
    const previousItem = items[mid - 1]

    if (itemToFind <= item && (previousItem === undefined || previousItem < itemToFind)) {
      return mid + 1
    } if (itemToFind > item) {
      return find(items, itemToFind, mid + 1, right)
    }

    return find(items, itemToFind, left, mid)
  }

  return -1
}

function solve() {
  const n = readNumber()
  const items = readNumberArray()
  const cost = readNumber()

  console.log(
    [
      find(items, cost, 0, n),
      find(items, cost * 2, 0, n),
    ].join(' ')
  )
}

