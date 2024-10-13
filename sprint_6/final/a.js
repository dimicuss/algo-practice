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

function solve() {
  const graph = buildGraph()

  const result = findMaxSpanTree(graph)
  console.log(
    result !== undefined ? result : 'Oops! I did it again'
  )
}

function findMaxSpanTree(graph) {
  const state = new State(graph)
  let result = 0

  state.addVertex(graph.vertices[0])

  while (state.notAdded.size > 0 && state.edges.size() > 0) {
    const maximumEdge = state.extractMaximumEdge()
    if (state.notAdded.has(maximumEdge.end)) {
      state.addVertex(maximumEdge.end)
      result += graph.weight(maximumEdge.start, maximumEdge.end)
    }
  }

  if (state.notAdded.size > 0) {
    return undefined
  }

  return result
}


class State {
  constructor(graph) {
    this.graph = graph
    this.edges = new Heap((a, b) => b.w - a.w)
    this.added = new Set()
    this.notAdded = new Set(graph.vertices)
    this.lastAddedVertex = undefined
    this.lastAddedEdges = []
  }

  addVertex(vertex) {
    this.added.add(vertex)
    this.notAdded.delete(vertex)

    this.graph.edges.get(vertex).forEach((edge) => {
      if (this.notAdded.has(edge)) {
        this.edges.add({start: vertex, end: edge, w: this.graph.weight(vertex, edge)})
      }
    })
  }

  extractMaximumEdge() {
    return this.edges.removeMax()
  }
}


class Heap {
  cb
  heap = [undefined]

  constructor(cb) {
    this.cb = cb
  }

  add(item) {
    this.heap.push(item)
    this.siftUp(this.size())
  }

  removeMax() {
    if (this.size() > 0) {
      const item = this.heap[1]
      this.heap[1] = this.heap[this.size()]
      this.heap.pop()
      this.siftDown(1)
      return item
    }
  }

  siftUp(i) {
    const parentIndex = Math.floor(i / 2)
    const parent = this.heap[parentIndex]
    const child = this.heap[i]
    if (parentIndex > 0 && this.cb(child, parent) < 0) {
      this.heap[i] = parent
      this.heap[parentIndex] = child
      this.siftUp(parentIndex)
    }
  }

  siftDown(i) {
    if (this.size() > 0) {
      const center = this.heap[i]
      const leftIndex = 2 * i
      const rightIndex = 2 * i + 1
      const left = this.heap[leftIndex]
      const right = this.heap[rightIndex];
      const heights = [
        [leftIndex, left],
        [rightIndex, right],
        [i, center]
      ]
        .filter(([, value]) => value !== undefined)
        .sort(([, a], [, b]) => this.cb(a, b))

      const [correctCenterIndex, correctCenter] = heights[0]
      if (heights.length > 1 && correctCenterIndex !== i) {
        this.heap[i] = correctCenter
        this.heap[correctCenterIndex] = center
        this.siftDown(correctCenterIndex)
      }
    }
  }

  size() {
    return this.heap.length - 1
  }
}

function readLine() {
  return lines[line++]
}

function readNumberTriplet() {
  const [v1, v2, w] = readLine().split(' ')
  return [Number(v1), Number(v2), Number(w)]
}

const normalizeEdge = (v1, v2) => [v1, v2].sort((a, b) => a - b).join(',')

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
    const triplet = readNumberTriplet()
    const [v1, v2, w] = triplet

    if (v1 !== v2) {
      const key = normalizeEdge(v1, v2)

      if (stash.has(key)) {
        const weight = weights.get(key)
        weights.set(key, Math.max(weight, w))
      } else {
        weights.set(key, w)
        stash.add(key)
        edges.get(v1).push(v2)
        edges.get(v2).push(v1)
      }
    }
  }

  return {
    edges,
    weight: (v1, v2) => weights.get(normalizeEdge(v1, v2)),
    vertices,
  }
}
