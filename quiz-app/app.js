const navMenu = document.getElementById('nav-menu');
const chapterTitle = document.getElementById('chapter-title');
const chapterContent = document.getElementById('chapter-content');
const startQuizBtn = document.getElementById('start-quiz-btn');

const learningView = document.getElementById('learning-view');
const quizView = document.getElementById('quiz-view');
const exitQuizBtn = document.getElementById('exit-quiz-btn');

let currentChapter = null;
let currentQuizData = [];
let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;

// Initialize Navigation
courseData.forEach((chapter, index) => {
    const navItem = document.createElement('div');
    navItem.className = 'nav-item';
    navItem.textContent = chapter.title;
    navItem.onclick = () => loadChapter(index, navItem);
    navMenu.appendChild(navItem);
});

function loadChapter(index, navElement) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if(navElement) navElement.classList.add('active');
    
    currentChapter = courseData[index];
    chapterTitle.textContent = currentChapter.title;
    chapterContent.innerHTML = currentChapter.content;
    
    if (currentChapter.quiz && currentChapter.quiz.length > 0) {
        startQuizBtn.style.display = 'inline-block';
        startQuizBtn.textContent = `Take Chapter Quiz (${currentChapter.quiz.length})`;
    } else {
        startQuizBtn.style.display = 'none';
    }
    
    showView(learningView);
}

function showView(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    view.classList.add('active');
}

// Quiz Logic
startQuizBtn.onclick = () => {
    currentQuizData = currentChapter.quiz;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('question-block').style.display = 'block';
    document.getElementById('score-screen').style.display = 'none';
    showView(quizView);
    loadQuestion();
};

exitQuizBtn.onclick = () => {
    showView(learningView);
};

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const explanationEl = document.getElementById('explanation');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');

function loadQuestion() {
    hasAnswered = false;
    explanationEl.classList.remove('show');
    nextBtn.disabled = true;
    
    const q = currentQuizData[currentQuestionIndex];
    questionEl.textContent = `Q${currentQuestionIndex + 1}: ${q.question}`;
    
    optionsEl.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = opt;
        btn.onclick = () => selectOption(btn, index);
        optionsEl.appendChild(btn);
    });
    
    progressFill.style.width = `${((currentQuestionIndex) / currentQuizData.length) * 100}%`;
}

function selectOption(selectedBtn, index) {
    if (hasAnswered) return;
    hasAnswered = true;
    
    const q = currentQuizData[currentQuestionIndex];
    const isCorrect = index === q.correctAnswer;
    
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
        optionsEl.children[q.correctAnswer].classList.add('correct');
    }
    
    explanationEl.innerHTML = isCorrect ? `✅ <strong>Correct!</strong> ${q.explanation}` : `❌ <strong>Incorrect.</strong> ${q.explanation}`;
    explanationEl.classList.add('show');
    nextBtn.disabled = false;
}

nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
};

function showScore() {
    document.getElementById('question-block').style.display = 'none';
    const scoreScreen = document.getElementById('score-screen');
    scoreScreen.style.display = 'block';
    progressFill.style.width = '100%';
    
    const percentage = Math.round((score / currentQuizData.length) * 100);
    const scoreText = document.getElementById('score-text');
    
    scoreText.innerHTML = `You scored <strong>${score}</strong> out of <strong>${currentQuizData.length}</strong> (${percentage}%)`;
    
    if (percentage >= 100) {
        scoreText.innerHTML += '<br><br>🎉 Perfect score! You mastered this module.';
    } else {
        scoreText.innerHTML += '<br><br>📚 Review the study materials and try again!';
    }
}

document.getElementById('restart-btn').onclick = startQuizBtn.onclick;

// Load first chapter by default
loadChapter(0, navMenu.firstChild);
