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
    vertexes.sort((a, b) => b - a)
  })

  return graph
}

function dfs(graph, s, cb) {
  const colors = graph.map(() => 'white')
  const stack = [s]

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
  const graph = buildGraph(true)

  let componentCount = 0
  let groups = []
  const colors = graph.map(() => -1)

  for (let i = 0; i < colors.length; i++) {
    const startVertex = i + 1;
    const vertexColor = colors[i]

    if (vertexColor === -1) {
      const group = []

      dfs(graph, startVertex, (vertex) => {
        colors[vertex - 1] = componentCount
        group.push(vertex)
      })
      componentCount++
      group.sort((a, b) => a - b)
      groups.push(group)
    }
  }

  console.log(componentCount)
  groups.forEach((group) => {
    console.log(group.join(' '))
  })
}

