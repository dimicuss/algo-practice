const snail = (mtx) => {
    let size = mtx.length
    let rS = 0
    let cS = 0

    const result = []

    while (size >= 1) {
        if (size >= 1) {
            for (let i = cS; i < cS + size; i++) {
                result.push(mtx[rS][i])
            }
        }

        if (size >= 2) {
            for (let i = rS + 1; i < rS + size; i++) {
                result.push(mtx[i][cS + size - 1])
            }

            for (let i = cS + size - 2; i >= cS; i--) {
                result.push(mtx[rS + size - 1][i])
            }
        }

        if (size >= 3) {
            for (let i = rS + size - 2; i > rS; i--) {
                result.push(mtx[i][cS])
            }
        }

        size = size - 2
        cS = cS + 1
        rS = rS + 1
    }

    return result
}

console.log(snail([[]]))
