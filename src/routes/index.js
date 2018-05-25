import {
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import React from 'react'
import Loadable from 'react-loadable'
import styled from 'styled-components'

import { browserHistory, thanosRoutes } from 'helpers'

import { Loader } from 'components'

const Contacts = Loadable({
  loader: () => import('./Contacts' /* webpackChunkName: 'contacts' */),
  loading: Loader
})

const BracketMatcher = Loadable({
  loader: () => import('./BracketMatcher' /* webpackChunkName: 'bracketMatcher' */),
  loading: Loader
})

const PageNotAvailable = Loadable({
  loader: () => import('./PageNotAvailable' /* webpackChunkName: 'page404' */),
  loading: Loader
})

const AppRoutes = (props) => (
  <Router history={props.history}>
    <RouteWrapper>
      <Switch>
        <Route path={thanosRoutes.CONTACTS_ROUTE} component={Contacts} />
        <Route path={thanosRoutes.BRACKET_MATCHER_ROUTE} component={BracketMatcher} />
        <Route path='/404' component={PageNotAvailable} />
        <Redirect to='/404' />
      </Switch>
    </RouteWrapper>
  </Router>
)

const RouteWrapper = styled.div`
  height: auto;
  width: auto;
`

export default AppRoutes
