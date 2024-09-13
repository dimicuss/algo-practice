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

function readNumber() {
  return Number(readLine())
}

function readNumberArray() {
  return readLine().split(' ').map((str) => Number(str))
}

function solve() {
  const n = readNumber()
  const lines = readNumberArray().sort((a, b) => a > b && -1 || a < b && 1 || 0)

  loop: for (let i = 0; i < n; i++) {
    let c = lines[i]

    for (j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (c < lines[j] + lines[k]) {
          console.log(c + lines[j] + lines[k])
          break loop
        }
      }
    }
  }
}


