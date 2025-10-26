const logLine = (line, size) => {
    const sizeWithSpaces = Math.max(size * 2 - 1, 0)

    const lineToLog = line
            .split('')
            .join(' ')

    const padSize = (sizeWithSpaces - lineToLog.length) / 2

    console.log(
        ' '.repeat(padSize) + lineToLog + ' '.repeat(padSize)
    )
}

const map = {
    R: { R: 'R', G: 'B', B: 'G' },
    G: { R: 'B', G: 'G', B: 'R' },
    B: { R: 'G', G: 'R', B: 'B' },
}

const getNextColor = (a, b) => {
    if (a && b) {
        return map[a][b]
    }

    return a
}

const dp = {}

const triangle = (str) => {
    if (dp[str]) {
        return dp[str]
    }

    if (str.length > 2) {
        const half = Math.ceil(str.length / 2)
        const nextLine = []

        for (let i = 0; i < str.length - (half - 1); i++) {
            const subStr = str.slice(i, i + half)
            nextLine.push(triangle(subStr))
        }

        const result = triangle(nextLine.join(''))

        dp[str] = result
        return result
    }

    if (str.length > 1) {
        const [a, b] = str
        const result = getNextColor(a, b)

        dp[str] = result
        return result
    }

    return str
}
