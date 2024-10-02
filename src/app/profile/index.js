import { memo, useCallback, useEffect, useState } from "react";
import PageLayout from "../../components/page-layout";
import Controls from "../../components/controls";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import ProfileCard from "../../components/profile-card";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector(state => ({
    user: state.auth.user,
    token: state.auth.token
  }))

  const callbacks = {
    logout: useCallback(() => store.actions.auth.deleteAuthUser(), [store])
  }

  useEffect(() => {
    if (!select.token) {
      console.warn('select: ', select);
      
      navigate('/login')
    }
  }, [select.token])

  console.log('select: ', select);
  return (
    <PageLayout >
      <Controls title='Выход' onHandleClick={callbacks.logout}/>
      <Head title={t('Магазин')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      {select.token &&
      <ProfileCard
        name={select.user.profile.name}
        phone={select.user.profile.phone}
        email={select.user.email}/>}
    </PageLayout>
  )
}


export default memo(Profile);