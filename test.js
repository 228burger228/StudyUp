// ============ КОНФИГ ============

const CURRENT_YEAR = 2026;

const QUESTIONS = [
    {
        id: 1,
        title: "Как готовиться к ОГЭ?",
        text: "Какой способ подготовки кажется тебе самым эффективным?",
        answers: [
            { text: "Решать задачки с логикой и расчётами", track: "math" },
            { text: "Читать учебник и думать критически", track: "soc" },
            { text: "Учить процессы и делать опыты", track: "bio" },
            { text: "Анализировать тексты и писать сочинения", track: "lit" }
        ]
    },
    {
        id: 2,
        title: "Где ты готовишься?",
        text: "Выбери своё идеальное место учёбы",
        answers: [
            { text: "В кабинете с компьютером и графиком", track: "math" },
            { text: "В библиотеке среди книг", track: "soc" },
            { text: "В лаборатории с пробирками", track: "bio" },
            { text: "В тишине с ручкой и тетрадью", track: "lit" }
        ]
    },
    {
        id: 3,
        title: "Какой формат обучения предпочитаешь?",
        text: "Как ты лучше всего учишься?",
        answers: [
            { text: "Вебинары и прямые трансляции", track: "math" },
            { text: "Дискуссии и диспуты", track: "soc" },
            { text: "Практические занятия", track: "bio" },
            { text: "Разборы текстов и сочинений", track: "lit" }
        ]
    },
    {
        id: 4,
        title: "Что делаешь, если не понимаешь?",
        text: "Как ты решаешь проблемы?",
        answers: [
            { text: "Пересчитываю заново с нуля", track: "math" },
            { text: "Ищу аргументы в исторических источниках", track: "soc" },
            { text: "Смотрю видео-опыты и эксперименты", track: "bio" },
            { text: "Читаю критику и глубокий анализ", track: "lit" }
        ]
    },
    {
        id: 5,
        title: "Твоя суперсила в подготовке?",
        text: "Что даётся тебе легче всего?",
        answers: [
            { text: "Логическое мышление и точные расчёты", track: "math" },
            { text: "Критическое восприятие и аргументация", track: "soc" },
            { text: "Системное понимание процессов", track: "bio" },
            { text: "Глубокий анализ текста и смысла", track: "lit" }
        ]
    }
];

const CHARACTERS = {
    math: [
        { name: "Архимед", emoji: "🧮", color: "#8b5cf6" },
        { name: "Никола Тесла", emoji: "⚡", color: "#8b5cf6" },
        { name: "Ломоносов", emoji: "🔬", color: "#8b5cf6" }
    ],
    soc: [
        { name: "Наполеон", emoji: "👑", color: "#f59e0b" },
        { name: "Клеопатра", emoji: "👸", color: "#f59e0b" },
        { name: "Юлий Цезарь", emoji: "⚔️", color: "#f59e0b" }
    ],
    bio: [
        { name: "Чарльз Дарвин", emoji: "🦁", color: "#10b981" },
        { name: "Мария Кюри", emoji: "☢️", color: "#10b981" },
        { name: "Бутлеров", emoji: "🧪", color: "#10b981" }
    ],
    lit: [
        { name: "Пушкин", emoji: "✍️", color: "#ec4899" },
        { name: "Толстой", emoji: "📖", color: "#ec4899" },
        { name: "Достоевский", emoji: "💭", color: "#ec4899" }
    ]
};

const COURSE_RECOMMENDATIONS = {
    math: {
        name: "Математика ЕГЭ/ОГЭ",
        price: "от 4990 ₽/мес",
        desc: "Полный курс по формулам и задачам второй части"
    },
    soc: {
        name: "История и Обществознание",
        price: "от 4990 ₽/мес",
        desc: "Разбор всех исторических периодов и аргументация"
    },
    bio: {
        name: "Биология и Химия",
        price: "от 4990 ₽/мес",
        desc: "Системный подход к организму и химическим процессам"
    },
    lit: {
        name: "Литература и Русский язык",
        price: "от 4990 ₽/мес",
        desc: "Глубокий анализ текстов и уникальные сочинения"
    }
};

// ============ СОСТОЯНИЕ ============

let state = {
    currentQuestion: 0,
    scores: { math: 0, soc: 0, bio: 0, lit: 0 },
    contact: "",
    winner: null,
    character: null,
    submitted: false
};

// ============ ИНИЦИАЛИЗАЦИЯ ============

document.addEventListener('DOMContentLoaded', () => {
    setupMenuListeners();
    resetTest();  // ВСЕГДА сбрасываем тест при загрузке страницы
    
    // Показываем первый экран с вопросами
    setTimeout(() => {
        showQuestion();
    }, 100);
    
    setupFormListener();
});

// ============ СИСТЕМА ВОПРОСОВ ============

function showQuestion() {
    if (state.currentQuestion >= QUESTIONS.length) {
        // Все вопросы ответлены → форма
        showScreen('screen-form');
        return;
    }

    const q = QUESTIONS[state.currentQuestion];
    if (document.getElementById('questionTitle')) {
        document.getElementById('questionTitle').textContent = q.title;
    }
    if (document.getElementById('questionText')) {
        document.getElementById('questionText').textContent = q.text;
    }

    // Обновляем прогресс
    const progress = ((state.currentQuestion + 1) / QUESTIONS.length) * 100;
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }

    // Генерируем кнопки ответов
    const grid = document.getElementById('answersGrid');
    if (grid) {
        grid.innerHTML = '';

        q.answers.forEach((answer, idx) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = answer.text;
            btn.onclick = (e) => {
                e.preventDefault();
                answerQuestion(answer.track);
            };
            grid.appendChild(btn);
        });
    }

    showScreen('screen-questions');
}

function answerQuestion(track) {
    // Добавляем очко
    state.scores[track] += 1;

    // Сохраняем в localStorage
    saveTestState();

    // Переходим к следующему вопросу
    state.currentQuestion += 1;
    
    // Небольшая задержка для эффекта
    setTimeout(() => {
        showQuestion();
    }, 300);
}

// ============ ФОРМА ЗАХВАТА ============

function setupFormListener() {
    const form = document.getElementById('captureForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const contact = document.getElementById('contactInput').value.trim();
        const policy = document.getElementById('policyCheckbox').checked;

        if (!contact) {
            alert('Заполни контакт');
            return;
        }

        if (!policy) {
            alert('Согласись на обработку данных');
            return;
        }

        state.contact = contact;

        // Вычисляем победителя
        state.winner = Object.keys(state.scores).reduce((a, b) =>
            state.scores[a] > state.scores[b] ? a : b
        );

        // Выбираем рандом персонажа
        const characters = CHARACTERS[state.winner];
        state.character = characters[Math.floor(Math.random() * characters.length)];

        // Сохраняем результат
        saveTestState();

        // Отправляем в Formspree (опционально)
        await sendToFormspree();

        // Показываем финальный экран
        setTimeout(() => {
            drawResultCard();
            showScreen('screen-result');
        }, 500);
    });
}

async function sendToFormspree() {
    const formData = new FormData();
    formData.append('contact', state.contact);
    formData.append('track', state.winner);
    formData.append('character', state.character.name);
    formData.append('scores', JSON.stringify(state.scores));
    formData.append('timestamp', new Date().toLocaleString('ru-RU'));

    try {
        // Заглушка для локального тестирования
        // Замени YOUR_FORM_ID на реальный ID из Formspree
        console.log('📤 Отправка данных:', { 
            contact: state.contact,
            track: state.winner,
            character: state.character.name
        });
    } catch (error) {
        console.log('⚠️ Ошибка отправки:', error);
    }
}

// ============ ФИНАЛЬНАЯ КАРТОЧКА ============

function drawResultCard() {
    const canvas = document.getElementById('cardCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = 540;
    const h = 960;

    // Градиент фона
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#8b5cf6');
    gradient.addColorStop(1, '#f59e0b');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Белый прямоугольник в центре
    const cardX = w * 0.1;
    const cardY = h * 0.3;
    const cardW = w * 0.8;
    const cardH = h * 0.55;

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 20);
    ctx.fill();

    // Альтернатива для браузеров без roundRect
    if (!ctx.roundRect) {
        drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 20);
    }

    // Персонаж (эмодзи)
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(state.character.emoji, w / 2, cardY + 100);

    // Архетип
    ctx.font = 'bold 28px Montserrat';
    ctx.fillStyle = '#000';
    const archetypeName = getArchetypeName(state.winner);
    ctx.fillText(archetypeName, w / 2, cardY + 180);

    // Описание
    ctx.font = '16px Montserrat';
    ctx.fillStyle = '#666';
    const desc = getArchetypeDesc(state.winner);
    wrapText(ctx, desc, w / 2, cardY + 220, cardW * 0.85, 22);

    // Курс
    ctx.font = 'bold 14px Montserrat';
    ctx.fillStyle = '#8b5cf6';
    const course = COURSE_RECOMMENDATIONS[state.winner];
    ctx.fillText(course.name, w / 2, cardY + 330);

    // Цена
    ctx.font = '12px Montserrat';
    ctx.fillStyle = '#666';
    ctx.fillText(course.price, w / 2, cardY + 355);

    // Логотип внизу
    ctx.font = 'bold 20px Montserrat';
    ctx.fillStyle = '#f59e0b';
    ctx.textAlign = 'center';
    ctx.fillText('STUDY UP', w / 2, h - 50);

    // Год
    ctx.font = '12px Montserrat';
    ctx.fillStyle = '#999';
    ctx.fillText(`© ${CURRENT_YEAR}`, w / 2, h - 20);

    // Обновляем информацию
    document.getElementById('resultTitle').textContent = `Ты — ${archetypeName}`;
    document.getElementById('resultDesc').textContent = `Твой архетип: ${state.character.name}`;
    document.getElementById('courseRecommendation').textContent = `Рекомендуем: ${course.name}`;
}

function drawRoundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
}

function getArchetypeName(track) {
    const names = {
        math: "ФИЗМАТ ГЕНИЙ",
        soc: "ПОЛИТИЧЕСКИЙ СТРАТЕГ",
        bio: "УЧЁНЫЙ-ИССЛЕДОВАТЕЛЬ",
        lit: "ЛИТЕРАТУРНЫЙ МУДРЕЦ"
    };
    return names[track];
}

function getArchetypeDesc(track) {
    const descs = {
        math: "Логик, который видит мир через формулы",
        soc: "Аналитик, который разбирается в обществе",
        bio: "Учёный, который понимает системы",
        lit: "Философ, который видит суть слов"
    };
    return descs[track];
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    words.forEach(word => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth && line) {
            ctx.textAlign = 'center';
            ctx.fillText(line, x, y);
            line = word + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    });

    if (line) {
        ctx.textAlign = 'center';
        ctx.fillText(line, x, y);
    }
}

// ============ ШЕРИНГ ============

document.addEventListener('DOMContentLoaded', () => {
    // Кнопка скачивания
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const canvas = document.getElementById('cardCanvas');
            if (!canvas) return;

            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `studyup-vibe-${Date.now()}.png`;
            link.click();
        });
    }

    // Кнопка TG
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const text = `🎉 Я прошёл тест на StudyUp и стал ${getArchetypeName(state.winner)}!\n${state.character.name} из меня вышел 😎\n\nТы тоже пройди тест и узнай свой вайб!`;
            const tgLink = `https://t.me/share/url?url=https://studyup.ru&text=${encodeURIComponent(text)}`;
            window.open(tgLink, '_blank');
        });
    }
});

// ============ УТИЛИТЫ ============

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => {
        s.classList.remove('active');
    });
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

function saveTestState() {
    localStorage.setItem('studyup_test_state', JSON.stringify(state));
}

function loadTestState() {
    // Функция удалена - каждый раз начинаем с нуля
}

function resetTest() {
    state = {
        currentQuestion: 0,
        scores: { math: 0, soc: 0, bio: 0, lit: 0 },
        contact: "",
        winner: null,
        character: null,
        submitted: false
    };
    localStorage.removeItem('studyup_test_state');
}

// ============ МЕНЮ ============

function setupMenuListeners() {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const fullscreenMenu = document.getElementById('fullscreenMenu');

    if (!menuToggle || !menuClose || !fullscreenMenu) return;

    menuToggle.addEventListener('click', () => {
        fullscreenMenu.classList.add('active');
    });

    menuClose.addEventListener('click', () => {
        fullscreenMenu.classList.remove('active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            fullscreenMenu.classList.remove('active');
        });
    });
}
