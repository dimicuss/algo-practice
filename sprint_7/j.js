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
const readNumber = () => {
  return Number(readLine())
}
const readNumbers = () => {
  return readLine().split(' ').map((str) => Number(str))
}


function getMaxSubSeq(items) {
  const dpByLength = Array.from({length: items.length}).fill(1)
  const previousMap = Array.from({length: items.length}, (_, i) => i)

  for (let c = 0; c < items.length; c++) {
    for (let p = 0; p < c; p++) {
      const previousLength = dpByLength[p] + 1

      if (items[p] < items[c] && previousLength >= dpByLength[c]) {
        dpByLength[c] = previousLength
        previousMap[c] = p
      }
    }
  }

  let maxLengthIndex
  let maxLength = -Infinity

  for (let i = 0; i < dpByLength.length; i++) {
    const length = dpByLength[i]
    if (length > maxLength) {
      maxLength = length
      maxLengthIndex = i
    }
  }

  const result = []

  if (maxLengthIndex !== undefined) {
    result.push(maxLengthIndex + 1)
    while (previousMap[maxLengthIndex] !== maxLengthIndex) {
      const previousIndex = previousMap[maxLengthIndex]
      result.push(previousIndex + 1)
      maxLengthIndex = previousIndex
    }
  }


  return result.reverse()
}

function solve() {
  const n = readNumber()
  const ratings = readNumbers()
  const result = getMaxSubSeq(ratings)

  console.log(result.length)
  console.log(result.join(' '))
}


