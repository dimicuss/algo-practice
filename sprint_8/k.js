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

const removeOdds = (str) => {
  let result = ''
  for (const char of str) {
    if (char.charCodeAt() % 2 === 0) {
      result += char
    }
  }

  return result
}

const compareStrings = (a, b) => {
  const aOddless = removeOdds(a)
  const bOddless = removeOdds(b)

  return aOddless < bOddless && -1 || aOddless > bOddless && 1 || 0
}

function solve() {
  const a = readLine()
  const b = readLine()

  console.log(compareStrings(a, b))
}
