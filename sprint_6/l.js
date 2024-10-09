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
  const checkdEdges = new Set()

  for (let i = 0; i < v; i++) {
    graph[i] = []
  }

  while (e--) {
    const pair = readNumberPair()
    const [v1, v2] = pair
    const sV1V2 = `${v1},${v2}`
    const sV2V1 = `${v2},${v1}`

    if (v1 !== v2 && !checkdEdges.has(sV1V2) && !checkdEdges.has(sV2V1)) {
      graph[v1 - 1].push(v2)
      graph[v2 - 1].push(v1)
      checkdEdges.add(sV1V2)
      checkdEdges.add(sV2V1)
    }
  }

  return graph
}

function getPerVertexEdgesCount(graph, s) {
  const stack = [s]
  const colors = graph.map(() => 'white')
  const edgesCount = []

  while (stack.length > 0) {
    const vertex = stack.pop()
    const vertexIndex = vertex - 1

    if (colors[vertexIndex] === 'white') {
      const childVertexes = graph[vertexIndex] || []
      colors[vertexIndex] = 'gray'
      edgesCount[vertexIndex] = childVertexes.length

      childVertexes.map((childVertex) => {
        if (colors[childVertex - 1] === 'white') {
          stack.push(childVertex)
        }
      })
    } else if (colors[vertexIndex] === 'gray') {
      colors[vertexIndex] = 'black'
    }
  }

  return edgesCount
}

function solve() {
  const graph = buildGraph(true)

  console.log(
    getPerVertexEdgesCount(graph, graph.length).every((edgesCount) => edgesCount === graph.length - 1)
      ? 'YES'
      : 'NO'
  )
}

