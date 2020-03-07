import React from 'react';
import './App.css';

import Login from './components/Login/Login';
import Faculty from './components/Faculty/Faculty';
import Student from './components/Student/Student';
import Admin from './components/Admin/Admin';

import { BrowserRouter, Route } from "react-router-dom";

function App() {  
    const baseUrl = process.env.PUBLIC_URL;
    console.log(baseUrl);
  return (
    <BrowserRouter>
      <Route path={baseUrl+"/login"} component={Login}/>
      <Route path={baseUrl+"/"} exact component={Login}/>
      <Route path={baseUrl+"/faculty"} exact component={Faculty}/>
      <Route path={baseUrl+"/student"} exact component={Student}/>
      <Route path={baseUrl+"/admin"} exact component={Admin}/>
    </BrowserRouter>
  );
}

export default App;
