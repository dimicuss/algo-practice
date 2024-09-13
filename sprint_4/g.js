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

const sortFn = (a, b) => a - b

function readLine() {
  return lines[line++]
}

function readNumber() {
  return Number(readLine())
}

function readNumberArray() {
  return readLine().split(' ').map((str) => Number(str))
}

function sum4(arrToSort, n, sumToFind) {
  const arr = [...arrToSort].sort(sortFn)
  const result = new Set()

  for (let i = 0; i < n - 3; i++) {
    const a = arr[i]

    for (let j = i + 1; j < n - 2; j++) {
      const b = arr[j]

      let left = j + 1
      let right = n - 1

      while (left < right) {

        const c = arr[left], d = arr[right]
        const sum = a + b + c + d

        if (sum > sumToFind) {
          right--
        } else if (sum < sumToFind) {
          left++
        } else {
          result.add([a, b, c, d].join(' '))
          left++
          right--
        }
      }
    }
  }

  return [...result.values()];
}

function solve() {
  const n = readNumber()
  const a = readNumber()
  const arr = readNumberArray()

  const results = sum4(arr, n, a)
  console.log(results.length)
  results.forEach((result) => {
    console.log(result)
  })
}
