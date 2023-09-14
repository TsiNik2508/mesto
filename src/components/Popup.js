class Popup { 
  constructor(popupSelector) { 
    this._popup = document.querySelector(popupSelector); 
    this._handleEscClose = this._handleEscClose.bind(this); 
  } 

  setCardId(cardId) { 
    this._cardId = cardId;
  }
 
  _handleEscClose(event) { 
    if (event.key === 'Escape') { 
      this.close(); 
    } 
  } 
 
  open(cardId) { 
    this._popup.classList.add('popup_opened'); 
    document.addEventListener('keydown', this._handleEscClose); 
    this.setCardId(cardId); 
  }
  
 
  close() { 
    this._popup.classList.remove('popup_opened'); 
    document.removeEventListener('keydown', this._handleEscClose); 
  } 
 
  setEventListeners() { 
    this._popup.addEventListener('click', (event) => { 
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) { 
        this.close(); 
      } 
    }); 
  } 
} 
 
export default Popup;