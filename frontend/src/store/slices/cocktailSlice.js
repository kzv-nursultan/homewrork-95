import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cocktails: [],
  cocktail: {},
  postError: null,
  myCocktails: [],
  myCocktailsFailure: null,
  oneError: null,
};

const name = 'cocktail';

const cocktailSlice = createSlice({
  name,
  initialState,
  reducers: {
    postRequest: state => {
      state.loading = true;
    },
    postSuccess: (state, {payload: cocktail}) => {
      state.cocktail = cocktail;
      state.loading = false;
    },
    postFailure: (state, {payload: error}) => {
      state.postError = error;
      state.loading = false;
    },
    getRequest: state => {
      state.loading = true;
    },
    getSuccess: (state, {payload: cocktails}) => {
      state.cocktails = cocktails;
      state.loading = false;
    },
    getFailure: state => {
      state.loading = false;
    },
    getMyRequest: state => {
      state.loading = true;
    },
    getMySuccess: (state, {payload: cocktails}) => {
      state.loading = false;
      state.myCocktails = cocktails;
    },
    getMyFailure: (state, {payload: error}) => {
      state.loading = false;
      state.myCocktailsFailure = error;
    },
    getOneRequest: state => {
      state.loading = true;
    },
    getOneSuccess: (state, {payload: cocktail}) => {
      state.loading = false;
      state.cocktail = cocktail;
    },
    getOneFailure: (state, {payload: error}) => {
      state.loading = false;
      state.error = error;
    },
    postRatingRequest: state => {
      state.loading = true;
    },
    postRatingSuccess: state => {
      state.loading = false;
    },
    postRatingFailure: state => {
      state.loading = false;
    },
    deleteRequest: state => {
      state.loading = true;
    },
    deleteSuccess: (state, {payload: cocktails}) => {
      state.cocktails = cocktails;
      state.loading = false;
    },
    deleteFailure: state => {
      state.loading = false;
    },
    patchRequest: state => {
      state.loading = true;
    },
    patchSuccess: (state, {payload: cocktails}) => {
      state.cocktails = cocktails;
      state.loading = false;
    },
    patchFailure: state => {
      state.loading = false;
    },
  }
});

export default cocktailSlice;
