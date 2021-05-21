import React from 'react';
import {Card, CardMedia, Grid, List, Typography} from "@material-ui/core";
import Ingredient from "../Ingredient/Ingredient";
import {nanoid} from "nanoid";
import {makeStyles} from "@material-ui/core/styles";

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

const MyCocktails = ({image,name, ingredients, recipe, rating, published}) => {
  const classes = useStyles();
  const url = 'http://localhost:8000' + image
  let avg = 0;

  if (rating.length > 0) {
    rating.map(obj => {
      return avg += obj.rate;
    })
    avg = Number(avg / rating.length).toFixed(1);
  }

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
          <Typography variant='h6'>
            <strong>Published Status: </strong>  {published ? 'PUBLISHED' : 'NOT PUBLISHED'}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MyCocktails;