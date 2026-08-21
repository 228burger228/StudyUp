const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// Замени на твой токен бота
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const bot = new TelegramBot(TOKEN, { polling: true });

// Хранилище данных пользователей (позже будет БД)
const userSessions = {};

// Команды бота
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    userSessions[chatId] = { step: 'start' };

    const welcomeMessage = `
🎓 Добро пожаловать в STUDY UP!

Привет, ${firstName}! 👋

Я бот STUDY UP и помогу тебе выбрать нужный курс.

Давай начнём! 🚀

Что тебя интересует?
    `;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '📚 Посмотреть курсы', callback_data: 'view_courses' }],
                [{ text: '🎯 Пройти тест', callback_data: 'take_test' }],
                [{ text: '👨‍🏫 О преподавателях', callback_data: 'about_teachers' }],
                [{ text: '❓ Часто задаваемые вопросы', callback_data: 'faq' }],
                [{ text: '🌐 Посетить сайт', url: 'https://studyup.com' }]
            ]
        }
    };

    bot.sendMessage(chatId, welcomeMessage, options);
});

// Обработка нажатий кнопок
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    // Удаляем "загрузку" кнопки
    bot.answerCallbackQuery(query.id);

    switch (data) {
        case 'view_courses':
            showCourses(chatId);
            break;
        case 'take_test':
            startTest(chatId);
            break;
        case 'about_teachers':
            showTeachers(chatId);
            break;
        case 'faq':
            showFAQ(chatId);
            break;
        case 'back_to_menu':
            backToMenu(chatId);
            break;
        default:
            if (data.startsWith('course_')) {
                showCourseDetails(chatId, data.replace('course_', ''));
            }
    }
});

// Показать все курсы
function showCourses(chatId) {
    const courses = [
        { id: 1, name: '📖 ХИС ОН', desc: 'Курс по истории' },
        { id: 2, name: '👥 SOCIAL OUT', desc: 'Курс по обществознанию' },
        { id: 3, name: '🌿 ФЛОЭМШОК', desc: 'Курс по биологии' },
        { id: 4, name: '🗣️ ХИПХУП СКИЛ', desc: 'Курс по английскому' },
        { id: 5, name: '📚 ХИС ОН PRO', desc: 'Продвинутый курс' },
        { id: 6, name: '🎯 ADVANCED', desc: 'Для опытных' }
    ];

    const message = `
📚 *Наши курсы:*

${courses.map(c => `${c.name}\n_${c.desc}_`).join('\n\n')}

Выбери курс для подробной информации:
    `;

    const keyboard = courses.map(course => 
        [{ text: course.name, callback_data: `course_${course.id}` }]
    );

    keyboard.push([{ text: '⬅️ Назад в меню', callback_data: 'back_to_menu' }]);

    bot.sendMessage(chatId, message, {
        parse_mode: 'Markdown',
        reply_markup: { inline_keyboard: keyboard }
    });
}

// Подробно о курсе
function showCourseDetails(chatId, courseId) {
    const courseDetails = {
        1: {
            name: '📖 ХИС ОН',
            desc: 'Курс по истории',
            fullDesc: 'Полный курс истории для подготовки к экзаменам. Изучаем историю с древних времен до наших дней.',
            price: '1999 ₽',
            duration: '12 недель',
            teacher: 'Иван Петров',
            students: '250+'
        },
        // ... остальные курсы
    };

    const course = courseDetails[courseId] || { name: 'Курс', desc: 'Информация не найдена' };

    const message = `
*${course.name}*

📝 ${course.fullDesc}

💰 Цена: ${course.price}
⏱️ Длительность: ${course.duration}
👨‍🏫 Преподаватель: ${course.teacher}
👥 Студентов: ${course.students}

Готов начать? 🚀
    `;

    const options = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: '💳 Купить курс', callback_data: `buy_course_${courseId}` }],
                [{ text: '⬅️ К курсам', callback_data: 'view_courses' }],
                [{ text: '⬅️ Главное меню', callback_data: 'back_to_menu' }]
            ]
        }
    };

    bot.sendMessage(chatId, message, options);
}

// Запустить тест
function startTest(chatId) {
    userSessions[chatId] = { step: 'test', question: 0, answers: [] };

    const message = `
🎮 *Тест на подбор курса*

Ответь на 3 вопроса и узнай, какой курс идеально подходит для тебя!

Вопрос 1/3:
*Что для тебя самое важное в обучении?*
    `;

    const options = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Глубокие знания', callback_data: 'ans_1_a' }],
                [{ text: 'Практические навыки', callback_data: 'ans_1_b' }],
                [{ text: 'Творчество', callback_data: 'ans_1_c' }]
            ]
        }
    };

    bot.sendMessage(chatId, message, options);
}

// Показать преподавателей
function showTeachers(chatId) {
    const message = `
👨‍🏫 *Наши преподаватели:*

🎓 *Иван Петров*
_Тим лид, Ex-Yandex_
8+ лет в UX

🎓 *Мария Сидорова*
_Эксперт по истории, Ex-Sber_
10+ лет преподавания

🎓 *Петр Иванов*
_Senior разработчик, Ex-VK_
12+ лет в IT

Все преподаватели онлайн и готовы помочь! 💬

Хочешь узнать больше о конкретном преподавателе? Напиши его имя.
    `;

    const options = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: '⬅️ Главное меню', callback_data: 'back_to_menu' }]
            ]
        }
    };

    bot.sendMessage(chatId, message, options);
}

// FAQ раздел
function showFAQ(chatId) {
    const message = `
❓ *Часто задаваемые вопросы*

*1️⃣ Сколько стоят курсы?*
От 1999 ₽ за полный курс. Есть скидки для групп!

*2️⃣ Кого вы готовите?*
Школьников, студентов и взрослых к экзаменам и развитию.

*3️⃣ Есть ли живые занятия?*
Да! Прямые эфиры каждый выходной в 18:00.

*4️⃣ Как получить сертификат?*
После окончания курса автоматически выдаём диплом.

*5️⃣ Если не нравится курс?*
Возврат 100% в течение 7 дней.

Остались вопросы? Напиши мне! 💬
    `;

    const options = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: '📧 Написать в поддержку', url: 'https://t.me/studyup_support' }],
                [{ text: '⬅️ Главное меню', callback_data: 'back_to_menu' }]
            ]
        }
    };

    bot.sendMessage(chatId, message, options);
}

// Вернуться в меню
function backToMenu(chatId) {
    const message = `🏠 *Главное меню*

Что тебя интересует?`;

    const options = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: '📚 Посмотреть курсы', callback_data: 'view_courses' }],
                [{ text: '🎯 Пройти тест', callback_data: 'take_test' }],
                [{ text: '👨‍🏫 О преподавателях', callback_data: 'about_teachers' }],
                [{ text: '❓ Часто задаваемые вопросы', callback_data: 'faq' }],
                [{ text: '🌐 Посетить сайт', url: 'https://studyup.com' }]
            ]
        }
    };

    bot.sendMessage(chatId, message, options);
}

// Обработка текстовых сообщений
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Пропускаем команды (они обработаны выше)
    if (text.startsWith('/')) return;

    // Обработка ввода в форме
    const message = `
Спасибо за сообщение: "${text}"

Наша команда поддержки свяжется с тобой вскоре! 📬

А пока, что тебе ещё интересно?
    `;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '⬅️ Главное меню', callback_data: 'back_to_menu' }]
            ]
        }
    };

    bot.sendMessage(chatId, message, options);
});

console.log('🤖 Бот STUDY UP запущен!');
console.log('Слушаю команды...\n');

// Обработка ошибок
bot.on('polling_error', (error) => {
    console.error('Ошибка polling:', error);
});
