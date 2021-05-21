import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getOneRequest} from "../../store/sagas/cocktailSaga";
import Cocktail from "../../components/Cocktail/Cocktail";

const OneCocktail = props => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const cocktail = useSelector(state => state.cocktails.cocktail);

  useEffect(()=>{
    dispatch(getOneRequest(id));
  },[dispatch, id]);

  let cocktailInfo = 'Something went wrong'

  if (cocktail._id) {
    cocktailInfo = (
      <Cocktail
        name={cocktail.name}
        id={cocktail._id}
        image={cocktail.image}
        ingredients={cocktail.ingredients}
        recipe={cocktail.recipe}
        average={cocktail.rating}
      />
    )
  };

  return (
    <Grid container>
      {cocktailInfo}
    </Grid>
  );
};

export default OneCocktail;