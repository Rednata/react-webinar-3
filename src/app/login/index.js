import { memo, useCallback } from 'react';
import PageLayout from "../../components/page-layout";
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import Form from '../../components/form';
import useStore from '../../hooks/use-store';
import AuthControl from '../../containers/auth-control';
import useSelector from '../../hooks/use-selector';

function Login() {

  const store = useStore();

  const select = useSelector(state => ({
    error: state.auth.error
  }))

  const callbacks = {
    getToken: useCallback((data) => store.actions.auth.getToken(data), [store]),
  }

  const options = {
    inputData: [
      {type: 'text', label: 'Логин', id: 'login', name: 'login'},
      {type: 'password', label: 'Пароль', id: 'password', name: 'password'},
    ],
    formData: {
      login: '', password: ''
    }
  }

  return (
    <PageLayout>
      <AuthControl />
      <Head title='Магазин'>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Form
        inputData={options.inputData}
        formData={options.formData}
        onHandleSubmit={callbacks.getToken}
        error={select.error}
      >
      </Form>
    </PageLayout>
  )
}

export default memo(Login);