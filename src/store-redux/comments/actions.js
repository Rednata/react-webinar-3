import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import dateFormat from '../../utils/date-format';

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии загружены
        const  comments = treeToList(listToTree(res.data.result.items), (item, level) => {
          return ({
          date: dateFormat(item?.dateCreate),
          author: item?.author,
          value: item?._id,
          text: '  '.repeat(level) + item?.text,
          level: level,
          showAnsqwer: false,
        })}).filter(item => item.text !== 'undefined') ;

        dispatch({ type: 'comments/load-success', payload: { data: comments } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  update: id => {
    return (dispatch, getState) => {
      const comments = getState().comments.data;
      const newComments = comments.map(item => {
        if (item.value === id) {
          const isShowAnsqwer = item.showAnsqwer;
          item.showAnsqwer = !isShowAnsqwer;
        } else {
          item.showAnsqwer = false;
        }
        return item
      })

      dispatch({ type: 'comments/update-showAnswer', payload: { data: newComments} });
    }

  }
};
