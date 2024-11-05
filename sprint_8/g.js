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

const readNumbers = () => readLine().split(' ').map((str) => Number(str))

const indexOfTempSub = (temps, pattern, start = 0) => {
  const edge = temps.length - pattern.length + 1

  mainLoop: for (let i = start; i < edge; i++) {
    const constant = pattern[0] - temps[i]

    for (let j = 0; j < pattern.length; j++) {
      if (pattern[j] - constant !== temps[i + j]) {
        continue mainLoop
      }
    }

    return i
  }

  return -1
}

const allIndexesOfTempSub = (temps, pattern) => {
  const result = []
  let start = 0

  while (true) {
    const index = indexOfTempSub(temps, pattern, start)

    if (index > -1) {
      result.push(index + 1)
      start = index + 1
    } else {
      break
    }
  }

  return result
}

function solve() {
  readNumbers()
  const temps = readNumbers()
  readNumbers()
  const pattern = readNumbers()

  console.log(allIndexesOfTempSub(temps, pattern).join(' '))
}
