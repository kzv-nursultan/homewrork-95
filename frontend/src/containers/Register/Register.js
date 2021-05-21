import React, {useState} from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import FormElement from "../../components/UI/FormElement/FormElement";
import {PersonAdd} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {registerRequest} from "../../store/sagas/userSagas";
import LoginFacebook from "../../components/UI/LoginFacebook/LoginFacebook";
import LoginGoogle from "../../components/UI/LoginGoogle/LoginGoogle";

const useStyles = makeStyles({
  root: {
    flexDirection: 'column'
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    margin: '20px auto',
    textAlign: 'center',
  },
  formBlock: {
    maxWidth: 500,
    margin: '20px auto',
    flexDirection: 'column',
  },
  sendBtn: {
    maxWidth: 250,
    margin: '10px auto',
  }
})

const Register = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [newUser, setUser] = useState({
    email:'',
    password:'',
    username:'',
    avatar:'',
  });

  const error = useSelector(state => state.users.registerError);

  const onChangeHandler = e => {
    const {name, value} = e.target;

    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const submitHandler = e => {
    e.preventDefault();
    dispatch(registerRequest({...newUser}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  }

  return (
    <Grid container justify='center' className={classes.root}>

      <Typography variant='h4' className={classes.title}>
        <PersonAdd fontSize='large' color='action'/>
        <br/>
        Sign In
      </Typography>

      <Grid
        container
        item
        spacing={2}
        className={classes.formBlock}
        onSubmit={submitHandler}
        component='form'>

        <FormElement
          name='email'
          label='Email'
          variant='outlined'
          type='email'
          fullWidth
          error={getFieldError('email')}
          onChange={onChangeHandler}
          required/>

        <FormElement
          name='password'
          label='Password'
          variant='outlined'
          type='password'
          fullWidth
          onChange={onChangeHandler}
          required
          error={getFieldError('password')}/>

        <FormElement
          name='username'
          label='Username'
          variant='outlined'
          fullWidth
          onChange={onChangeHandler}
          required/>

        <FormElement
          name='avatar'
          label='Avatar'
          variant='outlined'
          onChange={onChangeHandler}
          fullWidth/>

        <Button
          variant='contained'
          type='submit'
          color='primary'
          className={classes.sendBtn}>
          <strong>register</strong>
        </Button>

        <LoginFacebook/>
        <LoginGoogle/>

      </Grid>
    </Grid>
  );
};

export default Register;