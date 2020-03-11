import React from 'react';
import './App.css';

import Login from './components/Login/Login';
import Faculty from './components/Faculty/Faculty';
import Student from './components/Student/Student';
import Admin from './components/Admin/Admin';

import { BrowserRouter, Route } from "react-router-dom";

let basePath = '';

function App() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    basePath = '';
  } else {
    basePath = '/bepms';
  }
  return (
    <BrowserRouter>
      <Route path={basePath+"/login"} exact component={Login}/>
      <Route path={basePath+"/"} exact component={Login}/>
      <Route path={basePath+"/faculty"} exact component={Faculty}/>
      <Route path={basePath+"/student"} exact component={Student}/>
      <Route path={basePath+"/admin"} exact component={Admin}/>
    </BrowserRouter>
  );
}

export default App;
