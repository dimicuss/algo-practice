function siftUp(heap, i) {
  const parentIndex = Math.floor(i / 2)
  const parent = heap[parentIndex]
  const child = heap[i]

  if (parentIndex > 0 && parent < child) {
    heap[i] = parent
    heap[parentIndex] = child
    return siftUp(heap, parentIndex)
  }

  return i
}

function test() {
  var sample = [-1, 12, 6, 8, 3, 15, 7];
  console.assert(siftUp(sample, 5) == 1);
}
