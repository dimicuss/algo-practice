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

function checkSubSeq(subSeq, str) {
  const callstack = [{seqI: 0, strI: 0}]

  while (callstack.length > 0) {
    const {seqI, strI} = callstack.pop()
    const subChar = subSeq[seqI]

    for (let i = strI; i < str.length; i++) {
      const currentChar = str[i]

      if (currentChar === subChar) {
        if (seqI < subSeq.length - 1) {
          callstack.push({seqI: seqI + 1, strI: i + 1})
          break
        } else {
          return true
        }
      }
    }
  }

  return false
}

function solve() {
  const subSeq = readLine()
  const str = readLine()

  console.log(
    checkSubSeq(subSeq, str) ? 'True' : 'False'
  )
}

