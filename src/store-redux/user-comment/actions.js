export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  post: (data, callbackSuccess) => {

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
        dispatch({ type: 'comment/load-success' });
        callbackSuccess()

      } catch (e) {
        //Ошибка загрузки
        // dispatch({ type: 'comments/load-error' });
      }
    };
  },

};
