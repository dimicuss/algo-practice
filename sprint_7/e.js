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

function getMaximumBills(currencies, sum, dp) {
  if (dp[sum] !== undefined) {
    return dp[sum]
  }

  if (sum === 0) {
    dp[sum] = 0
    return 0
  }

  let result = Infinity

  for (const currency of currencies) {
    if (currency <= sum) {
      const nextResult = getMaximumBills(currencies, sum - currency, dp)
      result = Math.min(result, nextResult + 1)
    }
  }

  dp[sum] = result

  return result
}

function solve() {
  const x = readNumber()
  const k = readNumber()
  const currencies = readNumbers(k).sort((a, b) => b - a)
  const dp = Array.from({length: x + 1}).fill(undefined)
  const result = getMaximumBills(currencies, x, dp)
  console.log(result === Infinity ? -1 : result)
}


