const cards = [
    {
        Id: 0,
        Content: 0,
        show: false 
    },
    {
        Id: 1,
        Content: 1,
        show: false 
    },
    {
        Id: 2,
        Content: 2,
        show: false 
    },
    {
        Id: 3,
        Content: 3,
        show: false 
    },
    {
        Id: 4,
        Content: 0,
        show: false 
    },
    {
        Id: 5,
        Content: 0,
        show: false 
    },
    {
        Id: 6,
        Content: 0,
        show: false 
    },
    {
        Id: 7,
        Content: 0,
        show: false 
    },
    {
        Id: 8,
        Content: 0,
        show: false 
    },
    {
        Id: 9,
        Content: 0,
        show: false 
    },

    {
        Id: 10,
        Content: 0,
        show: false 
    },
    {
        Id: 11,
        Content: 0,
        show: false 
    },
    {
        Id: 12,
        Content: 0,
        show: false 
    },
    {
        Id: 13,
        Content: 0,
        show: false 
    },
    {
        Id: 14,
        Content: 0,
        show: false
    },
    {
        Id: 15,
        Content: 0,
        show: false
    },
]

function show(cardId){
    cards.find(card => card.Id === cardId).show =true
}
function hide(cardId){
    cards.find(card => card.Id === cardId).show = false
}

function updateUI(){
    const board = document.getElementById("board")
    // for(const card of cards){
    //     board.querySelector("[]")
    // }
    const cardsUi = board.querySelectorAll(".card")
    for(let cardUi of cardsUi){
        const cardId = Number(cardUi.dataset.id)
        const card = cards.find(card => card.Id === cardId)
        if(!card.show){
            cardUi.textContent = "";
            continue;
        }
        cardUi.textContent = card.Content
    }
}
function listenForCardClick(){
    const board = document.getElementById("board");
    board.addEventListener("click",function(event){
        const clickedId = event.target.dataset.id;
        show(Number(clickedId));
        updateUI();
    });
}
document.addEventListener("DOMContentLoaded",function(event){
    // updateUI()
    listenForCardClick();
});
