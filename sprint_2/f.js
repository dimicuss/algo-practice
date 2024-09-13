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
  const [command, arg] = readLine().split(' ')
  return [command, Number(arg)]
}

function solve() {
  let n = readNumber()
  const stack = new StackMax()

  while (n--) {
    const [command, arg] = readCommand()

    const result = stack[command](arg)

    if (command === 'get_max') {
      if (result === undefined) {
        console.log('None')
      } else {
        console.log(result)
      }
    }

    if (command === 'pop' && result === undefined) {
      console.log('error')
    }
  }
}

class StackMax {
  stack = []
  max = []

  push(n) {
    const lastMax = this.get_max() ?? -Infinity
    const nextMax = Math.max(lastMax, n)
    this.max.push(nextMax)
    this.stack.push(n)
  }

  pop() {
    this.max.pop()
    return this.stack.pop()
  }

  get_max() {
    return this.max[this.max.length - 1]
  }
}

