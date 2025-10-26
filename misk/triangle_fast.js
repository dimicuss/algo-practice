const colorMap = {
    R: { R: 'R', G: 'B', B: 'G' },
    G: { R: 'B', G: 'G', B: 'R' },
    B: { R: 'G', G: 'R', B: 'B' },
}

const triangle = (row) => {
    let currentRow = row

    while (currentRow.length > 1) {
        const validTriangle = 3 ** Math.floor(Math.log(currentRow.length - 1) / Math.log(3)) + 1
        let nextRow = ''

        for (let i = 0; i < currentRow.length - (validTriangle - 1); i++) {
            const aColor = currentRow[i]
            const bColor = currentRow[i + (validTriangle - 1)]
            const nextColor = colorMap[aColor][bColor]

            nextRow += nextColor
        }

        currentRow = nextRow
    }

    return currentRow
}
