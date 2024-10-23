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

const readNumbers = () => {
  return readLine().split(' ').map((str) => Number(str))
}

const initial = () => ({calories: 0, previous: []})

function getMaximalByCalories(things, m) {
  let dp = Array.from({length: m + 1}, initial)

  for (let i = 1; i <= things.length; i++) {
    const nextDp = Array.from({length: m + 1}, initial)

    for (let j = 1; j <= m; j++) {
      const thing = things[i - 1]
      const previousBag = dp[j]
      const siblingBag = dp[j - thing.weight]
      const bag = thing.weight <= j
        ? {calories: thing.calories, previous: [thing.i]}
        : {calories: 0, previous: []}

      if (siblingBag) {
        bag.calories += siblingBag.calories
        bag.previous = [...bag.previous, ...siblingBag.previous]
      }

      const maximalBag = [previousBag, bag].sort((a, b) => b.calories - a.calories)[0]

      nextDp[j] = maximalBag
    }

    dp = nextDp
  }

  return dp[m]
}

function solve() {
  let [n, m] = readNumbers()
  const things = []

  for (let i = 1; i <= n; i++) {
    const [weight, calories] = readNumbers()
    things.push({calories, weight, i})
  }

  const {previous} = getMaximalByCalories(things, m)

  console.log(previous.length)
  console.log(previous.join(' '))
}


