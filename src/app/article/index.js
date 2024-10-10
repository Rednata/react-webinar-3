import { memo, useCallback, useMemo, useState } from 'react';
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
import CommentForm from '../../components/comment-form';
import NonAuth from '../../components/non-auth';
import CommentFormLayout from '../../components/comment-form-layout';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data,
      // exists: state.session.exists,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const selectCustom = useSelectorCustom(state => ({
    exists: state.session.exists,
  }));

  const [text, setText] = useState('');

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onChange: useCallback(value => setText(value), []),
    // Отправка нового комментария
    onSubmit: useCallback(e => {
      e.preventDefault();
      const data = {text, parent: {'_id': params.id, '_type': 'article'}}
      dispatch(userCommentActions.post(data))
    }, [text]),
    showAnsqwerForm: useCallback(item => {
      dispatch(commentsActions.update(item.value))
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
                    ? <CommentFormLayout padding='small' value={text} title='Новый ответ' onChange={callbacks.onChange} onSubmit={callbacks.onSubmit}>
                        <button type='submit' form='form-comment'>Отправить</button>
                        <button type='button' >Отменить</button>
                      </CommentFormLayout>
                    : <NonAuth />
                }
              </CommentsList>
            )
          : ''
        }
        {
          selectCustom.exists
          ? <CommentFormLayout value={text} title='Новый комментарий' onChange={callbacks.onChange} onSubmit={callbacks.onSubmit}>
             <button type='submit' form='form-comment' >Отправить</button>
          </CommentFormLayout>
          : <NonAuth />
        }
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
