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

function lvnstn(a, b) {
  let dp = Array.from({length: b.length + 1}, (_, i) => i)

  for (let i = 1; i <= a.length; i++) {
    const newDp = Array.from({length: b.length + 1}).fill(i)

    for (let j = 1; j <= b.length; j++) {
      newDp[j] = Math.min(
        newDp[j - 1] + 1,
        dp[j] + 1,
        dp[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      )
    }

    dp = newDp
  }

  return dp[b.length]
}

function solve() {
  const a = readLine()
  const b = readLine()

  console.log(lvnstn(a, b))
}


