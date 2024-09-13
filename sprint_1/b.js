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
  const firstArr = readDigitArray(1);
  const secondArr = readDigitArray(2);

  const result = []

  for (let i = 0; i < count; i++) {
    result.push(
      firstArr[i],
      secondArr[i]
    )
  }

  console.log(result.join(' '));
} 
