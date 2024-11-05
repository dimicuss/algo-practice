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

const getCoupons = (price) => price > 500 ? 1 : 0

const minBy = (items, key) => items.reduce((result, item) => {
  if (key(item) < result.value) {
    result.value = key(item)
    result.item = item
  }

  return result
}, {value: Infinity, item: undefined}).item

const getPrice = ({price}) => price

const byMinimalPrice = (prices) => {
  let dp = []
  const initialPrice = prices[0]

  dp[getCoupons(initialPrice)] = {price: prices[0], prev: undefined, i: 0}

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i]
    const priceCoupons = getCoupons(price)

    const nextDp = []

    for (let j = 0; j < dp.length; j++) {
      const prev = dp[j]

      if (prev !== undefined) {
        const newPrice = {price: prev.price + price, prev, i}

        nextDp[j + priceCoupons] = newPrice

        if (j > 0) {
          const prevJ = nextDp[j - 1]
          const newPrice = {price: prev.price, prev, i}
          const toCompare = [newPrice]

          if (prevJ) {
            toCompare.push(prevJ)
          }

          nextDp[j - 1] = minBy(toCompare, getPrice)
        }
      }
    }

    dp = nextDp
  }

  const minimalPrice = minBy(dp, getPrice)

  if (minimalPrice) {
    let skipped = []
    let current = minimalPrice

    while (current && current.prev) {
      if (current.price === current.prev.price) {
        skipped.push(current.i + 1)
      }

      current = current.prev
    }

    return {
      price: minimalPrice.price,
      skipped: skipped.reverse()
    }
  }

  return {
    price: undefined,
    skipped: []
  }
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

