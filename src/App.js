import React from 'react';
import './App.css';

import Login from './components/Login/Login';
import Faculty from './components/Faculty/Faculty';
import Student from './components/Student/Student';
import Admin from './components/Admin/Admin';

import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route path="/login" component={Login}/>
      <Route path="/" exact component={Login}/>
      <Route path="/faculty" exact component={Faculty}/>
      <Route path="/student" exact component={Student}/>
      <Route path="/admin" exact component={Admin}/>
    </BrowserRouter>
  );
}

export default App;
