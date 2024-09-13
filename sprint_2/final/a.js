// https://contest.yandex.ru/contest/22781/run-report/116615534/

/*
-- ПРИНЦИП РАБОТЫ --

Есть кольцевой буфер размера n и два указателя, которые ссылаются на первый и последний элемент, а так же
набор методов которые обновляют стек, манипулируя его содержимым, размером и положением указателей. Вот. 

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
В начальном состоянии массив пуст и указатели ссылаются на нудевой индекс.

На каждое добавление в начало массива происходит проверка на превышение длинны массива,
если ок проверям есть ли по индесу головы значение, если оно есть то обноляем индекс головы
и по новому индесу добавляем значение. Иначе просто без обновления добавляем значение, делаем
это для того что бы при первом добавлении не менять индекс головы, тем самым
поддерживая актульное положение головы списка. Обязательно увеличиваем длинну.

Аналогично для добаления в конец списка используя указатель на хвост.

Для удаления из начала проверям пустоту массива, далее получаем текущий элемент,
увеличиваем индес головы если размер массива больше 1. Проверку делаем для того что поддержать
актуальное положение головы.

Аналогично для удаления из конца используя указатель хвост.

Избежать нежелатеных пересечений указателей головы/хвоста позволяет проверека текущего размера массива
при добавлении/удалении занчений. 

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Так как для храниения данных используем массив, а для изменения стостояния индексацию, то временная
сложность всегда будет O(1) 

Допустим на вроход подается n команд, если выполнение каждой занимает O(1) внезависимости от размера дека,
то общее время будет O(n)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Если размер дека равен m, то доп память будет занимать максимум O(m)
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

const logCommands = {
  popBack: true,
  popFront: true,
}

const innerCommandsMap = {
  pop_back: 'popBack',
  pop_front: 'popFront',
  push_front: 'pushFront',
  push_back: 'pushBack'
}

function readLine() {
  return lines[line++]
}

function readNumber() {
  return Number(readLine())
}

function readCommand() {
  const [command, arg] = readLine().split(' ')
  return [command, Number(arg)]
}

function solve() {
  let n = readNumber()
  const maxSize = readNumber()
  const queue = new Deque(maxSize)

  while (n--) {
    const [command, arg] = readCommand()
    const innerCommand = innerCommandsMap[command]
    try {
      const result = queue[innerCommand](arg)
      if (logCommands[innerCommand]) {
        console.log(result)
      }
    } catch (e) {
      console.log('error')
    }
  }
}

class Deque {
  constructor(maxSize) {
    this.queue = new Array(maxSize).fill(null)
    this.head = 0
    this.tail = 0
    this.size = 0
    this.maxSize = maxSize
  }

  pushBack(value) {
    if (this.canPush()) {
      if (this.queue[this.tail] !== null) {
        const newTail = this.increase(this.tail)
        this.queue[newTail] = value
        this.tail = newTail
      } else {
        this.queue[this.tail] = value
      }
      this.size++
      return value
    } else {
      throw new Error()
    }
  }

  pushFront(value) {
    if (this.canPush()) {
      if (this.queue[this.head] !== null) {
        const newHead = this.decrease(this.head)
        this.queue[newHead] = value
        this.head = newHead
      } else {
        this.queue[this.head] = value
      }
      this.size++
      return value
    } else {
      throw new Error()
    }
  }

  popBack() {
    if (this.canPop()) {
      const tailValue = this.queue[this.tail]
      this.queue[this.tail] = null
      if (this.size > 1) {
        this.tail = this.decrease(this.tail)
      }
      this.size--
      return tailValue
    } else {
      throw new Error()
    }
  }

  popFront() {
    if (this.canPop()) {
      const headValue = this.queue[this.head]
      this.queue[this.head] = null
      if (this.size > 1) {
        this.head = this.increase(this.head)
      }
      this.size--
      return headValue
    } else {
      throw new Error()
    }
  }

  canPop() {
    return this.size > 0
  }

  canPush() {
    return this.size < this.maxSize
  }

  increase(index) {
    return (index + 1) % this.maxSize
  }

  decrease(index) {
    return index === 0 ? this.maxSize - 1 : index - 1
  }
}

