import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getRequest} from "../../store/sagas/cocktailSaga";
import {Grid} from "@material-ui/core";
import CocktailPreview from "../../components/CocktailPreview/CocktailPreview";

const MainPage = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector(state => state.cocktails.cocktails);
  const user = useSelector(state => state.users.user);

  useEffect(() => {
    dispatch(getRequest());
  },[dispatch]);

  let cocktailsList = 'No published cocktails found'
  if (cocktails.length > 0) {
    cocktailsList = (
    cocktails.map(obj => (
      <CocktailPreview
        key={obj._id}
        id={obj._id}
        image={obj.image}
        name={obj.name}
        admin={user.role === 'admin'}
        rating={obj.rating}
        published={obj.published}
      />
    ))
    )
  }
  return (
    <Grid container item>
      {cocktailsList}
    </Grid>
  );
};

export default MainPage;