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

const readLine = () => {
  return lines[line++]
}

const readNumber = () => Number(readLine())

const getMaxRepeatingString = (strings) => {
  const countingMap = new Map()

  for (const string of strings) {
    countingMap.set(string, (countingMap.get(string) || 0) + 1)
  }

  let minPair

  for (const pair of countingMap) {
    const [string, count] = pair
    if (minPair === undefined) {
      minPair = pair
    } else {
      const [minString, minCount] = minPair

      if (count > minCount || count === minCount && string < minString) {
        minPair = pair
      }
    }
  }

  return minPair?.[0]
}

function solve() {
  let n = readNumber()
  const strings = []

  while (n--) {
    strings.push(readLine())
  }

  console.log(getMaxRepeatingString(strings))
}


