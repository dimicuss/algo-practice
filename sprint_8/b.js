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


const papersPlease = (a, b) => {
  if (Math.abs(a.length - b.length) === 1) {
    const [min, max] = [a, b].sort((a, b) => a.length - b.length)

    let i = 0
    let j = 0

    while (i < max.length && j < min.length) {
      if (max[i] !== min[j]) {
        if (i === j) {
          i++
        } else {
          return false
        }
      } else {
        i++
        j++
      }
    }

    return true
  }

  if (a.length === b.length) {
    let onceFailed = false

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        if (!onceFailed) {
          onceFailed = true
        } else {
          return false
        }
      }
    }

    return true
  }

  return false
}

function solve() {
  const a = readLine()
  const b = readLine()

  console.log(papersPlease(a, b) ? 'OK' : 'FAIL')
}
