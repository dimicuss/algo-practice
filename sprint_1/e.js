const readline = require('readline')

const reader = readline.createInterface({
  input: process.stdin
})

const lines = []

reader.on('line', line => {
  lines.push(line);
})

process.stdin.on('end', solve)

function readLine(line) {
  return lines[line]
}

function readNumber(line) {
  return Number(readLine(line))
}

function readDigitArray(line) {
  return readLine(line).split(' ').map((stringDigit) => Number(stringDigit))
}

function solve() {
  const count = readNumber(0);
  const caps = readDigitArray(1);
  const sum = readNumber(2);
  const result = []
  const store = new Set()

  for (let i = 0; i < count; i++) {
    const capA = caps[i]
    const capToFind = sum - capA

    if (store.has(capToFind)) {
      result.push(capA, capToFind)
      break
    } else {
      store.add(capA)
    }
  }

  if (result.length === 0) {
    result.push('None')
  }

  console.log(result.join(' '));
}

