import StoreModule from '../module';

class CategoriesState extends StoreModule {
  initState() {
    return {
      list: []
    };
  }

  async getCategories() {
    try {
      const res = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')
      const json = await res.json()

      const sorted = this.categorySort(json.result.items);

      this.setState({
        list: sorted
      }, 'Получение списка категорий')
    } catch (error) {
      console.log('error: ', error);
    }
  }

  categorySort(list) {
    let history = [];
    let result = [];

    for (const item of list) {
      if (history.includes(item._id)) continue;
      if (!item.parent) {
        history.push(item._id)
        result.push(item)
        continue
      }
      else if (item.parent) {
        let tempParent = list.find(elem => elem._id === item.parent._id)
        if (tempParent.children) {
          tempParent.children.push(item)
        } else {
          tempParent.children = [item]
        }
        history.push(item._id)
      }
    }

    let temp = [{title: 'Все', value:''}];
    function setHierarchy( items = [], indent = ' ') {
      items.forEach(item => {
        // const i = (item.children, indent + '-')
        temp.push({title: indent + item.title, value: item._id})
        setHierarchy(item.children, indent + '-');
      });
      return temp
    }
    return setHierarchy(result, '')
  }
}

export default CategoriesState;
