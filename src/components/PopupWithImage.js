import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__img');
    this._popupCaption = this._popup.querySelector('.popup__card-name');
  }

  open({ link, name }) {
    this._popupImage.src = link;
    this._popupImage.alt = `Изображение ${name}`;
    this._popupCaption.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
