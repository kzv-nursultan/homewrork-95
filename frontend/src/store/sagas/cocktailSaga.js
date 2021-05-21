import {put, takeEvery} from 'redux-saga/effects';
import cocktailSlice from "../slices/cocktailSlice";
import axiosApi from "../../axiosApi";
import {NotificationManager} from "react-notifications";

export const {
  postRequest,
  postSuccess,
  postFailure,
  getRequest,
  getSuccess,
  getFailure,
  getMyRequest,
  getMySuccess,
  getMyFailure,
  getOneRequest,
  getOneSuccess,
  getOneFailure,
  postRatingRequest,
  postRatingSuccess,
  postRatingFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
  patchRequest,
  patchSuccess,
  patchFailure,
} = cocktailSlice.actions;

export function* postCocktail({payload: cocktail}) {
  try {
    const response = yield axiosApi.post('/cocktails', cocktail);
    yield put(postSuccess(response.data));
    NotificationManager.success('Your post is under review by the moderator');
  } catch (e) {
    yield put(postFailure(e.response.data));
    NotificationManager.error(e.message);
  }
}

export function* getCocktails() {
  try {
    const response = yield axiosApi.get('/cocktails');
    yield put(getSuccess(response.data));
  } catch (e) {
    yield put(getFailure(e.response.data));
    NotificationManager.error('Something went wrong');
  }
}

export function* getMyCocktails({payload: id}) {
  try {
    const response = yield axiosApi.get('/cocktails/' + id);
    yield put(getMySuccess(response.data));
  } catch (e) {
    yield put(getMyFailure(e.response.data));
    NotificationManager.error(e.message);
  }
}

export function* getOneCocktail({payload: id}) {
  try {
    const response = yield axiosApi.get('/cocktails/one/' + id);
    yield put(getOneSuccess(response.data));
  } catch (e) {
    yield put(getOneFailure(e.response.data));
    NotificationManager.error(e.message);
  }
}

export function* postCocktailRating({payload: data}) {
  try {
    yield axiosApi.post('/cocktails/rating', data);
    yield put(postRatingSuccess());
    NotificationManager.success('Sent Successfully');
  } catch {
    yield put(postRatingFailure());
    NotificationManager.error('Could not send');
  }
}

export function* deleteCocktail({payload: id}) {
  try {
    const response = yield axiosApi.delete('/cocktails/delete/' + id);
    yield put(deleteSuccess(response.data));
    NotificationManager.success('Deleted');
  } catch {
    yield put(deleteFailure());
    NotificationManager.error('Could not delete');
  }
}

export function* patchCocktail({payload: id}) {
  try {
    const response = yield axiosApi.patch('/cocktails/' + id);
    yield put(patchSuccess(response.data));
    NotificationManager.success('Success');
  } catch {
    yield put(patchFailure());
    NotificationManager.error('Something went wrong');
  }
}

const cocktailSaga = [
  takeEvery(postRequest, postCocktail),
  takeEvery(getRequest, getCocktails),
  takeEvery(getMyRequest, getMyCocktails),
  takeEvery(getOneRequest, getOneCocktail),
  takeEvery(postRatingRequest, postCocktailRating),
  takeEvery(deleteRequest, deleteCocktail),
  takeEvery(patchRequest, patchCocktail),
];
export default cocktailSaga;