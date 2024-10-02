import { memo, useCallback } from 'react';
import PageLayout from "../../components/page-layout";
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import Form from '../../components/form';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import SideLayout from '../../components/side-layout';
import Controls from '../../components/controls';
import { Link } from 'react-router-dom';

function Login() {

  const store = useStore();
  const select = useSelector(state => ({
    token: state.auth.token,
    userName: state.auth.user,
  }));

  const callbacks = {
    getToken: useCallback((data) => store.actions.auth.getToken(data), [store]),
    logout: useCallback(() => console.log()
    ),
  }


  return (
    <PageLayout>
      {
        select.token
        ? (
          <SideLayout side='end' padding='small'>
            <Link to='/profile'>{select.userName.profile.name}</Link>
            <Controls title='Выход' onHandleClick={callbacks.logout}/>
          </SideLayout>
          )
        : <Controls title='Вход'/>
      }
      <Head title='Магазин'>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Form onHandleSubmit={callbacks.getToken}>
      </Form>
    </PageLayout>
  )
}

export default memo(Login);