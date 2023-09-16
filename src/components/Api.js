class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: {
                authorization: this.headers.authorization,
                'Content-Type': this.headers['Content-Type'],
                cohort: 'cohort-75',
            },
        }).then(this._checkResponse);
    }


    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        }).then(this._checkResponse);
    }

    editUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data),
        }).then(this._checkResponse);
    }


    addCard({ name, link }) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then(this._checkResponse);
    }


    deleteCard(cardId) {
        console.log('Deleting card with ID:', cardId);
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        }).then(this._checkResponse);
    }


    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers,
        }).then(this._checkResponse);
    }

    unlikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        }).then(this._checkResponse);
    }

    updateAvatar(avatarUrl) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
            authorization: this.headers.authorization,
            'Content-Type': this.headers['Content-Type'],
          },
          body: JSON.stringify({ avatar: avatarUrl}),
        })
          .then(this._checkResponse)
          .catch((error) => {
            console.error(`Ошибка при обновлении аватара: ${error}`);
          });
      }      
}

export default Api;
