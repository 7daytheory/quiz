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

let questions = [
    {
        question: "What is the name of the all-time rushing leader for the Kansas City Chiefs?",
        choice1: "Spencer Ware",
        choice2: "Priest Holmes",
        choice3: "Jamaal Charles",
        choice4: "Larry Johnson",
        answer: "3"
    },
    {
        question: "In which Super Bowl did the Chiefs make their first appearance?",
        choice1: "Super Bowl IV",
        choice2: "Super Bowl LIV",
        choice3: "Super Bowl I",
        choice4: "Super Bowl XIX",
        answer: "3"
    },
    {
        question: "What is the name of the 5-time Pro Bowl safety who played for the Chiefs from 2010 to 2018?",
        choice1: "Eric Berry",
        choice2: "Lloyd Burruss",
        choice3: "Tyrann Mathieu",
        choice4: " Johnny Robinson",
        answer: "1"
    },
    {
        question: "Who was the first head coach of the Kansas City Chiefs?",
        choice1: "Lamar Hunt",
        choice2: "Hank Stram",
        choice3: "Marv Levy",
        choice4: "Paul Wiggin",
        answer: "2"
    },
    {
        question: "As of 2019, what is the name of the stadium in which the Kansas City Chiefs play?",
        choice1: "Arrowhead Stadium",
        choice2: "CenturyLink Field",
        choice3: "Municipal Stadium",
        choice4: "Cotton Bowl",
        answer: "1"
    },
    {
        question: "Which Chiefs Hall of Fame linebacker played for 11 seasons, had 126.5 sacks, and was selected for 9 Pro Bowls?",
        choice1: "Derrick Johnson",
        choice2: "Anthony Davis",
        choice3: "Willie Lanier",
        choice4: "Derrick Thomas",
        answer: "2"
    },
    {
        question: "Who holds the team record for most receiving yards all-time for the Kansas City Chiefs?",
        choice1: "Jamaal Charles",
        choice2: "Otis Taylor",
        choice3: "Tony Gonzalez",
        choice4: "Tyreek Hill",
        answer: "3"
    },
    {
        question: "Which Hall of Fame quarterback spent most of his career with the San Francisco 49ers, but spent his last two seasons in Kansas City, taking the team to the playoffs in both 1993 and 1994?",
        choice1: "Alex Smith",
        choice2: "Steve Young",
        choice3: "Joe Montana",
        choice4: "Matt Cassel",
        answer: "3"
    },
    {
        question: "Who is the all-time passing yards leader for the Kansas City Chiefs?",
        choice1: "Len Dawson",
        choice2: "Patrick Mahomes",
        choice3: "Joe Montana",
        choice4: "Alex Smith",
        answer: "1"
    }
];

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
        console.log(e.target);

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
		
		let classToApply;
		
		if(currentQuestion.answer === selectedAnswer) {
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

startGame();
