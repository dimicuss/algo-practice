// https://contest.yandex.ru/contest/23815/run-report/116793528/

/*
-- ПРИНЦИП РАБОТЫ --
В основе лежит тот же рекурсивный алгоритм быстрого поиска (quickSort), за исключением функции распределения элементов массива (sort) относительно опорного элемента.
Сам алгоритм распределения таков - выбираем в подмассиве опорный элемент и
начиная с концов массива, двигая указатели ищем слева элемент больший опорного, а справа меньший. Если находим, то меняем элементы местами.
Так до тех пор пока указатели не пересакаются (left <= right). Пересеченные указатели будут указывать на новые границы подмассивов, которые мы применим в рекурсивных вызовах.

Дополнительно необходимо добавить компаратор для сортировки на сложных данных. Он будет интегрирован в sort.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --

Если взять неотсортированный массив, так же опорный элемент из него и найти слева по компаратору больший, а справа меньший оного и далее поменять их местами повторяя это
до тех пор пока указатели не пересекут друг-друга, то мы получим массив где слева будут элементы меньшие опорного по компаратору, а с права большие.
Если далее рекурсивно вызвать на левой и правой частях массива тот же алгоритм, то мы получим отсортированный массив.

Компаратор f работает так:

f(a, b) => 1, a должен переместиться за b
f(a, b) => -1, a должен оказаться перед b
f(a, b) => 0 a b сохраняют свой порядок

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --

Так как каждый раз массив разбивается на 2 части формируется 2 ветви рекурсии, в каждой из них будет обрабатываться по n / 2 элементов.
А так как каждая пара ветвей формирует уровень рекурсии, таких уровней будет log2(n), при том получается что на каждом уровне будет обработанно n элемментов.
Таким образом сложность будет O(n*log(n))

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --

Относительно стека и рекурсии ситуация точно такаяже как и в задаче сломаного поиска, есть 2 рекурсивных вызова функции, которые делят задачу на 2 части.

Рекурсивный вызов бинарного поиска формирует дерево вызовов функции где на каждом уровне будет не больше 2х ветвей, следовательно
количиство уровней в дереве будет O(log2(n)), и если предполагать что каждый вызов функции добавляет в коллстек 1 элемент,
а при окончании вызова он изымается, то можно сделать вывод что при достижении конца дерева в стеке будет не более O(log2(n)) элементов.
И в целом алгоритм не будет занимать больше O(log2(n)) памяти.

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

function readItemArray() {
  const [name, points, penalty] = readLine().split(' ')

  return {
    name,
    points: Number(points),
    penalty: Number(penalty)
  }
}

function swap(array, indexA, indexB) {
  const aItem = array[indexA]
  array[indexA] = array[indexB]
  array[indexB] = aItem
}

const defaultSort = (a, b) => {
  return a > b && -1 || a < b && 1 || 0
}

function quickSort(array, callback = defaultSort, left = 0, right = array.length) {
  const diff = right - left
  if (diff > 1) {
    const pivot = left + Math.floor((diff - 1) * Math.random())
    const nextBorders = partize(array, callback, left, pivot, right - 1)

    quickSort(array, callback, left, nextBorders.right + 1)
    quickSort(array, callback, nextBorders.left, right)
  }
}

function partize(array, callback, left, pivot, right) {
  const pivotItem = array[pivot]

  while (left <= right) {
    if (callback(pivotItem, array[left]) > 0) {
      left++
      continue
    }

    if (callback(pivotItem, array[right]) < 0) {
      right--
      continue
    }

    swap(array, left, right)

    left++
    right--
  }

  return {left, right}
}


function solve() {
  let n = readNumber()
  let items = []

  while (n--) {
    items.push(readItemArray())
  }

  quickSort(items, (a, b) => {
    if (a.points > b.points) {
      return -1
    }

    if (a.points < b.points) {
      return 1
    }

    if (a.penalty > b.penalty) {
      return 1
    }

    if (a.penalty < b.penalty) {
      return -1
    }

    if (a.name > b.name) {
      return 1
    }

    if (a.name < b.name) {
      return -1
    }

    return 0
  })

  items.forEach(({name}) => {
    console.log(name)
  })
}


