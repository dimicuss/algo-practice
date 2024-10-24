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

const readNumbers = () => {
  return readLine().split(' ').map((str) => Number(str))
}

function getLCS(a, b) {
  const dp = Array.from({length: a.length + 1}, () => Array.from({length: b.length + 1}).fill(0))

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
      }
    }
  }

  const aLCS = []
  const bLCS = []

  let i = a.length
  let j = b.length

  while (dp[i][j] !== 0) {
    if (a[i - 1] === b[j - 1]) {
      aLCS.push(i)
      bLCS.push(j)
      i--
      j--
    } else if (dp[i][j] === dp[i - 1][j]) {
      i--
    } else if (dp[i][j] === dp[i][j - 1]) {
      j--
    }
  }

  aLCS.reverse()
  bLCS.reverse()

  return {
    aLCS,
    bLCS
  }
}

function solve() {
  readNumber()
  const a = readNumbers()
  readNumber()
  const b = readNumbers()

  const {aLCS, bLCS} = getLCS(a, b)

  console.log(aLCS.length)
  console.log(aLCS.join(' '))
  console.log(bLCS.join(' '))
}


