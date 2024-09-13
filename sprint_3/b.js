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

const keyboardMap = {
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz'
}

function readKeyboard() {
  return readLine().split('').map((number) => keyboardMap[number])
}


function getAllSequences(seq, callback, n = 0, prefix = '') {
  const currentSeq = seq[n]

  if (currentSeq) {
    for (let i = 0; i < currentSeq.length; i++) {
      const char = currentSeq[i]
      getAllSequences(seq, callback, n + 1, prefix + char)
    }
  } else {
    callback(prefix)
  }
}

function solve() {
  const keys = readKeyboard()
  const results = []

  getAllSequences(keys, (result) => {
    results.push(result)
  })

  console.log(
    results.join(' ')
  )
}

