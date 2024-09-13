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

function solve() {
  const aLine = readLine()
  const bLine = readLine()
  const abHash = new Map()
  const baHash = new Map()

  if (aLine.length !== bLine.length) {
    console.log('NO')
    return
  }

  for (let i = 0; i < aLine.length; i++) {
    const aChar = aLine[i]
    const bChar = bLine[i]

    const bHashedChar = abHash.get(aChar)
    const aHashedChar = baHash.get(bChar)

    if (bHashedChar) {
      if (bChar !== bHashedChar) {
        console.log('NO')
        return
      }
    } else {
      abHash.set(aChar, bChar)
    }

    if (aHashedChar) {
      if (aChar !== aHashedChar) {
        console.log('NO')
        return
      }
    } else {
      baHash.set(bChar, aChar)
    }
  }

  console.log('YES')
}
