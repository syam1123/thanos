import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom'
import React from 'react'

import './assets/global-styles'
import AppRoutes from './routes'

import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from "./store";
import { createBrowserHistory } from 'history';

const store = configureStore();


const containerEl = document.getElementById('thanosApp')
const history = syncHistoryWithStore(createBrowserHistory(), store)
const render = Component => ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <AppRoutes history={history} />
    </AppContainer>
  </Provider>,
  containerEl)

render(AppRoutes)

if (module.hot) {
  module.hot.accept('./routes', () => render(require('./routes').default))
}
