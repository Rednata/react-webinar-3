import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    onFilter: useCallback((category) => {console.log(category); store.actions.catalog.setParams({category}), [store]}),
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
    filter: useMemo(
      () => [
        { value: 'all', title: 'Все' },
        { value: 'electronics', title: 'Электроника', id: '66fab39363bfe248a856308c' },
        { value: 'phones', title: '- Телефоны', id: '66fab39363bfe248a856308d' },
        { value: 'smart', title: '- - Смартфоны', id: '66fab39363bfe248a8563094' },
        { value: 'accessories', title: '- - Аксессуары', id: '66fab39363bfe248a8563095' },
        { value: 'notebooks', title: '- Ноутбуки', id: '66fab39363bfe248a856308e' },
        { value: 'tv', title: '- Телевизоры', id: '66fab39363bfe248a856308f' },
        { value: 'teach', title: 'Книги', id: '66fab39363bfe248a8563090' },
        { value: 'books', title: '- Учебники', id: '66fab39363bfe248a8563091' },
        { value: 'art', title: '- Художественная', id: '66fab39363bfe248a8563092' },
        { value: 'comics', title: '- Комиксы', id: '66fab39363bfe248a8563093' },
      ],
      [],
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select options={options.filter} value={select.category} onChange={callbacks.onFilter} />
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
