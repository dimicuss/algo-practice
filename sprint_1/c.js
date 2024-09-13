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
  const dimensions = readDigitArray(1);
  const window = readNumber(2);

  const resultCount = count - window + 1
  const result = []
  let windowSum = 0

  for (let i = 0; i < resultCount; i++) {
    if (i === 0) {
      for (let j = i; j < i + window; j++) {
        windowSum += dimensions[j]
      }
    } else {
      windowSum -= dimensions[i - 1]
      windowSum += dimensions[i + window - 1]
    }

    result.push(windowSum / window)
  }

  console.log(result.join(' '));
}
