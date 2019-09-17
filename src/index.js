import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from '../src/store/index.js'
import App from './pages/app.js'
import * as serviceWorker from './serviceWorker'

const target = document.getElementById('root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
)

serviceWorker.unregister();
