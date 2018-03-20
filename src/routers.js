import React from 'react'
import Loadable from 'react-loadable';
import MainPage from './pages/MainPage'
import ErrorPage from './pages/ErrorPage'
import UserEdit from './pages/UserEdit'
import NotFound from './pages/NotFound'

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
  key: 'mainPage',
  path: '/',
  exact: true,
  component: MainPage,
}, {
  key: 'testPage',
  path: '/test',
  component: Loadable({
    loader: () => import(/* webpackChunkName: 'testPage' */ './pages/TestPage'),
    loading: MyLoadingComponent,
  }),
}, {
  key: 'userEdit',
  path: '/user/edit/:id',
  component: UserEdit,
}, {
  key: 'addUser',
  path: '/user/add',
  component: UserEdit,
}, {
  key: 'errorPage',
  path: '/error',
  component: ErrorPage,
}, {
  key: 'notFoundPage',
  path: '/*',
  component: NotFound,
}]

export default routers;

