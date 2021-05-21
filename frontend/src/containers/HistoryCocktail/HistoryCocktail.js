import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getMyRequest} from "../../store/sagas/cocktailSaga";
import MyCocktails from "../../components/MyCocktails/MyCocktails";

const useStyles = makeStyles({
  root: {

  },
});

const HistoryCocktail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const cocktails = useSelector(state => state.cocktails.myCocktails);

  useEffect(() => {
    dispatch(getMyRequest(user._id));
  }, [dispatch, user._id]);

  let myCocktailList = "It seems you don't have any posted Cocktails";

  if (cocktails.length > 0) {
    myCocktailList = (
      cocktails.map(obj => (
       <MyCocktails
        key={obj._id}
        image={obj.image}
        name={obj.name}
        ingredients={obj.ingredients}
        recipe={obj.recipe}
        rating={obj.rating}
        published={obj.published}
       />
      ))
    )
  }
  return (
    <Grid container className={classes.root}>
      <Grid container item>
        {myCocktailList}
      </Grid>
    </Grid>
  );
};

export default HistoryCocktail;