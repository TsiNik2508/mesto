class Card {
  // Конструктор класса, принимает данные и селектор шаблона карточки
  constructor(data, templateSelector) {
    this._data = data; // Данные карточки (название, ссылка)
    this._templateSelector = templateSelector; // Селектор шаблона карточки
  }

  // Приватный метод, получает содержимое шаблона карточки
  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector('.element').cloneNode(true);
  }

  // Приватный метод, обрабатывает клик по кнопке "Лайк"
  _handleLikeButtonClick(likeButton) {
    likeButton.classList.toggle('element__button_active');
  }

  // Приватный метод, обрабатывает клик по кнопке "Удалить"
  _handleDeleteButtonClick(cardElement) {
    cardElement.remove();
  }

  // Приватный метод, обрабатывает клик по изображению карточки
  _handleCardImageClick(cardImage) {
    const cardData = {
      name: cardImage.alt,
      link: cardImage.src
    };
    openImagePopup(cardData); // Вызываем функцию открытия попапа с изображением
  }

  // Приватный метод, назначает обработчики событий элементам карточки
  _setEventListeners() {
    const likeButton = this._element.querySelector('.element__button');
    const deleteButton = this._element.querySelector('.element__thrash-button');
    const cardImage = this._element.querySelector('.element__img');

    // Обработчик клика по кнопке "Лайк"
    likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick(likeButton);
    });

    // Обработчик клика по кнопке "Удалить"
    deleteButton.addEventListener('click', () => {
      this._handleDeleteButtonClick(this._element);
    });

    // Обработчик клика по изображению карточки
    cardImage.addEventListener('click', () => {
      this._handleCardImageClick(cardImage);
    });
  }

  // Публичный метод
  generateCard() {
    this._element = this._getTemplate(); 
    this._setEventListeners(); // Назначаем обработчики событий

    const cardImage = this._element.querySelector('.element__img');
    const cardTitle = this._element.querySelector('.element__title');

    // Заполняем данные карточки (изображение, название)
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    cardTitle.textContent = this._data.name;

    return this._element; // Возвращаем сгенерированный DOM-элемент карточки
  }
}

export default Card; 
