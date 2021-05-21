import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {NotificationContainer} from "react-notifications";
import history from "./history";
import App from './App';
import store from "./store/configureStore";
import './index.css';
import 'react-notifications/lib/notifications.css';

const app = (
  <Provider store={store}>
    <Router history={history}>
        <NotificationContainer/>
          <App/>
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
