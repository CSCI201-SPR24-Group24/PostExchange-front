import { useState } from 'react';

export default function useLoginToken() {

  const getLoginToken = () => {
    const tokenString = sessionStorage.getItem('loginToken');
    const userToken = JSON.parse(tokenString);
    console.log("token changes propogate");
    console.log(userToken);
    return userToken
  };

  const [loginToken, setLoginState] = useState(getLoginToken());

  const saveLoginToken = userToken => {
    if(!userToken) {
      sessionStorage.removeItem('loginToken');
    } else {
      sessionStorage.setItem('loginToken', JSON.stringify(userToken));
      setLoginState(userToken.token);
    }
    console.log("changing token");
  };


  return {
    setLoginToken: saveLoginToken,
    loginToken
  }
}