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

const readNumber = () => {
  return Number(readLine())
}

const readNumbers = (n) => {
  return readLine().split(' ').slice(0, n).map((str) => Number(str))
}

function countCombinations(currencies, sum, index = 0) {
  if (sum === 0) {
    return 0
  }

  let result = 0

  for (let i = index; i < currencies.length; i++) {
    const currency = currencies[i]
    const diff = sum - currency

    if (diff === 0) {
      result++
    } else if (diff > 0) {
      result += countCombinations(currencies, diff, i)
    }
  }

  return result
}

function solve() {
  const x = readNumber()
  const k = readNumber()
  const currencies = readNumbers(k)

  console.log(countCombinations(currencies, x))
}

