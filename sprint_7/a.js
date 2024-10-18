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

const getMaxProfit = (prices) => {
  let result = 0
  let state = 'buy'

  for (let i = 0; i < prices.length; i++) {
    if (state === 'buy') {
      const price = prices[i]
      const nextPrice = prices[i + 1]

      if (price < nextPrice && nextPrice !== undefined) {
        result -= price
        state = 'sell'
      }
    } else {
      const price = prices[i]
      const nextPrice = prices[i + 1]

      if (price > nextPrice || nextPrice === undefined) {
        result += price
        state = 'buy'
      }
    }
  }

  return result
}

function solve() {
  const n = readNumber()
  const prices = readNumbers(n)

  console.log(getMaxProfit(prices))
}


