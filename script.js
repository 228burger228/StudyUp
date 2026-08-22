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
document.addEventListener('DOMContentLoaded', function() {
    // ----- Данные фактов (из вашего колеса) -----
    const facts = [
        {
            number: 1,
            title: 'Наша база',
            short: 'Фундамент знаний',
            full: 'Обучение строится на фундаментальных практических задачах, позволяющих закрепить основу с первых дней.'
        },
        {
            number: 2,
            title: 'Продуктовый стек',
            short: 'Современные технологии',
            full: 'Изучаем современные технологии: React, Node.js, TypeScript, Docker и другие инструменты реальной разработки.'
        },
        {
            number: 3,
            title: 'Насыщенная среда',
            short: 'Погружение в профессию',
            full: 'Ежедневные встречи, воркшопы, хакатоны и менторские сессии для полного погружения в профессию.'
        },
        {
            number: 4,
            title: 'Сертификация',
            short: 'Подтверждение навыков',
            full: 'После обучения вы получите государственный диплом и международный сертификат, подтверждающий квалификацию.'
        },
        {
            number: 5,
            title: 'Персональный трек',
            short: 'Индивидуальный план',
            full: 'Индивидуальный план развития с учётом вашего уровня и целей — от новичка до senior-разработчика.'
        }
    ];

    const container = document.getElementById('starContainer');
    const count = facts.length;
    const radius = 200; // для десктопа
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    // Генерируем карточки
    facts.forEach((fact, i) => {
        const card = document.createElement('div');
        card.className = 'flip-card';
        card.dataset.index = i;

        card.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <span class="fact-badge">Факт #${fact.number}</span>
                    <h3 class="fact-title">${fact.title}</h3>
                    <p class="fact-short">${fact.short}</p>
                </div>
                <div class="flip-card-back">
                    <p>${fact.full}</p>
                </div>
            </div>
        `;

        // Позиционирование звездой (правильный пятиугольник)
        const angle = (360 / count) * i - 90; // -90, чтобы первый был сверху
        const rad = angle * Math.PI / 180;
        const x = centerX + radius * Math.cos(rad) - card.offsetWidth / 2;
        const y = centerY + radius * Math.sin(rad) - card.offsetHeight / 2;
        card.style.left = x + 'px';
        card.style.top = y + 'px';

        // Обработка клика для переворота (на мобильных)
        card.addEventListener('click', function(e) {
            // Если на десктопе уже сработал hover, клик не мешает
            this.classList.toggle('flipped');
        });

        container.appendChild(card);
    });

    // Пересчёт при изменении размера окна (для адаптивности)
    function reposition() {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const newRadius = Math.min(containerWidth, containerHeight) * 0.35; // 35% от размера контейнера
        const cards = container.querySelectorAll('.flip-card');
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;

        cards.forEach((card, i) => {
            const angle = (360 / count) * i - 90;
            const rad = angle * Math.PI / 180;
            const x = centerX + newRadius * Math.cos(rad) - card.offsetWidth / 2;
            const y = centerY + newRadius * Math.sin(rad) - card.offsetHeight / 2;
            card.style.left = x + 'px';
            card.style.top = y + 'px';
        });
    }

    window.addEventListener('resize', reposition);
});









    
    // Карусель преподавателей
const track = document.getElementById('teamTrack');
const cards = document.querySelectorAll('.speaker-card');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
const dots = document.querySelectorAll('#sliderPagination .dot');

if (track && cards.length > 0) {
    const visible = 3;
    const total = cards.length;
    const totalPages = Math.ceil(total / visible);
    let currentPage = 0;

    function updateSlider() {
        // Вычисляем реальные размеры карточки и отступа из стилей
        const cardWidth = cards[0].offsetWidth;
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.gap) || 24;
        
        // Смещение строго на блок из 3 карточек
        const shiftAmount = (cardWidth * visible + gap * visible) * currentPage;
        track.style.transform = `translateX(-${shiftAmount}px)`;

        // Переключение класса active для центральной карточки текущей тройки
        cards.forEach((card, idx) => {
            card.classList.remove('active');
            const start = currentPage * visible;
            const end = Math.min(start + visible, total);
            
            if (idx === start + 1 && start + 1 < end) {
                card.classList.add('active');
            }
        });

        // Обновление индикаторов
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentPage);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                updateSlider();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages - 1) {
                currentPage++;
                updateSlider();
            }
        });
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentPage = idx;
            updateSlider();
        });
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
}














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
