import {all} from 'redux-saga/effects';
import history from "../history";
import historySagas from "./sagas/historySaga";
import usersSagas from "./sagas/userSagas";
import cocktailSaga from "./sagas/cocktailSaga";

export default function* rootSaga() {
  yield all([
    ...historySagas(history),
    ...usersSagas,
    ...cocktailSaga,
  ])
};