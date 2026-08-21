# 🤖 STUDY UP Telegram Bot

Telegram бот для онлайн-школы STUDY UP с встроенной системой подбора курсов и информацией.

## 🚀 Возможности

- ✅ Просмотр всех курсов
- ✅ Тест на подбор курса (3 вопроса)
- ✅ Информация о преподавателях
- ✅ FAQ раздел
- ✅ Покупка курса (интеграция будущая)
- ✅ Служба поддержки

## 📋 Установка

### 1. Установи зависимости

```bash
cd bot
npm install
```

### 2. Создай .env файл

Скопируй `.env.example` в `.env` и заполни данные:

```bash
cp .env.example .env
```

### 3. Получи токен бота

1. Открой Telegram и найди `@BotFather`
2. Отправь команду `/newbot`
3. Следуй инструкциям
4. Скопируй токен в `.env` файл

```
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```

### 4. Запусти бота

```bash
npm start
```

Или для разработки с автозагрузкой:

```bash
npm run dev
```

---

## 📱 Команды бота

| Команда | Описание |
|---------|----------|
| `/start` | Запустить бота, открыть главное меню |
| `/help` | Справка по использованию |
| `/courses` | Посмотреть все курсы |
| `/test` | Пройти тест на подбор |
| `/teachers` | Информация о преподавателях |
| `/faq` | Часто задаваемые вопросы |
| `/support` | Связаться с поддержкой |

---

## 🎮 Интерфейс бота

### Главное меню
```
🎓 Добро пожаловать в STUDY UP!

📚 Посмотреть курсы
🎯 Пройти тест
👨‍🏫 О преподавателях
❓ Часто задаваемые вопросы
🌐 Посетить сайт
```

### Просмотр курсов
Выбери курс и получи:
- Полное описание
- Цену
- Длительность
- Преподавателя
- Кнопку для покупки

### Тест
3 вопроса для определения:
- Уровня знаний
- Целей обучения
- Предпочитаемого стиля

---

## 🔧 Архитектура

```
bot/
├── bot.js                 # Основной файл бота
├── package.json           # Зависимости
├── .env.example          # Пример конфигурации
└── BOT_README.md         # Этот файл
```

---

## 📊 Структура сессий пользователя

```javascript
userSessions[chatId] = {
    step: 'test',           // Текущий шаг (start, test, payment)
    question: 0,            // Номер вопроса теста
    answers: [],            // Ответы пользователя
    firstName: 'John',      // Имя пользователя
    selectedCourse: null    // Выбранный курс
}
```

---

## 🌐 Будущие интеграции

### 1. Интеграция с API
```javascript
// bot.js будет отправлять запросы к API
const apiUrl = process.env.API_URL;
const courses = await fetch(`${apiUrl}/api/courses`);
```

### 2. Сохранение данных в БД
```javascript
// Вместо userSessions будет база данных
const userId = await db.saveUser({
    telegramId: msg.from.id,
    firstName: msg.from.first_name,
    courseId: selectedCourse
});
```

### 3. Система платежей
```javascript
// Интеграция с Stripe/Yandex.Kassa
const payment = await stripe.paymentIntents.create({
    amount: course.price,
    userId: msg.from.id
});
```

### 4. Уведомления
```javascript
// Отправка уведомлений студентам
bot.sendMessage(userId, '✅ Новый урок опубликован!');
```

---

## 📝 Примеры использования

### Получить все курсы
```javascript
bot.onText(/\/courses/, (msg) => {
    showCourses(msg.chat.id);
});
```

### Обработать нажатие кнопки
```javascript
bot.on('callback_query', (query) => {
    if (query.data === 'view_courses') {
        showCourses(query.message.chat.id);
    }
});
```

---

## 🐛 Решение проблем

### Бот не отвечает
- Проверь токен в `.env`
- Убедись, что бот добавлен в Telegram
- Перезагрузи процесс

### Ошибка при запуске
```bash
Error: ENOENT: no such file or directory, open '.env'
```
→ Создай `.env` файл из `.env.example`

### Медленный ответ
- Проверь интернет соединение
- Убедись, что сервер Telegram доступен

---

## 📞 Поддержка

Если возникли проблемы:
1. Проверь логи консоли
2. Прочитай FAQ на сайте
3. Напиши в `@studyup_support`

---

## 🚀 Развёртывание на сервере

### Вариант 1: Heroku
```bash
heroku create study-up-bot
heroku config:set TELEGRAM_BOT_TOKEN=your_token
git push heroku main
```

### Вариант 2: AWS Lambda
```bash
npm install -g serverless
serverless deploy
```

### Вариант 3: Собственный сервер
```bash
# SSH подключение
ssh user@your-server.com

# Клонирование
git clone https://github.com/yourname/study-up.git
cd study-up/bot

# Установка
npm install
npm start
```

---

## 📅 Версия
**v1.0.0** — MVP версия

Последнее обновление: Февраль 2024
