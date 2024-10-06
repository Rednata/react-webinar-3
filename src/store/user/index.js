import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      user: {},
      waiting: false,
      error: ''
    };
  }

  async getUserData(token) {

    this.setState({
      user: {},
      waiting: true,
    });

    try {
      const res = await fetch(`/api/v1/users/self?fields=*`, {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()

      this.setState(
        {
          user: json.result,
          waiting: false,
        },
        'Получена информация о пользователе ',
      );
    } catch (error) {
      this.setState({
        user: {},
        waiting: false,
      });
    }

  }
}

export default UserState;
