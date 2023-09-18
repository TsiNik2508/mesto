class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._items = [];
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

  updateLikes(cardId, newLikes) {
    this._items.forEach((item) => {
      if (item._data._id === cardId) {
        item.updateLikes(newLikes);
      }
    });
  }

  setItems(items) {
    this._items = items;
  }
}

export  { Section}  ;
