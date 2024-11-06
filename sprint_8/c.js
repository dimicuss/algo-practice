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

const polindromize = (string) => {
  const map = new Map()
  const left = []
  const middle = []

  for (let i = 0; i < string.length; i++) {
    const char = string[i]
    map.set(char, (map.get(char) || 0) + 1)
  }

  for (const [char, count] of map) {
    let div = Math.floor(count / 2)
    const mod = count % 2

    while (div--) {
      left.push(char)
    }

    if (mod) {
      middle.push(char)
    }
  }

  left.sort((a, b) => a < b && -1 || a > b && 1 || 0)
  middle.sort((a, b) => a < b && -1 || a > b && 1 || 0)

  let result = ''
  let right = ''

  for (let i = 0; i < left.length; i++) {
    result = result + left[i]
    right = left[i] + right
  }

  return result + (middle[0] || '') + right
}

function solve() {
  const string = readLine()

  console.log(polindromize(string))
}



