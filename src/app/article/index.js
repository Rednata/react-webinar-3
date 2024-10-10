import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import userCommentActions from '../../store-redux/user-comment/actions';
import CommentsList from '../../containers/comments-list';
import useSelectorCustom  from '../../hooks/use-selector';
import NonAuth from '../../components/non-auth';
import CommentFormLayout from '../../components/comment-form-layout';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const selectCustom = useSelectorCustom(state => ({
    exists: state.session.exists,
  }));

  const [answer, setAnswer] = useState('')
  const [newComment, setNewComment] = useState('')
  const [commentId, setCommentId] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),

    // Колбэк на ввод в форме отправки нового комментария
    onChangeNewComment:  (value) => {
      setNewComment(value)
    },

    // Колбэк на ввод в форме отправки ответа на комментарий
    onChangeAnswer: useCallback(value => setAnswer(value), []),

    // Отправка нового комментария
    onSubmitNewComment: useCallback(e => {
      e.preventDefault();
      const data = {text: newComment, parent: {'_id': params.id, '_type': 'article'}};
      dispatch(userCommentActions.post(data, () => dispatch(commentsActions.load(params.id))));
      setNewComment('');
    }, [newComment]),

    // Отправка ответа на комментарий
    onSubmitAnswer: useCallback(e => {
      e.preventDefault();
      const data = {text: answer, parent: {'_id': commentId, '_type': 'comment'}};
      dispatch(userCommentActions.post(data, () => dispatch(commentsActions.load(params.id))));
      setAnswer('');
    }, [answer]),

    // Закрытие формы отправки ответа на комментарий
    onCloseForm: useCallback(e => {
      dispatch(commentsActions.update(commentId))
    }, [store]),

    // Показать / скрыть форму для выбранного комментария
    showAnsqwerForm: useCallback(item => {
      dispatch(commentsActions.update(item.value))
      setCommentId(item.value);
      setPlaceholder(`Мой ответ для ${item.author.profile.name}`);
    }, [store])
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
        {
          select.comments.length
          ? (
              <CommentsList items={select.comments} onClick={callbacks.showAnsqwerForm}>
                {
                  selectCustom.exists
                    ? <CommentFormLayout
                        padding='small'
                        name='answer'
                        value={answer}
                        title='Новый ответ'
                        placeholder={placeholder}
                        onChange={callbacks.onChangeAnswer}
                        onSubmit={callbacks.onSubmitAnswer}
                      >
                        <button type='submit' form='form-comment'>Отправить</button>
                        <button type='button' onClick={callbacks.onCloseForm} >Отменить</button>
                      </CommentFormLayout>
                    : <NonAuth />
                }
              </CommentsList>
            )
          : ''
        }
        {
          selectCustom.exists
          ? <CommentFormLayout
              value={newComment}
              name='newComment'
              title='Новый комментарий'
              placeholder='Текст'
              onChange={callbacks.onChangeNewComment}
              onSubmit={callbacks.onSubmitNewComment}
            >
             <button type='submit' form='form-comment' >Отправить</button>
          </CommentFormLayout>
          : <NonAuth />
        }
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
