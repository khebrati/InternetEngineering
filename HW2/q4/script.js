const cards = [
    {
        Id: 0,
        Content: 0,
        show: true 
    },
    {
        Id: 1,
        Content: 1,
        show: true 
    },
    {
        Id: 2,
        Content: 2,
        show: true 
    },
    {
        Id: 3,
        Content: 3,
        show: true 
    },
    {
        Id: 4,
        Content: 0,
        show: true 
    },
    {
        Id: 5,
        Content: 0,
        show: true 
    },
    {
        Id: 6,
        Content: 0,
        show: true 
    },
    {
        Id: 7,
        Content: 0,
        show: true 
    },
    {
        Id: 8,
        Content: 0,
        show: true 
    },
    {
        Id: 9,
        Content: 0,
        show: true 
    },

    {
        Id: 10,
        Content: 0,
        show: true 
    },
    {
        Id: 11,
        Content: 0,
        show: true 
    },
    {
        Id: 12,
        Content: 0,
        show: true 
    },
    {
        Id: 13,
        Content: 0,
        show: true 
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
            return;
        }
        cardUi.textContent = card.Content
    }
}
document.addEventListener("DOMContentLoaded",function(event){
    updateUI()
});
