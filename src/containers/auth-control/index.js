import { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import SideLayout from '../../components/side-layout';
import useStore from '../../hooks/use-store';

function AuthControl() {

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.auth.token,
    user: state.auth.user,
  }));

  const callbacks = {
    onLoginPageNavigate: useCallback(() => navigate('/login'), [store]),
    logout: useCallback(() => store.actions.auth.deleteAuthUser(), [store])
  }

  return (
        select.token
      ? (
        <SideLayout side='end' padding='medium'>
          {/* <Link to='/profile'>ssss</Link> */}
          <Link to='/profile'>{select.user.profile.name}</Link>
          <button onClick={callbacks.logout}>Выход</button>
        </SideLayout>
        )
      : (
        <SideLayout side='end' padding='medium'>
          <button onClick={callbacks.onLoginPageNavigate}>Вход</button>
        </SideLayout>
      )
  );
}

export default memo(AuthControl);
