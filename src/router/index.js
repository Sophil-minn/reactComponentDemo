import React from "react";
import { Route } from 'react-router-dom';
import loadable from '../utils/loadable';
const Dialog = loadable(() => import('../components/Dialog'));
// const Home = loadable(() => import('../pages/home'));
// const Login = loadable(() => import('../pages/login'));
// const Hoc = loadable(() => import('../pages/hoc'));
// const Write = loadable(() => import('../pages/write'));
// const Detail = loadable(() => import('../pages/detail'));
// const A = loadable(() => import('../pages/hocComponent/A'));
const routes = [
  {
    path: '/',
    component: Dialog,
    exact: true
    // }, {
    //   path: '/login',
    //   component: Login
    // }, {
    //   path: '/write',
    //   component: Write
    // }, {
    //   path: '/hoc',
    //   component: Hoc
    // }, {
    //   path: '/detail/:id',
    //   component: Detail
    // }, {
    //   path: '/a/:id',
    //   component: A
  },
];
const Routers = () => {
  return (
    routes.map((route, key) => {
      if (route.exact) {
        return <Route key={key} exact path={route.path} component={route.component} />
      } else {
        return <Route key={key} path={route.path} component={route.component} />
      }
    })
  )
}
export default Routers;