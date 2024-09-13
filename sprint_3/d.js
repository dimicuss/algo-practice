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

const sortFn = (a, b) => a > b && 1 || a < b && -1 || 0

function find(items, itemToFind, left, right) {
  const mid = Math.floor((left + right) / 2)

  if (left < right) {
    const item = items[mid]
    const previousItem = items[mid - 1]

    if (itemToFind <= item && (previousItem === undefined || previousItem < itemToFind)) {
      return mid
    } if (itemToFind > item) {
      return find(items, itemToFind, mid + 1, right)
    }

    return find(items, itemToFind, left, mid)
  }

  return -1
}

function solve() {
  const n = readNumber()
  const childCapacities = readNumberArray().sort(sortFn)
  const m = readNumber()
  const cookiesFatness = readNumberArray().sort(sortFn)

  let satisfiedChildren = 0

  for (let i = 0; i < n; i++) {
    const childCapacity = childCapacities[i]

    const index = find(cookiesFatness, childCapacity, 0, m)

    if (index > -1) {
      cookiesFatness[index] = 0
      satisfiedChildren++
    }
  }

  console.log(satisfiedChildren)
}

