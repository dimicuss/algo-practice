const readline = require('readline')

const reader = readline.createInterface({
  input: process.stdin
})

let line = 0
const lines = []

reader.on('line', line => {
  lines.push(line);
})

process.stdin.on('end', () => {
  const graph = buildGraph()
  console.log(checkCycle(graph) ? 'YES' : 'NO')
})

function checkCycle(graph) {
  const colors = Array.from({length: graph.v}).fill('white')

  for (let i = 0; i < graph.v; i++) {
    const stack = [i]

    while (stack.length > 0) {
      const vertex = stack.pop()
      const vertexColor = colors[vertex]

      if (colors[vertex] === 'white') {
        colors[vertex] = 'gray'
        stack.push(vertex)

        for (const edge of graph.edges.get(vertex)) {
          const edgeColor = colors[edge]

          if (edgeColor === 'white') {
            stack.push(edge)
          } else if (edgeColor === 'gray') {
            return false
          }
        }
      } else if (vertexColor === 'gray') {
        colors[vertex] = 'black'
      }
    }
  }

  return true
}

function readLine() {
  return lines[line++]
}

function readNumber() {
  return Number(readLine())
}

function buildGraph() {
  const v = readNumber()
  const edges = new Map()

  for (let i = 0; i < v; i++) {
    if (!edges.has(i)) {
      edges.set(i, [])
    }
  }

  for (let i = 0; i < v - 1; i++) {
    const weights = readLine()

    for (let j = 0; j < weights.length; j++) {
      const weight = weights[j]

      const v1 = i
      const v2 = i + j + 1

      if (weight === 'B') {
        edges.get(v2).push(v1)
      } else {
        edges.get(v1).push(v2)
      }
    }
  }

  return {
    v,
    edges,
  }
}
