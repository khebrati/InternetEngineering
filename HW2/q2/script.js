const questions = [
    {
        questions: "What is the capital of france?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "What is 2+2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What color is the sky?",
        options: ["Blue", "Green", "Red", "Yello"],
        answer: "Blue"
    },
    {
        question: "What is the largest planet",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Jupiter"
    },
    {
        question: "Who wrote Romeo and juliet?",
        options: ["Shakespeare", "Dickens", "Tolkien", "Austen"],
        answer: "Shakespeare"
    }
];
const areAnswersCorrect = [false, false, false, false, false]
let currentQuestionIndex = 0;
let currentSelectedOption = "Paris"

function getCurrentQuestion() {
    return questions[currentQuestionIndex]
}

function getCurrentOptions() {
    return getCurrentQuestion().options
}


let isDone = false

function getScore() {
    return areAnswersCorrect.filter(v => v === true).length;
}

function handleRadioClick() {
    const optionsDiv = document.getElementById("options")
    optionsDiv.addEventListener("click", function (event) {
        const label = event.target.closest("label").textContent
        if(label){
            currentSelectedOption = label
        }
    })
}



function makeOptionUi(option) {
    return `
        <label class="option">
            <input type="radio" name="options">${option}
        </label>
    `
}

function updateOptions() {
    const options = document.getElementById("options")
    options.innerHTML = ""
    getCurrentOptions().forEach(function (option) {
        options.innerHTML += makeOptionUi(option)
    })
}

function updateQuestion() {
    const question = document.getElementById("question")
    question.textContent = getCurrentQuestion().question
}

function goNextQuestion() {
    updateQuestion();
    updateOptions();
}


function recordScore() {
    if(currentSelectedOption === getCurrentQuestion().answer){
        areAnswersCorrect[currentQuestionIndex] = true
    }
}

function handleDone() {

}

function nextOrDone() {
    currentQuestionIndex += 1
    if(currentQuestionIndex >= questions.length){
        handleDone()
        console.log("done")
    }else{
        goNextQuestion()
    }
}

function handleNextClick() {
    const nextButton = document.getElementById("next-done-button")
    nextButton.addEventListener("click", function (event) {
        console.log("received next click")
        if(!currentSelectedOption){
            alert("You must choose an answer!")
        }else{
            recordScore()
            nextOrDone()
        }
    })
}

function handleEvents() {
    handleRadioClick()
    handleNextClick()
}

document.addEventListener("DOMContentLoaded", function () {
    handleEvents();
})
