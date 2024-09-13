// https://contest.yandex.ru/contest/24414/run-report/117379096/

/*
-- ПРИНЦИП РАБОТЫ и ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --

В основе лежит упрощеный алгоритм хэширования, то есть мы просто берем остаток от деления
ключа на размер таблицы, а для устранения коллизий будем использовать
метод цепочек через связный список.

То есть при получении элемента по ключу с общим адресом корзины будем
проходится по цепочке пар ключ-значение в корзине пока не найдем нужную пару
и далее выведем значение. 

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --

Если в результате разрешения коллизий элементы в таблице будут распределены равномерно
по корзинам, то в среднем сложность вставки, поиска или удаления будет O(1).
Следовательно для n команд время выполнения составит O(n).  

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Так как элементы в хэш таблице располагаются в корзинах, то кол-во
памяти которое займет таблица с элементами будет равно O(n + m),
где n кол-во элементов, а m количество корзин 
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

function readCommand() {
  const [command, key, value] = readLine().split(' ')

  return {command, key: Number(key), value: value && Number(value)}
}

const m = 100003

class Node {
  next
  key
  value
  constructor(key, value) {
    this.key = key
    this.value = value
  }
}

class HashTable {
  array = []

  static bucket(key) {
    return key - (Math.floor(key / m) * m)
  }

  getNode(key, bucketIndex) {
    let currentNode = this.array[bucketIndex]

    while (currentNode && currentNode.key !== key) {
      currentNode = currentNode.next
    }

    return currentNode
  }

  get(key) {
    const bucketIndex = HashTable.bucket(key)
    const node = this.getNode(key, bucketIndex)
    return node && node.value
  }

  put(key, value) {
    const bucketIndex = HashTable.bucket(key)
    const node = this.getNode(key, bucketIndex)

    if (node) {
      node.value = value
    } else {
      const headNode = this.array[bucketIndex]
      const newNode = new Node(key, value)

      if (headNode) {
        newNode.next = headNode
      }

      this.array[bucketIndex] = newNode
    }
  }

  delete(key) {
    const bucketIndex = HashTable.bucket(key)
    let previousNode
    let currentNode = this.array[bucketIndex]

    while (currentNode && currentNode.key !== key) {
      previousNode = currentNode
      currentNode = currentNode.next
    }

    if (currentNode) {
      if (previousNode) {
        previousNode.next = currentNode.next
      } else {
        this.array[bucketIndex] = currentNode.next
      }

      return currentNode.value
    }
  }
}

function solve() {
  let n = readNumber()
  let hashTable = new HashTable()

  while (n--) {
    const {command, key, value} = readCommand()
    const result = hashTable[command](key, value)

    if (command === 'delete' || command === 'get') {
      console.log(result === undefined ? 'None' : result)
    }
  }
}

