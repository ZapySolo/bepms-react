import React from 'react';
import './login.css';
import logo from '../../assets/images/bepms-logo.png';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="main">
        <div className="banner"> 
            <div className="icon_wrapper">
                <img src={logo} width="90" alt="bepms"/>
            </div>
        </div>
        <div className="login-wrapper">
            <button
                className="square"
                onClick={() => alert('spmethiin')}
            >
                Login in system/faculty
            </button>
            <button
                className="square"
                onClick={() => alert('spmethiin')}
            >
                Login in system/student
            </button>
            <button
                className="square"
                onClick={() => alert('spmethiin')}
            >
                Login in admin
            </button>
        </div>
        <div className="instructions-wrapper">
            <div className="instructions">
                <p className="instruction-text-primary">For demo purpose you can use the foolwing credential (email | password)</p>
                <p className="instruction-text-secoundary">If you are new to the entire process try to logiin through each credentils sequesntially</p>
                <p className="instruction-text-primary" >Student: student1@ppms.com | 000</p>
                <p className="instruction-text-primary" >Guide: Guide@ppms.com | 000</p>
                <p className="instruction-text-primary" >PC: PC@ppms.com | 000</p>
                <p className="instruction-text-primary" >HOD: HOD@ppms.com | 000</p>
                <p className="instruction-text-primary" >Admin: Admin@ppms.com | 000</p>
            </div>
        </div>
      </div> 
    </>
  );
}

export default Login;
