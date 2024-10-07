import { memo, useCallback, useEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import Form from '../../components/form';
import useStore from '../../hooks/use-store';
import AuthControl from '../../containers/auth-control';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function Login() {

  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector(state => ({
    token: state.auth.token,
    error: state.auth.error
  }))

  useEffect(() => {
    if (select.token) {
      navigate(-1)
    }
  }, [select.token])

  const callbacks = {
    authUser: useCallback((data) => store.actions.auth.authUser(data), [store]),
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
        onHandleSubmit={callbacks.authUser}
        error={select.error}
      >
      </Form>
    </PageLayout>
  )
}

export default memo(Login);