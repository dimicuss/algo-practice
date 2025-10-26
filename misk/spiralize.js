const spiralize = (n) => {
    const mtx = []

    for (let i = 0; i < n; i++) {
        if (mtx[i] === undefined) {
            mtx[i] = []
        }

        for (let j = 0; j < n; j++) {
            mtx[i][j] = 0
        }
    }

    let size = n
    let rS = 0
    let cS = 0

    while (size >= 1) {

        if (size >= 1) {
            for (let i = cS; i < cS + size; i++) {
                mtx[rS][i] = 1
            }
        }

        if (size >= 2) {
            for (let i = rS; i < rS + size; i++) {
                mtx[i][cS + size - 1] = 1
            }
        }

        if (size >= 3) {
            for (let i = cS; i < cS + size; i++) {
                mtx[rS + size - 1][i] = 1
            }
        }

        if (size >= 4) {
            for (let i = rS + 2; i < rS + size; i++) {
                mtx[i][cS] = 1
            }
        }

        if (mtx[rS][cS - 1] !== undefined) {
            mtx[rS][cS - 1] = 1
        }

        size = size - 4
        cS = cS + 2
        rS = rS + 2
    }

    return mtx
}

spiralize(10).forEach((row) => {
    console.log(row.map((item) => item ? '0' : '.').join(''))
})
