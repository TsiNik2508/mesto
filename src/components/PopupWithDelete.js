import Popup from '../components/Popup.js';  

class PopupWithDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button');
  }

  setCardId(cardId) {
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
  
    this._popup.querySelector('.popup__close').addEventListener('click', () => {
      console.log('Close button clicked'); 
      this.close();
    });
  
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('Form submitted'); 
      this._handleFormSubmit();
    });
  }
  

  open(cardId) {
    this.setCardId(cardId);
    super.open();
  }
}



export default PopupWithDelete;