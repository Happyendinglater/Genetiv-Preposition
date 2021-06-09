const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "_____ sprach sein Assistent.",
        choice1: "Anstatt des Direktors",
        choice2: 'Wegen des neuen Teppichs',
        choice3: 'Trotz der Größe',
        
        answer: 1,
    },
    {
        question: "_____ mag ich das Auto.",
        choice1: "Während der Ferien",
        choice2: "Trotz der grellen Farbe",
        choice3: "Außerhalb der Uni",
        
        answer: 2,
    },
    {
        question: "Immer mehr Deutsche machen Reisen _____.",
        choice1: "wegen der Haustiere",
        choice2: "innerhalb Deutschlands",
        choice3: "außerhalb der Öffnungszeiten",
        
        answer: 3,
    },
    {
        question: "Unser Professor ist _____ nicht erreichbar.",
        choice1: "wegen des Autos",
        choice2: "trotz des Preises",
        choice3: "außerhalb des Seminars",
        
        answer: 3,
    },
    {
        question: "Der Versand von Büchern _____ kostet pauschal CHF 7,00.",
        choice1: "wegen heftigen Regens",
        choice2: "innerhalb der Schweiz",
        choice3: "außerhalb der Bibliothek",
        
        answer: 2,
    },
    {
        question: "Ich habe _____ mein erstes Geld verdient.",
        choice1: "während der Schule",
        choice2: "statt des Königs",
        choice3: "wegen eines Beins",
        
        answer: 1,
    },
    {
        question: "Die Mannschaft hat drei Spiele _____ gespielt.",
        choice1: "innerhalb einer Woche",
        choice2: "statt eines Anrufs",
        choice3: "trotz ihrer Großeltern",
        
        answer: 1,  
    },
    {
        question: "Unser Hotel steht nur wenige Kilometer _____.",
        choice1: "statt des Kinos",
        choice2: "trotz meiner Eltern",
        choice3: "außerhalb der Stadt",
        
        answer: 3,
    },
    {
        question: "Lufthansa hat _____ des Pilotenstreiks viele Flüge gestrichen.",
        choice1: "wegen",
        choice2: "anstatt",
        choice3: "trotz",
        
        answer: 1,
    },
    {
        question: "Kann ich meine Buchung noch _____ der Reise ändern?",
        choice1: "während",
        choice2: "trotz",
        choice3: "statt",
        
        answer: 1,
    },
    {
        question: "Bertholt kaufte _____ eines Bettes einen Futon.",
        choice1: "innerhalb",
        choice2: "statt",
        choice3: "wegen",
        
        answer: 2,
    },
    {
        question: "Die deutsche Sprache gewinnt _____ der Internationalisierung immer mehr Bedeutung.",
        choice1: "anstatt",
        choice2: "aufgrund",
        choice3: "außerhalb",
        
        answer: 2,
    },
    {
        question: "Sollten Angestellte _____ ihrer Arbeitszeiten für Kunden erreichbar sein?",
        choice1: "statt",
        choice2: "außerhalb",
        choice3: "trotz",
        
        answer: 2,
    },
    {
        question: "_____ des Studiums war ich von meinen Eltern finanziell abhängig.",
        choice1: "Statt",
        choice2: "Während ",
        choice3: "Mithilfe",
        
        answer: 2,
    },
    {
        question: "_____ der EU können alle EU-Bürger frei reisen und wohnen.",
        choice1: "Während",
        choice2: "Anstatt",
        choice3: "Innerhalb",
        
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
