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

function getMaximalWeight(bars, m) {
  let dp = Array.from({length: m + 1}).fill(0)

  for (let i = 1; i <= bars.length; i++) {
    const nextDp = Array.from({length: m + 1}).fill(0)

    for (let j = 1; j <= m; j++) {
      const weight = bars[i - 1] <= j ? bars[i - 1] : 0
      const previousWeight = dp[j - weight] || 0
      nextDp[j] = Math.max(dp[j], weight + previousWeight)
    }

    dp = nextDp
  }

  return dp[m]
}

function solve() {
  const [n, m] = readNumbers()
  const bars = readNumbers()

  console.log(
    getMaximalWeight(bars, m)
  )
}



