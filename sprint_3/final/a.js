// https://contest.yandex.ru/contest/23815/run-report/116837312/

/*
-- ПРИНЦИП РАБОТЫ и ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Так как на вход подается массив с 1 или 2 отсортированными множестывами, то мы можем найти между ними границу и
разделив массив на 2 части можем вызвать бинарный поиск по массивам и выбрать максимальный результирующий индекс.

Так же в качестве оптимизации, можем проверить границы массива (mostLeftElm > mostRightElm),
если это так то массив нужно разбить, иначе просто вызвать бинарный поиск по всему массиву.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --

Так как getSplitIndex частный случай бинарного поиска, то сложность будет O(log2(n)) 

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --

Рекурсивный вызов бинарного поиска формирует дерево вызовов функции где на каждом уровне будет не больше 2х ветвей, следовательно
количиство уровней в дереве будет O(log2(n)), и если предполагать что каждый вызов функции добавляет в коллстек 1 элемент,
а при окончании вызова он изымается, то можно сделать вывод что при достижении конца дерева в стеке будет не более O(log2(n)) элементов.
И в целом алгоритм не будет занимать больше O(log2(n)) памяти.

*/

function binarySearch(array, k, left = 0, right = array.length) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2)
    const item = array[mid]

    if (k === item) {
      return mid
    }

    if (k > item) {
      return binarySearch(array, k, mid + 1, right)
    }

    return binarySearch(array, k, left, mid)
  }

  return -1
}

function getSplitIndex(a, left = 0, right = a.length) {
  const diff = right - left

  if (diff > 1) {
    const mid = Math.floor((right + left) / 2)
    const leftSubArrayLastIndex = mid - 1
    const rightSubArrayFirstIndex = mid

    if (a[rightSubArrayFirstIndex] < a[leftSubArrayLastIndex]) {
      return leftSubArrayLastIndex
    }

    if (a[left] > a[leftSubArrayLastIndex]) {
      return mid - left > 1 ? getSplitIndex(a, left, mid) : left
    }

    if (a[right - 1] < a[rightSubArrayFirstIndex]) {
      return right - mid > 1 ? getSplitIndex(a, mid, right) : right
    }
  }

  return -1
}

function brokenSearch(array, k) {
  const splitIndex = getSplitIndex(array)

  if (splitIndex > -1) {
    return Math.max(
      binarySearch(array, k, 0, splitIndex + 1),
      binarySearch(array, k, splitIndex, array.length),
    )
  }

  return binarySearch(array, k)
}

function test() {
  const splitted = [19, 21, 100, 101, 1, 4, 5, 7, 12];
  const sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  console.log('Empty', brokenSearch([], Infinity) === -1)
  console.log('Single', brokenSearch([1], 1) === 0)
  console.log('Single failed', brokenSearch([1], Infinity) === -1)
  console.log('Double left', brokenSearch([1, 2], 1) === 0)
  console.log('Double right', brokenSearch([1, 2], 2) === 1)
  console.log('Double failed', brokenSearch([1, 2], Infinity) === -1)

  console.log('Splitted')
  for (const item of splitted) {
    const index = brokenSearch(splitted, item)
    console.log(item, splitted[index] === item)
  }

  console.log('Sorted')
  for (const item of sorted) {
    const index = brokenSearch(sorted, item)
    console.log(item, sorted[index] === item)
  }
}


test()

