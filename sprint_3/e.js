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

function readNumberArray() {
  return readLine().split(' ').map((str) => Number(str))
}

const sortFn = (a, b) => a > b && -1 || a < b && 1 || 0

function solve() {
  let [_, k] = readNumberArray()
  const prices = readNumberArray().sort(sortFn)

  let buyedHouses = 0

  while (prices.length && k) {
    const minimalPrice = prices.pop()
    k -= minimalPrice

    if (k >= 0) {
      buyedHouses++
    }
  }

  console.log(buyedHouses)
}


