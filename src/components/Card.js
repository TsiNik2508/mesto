export default class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDelete, handleLike, userId) {
    // Инициализация полей объекта карточки из переданных данных
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._template = document.querySelector(templateSelector);
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLike = handleLike;
    this._userId = userId;

    // Поле для отслеживаня состояния лайка карточки
    this.isLike = false;
  }

  // Приватный метод для получения шаблона карточки
  _getTemplate() {
    const card = this._template
      .content.querySelector('.element')
      .cloneNode(true);

    return card;
  }

  // Метод создания элемента карточки
  createCardElement() {
    this._newCard = this._getTemplate();

    // Инициализация элементов карточки данными
    this._imageElement = this._newCard.querySelector('.element__img');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._buttonLike = this._newCard.querySelector('.element__button');
    this._buttonDelete = this._newCard.querySelector('.element__thrash-button');
    this._likeCounter = this._newCard.querySelector('.element__like-count');

    this._setData();
    this._setEventListeners();

    // Установка количества лайков и проверка наличия лайков
    this._likeCounter.textContent = this._likes.length;
    this.toggleVisibleLikeCounter();

    if (this._likes.some(like => like._id === this._userId)) {
      this.isLike = true;
      this._buttonLike.classList.add('element__button_active');
    }

    // Если текущий пользователь не является владельцем карточки, скрываем кнопку
    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
    }

    return this._newCard;
  }

  // Приватный метод для установки данных в элементы карточки
  _setData() {
    const titleElement = this._newCard.querySelector('.element__title');
    titleElement.textContent = this._name;

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
  }

  // Метод удаления карточки
  deleteCard() {
    this._newCard.remove();
    this._newCard = null;
    this._imageElement = null;
    this._buttonLike = null;
  }

  // Приватный метод для переключения лайка
  _likeCard() {
    this._buttonLike.classList.toggle('element__button_active');
  }

  // Приватный метод для установки событий
  _setEventListeners() {
    // Удаления карточки
    this._buttonDelete.addEventListener('click', () => {
      this._handleCardDelete(this, this._cardId);
    });

    // Обработчик лайка
    this._buttonLike.addEventListener('click', () => {
      this._handleLike(this, this._cardId);
    });

    // Обработчик клика на изображени
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._getCardInfo());
    });
  }

  // Приватный метод для получения данных о карточке
  _getCardInfo() {
    return { name: this._name, link: this._link };
  }

  // Метод для обновления информации о лайках
  getLikes(likes) {
    this._likes = likes;
    this._likeCounter.textContent = this._likes.length;
  }

  // Метод для обновления состояния лайка и счетчика
  updateLikes(likes) {
    this.getLikes(likes);
    this.toggleButtonLike();
    this.toggleValueLike();
    this.toggleVisibleLikeCounter();
  }

  // Приватный метод для переключения состояния лайка
  toggleButtonLike() {
    this._buttonLike.classList.toggle('element__button_active');
  }

  // Приватный метод для переключения счета лайка
  toggleValueLike() {
    this.isLike = !this.isLike;
  }

  // Приватный метод для скрытия/отображения счетчика лайкв
  toggleVisibleLikeCounter() {
    if (this._likes.length !== 0) {
      this._likeCounter.classList.add('element__like-count_active');
    } else {
      this._likeCounter.classList.remove('element__like-count_active');
    }
  }
}
