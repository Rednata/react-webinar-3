import { memo, useCallback } from 'react';
import Controls from '../../components/controls';
import { Link, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import SideLayout from '../../components/side-layout';

function AuthControl() {

  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.auth.token,
    userName: state.auth.user,
  }));

  const callbacks = {
    onLoginPageNavigate: useCallback(() => navigate('/login')),
    logout: useCallback(() => console.log())
  }

  return (
        select.token
      ? (
        <SideLayout side='end' padding='small'>
          <Link to='/profile'>{select.userName.profile.name}</Link>
          <Controls title='Выход' onHandleClick={callbacks.logout}/>
        </SideLayout>
        )
      : <Controls title='Вход' onHandleClick={callbacks.onLoginPageNavigate}/>
  );
}

export default memo(AuthControl);
