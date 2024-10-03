import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Categories from '../../components/categories';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  useEffect(() => {
    store.actions.categories.getCategories()
  }, [])

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.categories.list,
  }));

  console.log('select: ', select);

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    onCategory: useCallback((category) => {
      {console.log(category); store.actions.catalog.setParams({category, page: 1}), [store]}
    }),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
    category: useMemo(
      () => [
        { name: 'all', title: 'Все', value: '0' },
        { name: 'electronics', title: 'Электроника', value: '66fab39363bfe248a856308c' },
        { name: 'phones', title: '- Телефоны', value: '66fab39363bfe248a856308d' },
        { name: 'smart', title: '- - Смартфоны', value: '66fab39363bfe248a8563094' },
        { name: 'accessories', title: '- - Аксессуары', value: '66fab39363bfe248a8563095' },
        { name: 'notebooks', title: '- Ноутбуки', value: '66fab39363bfe248a856308e' },
        { name: 'tv', title: '- Телевизоры', value: '66fab39363bfe248a856308f' },
        { name: 'teach', title: 'Книги', value: '66fab39363bfe248a8563090' },
        { name: 'books', title: '- Учебники', value: '66fab39363bfe248a8563091' },
        { name: 'art', title: '- Художественная', value: '66fab39363bfe248a8563092' },
        { name: 'comics', title: '- Комиксы', value: '66fab39363bfe248a8563093' },
      ],
      [],
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Categories list={select.categories}/>
      <Select options={options.category} value={select.category} onChange={callbacks.onCategory} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
        indent={1}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
