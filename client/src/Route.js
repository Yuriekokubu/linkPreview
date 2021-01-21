import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Preview from './core/Preview';
import Image from './core/Image';
import Edit from './core/Edit';
import Login from './core/Login';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AdminRoute from './auth/AdminRoute';

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer closeOnClick duration={1000} />
        <Switch>
          <Route path="/" exact component={Login} />
          <AdminRoute path="/insert" exact component={Home} />
          <AdminRoute path="/preview" exact component={Preview} />
          <AdminRoute path="/image/:webId" exact component={Image} />
          <AdminRoute path="/edit/:webId" exact component={Edit} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
