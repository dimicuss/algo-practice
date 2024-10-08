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

  graph.forEach((vertexes) => {
    vertexes.sort((a, b) => a - b)
  })

  return graph
}

function bfs(graph, s, cb) {
  const colors = graph.map(() => 'white')
  const stack = [s]

  cb(s)

  while (stack.length > 0) {
    const vertex = stack.shift()
    const childVertexes = graph[vertex - 1]

    for (let childVertex of childVertexes) {
      const childColor = colors[childVertex - 1]

      if (childColor === 'white') {
        cb(childVertex)
        colors[childVertex - 1] = 'gray'
        stack.push(childVertex)
      }
    }

    colors[vertex - 1] = 'black'
  }
}

function solve() {
  const graph = buildGraph(true)
  const s = readNumber()

  const result = []

  bfs(graph, s, (vertex) => {
    result.push(vertex)
  })

  console.log(
    result.join(' ')
  )
}

