import React from 'react';
import GoogleLogin from "react-google-login";
import {GOOGLE_APP_ID} from '../../../config';
import {useDispatch} from "react-redux";
import {googleLoginRequest} from "../../../store/sagas/userSagas";

const LoginGoogle = () => {
  const dispatch = useDispatch();

  const responseHandler = response => {
    dispatch(googleLoginRequest(response));
  };

  return (
    <GoogleLogin
      clientId={GOOGLE_APP_ID}
      buttonText="Log in with Google"
      onSuccess={responseHandler}
      onFailure={(e)=>console.error(e)}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default LoginGoogle;