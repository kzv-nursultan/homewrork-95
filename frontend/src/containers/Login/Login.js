import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import {PersonAdd} from "@material-ui/icons";
import {Alert, AlertTitle} from "@material-ui/lab";
import FormElement from "../../components/UI/FormElement/FormElement";
import {loginRequest} from "../../store/sagas/userSagas";
import LoginFacebook from "../../components/UI/LoginFacebook/LoginFacebook";
import LoginGoogle from "../../components/UI/LoginGoogle/LoginGoogle";

const useStyles = makeStyles({
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    margin: '20px auto',
    textAlign: 'center',
  },
  formBlock: {
    maxWidth: 500,
    margin: '20px auto',
  },
  logInBtn: {
    maxWidth: 250,
    margin: '20px auto'
  }
})
const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.loginError);
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = e => {
    const {name, value} = e.target;
    setLoginUser(prevState => ({
      ...prevState,
      [name]:value,
    }));
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    dispatch(loginRequest({...loginUser}));
  };


  return (
    <Grid container justify='center' direction='column'>

      <Typography variant='h4' className={classes.title}>
        <PersonAdd fontSize='large' color='action'/>
        <br/>
        sign in
      </Typography>

      <Grid
        container
        item
        spacing={3}
        direction='column'
        onSubmit={onSubmitHandler}
        className={classes.formBlock}
        component='form'>

        {error && (
          <Grid item xs>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error.message}
            </Alert>
          </Grid>
        )}

        <FormElement
          name='email'
          label='Email'
          variant='outlined'
          onChange={onChangeHandler}
          required
          fullWidth
          value={loginUser.email}
        />

        <FormElement
          name='password'
          label='Password'
          type='password'
          variant='outlined'
          onChange={onChangeHandler}
          required
          fullWidth
          value={loginUser.password}
        />

        <Button
          variant='contained'
          color='primary'
          type='submit'
          className={classes.logInBtn}>
          log in
        </Button>

        <LoginFacebook/>
        <LoginGoogle/>

      </Grid>

    </Grid>
  );
};

export default Login;