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

const readNumber = () => {
  return Number(readLine())
}

const parseMinutes = (str) => {
  const [hours, minutes = 0] = str.split('.').map((str) => Number(str))
  return hours * 60 + minutes
}

const readSchedule = () => {
  const [start, end] = readLine().split(' ')
  return {start: parseMinutes(start), end: parseMinutes(end), initialStart: start, initialEnd: end}
}

function getMaximalSchedule(schedule) {
  const sortedSchedule = [...schedule.sort((a, b) => b.end - a.end || b.start - a.start)]

  let previousLesson = sortedSchedule.pop()
  const result = []

  if (previousLesson) {
    result.push(previousLesson)
  }

  while (sortedSchedule.length > 0) {
    const lesson = sortedSchedule.pop()

    if (lesson.start >= previousLesson.end) {
      result.push(lesson)
      previousLesson = lesson
    }
  }

  return result
}

function solve() {
  let n = readNumber()
  const schedule = []

  while (n--) {
    schedule.push(readSchedule())
  }

  const result = getMaximalSchedule(schedule)

  console.log(result.length)
  result.forEach((lesson) => {
    console.log(lesson.initialStart, lesson.initialEnd)
  })
}


