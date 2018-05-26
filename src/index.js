import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom'
import React from 'react'

import './assets/global-styles'
import AppRoutes from './routes'

import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from "./store";
import { createBrowserHistory } from 'history';
import createHistory from 'history/createBrowserHistory';

const store = configureStore();
const browserHistory = createHistory();

const containerEl = document.getElementById('thanosApp')

const render = Component => ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <AppRoutes history={browserHistory} />
    </AppContainer>
  </Provider>,
  containerEl)

render(AppRoutes)

if (module.hot) {
  module.hot.accept('./routes', () => render(require('./routes').default))
}
