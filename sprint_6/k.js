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

function readNumberTriplet() {
  const [v1, v2, w] = readLine().split(' ')
  return [Number(v1), Number(v2), Number(w)]
}

function buildGraph() {
  let [v, e] = readNumberTriplet()
  const vertices = []
  const edges = new Map()
  const weights = new Map()

  for (let i = 1; i <= v; i++) {
    edges.set(i, [])
    vertices.push(i)
  }

  const stash = new Set()

  while (e--) {
    const [v1, v2, w] = readNumberTriplet()

    const v1v2 = `${v1},${v2}`
    const v2v1 = `${v2},${v1}`
    if (v1 !== v2 && !stash.has(v1v2) && !stash.has(v2v1)) {
      edges.get(v1).push(v2)
      edges.get(v2).push(v1)
      weights.set(v1v2, w)
      weights.set(v2v1, w)
      stash.add(v1v2)
      stash.add(v2v1)
    }
  }

  return {
    vertices,
    edges,
    weight: (v1, v2) => weights.get(`${v1},${v2}`)
  }
}

function getMinDistNonVisitedVertex(state, graph) {
  let currentMinimum = Infinity
  let currentMinimumVertex = undefined

  for (const vertex of graph.vertices) {
    if (!state.vist.get(vertex) && state.dist.get(vertex) < currentMinimum) {
      currentMinimum = state.dist.get(vertex)
      currentMinimumVertex = vertex
    }
  }

  return currentMinimumVertex
}

function djkstr(graph, s) {
  const state = {
    dist: new Map(),
    prev: new Map(),
    vist: new Map(),
  }

  for (const vertex of graph.vertices) {
    state.dist.set(vertex, Infinity)
    state.prev.set(vertex, undefined)
    state.vist.set(vertex, false)
  }

  state.dist.set(s, 0)

  while (true) {
    const vertexToVisit = getMinDistNonVisitedVertex(state, graph)

    if (vertexToVisit === undefined || state.dist.get(vertexToVisit) === Infinity) break

    state.vist.set(vertexToVisit, true)

    for (const edgedVertex of graph.edges.get(vertexToVisit)) {
      const edgeWeightSum = state.dist.get(vertexToVisit) + graph.weight(vertexToVisit, edgedVertex)

      if (state.dist.get(edgedVertex) > edgeWeightSum) {
        state.dist.set(edgedVertex, edgeWeightSum)
        state.prev.set(edgedVertex, vertexToVisit)
      }
    }
  }

  return state
}

function solve() {
  const graph = buildGraph()
  const result = []

  for (let i = 0; i < graph.vertices.length; i++) {
    result[i] = []
    const {dist} = djkstr(graph, i + 1)
    for (let j = 0; j < graph.vertices.length; j++) {
      const jDist = dist.get(j + 1)

      result[i][j] = jDist === Infinity ? -1 : jDist
    }
  }

  result.forEach((row) => console.log(row.join(' ')))
}

