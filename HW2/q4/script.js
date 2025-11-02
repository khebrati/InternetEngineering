const cards = [
    {
        Id: 0,
        Content: "A",
        show: false
    },
    {
        Id: 1,
        Content: "B",
        show: false
    },
    {
        Id: 2,
        Content: "C",
        show: false
    },
    {
        Id: 3,
        Content: "D",
        show: false
    },
    {
        Id: 4,
        Content: "E",
        show: false
    },
    {
        Id: 5,
        Content: "F",
        show: false
    },
    {
        Id: 6,
        Content: "G",
        show: false
    },
    {
        Id: 7,
        Content: "H",
        show: false
    },
    {
        Id: 8,
        Content: "A",
        show: false
    },
    {
        Id: 9,
        Content: "B",
        show: false
    },

    {
        Id: 10,
        Content: "C",
        show: false
    },
    {
        Id: 11,
        Content: "D",
        show: false
    },
    {
        Id: 12,
        Content: "E",
        show: false
    },
    {
        Id: 13,
        Content: "F",
        show: false
    },
    {
        Id: 14,
        Content: "G",
        show: false
    },
    {
        Id: 15,
        Content: "H",
        show: false
    },
]
let showStreakInfo = false;

function restart() {
    hideAll();
    randomize();
    isLock = false;
    move = 0;
    score = 0;
    streak = 0;
    streakScore = 0;
    isWon = false;
    firstClickedId = null;
    showStreakInfo = false;
}

function hideAll() {
    for (let card of cards) {
        card.show = false;
    }
}

function randomize() {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];
    const shuffled = shuffle(letters);
    for (let i in cards) {
        cards[i].Content = shuffled[i];
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function getCard(id) {
    return cards.find(card => card.Id === id)
}
function show(cardId) {
    getCard(cardId).show = true
}
function hide(cardId) {
    getCard(cardId).show = false
}

function updateUI() {
    const board = document.getElementById("board")
    const cardsUi = board.querySelectorAll(".card")
    for (let cardUi of cardsUi) {
        const cardId = Number(cardUi.dataset.id)
        const card = cards.find(card => card.Id === cardId)
        if (!card.show) {
            cardUi.textContent = "";
            continue;
        }
        cardUi.textContent = card.Content
    }
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score;
    const moveElement = document.getElementById("move");
    moveElement.textContent = move;
    const streakElement = document.getElementById("streak");
    streakElement.textContent = streak;
    const streakScoreEl = document.getElementById("streakScore");
    streakScoreEl.textContent = streakScore;
    const showStrickInfoPara = document.getElementById("streakInfo");
    if (showStreakInfo) {
        showStrickInfoPara.style.display = "inline";
    } else {
        showStrickInfoPara.style.display = "none";
    }
    const isWonEl = document.getElementById("won");
    if(isWon){
        isWonEl.style.display = "inline"
    }else{
        isWonEl.style.display = "none"
    }
}
let isWon = false;
let isLock = false;
let move = 0;
let score = 0;
let streak = 0;
let streakScore = 0;
function addScore() {
    streak++;
    streakScore = streak * 100;
    score = score + streakScore;
}
let firstClickedId = null;
function listenForCardClick() {
    const board = document.getElementById("board");
    board.addEventListener("click", function (event) {
        if(isWon){
            restart();
            return;
        }
        if (isLock) {
            return;
        }
        let clickedId = event.target.dataset.id;
        if (clickedId === undefined) {
            return;
        }
        clickedId = Number(clickedId);
        move++;
        show(Number(clickedId));
        if (firstClickedId === null) {
            firstClickedId = clickedId;
            updateUI();
            return;
        }
        if (firstClickedId === clickedId) {
            alert("Choose another card!");
            return;
        }
        isLock = true;
        const firstClickedCard = getCard(firstClickedId);
        const secondClickedCard = getCard(clickedId);
        if (firstClickedCard.Content === secondClickedCard.Content) {
            console.log("Correct!");
            addScore();
            firstClickedId = null;
            showStreakInfo = true;
            isLock = false;
            if(allCardsShown()){
                showStreakInfo = false;
                isWon = true;
            }
            updateUI();
            return;
        }
        onLoose(firstClickedCard, secondClickedCard);
    });
}
function allCardsShown(){
    let allShown = true;
    for(let card of cards){
        if(!card.show){
            allShown = false;
        }
    }
    return allShown;
}

function onLoose(firstClickedCard, secondClickedCard) {
    updateUI();
    setTimeout(() => {
        firstClickedCard.show = false;
        secondClickedCard.show = false;
        streak = 0;
        console.log("Wrong!");
        showStreakInfo = false;
        firstClickedId = null;
        updateUI();
        isLock = false;
    }, 2000);
}

function listenForRestart() {
    const restartButton = document.getElementById("restart");
    restartButton.addEventListener("click", function (event) {
        restart();
        updateUI();
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
    listenForCardClick();
    listenForRestart();
    randomize();
    updateUI();
});
