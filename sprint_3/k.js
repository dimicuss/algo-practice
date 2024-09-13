function merge_sort(array, left = 0, right = array.length) {
  const diff = right - left

  if (diff > 1) {
    const mid = left + Math.floor(diff / 2)

    merge_sort(array, left, mid)
    merge_sort(array, mid, right)

    const sortedArray = merge(array, left, mid, right)

    for (let i = 0; i < sortedArray.length; i++) {
      array[left + i] = sortedArray[i]
    }
  }
}

function merge(array, left, mid, right) {
  let i = 0
  let j = 0

  const leftSide = []
  const rightSide = []
  const result = []

  for (let k = left; k < mid; k++) {
    leftSide.push(array[k])
  }

  for (let k = mid; k < right; k++) {
    rightSide.push(array[k])
  }

  for (let k = left; k < right; k++) {
    const a = leftSide[i]
    const b = rightSide[j]

    if (a === undefined) {
      result.push(b)
      j++
      continue
    }

    if (b === undefined) {
      result.push(a)
      i++
      continue
    }

    if (a < b) {
      result.push(a)
      i++
    } else {
      result.push(b)
      j++
    }
  }

  return result
}
