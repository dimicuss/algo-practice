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
  let n = readNumber()
  const items = readNumberArray()

  let i = n - 1
  let changed = false
  let changedOnce = false

  while (i) {
    for (let j = 0; j < i; j++) {
      const a = items[j]
      const b = items[j + 1]

      if (a > b) {
        items[j + 1] = a
        items[j] = b
        changed = true
        changedOnce = true
      }
    }
    if (changed) {
      console.log(items.join(' '))
    }
    changed = false
    i--
  }

  if (!changedOnce) {
    console.log(items.join(' '))
  }
}


