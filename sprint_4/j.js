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

function genMap(arr, n) {
  const map = new Map()

  for (let i = 0; i < n; i++) {
    const char = arr[i]

    if (!map.has(char)) {
      map.set(char, [[]])
    }

    const ranges = map.get(char)
    const latestRange = ranges[ranges.length - 1]
    const latestIndex = latestRange[latestRange.length - 1]

    if (latestIndex !== undefined && i - latestIndex > 1) {
      const nextRange = [i]
      ranges.push(nextRange)
    } else {
      latestRange.push(i)
    }
  }

  return map
}

function biggestSubArray(n, nArr, m, mArr) {
  if (m > n) {
    return biggestSubArray(m, mArr, n, nArr)
  }

  let biggestSize = 0
  const nMap = genMap(nArr, n)
  const mMap = genMap(mArr, m)

  mArr.forEach((char, mI) => {
    const nCharPositions = nMap.get(char)

    if (nCharPositions) {
      const commonLength = nCharPositions.reduce((acc, range) => acc + range.length, 0)
      if (commonLength === n) {
        biggestSize = Math.max(...mMap.get(char).map((range) => range.length))
      } else {
        nCharPositions.forEach((ranges) => {
          let size = 1

          ranges.forEach((nI) => {
            while (nI + size < n && mI + size < m && nArr[nI + size] === mArr[mI + size]) {
              size++
            }

            biggestSize = Math.max(biggestSize, size)
          })
        })
      }
    }
  })

  return biggestSize
}

function solve() {
  const n = readNumber()
  const nArr = readNumberArray()
  const m = readNumber()
  const mArr = readNumberArray()

  console.log(biggestSubArray(n, nArr, m, mArr))
}

