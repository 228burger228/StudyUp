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

    // Закрытие меню при клике вне меню (на backdrop)
    fullscreenMenu.addEventListener('click', (e) => {
        if (e.target === fullscreenMenu) {
            closeMenu();
        }
    });

    // 2. Модальное окно курса
    window.openCourseModal = function(courseName, subject) {
        // Создаём модальное окно, если его нет
        let modal = document.getElementById('courseModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'courseModal';
            modal.className = 'course-modal';
            modal.innerHTML = `
                <div class="course-modal-content">
                    <button class="course-modal-close" onclick="closeCourseModal()">&times;</button>
                    <h3 id="modalCourseTitle"></h3>
                    <p id="modalCourseSubject"></p>
                    <form class="course-modal-form" onsubmit="submitCourseForm(event)">
                        <input type="text" name="name" placeholder="Ваше имя" required>
                        <input type="tel" name="phone" placeholder="Телефон или Telegram" required>
                        <input type="hidden" name="course" id="modalCourseInput">
                        <button type="submit">Получить консультацию</button>
                    </form>
                    <p style="font-size: 0.8rem; color: #999; margin-top: 12px; text-align: center;">
                        Нажимая кнопку, вы соглашаетесь с <a href="policy.html" style="color: #7c3aed;">политикой конфиденциальности</a>
                    </p>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Закрытие при клике вне модального окна
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeCourseModal();
                }
            });
        }
        
        document.getElementById('modalCourseTitle').textContent = courseName;
        document.getElementById('modalCourseSubject').textContent = `Курс по ${subject}`;
        document.getElementById('modalCourseInput').value = courseName;
        modal.classList.add('active');
    };
    
    window.closeCourseModal = function() {
        const modal = document.getElementById('courseModal');
        if (modal) {
            modal.classList.remove('active');
        }
    };
    
    window.submitCourseForm = function(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Отправка в Formspree или Telegram бот (заглушка)
        console.log('Отправка заявки:', Object.fromEntries(formData));
        
        // Показываем успешное сообщение
        const content = form.parentElement;
        content.innerHTML = `
            <h3 style="color: #22c55e;">✅ Заявка отправлена!</h3>
            <p>Мы свяжемся с вами в течение 15 минут</p>
        `;
        
        // Автозакрытие через 3 секунды
        setTimeout(() => closeCourseModal(), 3000);
    };









    // 3. Карусель преподавателей
const track = document.getElementById('teamTrack');
const cards = document.querySelectorAll('.speaker-card');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
const dots = document.querySelectorAll('#sliderPagination .dot');

// Проверяем наличие элементов
if (track && cards.length > 0) {
    const cardWidth = 320;
    const gap = 32;
    const total = cards.length;
    let currentPage = 1; // Начинаем со второй карточки (индекс 1)

    function updateSlider() {
        // Центрируем активную карточку
        // Вычисляем смещение так, чтобы активная карточка была в центре viewport
        const viewportCenter = track.parentElement.offsetWidth / 2;
        const cardCenter = cardWidth / 2;
        const offset = viewportCenter - cardCenter - (currentPage * (cardWidth + gap));
        
        track.style.transform = `translateX(${offset}px)`;

        cards.forEach((card, idx) => {
            card.classList.toggle('active', idx === currentPage);
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentPage);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            // Зацикленное листание: если на первой — переходим на последнюю
            currentPage = (currentPage - 1 + total) % total;
            updateSlider();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            // Зацикленное листание: если на последней — переходим на первую
            currentPage = (currentPage + 1) % total;
            updateSlider();
        });
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentPage = idx;
            updateSlider();
        });
    });

    // Инициализация
    updateSlider();
    
    // Пересчет при ресайзе окна
    window.addEventListener('resize', updateSlider);
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
