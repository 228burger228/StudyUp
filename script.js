document.addEventListener('DOMContentLoaded', () => {
    // 1. Управление полноэкранным меню
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const fullscreenMenu = document.getElementById('fullscreenMenu');

    function openMenu() {
        fullscreenMenu.classList.add('active');
    }

    function closeMenu() {
        fullscreenMenu.classList.remove('active');
    }

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.menu-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 2. Интерактивные факты о школе (Колесо обозрения)
    const factsData = [
        {
            title: "Наша база",
            text: "Обучение строится на фундаментальных практических задачах, позволяющих закрепить основу с первых дней."
        },
        {
            title: "Продуктовый стек",
            text: "Никаких устаревших подходов — только актуальные инструменты и методики от практикующих тимлидов."
        },
        {
            title: "Насыщенная среда",
            text: "Все знания упакованы в структурированные модули с регулярной обратной связью по проектам."
        },
        {
            title: "Сертификация",
            text: "По окончании курса каждый студент формирует готовое портфолио и получает подтвержденный сертификат."
        },
        {
            title: "Персональный трек",
            text: "Помогаем составить индивидуальную траекторию развития под твои цели и желаемую сферу."
        }
    ];

    const wheel = document.getElementById('factsWheel');
    const wheelItems = document.querySelectorAll('.wheel-item');
    const factNumber = document.getElementById('factNumber');
    const factDisplayTitle = document.getElementById('factDisplayTitle');
    const factDisplayText = document.getElementById('factDisplayText');

    let currentFactIndex = 0;
    let wheelRotation = 0;
    let isSpinning = false;
    let spinInterval;

    function updateFact(index) {
        currentFactIndex = index;
        factNumber.textContent = index + 1;
        factDisplayTitle.textContent = factsData[index].title;
        factDisplayText.textContent = factsData[index].text;

        // Обновляем активный класс
        wheelItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    }

    function spinToFact(index) {
        if (isSpinning) return;

        // Останавливаем текущее вращение
        wheel.classList.remove('rotating');

        // Вычисляем угол для поворота к нужному факту
        const anglePerFact = 360 / factsData.length;
        const targetAngle = index * anglePerFact;
        
        // Добавляем несколько оборотов перед остановкой для эффекта
        const rotations = 2;
        const finalAngle = rotations * 360 + targetAngle;

        // Применяем поворот с анимацией
        isSpinning = true;
        wheel.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        wheel.style.transform = `rotateZ(${finalAngle}deg)`;

        setTimeout(() => {
            wheelRotation = finalAngle % 360;
            updateFact(index);
            isSpinning = false;

            // Возобновляем медленное вращение
            wheel.style.transition = 'none';
            setTimeout(() => {
                startSlowSpin();
            }, 100);
        }, 800);
    }

    function startSlowSpin() {
        wheel.classList.add('rotating');
    }

    // Клик на элемент колеса
    wheelItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            spinToFact(index);
        });
    });

    // Начинаем с первого факта
    updateFact(0);

    // Автоматическое изменение факта каждые 12 секунд (один оборот колеса)
    setInterval(() => {
        if (!isSpinning) {
            const nextIndex = (currentFactIndex + 1) % factsData.length;
            spinToFact(nextIndex);
        }
    }, 12000);

    // Запускаем медленное вращение
    startSlowSpin();

    // 3. Карусель преподавателей
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const teamTrack = document.getElementById('teamTrack');
    const sliderPagination = document.getElementById('sliderPagination');
    const speakerCards = document.querySelectorAll('.speaker-card');
    const dots = document.querySelectorAll('.slider-pagination .dot');

    let currentSlide = 1; // Начинаем со второй карточки (индекс 1)

    function updateSlider() {
        const offset = -currentSlide * 304; // 280px card + 24px gap
        teamTrack.style.transform = `translateX(${offset}px)`;

        // Обновляем активный класс на карточках
        speakerCards.forEach((card, idx) => {
            card.classList.remove('active');
            if (idx === currentSlide) {
                card.classList.add('active');
            }
        });

        // Обновляем точки pagination
        dots.forEach((dot, idx) => {
            dot.classList.remove('active');
            if (idx === currentSlide) {
                dot.classList.add('active');
            }
        });
    }

    sliderPrev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + speakerCards.length) % speakerCards.length;
        updateSlider();
    });

    sliderNext.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % speakerCards.length;
        updateSlider();
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentSlide = idx;
            updateSlider();
        });
    });

    // 4. FAQ Аккордеон
    const faqRows = document.querySelectorAll('.faq-row');
    faqRows.forEach(row => {
        const header = row.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isOpen = row.classList.contains('active');
            faqRows.forEach(r => {
                r.classList.remove('active');
                r.querySelector('.faq-toggle-btn').textContent = '+';
            });
            if (!isOpen) {
                row.classList.add('active');
                row.querySelector('.faq-toggle-btn').textContent = '×';
            }
        });
    });

    // 5. Закрытие меню при клике на ссылку
    const drawerLinks = document.querySelectorAll('.drawer-links a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
