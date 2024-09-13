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

function readCommand() {
  const [command, arg] = readLine().split(' ')
  return [command, Number(arg)]
}

function solve() {
  let n = readNumber()
  const maxSize = readNumber()

  const queue = new MyQueueSized(maxSize)

  while (n--) {
    const [command, arg] = readCommand()
    try {
      const result = queue[command](arg)

      if (command === 'pop' || command === 'peek' || command === 'size') {
        if (result === null) {
          console.log('None')
        } else {
          console.log(result)
        }
      }
    } catch (e) {
      console.log('error')
    }
  }
}

class MyQueueSized {
  constructor(maxSize) {
    this.queue = new Array(maxSize).fill(null)
    this.head = 0
    this.tail = 0
    this._size = 0
    this.maxSize = maxSize
  }

  push(x) {
    if (this._size < this.maxSize) {
      this.queue[this.tail] = x
      this.tail = (this.tail + 1) % this.maxSize
      this._size++
    } else {
      throw new Error()
    }
  }

  pop() {
    if (this._size > 0) {
      const x = this.queue[this.head]
      this.queue[this.head] = null
      this.head = (this.head + 1) % this.maxSize
      this._size--
      return x
    }

    return null
  }

  size() {
    return this._size
  }

  peek() {
    return this.queue[this.head]
  }
}

