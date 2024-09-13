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
  const clothes = readNumberArray()
  const hash = {0: '', 1: '', 2: ''}

  for (let i = 0; i < n; i++) {
    const cloth = clothes[i]
    hash[cloth] += cloth + ' '
  }

  console.log([hash[0].trim(), hash[1].trim(), hash[2].trim()].filter(Boolean).join(' '))
}


