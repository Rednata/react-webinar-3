import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      token: '',
      user: {},
      error: '',
    };
  }

  async getToken(data) {
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
          ...this.getState(), user: json.result.user, token: json.result.token
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

  async deleteAuthUser(data) {
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
