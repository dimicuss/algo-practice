const {readFile} = require("fs");
const {inspect} = require("util");

const atom = '(?:[A-ZА-ЯЁ][a-zа-яё]+(?:-[a-zа-я]+)?)'
const space = '\\s+'
const infixes = ['да']

const word = `${atom}(?:${space}(?:${infixes.join('|')})${space}${atom})?`
const reduction = `[A-ZА-ЯЁ]\\.`


const matchers = [
  `(${word})(?=${space}${word})`,
  `(${word})`,
  `(${reduction})(?=(?:\\s?${reduction})|(?:\\s?${word}))`
].join('|')

const matchNames = (string) => {
  const regex = new RegExp(matchers, 'g')

  let result
  let results = []
  let chainedResults = []

  while ((result = regex.exec(string)) !== null) {
    const chainedWord = result[1]
    if (chainedWord) {
      chainedResults.push({
        start: result.index,
        end: result.index + chainedWord.length,
        string: chainedWord
      })
    }

    const word = result[2]
    if (word) {
      chainedResults.push({
        start: result.index,
        end: result.index + word.length,
        string: word
      })

      if (chainedResults.length > 1) {
        results.push({
          sequence: chainedResults,
          allSubscequences: getSubSequences(chainedResults)
        })
      }

      chainedResults = []
    }

    const reduction = result[3]
    if (reduction) {
      chainedResults.push({
        start: result.index,
        end: result.index + reduction.length,
        string: reduction
      })
    }
  }

  if (chainedResults.length > 1) {
    results.push({
      sequence: chainedResults,
      allSubscequences: getSubSequences(chainedResults)
    })
  }

  return results
}

const getPermutations = (itemsToClone) => {
  const result = []
  const items = [...itemsToClone]

  const counters = Array.from({length: items.length}, () => 0)

  result.push(
    [...items]
  )

  let i = 1;
  while (i < items.length) {
    if (counters[i] < i) {
      if (i % 2 === 0) {
        swap(items, 0, i)
      } else {
        swap(items, counters[i], i)
      }

      result.push(
        [...items]
      )

      counters[i] += 1

      i = 1
    } else {
      counters[i] = 0
      i += 1
    }
  }

  return result
}

const swap = (items, iA, iB) => {
  const toSwap = items[iA]
  items[iA] = items[iB]
  items[iB] = toSwap
}

const maxWindowSize = 6
const getSubSequences = (sequence) => {
  const result = []

  for (let windowSize = 2; windowSize <= maxWindowSize; windowSize++) {
    for (let i = 0; i < sequence.length - windowSize + 1; i++) {
      const subSequence = []

      for (let j = i; j < i + windowSize; j++) {
        subSequence.push(sequence[j])
      }

      result.push({subSequence, permutations: getPermutations(subSequence)})
    }
  }

  return result
}

readFile(0, (_, data) => {
  console.log(inspect(matchNames(data.toString()), false, Infinity))
})
