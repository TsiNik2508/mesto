class Card { 
  constructor(data, templateSelector, handleCardClick, api, handleDeleteClick, isOwner) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__button');
    this._deleteButton = this._element.querySelector('.element__thrash-button');
    this._cardImage = this._element.querySelector('.element__img');
    this._likeCount = this._element.querySelector('.element__like-count');
    this._api = api;
    this._handleDeleteClick = handleDeleteClick;
    this._isOwner = isOwner; 
    this._setEventListeners();
  }

  _getTemplate() { 
    const template = document.querySelector(this._templateSelector).content; 
    return template.querySelector('.element').cloneNode(true); 
  } 
  
  _handleLikeButtonClick = () => { 
    const isLiked = this._likeButton.classList.contains('element__button_active');
    const cardId = this._data._id;
  
    if (isLiked) {
      this._api.unlikeCard(cardId) 
        .then((newCardData) => {
          console.log('Response from server:', newCardData); 
          this.setLikes(newCardData.likes); 
          this._likeCount.textContent = newCardData.likes.length;
          this._likeButton.classList.remove('element__button_active'); 
        })
        .catch((error) => {
          console.error(`Ошибка при снятии лайка: ${error}`);
        });
    } else {
      this._api.likeCard(cardId) 
        .then((newCardData) => {
          console.log('Response from server:', newCardData); 
          this.setLikes(newCardData.likes); 
          this._likeCount.textContent = newCardData.likes.length;
          this._likeButton.classList.add('element__button_active'); 
        })
        .catch((error) => {
          console.error(`Ошибка при постановке лайка: ${error}`);
        });
    }
  }
  
  
  _handleDeleteButtonClick = () => { 
    this._handleDeleteClick(this._data._id);
  } 
 
  _handleImageClick = () => { 
    this._handleCardClick(this._data);  
  } 
 
  _setEventListeners() { 
    this._likeButton.addEventListener('click', this._handleLikeButtonClick); 
    this._deleteButton.addEventListener('click', this._handleDeleteButtonClick); 
    this._cardImage.addEventListener('click', this._handleImageClick); 
  } 
 
  generateCard() {
    const { name, link } = this._data;
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._element.querySelector('.element__title').textContent = name;
    if (this._isOwner) {
      this._element.querySelector('.element__thrash-button').classList.add('visible');
    } else {
      this._element.querySelector('.element__thrash-button').classList.remove('visible');
    }
  
    return this._element;
  }
  
  setLikes(likes) {
    this._likes = likes;
    this._likeCount.textContent = likes.length;
  }
  
}

export default Card;
