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
  const _ = readNumber()
  const numbers = readNumberArray()

  numbers.sort((a, b) => {
    const ab = `${a}${b}`
    const ba = `${b}${a}`

    return ab > ba && -1 || ab < ba && 1 || 0
  })

  console.log(numbers.join(''))
}


