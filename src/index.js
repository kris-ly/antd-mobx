import 'babel-polyfill'
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'whatwg-fetch'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './pages/App'
import routers from './routers'

moment.locale('zh-cn')

const renderApp = () => {
  render(
    <BrowserRouter>
      <App routers={routers} />
    </BrowserRouter>,
    document.getElementById('root'),
  )
}
renderApp()

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./routers', renderApp)
  }
}
