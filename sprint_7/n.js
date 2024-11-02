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

const readLine = () => {
  return lines[line++]
}

const readNumber = () => {
  return Number(readLine())
}

const addPrice = (item, price) => ({
  ...item,
  price: item.price + price
})

const addDay = (item, day) => ({
  ...item,
  skipped: [day, ...item.skipped]
})

const byMinimalPrice = (prices, i = 0, c = 0, dp = new Map()) => {
  const key = `${i},${c}`

  if (dp.has(key)) {
    return dp.get(key)
  }

  if (i < prices.length) {
    const price = prices[i]
    const nextCoupons = price > 500 ? c + 1 : c

    const results = []

    if (c > 0) {
      results.push(addDay(byMinimalPrice(prices, i + 1, c - 1, dp), i + 1))
    }

    results.push(addPrice(byMinimalPrice(prices, i + 1, nextCoupons, dp), price))

    const result = results.sort((a, b) => a.price - b.price)[0]

    dp.set(key, result)

    return result
  }

  return {price: 0, skipped: []}
}

function solve() {
  let n = readNumber()
  const prices = []

  while (n--) {
    prices.push(readNumber())
  }

  const {price, skipped} = byMinimalPrice(prices)

  console.log(price, skipped.length)
  console.log(skipped.join(' '))
}

