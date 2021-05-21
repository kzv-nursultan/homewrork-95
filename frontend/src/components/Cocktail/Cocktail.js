import React, {useState} from 'react';
import {Button, Card, CardMedia, Grid, List, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Ingredient from "../Ingredient/Ingredient";
import {nanoid} from "nanoid";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../UI/FormElement/FormElement";
import {getOneRequest, postRatingRequest} from "../../store/sagas/cocktailSaga";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
  },
  photoBlock: {
  },
  media: {
    width: 200,
    height: 'auto',
    margin: 5

  },
  ingTitle: {
    textTransform: 'uppercase',
    margin: 10
  },
  ratingTitle: {
    margin: 4
  },
  formBlock: {
    width: 200,
    margin: '5px auto 5px 5px',
    display: 'flex',
  },
  rateBtn: {
    margin: 5,
  }
})

const Cocktail = ({name, image, ingredients, recipe, id, average,}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user._id);
  const [rating, setRating] = useState({
    user,
    cocktail: id,
    rate: '',
  });
  const options = [1,2,3,4,5];
  const url = 'http://localhost:8000' + image;
  let avg = 0;

  if (average.length>0) {
    average.map(obj=>(
      avg+=obj.rate
    ));
    avg = Number(avg / average.length).toFixed(1);
  }

  const ratingChangeHandler = e => {
    setRating(prevState => ({
      ...prevState,
      rate: e.target.value,
    }));
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    await dispatch(postRatingRequest({...rating}));
    await dispatch(getOneRequest(id));
  };

  let ratingBlock = (
    <form className={classes.formBlock} onSubmit={onSubmitHandler}>
      <FormElement
        label='Rating'
        variant='outlined'
        value={rating.rate}
        fullWidth
        select
        onChange={ratingChangeHandler}
        options={options}
      />
      <Button
        variant='outlined'
        color='primary'
        type='submit'
        size='small'
        disabled={rating.rate === ''}
        className={classes.rateBtn}
      >
        OK!
      </Button>
    </form>
  );

  return (
    <Card className={classes.root}>
      <Grid container item className={classes.photoBlock}>
        <CardMedia
        image={url}
        title='Cocktails and Drinks'
        className={classes.media}
        />
        <Grid item>
          <Typography variant='h4'>
            Cocktail name: <strong>{name}</strong>
          </Typography>
          <Typography variant='h5' className={classes.ingTitle}>
            ingredients:
          </Typography>

          <List>
            {ingredients.map(obj => {
              return <Ingredient key={nanoid()} name={obj.name} amount={obj.amount}/>
            })}
          </List>

          <Typography variant='h5' className={classes.ratingTitle}>
            Rating: {avg}
          </Typography>
        </Grid>
      </Grid>

      <Grid container item spacing={2} direction='column'>
        <Grid item>
          <Typography variant='h6'>
            <strong>Recipe:</strong> {recipe}
          </Typography>
        </Grid>
        {user && (
          <Grid item>
            {ratingBlock}
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

Cocktail.propTypes = {
  image: PropTypes.string,
  ingredients: PropTypes.array,
  recipe: PropTypes.string,
}

export default Cocktail;