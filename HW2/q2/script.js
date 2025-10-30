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
let lastSetIndex = null;
function putOnEmptyColumn(col, content) {
    const index = elements.findLastIndex(el => el.col === Number(col) && el.content.length === 0)
    if (index === -1) {
        return false;
    } else {
        const element = elements[index]
        element.content = content
        lastSetIndex = index;
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


function showWinMessage(winner) {
    alert(`${winner} won the game!`)
}

function readyAtRelativePosition(letter, element, position, env) {
    position = Number(position);
    const columnPosition = env ? -position : position
    return elements.findIndex(el => el.row === element.row + position && el.col === element.col + columnPosition && el.content === letter) !== -1;
}

function isCrossReadyForWin(letter, element) {
    const doubleUpperLeftReady = readyAtRelativePosition(letter, element, -2, false)
    const upperLeftReady = readyAtRelativePosition(letter, element, -1, false)
    const lowerRightReady = readyAtRelativePosition(letter, element, +1, false)
    const doubleLowerRightReady = readyAtRelativePosition(letter, element, +2, false)
    const doubleUpperRightReady = readyAtRelativePosition(letter, element, -2, true)
    const upperRightReady = readyAtRelativePosition(letter, element, -1, true)
    const lowerLeftReady = readyAtRelativePosition(letter, element, +1, true)
    const doubleLowerLeftReady = readyAtRelativePosition(letter, element, +2, true)
    return (doubleUpperLeftReady && upperLeftReady || upperLeftReady && lowerRightReady || lowerRightReady && doubleLowerRightReady || doubleUpperRightReady && upperRightReady || upperRightReady && lowerLeftReady || lowerLeftReady && doubleLowerLeftReady)
}

// function winIfCan() {
//     for (const element of elements) {
//         if (element.content.length !== 0) {
//             continue;
//         }
//         const colElementsReadyForWin = elements.filter(el => el.col === element.col && el.content === "O").length === 2;
//         const rowElementsReadyForWin = elements.filter(el => el.row === element.row && el.content === "O").length === 2;
//         const isCrossReady = isCrossReadyForWin("O", element);
//         if (colElementsReadyForWin || rowElementsReadyForWin || isCrossReady) {
//             setElement(element.row, element.col, "O")
//             return true;
//         }
//     }
//     return false;
// }

function isWon(letter) {
    for (let row = 0; row < 3; row++) {
        let allMatch = true
        elements.filter(el => el.row === row).forEach(function (el) {
            if (el.content !== letter) {
                allMatch = false
            }
        })
        if (allMatch) {
            return true
        }
    }
    for (let col = 0; col < 3; col++) {
        let allMatch = true
        elements.filter(el => el.col === col).forEach(function (el) {
            if (el.content !== letter) {
                allMatch = false
            }
        })
        if (allMatch) {
            return true
        }
    }
    if (getElement(0, 0) === letter && getElement(1, 1) === letter && getElement(2, 2) === letter) {
        return true;
    }
    if (getElement(2, 0) === letter && getElement(1, 1) === letter && getElement(0, 2) === letter) {
        return true;
    }
    return false;
}
function allFilled() {
    let allFilled = true;
    for(const element of elements){
        if(element.content.length ===0){
            allFilled = false
        }
    }
    return allFilled
}
function botRandomMove() {
    while (true) {
        if(allFilled()) break;
        const randomCol = Math.floor(Math.random() * 3)
        const result = putOnEmptyColumn(randomCol, "O")
        if (result) {
            break;
        }
    }
}
function undoLast(){
    elements[lastSetIndex].content = ""
}
function winIfCan(){
    for(let col = 0;col < 3;col++){
        const result = putOnEmptyColumn(col);
        if(!result){
            continue;
        }
        if(!isWon("O")){
            undoLast();
            continue;
        }
        return true;
    }
    return false;
}
function botMove() {
    if (winIfCan()) return;
    botRandomMove();
}

function reset(){
    for(const element of elements){
        element.content = ""
    }
    lastSetIndex = null;
    gameDone = false;
    drawTicTac();
}

let gameDone=false;
function listenClick() {
    const ticTac = document.getElementById("TicTac")
    ticTac.addEventListener("click", function (event) {
        if(gameDone){
            gameDone = false;
            reset();
            return;
        }
        const target = event.target
        const col = target.dataset.col
        const result = putOnEmptyColumn(
            col,
            "X"
        )
        if (!result) {
            alert("Column already full!")
            return;
        }
        drawTicTac();
        if(isWon("X")){
            showWinMessage("You");
            gameDone = true;
            return;
        }
        botMove();
        drawTicTac();
        if(isWon("O")){
            showWinMessage("Computer");
            gameDone = true;
            return;
        }
        if(allFilled()){
            alert("Draw!");
            gameDone = true
        }
    })
}

function listenButtonClick() {
    const resetButton = document.getElementById("restart-button");
    resetButton.addEventListener("click",function () {
        reset();
    })
}

document.addEventListener("DOMContentLoaded", function () {
    listenClick();
    listenButtonClick();
})