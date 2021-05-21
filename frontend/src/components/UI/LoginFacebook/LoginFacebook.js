import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import {useDispatch} from "react-redux";
import {FACEBOOK_APP_ID} from "../../../config";
import {facebookLoginRequest} from "../../../store/sagas/userSagas";

const LoginFacebook = () => {
  const dispatch = useDispatch();

  const callbackHandler = (response) => {
    if (response.id) {
      dispatch(facebookLoginRequest(response));
    }
  };

  return (
    <FacebookLoginButton
      appId={FACEBOOK_APP_ID}
      fields="name,email,picture"
      render={props=>(
        <Button
          variant='outlined'
          color='primary'
          onClick={props.onClick}
          startIcon={<FacebookIcon/>}>
          Sign up and Login with Facebook
        </Button>
      )}
      callback={response=>callbackHandler(response)}
    />
  );
};

export default LoginFacebook;