import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      token: '',
      user: {},
      error: '',
    };
  }

  async initToken() {
    const getCookie = (name) => {
      let cookie = document.cookie.split('; ').find(row => row.startsWith(name + '='));
      return cookie ? cookie.split('=')[1] : null;
    }

    const token = getCookie('token')
    if (token) {
      const res = await fetch(`/api/v1/users/self?fields=*`, {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      if (res.ok) {
        this.setState({
          user: json.result, token, error: ''
        }, 'Получение данных юзера при имеющемся токене')
      } else {
        this.setState({
          error: json.error.message
        }, 'Получение данных юзера при имеющемся токене')
      }
    }
  }

  async authUser(data) {
    const authData = {...data, remember: true}
    try {
      const res = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(authData)
      })
      const json = await res.json();
      if (res.ok) {
        this.setState({
          user: json.result.user, token: json.result.token, error: ''
        }, 'Получение данных юзера с нуля')
      } else {
        this.setState({
          error: json.error.message
        }, 'Получение данных юзера с нуля')
      }
    } catch (error) {
      this.setState({
        ...this.getState(), error: 'Ошибка работы сервера'
      }, 'Получение данных юзера с нуля')
    }
  }

  async deleteAuthUser() {
    try {
      const res = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json'
        },
      })
      const json = await res.json();
      document.cookie = 'token=; max-age=-1';
      if (res.ok) {
        this.setState({
          ...this.getState(), user: {}, token: '', error: ''
        })
      } else {
        this.setState({
          error: json.error.message
        })
      }
    } catch (error) {
      this.setState({
        ...this.getState(), error: 'Ошибка работы сервера'
      })
    }
  }
}

export default AuthState;
