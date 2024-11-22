const {readFile} = require("fs");
const {inspect} = require("util");
const data = require('./data.json')

const atom = '(?:[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ]+(?:-[a-zа-яA-ZА-ЯЁ]+)?)'
const space = '\\s+'
const infixes = ['да', 'дер']

const word = `${atom}(?:${space}(?:${infixes.join('|')})${space}${atom})?`
const reduction = `[A-ZА-ЯЁ]\\.`

const matchers = [
  `(${word})(?=${space}${word})`,
  `(${word})`,
  `(${reduction})(?=(?:\\s?${reduction})|(?:\\s?${word}))`
].join('|')

const handledData = data.filter(({title}) => title.length > 0)

const matchNames = (string) => {
  const regex = new RegExp(matchers, 'g')

  let result
  let matchedNames = []
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
        matchedNames.push(getSubSequences(chainedResults))
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
    matchedNames.push(getSubSequences(chainedResults))
  }

  const matchResult = []

  matchedNames.forEach((match) => {
    const matches = []
    match.forEach(({start, end, permutations}) => {
      permutations.forEach((permutation) => {
        handledData.forEach(({title}) => {
          const ratio = countEditoralSize(permutation, title) / title.length
          matches.push({permutation, title, ratio, start, end})
        })
      })
    })

    const maximalMatch = matches.sort((a, b) => a.ratio - b.ratio)[0]

    matchResult.push(maximalMatch)
  })

  return matchResult
}

function countEditoralSize(a, b) {
  let dp = Array.from({length: b.length + 1}, (_, i) => i)

  for (let i = 1; i <= a.length; i++) {
    const newDp = Array.from({length: b.length + 1}).fill(i)

    for (let j = 1; j <= b.length; j++) {
      newDp[j] = Math.min(
        newDp[j - 1] + 1,
        dp[j] + 1,
        dp[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      )
    }

    dp = newDp
  }

  return dp[b.length]
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

const maxWindowSize = 6
const getSubSequences = (sequence) => {
  const result = []

  for (let windowSize = 2; windowSize <= maxWindowSize; windowSize++) {
    for (let i = 0; i < sequence.length - windowSize + 1; i++) {
      const subSequence = []

      for (let j = i; j < i + windowSize; j++) {
        subSequence.push(sequence[j])
      }

      result.push({
        start: subSequence[0].start,
        end: subSequence[subSequence.length - 1].end,
        permutations: getPermutations(subSequence).map((permutation) => permutation.map(({string}) => string).join(' '))
      })
    }
  }

  return result
}

const swap = (items, iA, iB) => {
  const toSwap = items[iA]
  items[iA] = items[iB]
  items[iB] = toSwap
}

readFile(0, (_, data) => {
  console.log(inspect(matchNames(data.toString()), false, Infinity))
})

