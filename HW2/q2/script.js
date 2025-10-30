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
    const element = elements[index]
    if (element.content) {
        alert("Item already full!")
    } else {
        element.content = content
        drawTicTac()
    }
}

function putOnEmptyColumn(col, content) {
    const index = elements.findLastIndex(el => el.col === Number(col) && el.content.length === 0)
    if (index === -1) {
        return false;
    } else {
        const element = elements[index]
        element.content = content
        return true;
    }
}

function drawTicTac() {
    const ticTac = document.getElementById("TicTac")
    elements.forEach(function (el) {
            const div = ticTac.querySelector(`[data-row="${el.row}"][data-col="${el.col}"]`);
            div.textContent = el.content
        }
    )
}


function win(winner) {
    alert(`${winner} won the game!`)
}

function readyAtRelativePosition(element, position, env) {
    position = Number(position);
    const columnPosition = env ? -position : position
    return elements.findIndex(el => el.row === element.row + position && el.col === element.col + columnPosition && el.content === "O") !== -1;
}

function isCrossWin(element) {
    const doubleUpperLeftReady = readyAtRelativePosition(element, -2, false)
    const upperLeftReady = readyAtRelativePosition(element, -1, false)
    const lowerRightReady = readyAtRelativePosition(element, +1, false)
    const doubleLowerRightReady = readyAtRelativePosition(element, +2, false)
    const doubleUpperRightReady = readyAtRelativePosition(element, -2, true)
    const upperRightReady = readyAtRelativePosition(element, -1, true)
    const lowerLeftReady = readyAtRelativePosition(element, +1, true)
    const doubleLowerLeftReady = readyAtRelativePosition(element, +2, true)
    return (doubleUpperLeftReady && upperLeftReady || upperLeftReady && lowerRightReady || lowerRightReady && doubleLowerRightReady || doubleUpperRightReady && upperRightReady || upperRightReady && lowerLeftReady || lowerLeftReady && doubleLowerLeftReady)
}

function winIfCan() {
    for (const element of elements) {
        if (element.content.length !== 0) {
            continue;
        }
        const colElementsReadyForWin = elements.filter(el => el.col === element.col && el.content === "O").length === 2;
        const rowElementsReadyForWin = elements.filter(el => el.row === element.row && el.content === "O").length === 2;
        const isCrossReady = isCrossWin(element);
        if (colElementsReadyForWin || rowElementsReadyForWin || isCrossReady) {
            setElement(element.row, element.col, "O")
            win("Computer")
            return true;
        }
    }
    return false;
}

function botRandomMove() {
    for(const element of elements){
        const result = putOnEmptyColumn(element.col,"O")
        if(result){
            break;
        }
    }
}

function botMove() {
    if(winIfCan()) return;
    botRandomMove();
}

function listenClick() {
    const ticTac = document.getElementById("TicTac")
    ticTac.addEventListener("click", function (event) {
        const target = event.target
        const col = target.dataset.col
        const result = putOnEmptyColumn(
            col,
            "X"
        )
        if(result){
            botMove();
            drawTicTac();
        }else{
            alert("Column already full!")
        }
    })
}

document.addEventListener("DOMContentLoaded", function () {
    // drawTicTac()
    listenClick();
})