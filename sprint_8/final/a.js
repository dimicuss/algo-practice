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

const readLines = () => {
  let n = Number(readLine())
  const result = []

  while (n--) {
    result.push(readLine())
  }

  return result
}


const digitMap = {1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 0: true}
const isDigit = (char) => digitMap[char] || false

const unpackString = (string) => {
  const callStack = [{multiplier: 1, string: ''}]
  let i = 0
  let result = ''
  let currentDigit = ''

  while (i <= string.length) {
    const char = string[i]

    if (char === undefined) {
      result = callStack.pop().string
    } else if (isDigit(char)) {
      currentDigit += char
    } else if (char === '[') {
      callStack.push({
        multiplier: Number(currentDigit),
        string: ''
      })
      currentDigit = ''
    } else if (char === ']') {
      const braceToClose = callStack.pop()
      const currentBrace = callStack[callStack.length - 1]
      currentBrace.string += braceToClose.string.repeat(braceToClose.multiplier)
    } else {
      const currentBrace = callStack[callStack.length - 1]
      currentBrace.string += char
    }

    i++
  }

  return result
}

const maxCommonPrefix = (strings) => {
  let i = 0
  let result = ''

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

    result += previousSymbol
    i++
  }

  return result
}

function solve() {
  const packedStrings = readLines()

  console.log(
    maxCommonPrefix(packedStrings.map(unpackString))
  )
}
