import {takeEvery} from 'redux-saga/effects';
import {createAction} from "@reduxjs/toolkit";

export const historyPush = createAction('history/push');
export const historyReplace = createAction('history/replace');

const historySagas = history => {
  return [
    takeEvery(historyPush, function*({payload}) {
      yield history.push(payload);
    }),
    takeEvery(historyReplace, function*({payload}) {
      yield history.replace(payload);
    })
  ];
};

export default historySagas;