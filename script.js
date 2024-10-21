const tg = window.Telegram.WebApp; // Инициализация объекта Telegram WebApp

tg.ready(function () { // Дожидаемся полной инициализации приложения
    console.log("Telegram WebApp готово");

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
        console.log('Клик по карте')
        if (card.classList.contains('flipped') || flippedCardsCount >= maxFlippedCards) {
            console.log('Карта уже была перевернута')
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
        console.log('Карта перевернута')

        // Показываем MainButton от Telegram, если выбрано 3 карты
        if (flippedCardsCount === maxFlippedCards) {
            tg.MainButton.setText("Далее");
            tg.MainButton.show(); // Показываем MainButton
        }
    }

    // Привязываем функцию переворота к каждой карте на странице
    document.querySelectorAll('.main-image').forEach(function (element) {
        element.addEventListener('click', function () {
            flipCard(this);
        });
    });

    // Функция для отправки данных о выбранных картах
    tg.MainButton.onClick(function () {
        const selectedCardNames = selectedCards.map(card => card.split('_')[2].replace('.jpg', ''));

        // Отправляем данные в Telegram
        tg.sendData(JSON.stringify(selectedCardNames));

        // Закрываем веб-приложение
        tg.close();
    });
});