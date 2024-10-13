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
  const edges = []

  for (let i = 1; i <= v; i++) {
    edges[i - 1] = []
  }

  while (e--) {
    const [v1, v2] = readNumberPair()
    edges[v1 - 1].push(v2)
    edges[v2 - 1].push(v1)
  }

  return {
    v,
    edges,
  }
}

function dfs(graph) {
  const oddities = Array.from({length: graph.v}).fill(undefined)

  for (let s = 1; s <= graph.v; s++) {
    const stack = [{vertex: s, depth: 0}]

    while (stack.length > 0) {
      const stackItem = stack.pop()
      const {vertex, depth} = stackItem
      const oddity = oddities[vertex - 1]

      if (oddity === undefined) {
        oddities[vertex - 1] = depth % 2 == 0

        stack.push(stackItem)

        for (const childVertex of graph.edges[vertex - 1]) {
          const nextDepth = depth + 1
          const currentOddity = oddities[childVertex - 1]
          const nextOddity = nextDepth % 2 === 0

          if (currentOddity !== undefined && currentOddity !== nextOddity) {
            return false
          }

          if (oddities[childVertex - 1] === undefined) {
            stack.push({vertex: childVertex, depth: nextDepth})
          }
        }
      }
    }
  }

  return true
}

function solve() {
  const graph = buildGraph()
  console.log(dfs(graph) ? 'YES' : 'NO')
}

