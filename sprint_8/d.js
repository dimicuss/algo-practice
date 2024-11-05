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

const maxCommonPrefix = (strings) => {
  let i = 0

  mainLoop: while (true) {
    const previousSymbol = strings[0][i]

    if (previousSymbol === undefined) {
      break mainLoop
    }

    for (let j = 1; j < strings.length; j++) {
      const nextSymbol = strings[j][i]
      if (previousSymbol !== nextSymbol || nextSymbol === undefined) {
        break mainLoop
      }
    }

    i++
  }

  return i
}

function solve() {
  let n = readNumber()
  const strings = []

  while (n--) {
    strings.push(readLine())
  }

  console.log(maxCommonPrefix(strings))
}


