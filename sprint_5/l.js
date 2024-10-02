function siftDown(heap, i) {
  const center = heap[i]
  const leftIndex = 2 * i
  const rightIndex = 2 * i + 1
  const left = heap[leftIndex]
  const right = heap[rightIndex];

  const heights = [
    [leftIndex, left],
    [rightIndex, right],
    [i, center]
  ]
    .filter(([, value]) => value !== undefined)
    .sort(([, a], [, b]) => b - a)

  const [correctCenterIndex, correctCenter] = heights[0]

  if (heights.length > 1 && correctCenterIndex !== i) {
    heap[i] = correctCenter
    heap[correctCenterIndex] = center
    return siftDown(heap, correctCenterIndex)
  }

  return i
}

function test() {
  const sample = [undefined, 12, 6, 8, 3, 4, 7];
  console.assert(siftDown(sample, 2) === 2);
}

