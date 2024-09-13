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

function countLongestSub(str) {
  let maxCount = 0

  for (let i = 0; i < str.length; i++) {
    let stash = new Set()

    for (let j = i; j < str.length; j++) {
      const char = str[j]
      if (!stash.has(char)) {
        stash.add(char)
      } else {
        break
      }
    }

    maxCount = Math.max(stash.size, maxCount)
  }

  return maxCount
}

function solve() {
  const str = readLine()

  console.log(countLongestSub(str))
}

