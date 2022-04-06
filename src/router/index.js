import React from "react";
import { Route } from 'react-router-dom';
import loadable from '../utils/loadable';
const DialogDemo = loadable(() => import('../components/DialogDemo'));
// const Home = loadable(() => import('../pages/home'));
// const Login = loadable(() => import('../pages/login'));
// const Hoc = loadable(() => import('../pages/hoc'));
// const Write = loadable(() => import('../pages/write'));
// const Detail = loadable(() => import('../pages/detail'));
const MouseTracker = loadable(() => import('../pages/mouse'));
const Motion = loadable(() => import('../pages/motion'));
const Hook = loadable(() => import('../pages/hook'));
// const A = loadable(() => import('../pages/hocComponent/A'));
const routes = [
  {
    path: '/',
    component: DialogDemo,
    exact: true
    }, {
      path: '/hook',
      component: Hook
    // }, {
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
    }, {
      path: '/motion',
      component: Motion
    }, {
      path: '/mouse',
      component: MouseTracker
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