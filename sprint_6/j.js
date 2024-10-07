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

function readNumberPair() {
  const [n, m] = readLine().split(' ')
  return [Number(n), Number(m)]
}

function buildGraph() {
  let [v, e] = readNumberPair()
  const graph = Array.from({length: v})

  for (let i = 0; i < v; i++) {
    graph[i] = []
  }

  while (e--) {
    const [v1, v2] = readNumberPair()
    graph[v1 - 1].push(v2)
  }

  graph.forEach((vertexes) => {
    vertexes.sort((a, b) => b - a)
  })

  return graph
}

function topologicalSort(graph, cb) {
  const colors = graph.map(() => 'white')
  const stack = graph.map((_, i) => i + 1)

  while (stack.length > 0) {
    const vertex = stack.pop()
    const vertexColor = colors[vertex - 1]

    if (vertexColor === 'white') {
      stack.push(vertex)
      colors[vertex - 1] = 'gray'

      graph[vertex - 1].forEach((childVertex) => {
        if (colors[childVertex - 1] === 'white') {
          stack.push(childVertex)
        }
      })
    } else if (vertexColor === 'gray') {
      colors[vertex - 1] = 'black'
      cb(vertex)
    }
  }
}

function solve() {
  const graph = buildGraph()

  const result = []

  topologicalSort(graph, (vertex) => {
    result.push(vertex)
  })

  console.log(
    [...result].reverse().join(' ')
  )
}

