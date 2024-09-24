class StoreModule {
  constructor(store, name) {
    this.store = store;
    this.name = name;
  }

  initState() {
    return {}
  }

  getState() {
    return this.store.getState()[this.name];
  }

  setState(newState) {
    this.store.setState({
      ...this.store.getState(),
      [this.name]: newState
    })
  }
}

export default StoreModule;
