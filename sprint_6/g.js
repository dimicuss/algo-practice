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


function readNumberPair() {
  const [n, m] = readLine().split(' ')
  return [Number(n), Number(m)]
}

function buildGraph(undirected = false) {
  let [v, e] = readNumberPair()
  const graph = Array.from({length: v})

  for (let i = 0; i < v; i++) {
    graph[i] = []
  }

  while (e--) {
    const [v1, v2] = readNumberPair()
    graph[v1 - 1].push(v2)
    if (undirected) {
      graph[v2 - 1].push(v1)
    }
  }

  return graph
}

class Buffer {
  constructor(maxSize) {
    this.queue = new Array(maxSize).fill(null)
    this.head = 0
    this.tail = 0
    this.size = 0
    this.maxSize = maxSize
  }

  pushBack(value) {
    if (this.canPush()) {
      if (this.queue[this.tail] !== null) {
        const newTail = this.increase(this.tail)
        this.queue[newTail] = value
        this.tail = newTail
      } else {
        this.queue[this.tail] = value
      }
      this.size++
      return value
    } else {
      throw new Error()
    }
  }

  popFront() {
    if (this.canPop()) {
      const headValue = this.queue[this.head]
      this.queue[this.head] = null
      if (this.size > 1) {
        this.head = this.increase(this.head)
      }
      this.size--
      return headValue
    } else {
      throw new Error()
    }
  }

  canPop() {
    return this.size > 0
  }

  canPush() {
    return this.size < this.maxSize
  }

  increase(index) {
    return (index + 1) % this.maxSize
  }

  decrease(index) {
    return index === 0 ? this.maxSize - 1 : index - 1
  }
}

function getMaxDistances(graph, s) {
  const colors = graph.map(() => 'white')
  const buffer = new Buffer(graph.length)
  const distances = []

  distances[s - 1] = 0
  buffer.pushBack(s)

  while (buffer.size > 0) {
    const vertex = buffer.popFront()
    const childVertexes = graph[vertex - 1]

    for (let childVertex of childVertexes) {
      const childColor = colors[childVertex - 1]

      if (childColor === 'white') {
        colors[childVertex - 1] = 'gray'
        distances[childVertex - 1] = distances[vertex - 1] + 1
        buffer.pushBack(childVertex)
      }
    }

    colors[vertex - 1] = 'black'
  }

  return distances
}

function solve() {
  const graph = buildGraph(true)
  const s = readNumber()
  const distances = getMaxDistances(graph, s)

  console.log(
    Math.max(...distances)
  )
}

