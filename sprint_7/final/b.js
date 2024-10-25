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

const readNumber = () => Number(readLine())
const readNumbers = () => readLine().split(' ').map((str) => Number(str))

function findHalfSumSubArray(numbers) {
  const halfSum = numbers.reduce((sum, num) => sum + num, 0) / 2

  let dp = Array.from(halfSum + 1).fill(false)

  dp[0] = true

  for (let i = 0; i < numbers.length; i++) {
    const nextDp = Array.from(halfSum + 1).fill(false)
    nextDp[0] = true

    for (let j = 1; j <= halfSum; j++) {
      if (j < numbers[i]) {
        nextDp[j] = dp[j]
      } else {
        nextDp[j] = dp[j] || dp[j - numbers[i]]
      }
    }

    dp = nextDp
  }

  return dp[halfSum]
}

function solve() {
  readNumber()
  const numbers = readNumbers()

  console.log(findHalfSumSubArray(numbers) ? 'True' : 'False')
}


