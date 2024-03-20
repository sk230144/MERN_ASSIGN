import React, { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import ImageGallery from '../Post';
import LoginPage from './LoginPage';

const IndexPage = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${window.location.origin}/profile`, {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const username = userInfo?.username;

  return (
    <div>
      {username ? <ImageGallery /> : <LoginPage />}
    </div>
  );
};

export default IndexPage;
