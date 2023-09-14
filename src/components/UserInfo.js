class UserInfo {
  constructor({ nameSelector, bioSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._bioElement = document.querySelector(bioSelector);
    this._id = null;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      bio: this._bioElement.textContent,
    };
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._bioElement.textContent = data.about;
    this._id = data._id; 
  }

  getUserId() {
    return this._id; 
  }
}

export default UserInfo;