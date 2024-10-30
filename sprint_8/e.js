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

function readStringNumber() {
  const [t, k] = readLine().split(' ')

  return [t, Number(k)]
}

function insert(string, strings) {
  let result = ''

  for (let i = 0; i <= string.length; i++) {
    if (strings[i] !== undefined) {
      result = result + strings[i]
    }

    result = result + (string[i] || '')
  }

  return result
}

function solve() {
  const string = readLine()
  let n = readNumber()
  const strings = []

  while (n--) {
    const [t, k] = readStringNumber()
    strings[k] = t
  }

  console.log(insert(string, strings))
}

