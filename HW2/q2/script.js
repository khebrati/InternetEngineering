const elements = [
    {
        col: 0,
        row: 0,
        content: ""
    },
    {
        col: 1,
        row: 0,
        content: ""
    },
    {
        col: 2,
        row: 0,
        content: ""
    },
    {
        col: 0,
        row: 1,
        content: ""
    },
    {
        col: 1,
        row: 1,
        content: ""
    },
    {
        col: 2,
        row: 1,
        content: ""
    },
    {
        col: 0,
        row: 2,
        content: ""
    },
    {
        col: 1,
        row: 2,
        content: ""
    },
    {
        col: 2,
        row: 2,
        content: ""
    }
]

function getElement(row, col) {
    return elements.find(el => el.row === row && el.col === col).content
}

function setElement(row, col, content) {
    const index = elements.findIndex(el => el.row === Number(row) && el.col === Number(col))
    elements[index].content = content
    drawTicTac()
}

function drawTicTac() {
    const ticTac = document.getElementById("TicTac")
    elements.forEach(function (el) {
            const div = ticTac.querySelector(`[data-row="${el.row}"][data-col="${el.col}"]`);
            div.textContent = el.content
        }
    )
}

function listenClick() {
    const ticTac = document.getElementById("TicTac")
    ticTac.addEventListener("click",function (event) {
        const target = event.target
        const row = target.dataset.row
        const col = target.dataset.col
        setElement(
            row,
            col,
            "X"
        )
    })
}

document.addEventListener("DOMContentLoaded", function () {
    // drawTicTac()
    listenClick();
})