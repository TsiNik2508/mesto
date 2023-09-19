import Popup from './Popup.js';
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__img');
    this._popupCaption = this._popup.querySelector('.popup__card-name');
    this._cardId = null; 
  }

  setCardId(cardId) {
    this._cardId = cardId;
  }

  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupCaption.textContent = data.name;
    super.open();
  }
}

export default PopupWithImage;