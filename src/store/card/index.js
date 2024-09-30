import { addLinkToItem } from "../../utils";
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
    const cardWithLink = addLinkToItem(json.result)
    this.setState({
      ...this.getState(),
      card: {
        title: cardWithLink.title,
        category: cardWithLink.category.title,
        description: cardWithLink.description,
        dateCreate: cardWithLink.dateCreate,
        price: cardWithLink.price,
        madeIn: cardWithLink.madeIn.title,
        code: cardWithLink.madeIn.code,
        _id: cardWithLink._id,
        link: cardWithLink.link
      }
    })
  }
}

export default Card;
