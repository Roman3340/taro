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

function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * cardImages.length);
    const selectedCard = cardImages[randomIndex];
    cardImages.splice(randomIndex, 1); // Удаляем карту из массива
    return selectedCard;
}

function flipCard(cardElement) {
    const card = cardElement.querySelector('.card');
    if (card.classList.contains('flipped') || flippedCardsCount >= maxFlippedCards) {
        return;
    }

    flippedCardsCount += 1;
    const frontFace = cardElement.querySelector('.card-front img');
    if (!frontFace) {
        const imgElement = document.createElement('img');
        const randomCard = getRandomCard();
        imgElement.src = randomCard;
        selectedCards.push(randomCard); // Добавляем выбранную карту в массив
        cardElement.querySelector('.card-front').appendChild(imgElement);
    }

    card.classList.add('flipped');
    if (flippedCardsCount === maxFlippedCards) {
        document.getElementById('confirmBtn').style.display = 'block';
    }
}

function confirmSelection() {
    // Отправляем выбранные карты в Telegram бота
    const selectedCardNames = selectedCards.map(card => card.split('_')[2].replace('.jpg', ''));

    // Закрываем мини-приложение и отправляем данные в Python сервер
    Telegram.WebApp.sendData(JSON.stringify(selectedCardNames));
}