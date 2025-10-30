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
    const index = elements.findIndex(el => el.row === row && el.col === col)
    elements[index].content = content
}

function drawTicTac() {
    const ticTac = document.getElementById("TicTac")
    elements.forEach(function (el) {
            const div = ticTac.querySelector(`[data-row="${el.row}"][data-col="${el.col}"]`);
            div.textContent = el.content
        }
    )
}
document.addEventListener("DOMContentLoaded", function () {
    drawTicTac()
})