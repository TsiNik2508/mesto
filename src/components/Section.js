class Section { 
  constructor({ renderer }, containerSelector) { 
    this._renderer = renderer; 
    this._container = document.querySelector(containerSelector); 
  } 
 
  renderItems(items) { 
    items.forEach((item) => { 
      this._renderer(item); 
    }); 
  } 
 
  addItem(element) { 
    this._container.prepend(element); 
  }

  removeItem(cardId) {
    const cardElement = this._container.querySelector(`[data-card-id="${cardId}"]`);
    if (cardElement) {
      cardElement.remove();
    }
  }
  
} 
 
export default Section;