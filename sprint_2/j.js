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

  const queue = new ListQueue()

  while (n--) {
    const [command, arg] = readCommand()

    try {
      const result = queue[command](arg)

      if (command === 'size' || command == 'get') {
        console.log(result)
      }
    } catch (e) {
      console.log('error')
    }
  }
}

class ListQueue {
  head = null
  tail = null
  _size = 0

  put(x) {
    const newNode = new Node(x)
    if (this.tail) {
      this.tail.next = newNode
      this.tail = newNode
    } else {
      this.head = newNode
      this.tail = newNode
    }

    this._size++
  }

  get() {
    if (this.head) {
      const data = this.head.data
      const next = this.head.next

      this.head = next

      if (!next) {
        this.tail = null
      }

      this._size--

      return data
    }

    throw new Error()
  }

  size() {
    return this._size
  }
}

class Node {
  constructor(data, nextNode) {
    this.data = data
    this.next = nextNode
  }
}

