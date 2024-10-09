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



function dfs(graph, s, cb) {
  const colors = graph.map(() => 'white')
  const entry = graph.map(() => null)
  const leave = graph.map(() => null)
  const stack = [s]
  let time = 0

  while (stack.length > 0) {
    const vertex = stack.pop()
    const vertexColor = colors[vertex - 1]

    if (vertexColor === 'white') {
      stack.push(vertex)

      entry[vertex - 1] = time
      colors[vertex - 1] = 'gray'

      time++

      graph[vertex - 1].forEach((childVertex) => {
        if (colors[childVertex - 1] === 'white') {
          stack.push(childVertex)
        }
      })
    } else if (vertexColor === 'gray') {
      leave[vertex - 1] = time
      colors[vertex - 1] = 'black'

      time++
    }
  }

  entry.forEach((vEntry, i) => {
    cb(vEntry, leave[i])
  })
}

function solve() {
  const graph = buildGraph()

  dfs(graph, 1, (vIn, vOut) => {
    console.log(vIn, vOut)
  })
}

