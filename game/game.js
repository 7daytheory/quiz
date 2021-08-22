const question = document.querySelector("#question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector(".progressBarFull");

console.log(choices);

let currentQuestion = {}; //OBJECT
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("../questions.json")
.then(res => {
    return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
})
.catch(err => {
    console.log(err);
})

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 9;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //Go to end Page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question${questionCounter}/${MAX_QUESTIONS}`;
    
    //update the progress bar 
    console.log(`${(questionCounter / MAX_QUESTIONS) * 100}%`);
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
		
		let classToApply;
		
		if(currentQuestion.answer == selectedAnswer) {
        classToApply = "correct";
		} else {
		classToApply = "incorrect";
		}
		
        
        if(classToApply === "correct") {
          incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}
