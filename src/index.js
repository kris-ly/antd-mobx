import 'babel-polyfill'
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'whatwg-fetch'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable';
import App from './pages/App'
import MainPage from './pages/MainPage'
import ErrorPage from './pages/ErrorPage'
import NotFound from './pages/NotFound'

moment.locale('zh-cn');

const MyLoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>加载中...</div>
  }
  if (error) {
    return <div>页面加载失败，请稍后重试~</div>
  }
  return null
};

const routers = [{
  name: 'mainPage',
  path: '/',
  exact: true,
  component: MainPage,
  visible: true,
  iconType: 'mail',
}, {
  name: 'testPage',
  path: '/test',
  iconType: 'code',
  component: Loadable({
    loader: () => import(/* webpackChunkName: 'testPage' */ './pages/TestPage'),
    loading: MyLoadingComponent,
  }),
  visible: true,
}, {
  name: 'user',
  iconType: 'mail',
  children: [{
    name: 'userSetting',
    path: '/user/setting',
    component: () => <div>用户设置</div>,
    visible: true,
    iconType: 'setting',
  }, {
    name: 'userProfile',
    path: '/user/profile',
    component: () => <div>用户资料</div>,
    visible: true,
    iconType: 'appstore',
  }],
}, {
  name: 'errorPage',
  path: '/error',
  component: ErrorPage,
  visible: false,
}, {
  name: 'notFoundPage',
  path: '/*',
  component: NotFound,
  visible: false,
}]

render(
  <BrowserRouter>
    <App routers={routers} />
  </BrowserRouter>,
  document.getElementById('root'),
)
