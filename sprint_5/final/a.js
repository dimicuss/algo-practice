// https://contest.yandex.ru/contest/24810/run-report/119546140/
/*
ИДЕЯ АЛГОРИТМА И ДОКАЗАТЕЛЬСТВО ПРАВИЛЬНОСТИ

В основе лежит структура данных под названием "Куча". Она имеет такие особенности: представляется в
виде бинарного дерева, где потомки узла меньше (или больше в зависимости от компаратора) или равны ему.
Используя данное свойство можно отсортировать какое нибудь множество путем последовательного добавления в кучу
элементов и далее поочередным извлечением максимального узла. Таким образом можно получить отсортированное множество.

ВРЕМЕННАЯ СЛОЖНОСТЬ

Каждое добавление в кучу нового элемента потребует log(n) времени, так как после потребуется сделать просев вверх, соответственно
для всех элементов будет n log(n). Аналогично для извленения потребуется n log(n) с учетом просева вниз.
Как следствие сложность будет равна O(n log(n))

ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ

Куча дополнительно займет O(n) памяти, так как перед сортировкой придется составить кучу на массиве.
 */

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

function readNumber() {
  return Number(readLine())
}

function readItem() {
  const [name, score, penalty] = readLine().split(' ')

  return {name, score: Number(score), penalty: Number(penalty)}
}

function solve() {
  let n = readNumber()
  const heap = new Heap((a, b) => {
    if (a.score < b.score) {
      return 1
    }

    if (a.score > b.score) {
      return -1
    }

    if (a.penalty < b.penalty) {
      return -1
    }

    if (a.penalty > b.penalty) {
      return 1
    }

    if (a.name < b.name) {
      return -1
    }

    if (a.name > b.name) {
      return 1
    }

    return 0
  })

  while (n--) {
    heap.add(readItem())
  }

  heap.toArray().forEach(({name}) => {
    console.log(name)
  })
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

  toArray() {
    const result = []
    let size = this.size()

    while (size--) {
      result.push(this.removeMax())
    }

    return result
  }
}
