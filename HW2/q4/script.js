const cards = [
    {
        Id: 0,
        Content: 0
    },
    {
        Id: 1,
        Content: 0
    },
    {
        Id: 2,
        Content: 0
    },
    {
        Id: 3,
        Content: 0
    },
    {
        Id: 4,
        Content: 0
    },
    {
        Id: 5,
        Content: 0
    },
    {
        Id: 6,
        Content: 0
    },
    {
        Id: 7,
        Content: 0
    },
    {
        Id: 8,
        Content: 0
    },
    {
        Id: 9,
        Content: 0
    },

    {
        Id: 10,
        Content: 0
    },
    {
        Id: 11,
        Content: 0
    },
    {
        Id: 12,
        Content: 0
    },
    {
        Id: 13,
        Content: 0
    },
    {
        Id: 14,
        Content: 0
    },
    {
        Id: 15,
        Content: 0
    },
]
function updateUI(){
    const board = document.getElementById("board")
    // for(const card of cards){
    //     board.querySelector("[]")
    // }
    const cardsUi = board.querySelectorAll(".card")
    for(let cardUi of cardsUi){
        const cardId = Number(cardUi.dataset.id)
        const card = cards.find(card => card.Id === cardId)
        cardUi.textContent = card.Content
    }
}
document.addEventListener("DOMContentLoaded",function(event){
    updateUI()
});
