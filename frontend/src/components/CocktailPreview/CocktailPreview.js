import React from 'react';
import {Button, CardMedia, Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {historyPush} from "../../store/sagas/historySaga";
import {deleteRequest, patchRequest} from "../../store/sagas/cocktailSaga";

const useStyles = makeStyles({
  root: {
    display: 'block',
    width: 'auto',
    margin: '10px auto',
    textAlign: 'center',
  },
  media: {
    width: 200,
    height: 200,
    margin: 5
  },
  moreBtn: {
    margin: '5px auto'
  }
})

const CocktailPreview = ({image, name, published, admin, id, rating}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let avg = 0;

  const moreClickHandler = () => {
    dispatch(historyPush('/one_cocktail/' + id));
  };

  if (rating.length > 0) {
    rating.map(obj => {
      return avg += obj.rate;
    })
    avg = Number(avg / rating.length).toFixed(1);
  }

  const deleteHandler = () => {
    dispatch(deleteRequest(id))
  };

  const patchHandler = () => {
    dispatch(patchRequest(id))
  };

  return (
    <Paper className={classes.root} style={{display: published || admin ? 'block' : 'none'}}>
      <CardMedia
        image={'http://localhost:8000'+image}
        title={name}
        className={classes.media}/>
      <Typography variant='h6'>
        Name: <strong>{name}</strong>
      </Typography>
      <Typography variant='h6'>
        Rating: {avg}
      </Typography>
      <Button
        variant='contained'
        color='primary'
        className={classes.moreBtn}
        size="small"
        onClick={moreClickHandler}
        >
        more
      </Button>
      { admin && (
        <Grid item>
          <Button
            onClick={patchHandler}
            disabled={published}>
            publish
          </Button>
          <Button
            onClick={deleteHandler}>
            delete
          </Button>
        </Grid>
      )}
    </Paper>
  );
};

export default CocktailPreview;