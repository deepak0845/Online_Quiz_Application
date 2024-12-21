const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const  resultBox= document.querySelector('.result-box');
const  tryAgainBtn= document.querySelector('.tryagain-btn');
const  goHomeBtn= document.querySelector('.gohome-btn');



startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active')
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active')
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');


    showQuestion(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestion(questionCount);
    questionCounter(questionNumb);

    headerScore();

}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestion(questionCount);
    questionCounter(questionNumb);
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < question.length - 1) {
        questionCount++;
        showQuestion(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else {
        // console.log('Question Completed')
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');

function showQuestion(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${question[index].numb}. ${question[index].Question}`;

    let optionTag = `<div class="option"><samp>${question[index].option[0]}</samp> </div>
    <div class="option"> <samp>${question[index].option[1]}</samp> </div>
    <div class="option"> <samp>${question[index].option[2]}</samp> </div>
    <div class="option"> <samp>${question[index].option[3]}</samp> </div>`;


    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');

    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent.trim(); // Remove extra spaces
    let correctAnswer = question[questionCount].answer.trim(); // Remove extra spaces

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');

        //if answer incorrect, auto disabled correct answer
        const allOptions = optionList.children;
        for (let i = 0; i < allOptions.length; i++) {
            if (allOptions[i].textContent.trim() === correctAnswer) {
                allOptions[i].classList.add('correct'); // Highlight the correct answer
            }
        }
    }

    // Disable all options after selecting 
    const allOptions = optionList.children;
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');

}


function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${question.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${question.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${question.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    let progressEndValue = (userScore / question.length) * 100;
    let speed = 20;

    if (!question || !question.length || isNaN(userScore)) {
        console.error("Invalid question data or user score.");
        return;
    }

    let progress = setInterval(() => {
        if (progressStartValue >= progressEndValue) {
            clearInterval(progress);
        } else {
            progressStartValue++;
            progressValue.textContent = `${Math.round(progressStartValue)}%`;
            circularProgress.style.background = `conic-gradient(#fff ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) ${progressStartValue * 3.6}deg)`;
        }
    }, speed);
}




