const startBtn = document.querySelector('.cta');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () => {
    quizSection.classList.add('active');
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

     headerScore()
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
    if(questionCount < question.length - 1) {
        questionCount++; 
        showQuestion(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    } else {
        showResultBox();
    }

    
}

const optionList = document.querySelector('.option-list');

//mendapatkan pertanyaan dari data//
function showQuestion(index) {
    const questionText = document.querySelector('.question-text')
    questionText.innerHTML = `${question[index].numb}. ${question[index].question}`;

    let optionTag = `<div class="option"><span>${question[index].options[0]}</span></div>
        <div class="option"><span>${question[index].options[1]}</span></div>
        <div class="option"><span>${question[index].options[2]}</span></div>
        <div class="option"><span>${question[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick','optionSelected(this)')
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = question[questionCount].answer;
    let allOptions = optionList.children.length;

    const closePopupBtn = document.querySelector('.close-popup')
    const popupContent = document.querySelector('.popup-content')
    const popupImage = document.querySelector('.popup-image')
    const memeSound = document.getElementById('meme-sound') 

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
        popupImage.src = 'happy.gif';
        memeSound.src = 'happy.mp3';
    }
    else {
        answer.classList.add('incorrect');

        //if answer incorrect, auto selected correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct')
            }
        }
        popupImage.src = 'crying-cat.gif';
        memeSound.src = 'banana.mp3';
    }

    popupContent.classList.add('active');
    memeSound.play();

    closePopupBtn.onclick = () => {
        popupContent.classList.remove('active');
        memeSound.pause();
        memeSound.currentTime = 0
    }

    //If User has selected, disabled all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} dari ${question.length} Soal`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${question.length}`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${question.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / question.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(slateblue ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
        
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }

    }, speed);
}