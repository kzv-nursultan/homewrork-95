import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid, IconButton, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FormElement from "../../components/UI/FormElement/FormElement";
import {postRequest} from "../../store/sagas/cocktailSaga";
import {historyPush} from "../../store/sagas/historySaga";

const useStyles = makeStyles({
  innerContainer: {
    width: '90%',
    margin: '20px auto',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  cocktailName: {
    display: "flex",
    margin: '20px auto',
    alignItems: 'center',
    width: '80%'
  },
  photoBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '80%',
    margin:'10px auto'
  },
  input: {
    display: 'none',
  },
  photoBtn: {
    margin: 5,
  },
  cocktailIngredients: {
    width: '80%',
    margin: '20px auto'
  },
  ingBlock: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: 10
  },
  addBtn: {
    margin: '10px 10px 10px auto',
  },
  createBtn: {
    maxWidth: 200,
    margin: '5px auto',
  },
  recipeBlock: {
    margin: '30px auto',
    width: '80%',
  }
})

const AddCocktails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [cocktail, setCocktail] = useState({
    name:'',
    recipe:'',
  });
  const [ingredients, setIngredients] = useState([{name: '', amount:''}]);
  const [cocktailImage, setCocktailImage] = useState('');
  const author = useSelector(state => state.users?.user._id);

  const cocktailChangeHandler = e => {
    const {name, value} = e.target;
      setCocktail( prevState => ({
        ...prevState,
        [name]: value
      }))
  };

  const changeHandler = (i, name, value) => {
    setIngredients( prevState => {
      const ingCopy = {
        ...prevState[i],
        [name]: value
      };

      return prevState.map((ing, idx) => {
        if (idx === i) {
          return ingCopy;
        }
        return ing;
      })
    })
  };

  const fileChangeHandler = e => {
    if(e.target.files[0].name){
      const file = e.target.files[0];
      setCocktailImage(file);
    } else {
      setCocktailImage('');
    }
  };

  const deleteIngredient = i => {
    setIngredients(prevState => prevState.filter(ing => prevState.indexOf(ing) !== i));
  };

  const addBtnHandler = () => {
    setIngredients(prevState => ([...prevState, {name:'', amount:''}]));
  };

  const createHandler = async () => {
    const body = {
      name: cocktail.name,
      ingredients,
      author,
      recipe: cocktail.recipe,
      image: cocktailImage,
    }
    const formData = new FormData();
    Object.keys(body).map(key=> {
      if (key === 'ingredients') {
        return body.ingredients.forEach(ing => formData.append('ingredients[]', JSON.stringify(ing)));
      }
      return formData.append(key, body[key])
    });
    await dispatch(postRequest(formData));
    await dispatch(historyPush('/'));
  };

  return (
    <Grid container>
      <Grid container item className={classes.innerContainer} direction='column'>

        <Typography variant='h3' className={classes.title}>
          Add new Cocktail
        </Typography>

        <Grid container item className={classes.cocktailName} spacing={2}>
          <Typography variant='h4'>
            Cocktail Name:
          </Typography>
          <FormElement
          name='name'
          value={cocktail.name}
          label='Cocktail Name'
          variant='outlined'
          onChange={cocktailChangeHandler}
          required
          fullWidth
          />
        </Grid>

        <Grid item className={classes.photoBlock}>
          <TextField
          disabled
          fullWidth
          variant='outlined'
          value={cocktailImage.name ? cocktailImage.name : ''}
          />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            onChange={fileChangeHandler}
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              endIcon={<AddAPhotoIcon/>}
              className={classes.photoBtn}>
              Upload
            </Button>
          </label>
        </Grid>

        <Grid container item className={classes.cocktailIngredients} spacing={2}>
          <Typography variant='h4'>
            Ingredients
          </Typography>

          {ingredients.map((object, i)=>(
              <Grid container item className={classes.ingBlock} key={i} spacing={1}>
                <FormElement
                  label='name'
                  variant='outlined'
                  required
                  onChange={e => changeHandler(i, 'name', e.target.value)}/>

                <FormElement
                  label='amount'
                  variant='outlined'
                  required
                  onChange={e => changeHandler(i, 'amount', e.target.value)}/>

                <IconButton
                  disabled={ingredients.length === 1}
                  onClick={()=>deleteIngredient(i)}>
                  <DeleteIcon/>
                </IconButton>
              </Grid>
            ))}
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={classes.addBtn}
            onClick={addBtnHandler}
            endIcon={<AddCircleOutlineIcon/>}>
            Add
          </Button>
        </Grid>
        <Grid item className={classes.recipeBlock}>
          <Typography variant='h4'>
            Recipe
          </Typography>
          <FormElement
            name='recipe'
            value={cocktail.recipe}
            onChange={cocktailChangeHandler}
            label='Recipe'
            multiline
            required
            rows={5}
            variant='outlined'
            fullWidth
          />

        </Grid>
        <Button
          variant='outlined'
          color='primary'
          className={classes.createBtn}
          onClick={createHandler}>
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddCocktails;