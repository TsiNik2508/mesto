import Popup from './Popup.js';
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); // Вызываем конструктор обычного класса и передаем ему селектор
    this._popupImage = this._popup.querySelector('.popup__img');
    this._popupCaption = this._popup.querySelector('.popup__card-name');
  }
  // Метод для открытия окна с изображением
  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupCaption.textContent = data.name;
    super.open();
  }
}

export default PopupWithImage;