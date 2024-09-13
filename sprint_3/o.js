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

function countDiffPairs(arr, n, maxDiff) {
  let left = 0
  let count = 0

  for (let right = 0; right < n; right++) {
    while (arr[right] - arr[left] > maxDiff) {
      left++
    }

    count += right - left
  }

  return count
}

function findKthMinimialDiff(arr, n, k, left = 0, right = arr[n - 1] - arr[0]) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2)

    if (countDiffPairs(arr, n, mid) < k) {
      return findKthMinimialDiff(arr, n, k, mid + 1, right)
    }

    return findKthMinimialDiff(arr, n, k, left, mid)
  }

  return left
}

function solve() {
  const n = readNumber()
  const arr = readNumberArray().sort((a, b) => a > b && 1 || a < b && -1 || 0)
  const k = readNumber()

  console.log(findKthMinimialDiff(arr, n, k))
}

