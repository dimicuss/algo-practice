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

function removeCrossings(rangeList) {
  const result = []
  const rangeListSorted = [...rangeList].sort(([a], [b]) => a > b && -1 || a < b && 1 || 0)

  let currentRange = rangeListSorted.pop()

  while (rangeListSorted.length > 0) {
    const [currentRangeStart, currentRangeEnd] = currentRange
    const [rangeStart, rangeEnd] = rangeListSorted[rangeListSorted.length - 1]

    if (currentRangeEnd >= rangeStart) {
      currentRange = [currentRangeStart, Math.max(rangeEnd, currentRangeEnd)]
      rangeListSorted.pop()
    } else {
      result.push(currentRange)
      currentRange = rangeListSorted.pop()
    }
  }

  if (currentRange) {
    result.push(currentRange)
  }

  return result
}

function solve() {
  let n = readNumber()
  const fBeds = []

  while (n--) {
    fBeds.push(readNumberArray(fBeds))
  }

  removeCrossings(fBeds).forEach((range) => {
    console.log(range.join(' '))
  })
}


