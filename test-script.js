// Test Questions and Answers
const testQuestions = [
    {
        id: 1,
        question: "Что для тебя самое важное в обучении?",
        answers: [
            { text: "Глубокие знания и понимание", points: { scholar: 3, creative: 1, practical: 1 } },
            { text: "Творческое самовыражение", points: { scholar: 1, creative: 3, practical: 1 } },
            { text: "Практические навыки", points: { scholar: 1, creative: 1, practical: 3 } },
            { text: "Всё вместе!", points: { scholar: 2, creative: 2, practical: 2 } }
        ]
    },
    {
        id: 2,
        question: "Как ты лучше всего учишься?",
        answers: [
            { text: "Читаю и анализирую", points: { scholar: 3, creative: 1, practical: 1 } },
            { text: "Творческие проекты и задания", points: { scholar: 1, creative: 3, practical: 1 } },
            { text: "Практика и применение", points: { scholar: 1, creative: 1, practical: 3 } },
            { text: "Комбинация методов", points: { scholar: 2, creative: 2, practical: 2 } }
        ]
    },
    {
        id: 3,
        question: "Какой предмет тебе интереснее всего?",
        answers: [
            { text: "История, Философия, Литература", points: { scholar: 3, creative: 1, practical: 1 } },
            { text: "Искусство, Музыка, Дизайн", points: { scholar: 1, creative: 3, practical: 1 } },
            { text: "IT, Инженерия, Наука", points: { scholar: 1, creative: 1, practical: 3 } },
            { text: "Несколько из перечисленных", points: { scholar: 2, creative: 2, practical: 2 } }
        ]
    },
    {
        id: 4,
        question: "Как ты видишь своё будущее?",
        answers: [
            { text: "Исследователь, учёный, эксперт", points: { scholar: 3, creative: 1, practical: 1 } },
            { text: "Деятель искусства, творец", points: { scholar: 1, creative: 3, practical: 1 } },
            { text: "Специалист, который что-то создаёт", points: { scholar: 1, creative: 1, practical: 3 } },
            { text: "Универсальный профессионал", points: { scholar: 2, creative: 2, practical: 2 } }
        ]
    },
    {
        id: 5,
        question: "Что мотивирует тебя больше всего?",
        answers: [
            { text: "Личный рост и знания", points: { scholar: 3, creative: 1, practical: 1 } },
            { text: "Возможность проявить себя", points: { scholar: 1, creative: 3, practical: 1 } },
            { text: "Результаты и достижения", points: { scholar: 1, creative: 1, practical: 3 } },
            { text: "Все вышеперечисленные", points: { scholar: 2, creative: 2, practical: 2 } }
        ]
    }
];

// Test Results
const testResults = {
    scholar: {
        title: "📚 Учёный",
        description: "Ты любишь углубляться в знания и разбираться в сути вещей. Идеально подходишь для курсов по истории, философии и теоретическим предметам.",
        courses: ["История - ХИС ОН", "Обществознание - SOCIAL OUT", "Литература - ФЛОЭМШОК"]
    },
    creative: {
        title: "🎨 Творец",
        description: "Твой творческий потенциал безграничен! Ты видишь мир через призму искусства и инноваций. Наши креативные курсы для тебя!",
        courses: ["Дизайн и визуальное искусство", "Творческое письмо", "Современное искусство"]
    },
    practical: {
        title: "⚙️ Практик",
        description: "Ты человек действия! Любишь получать результаты и применять знания на практике. Техническим курсам быть!",
        courses: ["Английский язык - ХИПХУП СКИЛ", "Прикладные науки", "Профессиональные навыки"]
    }
};

// State
let currentQuestion = 0;
let answers = [];
let scores = {
    scholar: 0,
    creative: 0,
    practical: 0
};

// Initialize
function startTest() {
    answers = [];
    scores = { scholar: 0, creative: 0, practical: 0 };
    currentQuestion = 0;
    
    switchScreen('welcomeScreen', 'questionsScreen');
    loadQuestion();
}

function loadQuestion() {
    const question = testQuestions[currentQuestion];
    const totalQuestions = testQuestions.length;
    
    // Update progress
    const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = progressPercent + '%';
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    
    // Update question
    document.getElementById('questionText').textContent = question.question;
    
    // Update answers
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-option';
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(index, answer);
        answersContainer.appendChild(button);
    });
    
    // Show/hide navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    if (currentQuestion === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
}

function selectAnswer(index, answer) {
    // Mark as answered
    const options = document.querySelectorAll('.answer-option');
    options.forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === index) {
            opt.classList.add('selected');
        }
    });
    
    // Store answer
    answers[currentQuestion] = answer;
    
    // Add points to score
    scores.scholar += answer.points.scholar;
    scores.creative += answer.points.creative;
    scores.practical += answer.points.practical;
    
    // Auto-advance after 500ms
    setTimeout(() => {
        if (currentQuestion < testQuestions.length - 1) {
            nextQuestion();
        } else {
            showResults();
        }
    }, 500);
}

function nextQuestion() {
    if (currentQuestion < testQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function skipQuestion() {
    if (currentQuestion < testQuestions.length - 1) {
        nextQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    // Determine which category wins
    const maxScore = Math.max(scores.scholar, scores.creative, scores.practical);
    let resultType;
    
    if (scores.scholar === maxScore) {
        resultType = 'scholar';
    } else if (scores.creative === maxScore) {
        resultType = 'creative';
    } else {
        resultType = 'practical';
    }
    
    const result = testResults[resultType];
    
    // Update result screen
    document.getElementById('resultIcon').textContent = result.title.charAt(0);
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultDescription').textContent = result.description;
    
    const coursesList = document.getElementById('recommendedCourses');
    coursesList.innerHTML = '';
    result.courses.forEach(course => {
        const li = document.createElement('li');
        li.textContent = course;
        coursesList.appendChild(li);
    });
    
    switchScreen('questionsScreen', 'resultsScreen');
}

function restartTest() {
    switchScreen('resultsScreen', 'welcomeScreen');
}

function switchScreen(fromScreen, toScreen) {
    const fromElement = document.getElementById(fromScreen);
    const toElement = document.getElementById(toScreen);
    
    fromElement.classList.remove('active');
    setTimeout(() => {
        toElement.classList.add('active');
    }, 100);
}

// Load initial state
console.log('✅ Test script loaded!');
