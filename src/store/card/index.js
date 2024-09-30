import StoreModule from "../module";

class Card extends StoreModule {
  initState() {
    return {
      card: {}
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      card: {
        title: json.result.title,
        category: json.result.category.title,
        description: json.result.description,
        dateCreate: json.result.dateCreate,
        price: json.result.price,
        madeIn: json.result.madeIn.title,
        code: json.result.madeIn.code,
        _id: json.result._id,
      }
    })
  }
}

export default Card;
