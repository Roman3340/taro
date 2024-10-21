const cardImages = [
    "images/RWS_Tarot_00_Fool.jpg",
    "images/RWS_Tarot_01_Magician.jpg",
    "images/RWS_Tarot_02_High_Priestess.jpg",
    "images/RWS_Tarot_03_Empress.jpg",
    "images/RWS_Tarot_04_Emperor.jpg",
    "images/RWS_Tarot_05_Hierophant.jpg"
];

const maxFlippedCards = 3;
let flippedCardsCount = 0;
let selectedCards = [];

// Функция для получения случайной карты
function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * cardImages.length);
    const selectedCard = cardImages[randomIndex];
    cardImages.splice(randomIndex, 1); // Удаляем карту из массива
    return selectedCard;
}

// Функция переворота карты
function flipCard(cardElement) {
    const card = cardElement.querySelector('.card');

    if (card.classList.contains('flipped') || flippedCardsCount >= maxFlippedCards) {
        return; // Возвращаемся, если карта уже перевернута или достигнуто максимальное количество
    }

    flippedCardsCount += 1;
    const frontFace = cardElement.querySelector('.card-front img');
    if (!frontFace) {
        const imgElement = document.createElement('img');
        const randomCard = getRandomCard();
        imgElement.src = randomCard;
        selectedCards.push(randomCard.split('/').pop().replace('.jpg', '')); // Сохраняем название карты
        cardElement.querySelector('.card-front').appendChild(imgElement);
    }

    card.classList.add('flipped');

    // Показываем кнопку отправки, если выбрано 3 карты
    if (flippedCardsCount === maxFlippedCards) {
        document.getElementById('sendCardsButton').style.display = 'block'; // Показываем кнопку
    }
}

// После полной инициализации приложения
tg.ready(function () {
    // Привязываем функцию переворота к каждой карте на странице
    document.querySelectorAll('.main-image').forEach(function (element) {
        element.addEventListener('click', function () {
            flipCard(this);
        });
    });
});

// Функция для отправки данных о выбранных картах
function sendSelectedCards() {
    const selectedCardNames = selectedCards.join(',');

    // Отправляем данные в Telegram
    tg.sendData(selectedCardNames); // Отправляем только названия карт через запятую
    tg.close(); // Закрываем веб-приложение
}