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

function restart(){
    hideAll();
    randomize();
}

function hideAll(){
    for(let card of cards){
        card.show = false;
    }
}

function randomize() {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];
    const shuffled = shuffle(letters);
    for(let i in cards){
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
function show(cardId) {
    cards.find(card => card.Id === cardId).show = true
}
function hide(cardId) {
    cards.find(card => card.Id === cardId).show = false
}

function updateUI() {
    const board = document.getElementById("board")
    // for(const card of cards){
    //     board.querySelector("[]")
    // }
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
}
function listenForCardClick() {
    const board = document.getElementById("board");
    board.addEventListener("click", function (event) {
        const clickedId = event.target.dataset.id;
        show(Number(clickedId));
        updateUI();
    });
}

function listenForRestart(){
    const restartButton = document.getElementById("restart");
    restartButton.addEventListener("click",function(event){
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
