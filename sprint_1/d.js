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

  parentLoop: for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const capA = caps[i]
      const capB = caps[j]

      if (capA + capB === sum) {
        result.push(capA, capB)
        break parentLoop
      }
    }
  }

  if (result.length === 0) {
    result.push('None')
  }

  console.log(result.join(' '));
}

