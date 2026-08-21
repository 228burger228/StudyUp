document.addEventListener('DOMContentLoaded', () => {
    // Логика полноэкранного меню
    const menuOpenBtn = document.getElementById('menuOpenBtn');
    const menuCloseBtn = document.getElementById('menuCloseBtn');
    const fullscreenMenu = document.getElementById('fullscreenMenu');

    menuOpenBtn.addEventListener('click', () => {
        fullscreenMenu.classList.add('active');
    });

    menuCloseBtn.addEventListener('click', () => {
        fullscreenMenu.classList.remove('active');
    });

    document.querySelectorAll('.menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            fullscreenMenu.classList.remove('active');
        });
    });

    // База вопросов викторины
    const quizData = [
        {
            options: [
                {
                    name: "ТЕКНА",
                    source: 'МУЛЬТСЕРИАЛ "Winx"',
                    img: "images/tekna.jpg"
                },
                {
                    name: "ПАСИФИКА",
                    source: 'МУЛЬТСЕРИАЛ "ГРАВИТИ ФОЛЗ"',
                    img: "images/pasifica.jpg"
                },
                {
                    name: "ПРИНЦЕССА БУБЛЬГУМ",
                    source: 'МУЛЬТСЕРИАЛ "ВРЕМЯ ПРИКЛЮЧЕНИЙ"',
                    img: "images/pb.jpg"
                },
                {
                    name: "КОРАЛИНА",
                    source: 'МУЛЬТФИЛЬМ "КОРАЛИНА"',
                    img: "images/coraline.jpg"
                }
            ]
        },
        {
            options: [
                {
                    name: "СТЭНФОРД",
                    source: 'МУЛЬТСЕРИАЛ "ГРАВИТИ ФОЛЗ"',
                    img: "images/stanford.jpg"
                },
                {
                    name: "ДЖУДИ",
                    source: 'МУЛЬТФИЛЬМ "ЗВЕРОПОЛИС"',
                    img: "images/judy.jpg"
                },
                {
                    name: "ПЛАНКТОН",
                    source: 'МУЛЬТСЕРИАЛ "ГУБКА БОБ"',
                    img: "images/plankton.jpg"
                },
                {
                    name: "ЛИСА СИМПСОН",
                    source: 'МУЛЬТСЕРИАЛ "СИМПСОНЫ"',
                    img: "images/lisa.jpg"
                }
            ]
        },
        {
            options: [
                {
                    name: "ЛЕОНАРДО",
                    source: 'МУЛЬТСЕРИАЛ "ЧЕРЕПАШКИ-НИНДЗЯ"',
                    img: "images/leo.jpg"
                },
                {
                    name: "ДЯДЯ СТЭН",
                    source: 'МУЛЬТСЕРИАЛ "ГРАВИТИ ФОЛЗ"',
                    img: "images/stan.jpg"
                },
                {
                    name: "ФЛОРА",
                    source: 'МУЛЬТСЕРИАЛ "Winx"',
                    img: "images/flora.jpg"
                },
                {
                    name: "РЭЙВЕН",
                    source: 'КОМИКСЫ DC',
                    img: "images/raven.jpg"
                }
            ]
        }
    ];

    let currentQuestionIndex = 0;

    // Элементы DOM для теста
    const introScreen = document.getElementById('testIntro');
    const quizScreen = document.getElementById('quizScreen');
    const resultScreen = document.getElementById('resultScreen');
    const startTestBtn = document.getElementById('startTestBtn');
    const cardsGrid = document.getElementById('cardsGrid');

    // Запуск теста
    startTestBtn.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        renderQuestion(currentQuestionIndex);
    });

    // Отрисовка карточек
    function renderQuestion(index) {
        cardsGrid.innerHTML = '';
        const currentData = quizData[index];
        
        currentData.options.forEach(option => {
            const card = document.createElement('div');
            card.className = 'character-card';
            
            card.innerHTML = `
                <img src="${option.img}" alt="${option.name}" class="char-img" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTFlMWUxIi8+PC9zdmc+'">
                <div class="char-info">
                    <span class="char-name">${option.name}</span>
                    <span class="char-source">${option.source}</span>
                </div>
            `;
            
            card.addEventListener('click', () => handleAnswer());
            cardsGrid.appendChild(card);
        });
    }

    // Обработка клика по карточке
    function handleAnswer() {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData.length) {
            renderQuestion(currentQuestionIndex);
        } else {
            showResult();
        }
    }

    // Завершение теста
    function showResult() {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
    }
});
