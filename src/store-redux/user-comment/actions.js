// import treeToList from '../../utils/tree-to-list';
// import listToTree from '../../utils/list-to-tree';
// import dateFormat from '../../utils/date-format';

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  post: (data) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      // dispatch({ type: 'comment/post-start' });

      try {
        await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify(data),
        });
        // Комментарий отправлен

        // dispatch({ type: 'comments/load-success', payload: { data: comments } });
      } catch (e) {
        //Ошибка загрузки
        // dispatch({ type: 'comments/load-error' });
      }
    };
  },

};
