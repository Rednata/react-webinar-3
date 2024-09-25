import StoreModule from "../module";

class Card extends StoreModule {
  initState() {
    return {
      card: {}
    }
  }

  async load(id) {
    // http://query.rest/api/v1/articles/65817bed5c295a2ff2fcd182?fields=*,madeIn(title,code),category(title)

    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    // const response = await fetch(`/api/v1/articles/${id}`);
    const json = await response.json();
    console.log('json: ', json);

    this.setState({
      ...this.getState(),
      card: {
        title: json.result.title,
        category: json.result.category.title,
        description: json.result.description,
        dateCreate: json.result.dateCreate,
        price: json.result.price,
        madeIn: json.result.madeIn.title,
        currency: json.result.madeIn.code,
      }
    })
  }
}

export default Card;
