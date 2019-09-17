import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import clientMiddleware from './middlewares/clientMiddleware'

import ApiClient from './client'
import rootReducer from './reducers'

const client = new ApiClient()
const history = createBrowserHistory()

const initialState = {}
const enhancers = []
const middleware = [
  clientMiddleware(client),
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer(history),
  initialState,
  composedEnhancers
)

export default store

export {
  history
}
