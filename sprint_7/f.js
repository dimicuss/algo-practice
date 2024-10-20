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

const readNumbers = (n) => {
  return readLine().split(' ').slice(0, n).map((str) => Number(str))
}

const mod = 1000000007

function ladder(n, k) {
  const dp = [1, 1]

  for (let i = 0; i < n; i++) {
    if (dp[i] === undefined) {
      let result = 0

      let j = Math.max(i - k, 0)

      while (j < i) {
        result = (result + dp[j]) % mod
        j++
      }

      dp[i] = result
    }
  }

  return dp[dp.length - 1]
}

function solve() {
  const [n, k] = readNumbers()

  console.log(ladder(n, k))
}


