import React , {Component} from 'react';
import './login.css';

import loginDoodle from '../../assets/images/login-doodle.png';

import Background from '../../assets/images/loginwallpaper.jpg';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Faculty from '../Faculty/Faculty';
import Student from '../Student/Student';
import Admin from '../Admin/Admin';

import ReactCardFlip from 'react-card-flip';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activescreen: 'login',
            isFlipped: false,
            loginType:'student'
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    handleClick2(e) {
        e.preventDefault();
        this.setState(prevState => ({ isAdminFlipped: !prevState.isAdminFlipped }));
    }

    renderComponent = () => {
        switch(this.state.activescreen){
            case 'faculty':
                return <Faculty />;
             
            case 'student':
                return <Student />;
              
            case 'admin':
                return <Admin />;
                
            default:
                return this.defaultObject();
        }
    }

    doLogin = ()=> {
        if(this.state.loginType === 'student'){
            this.setState({activescreen: 'student'})
        } else if (this.state.loginType === 'faculty'){
            this.setState({activescreen: 'faculty'})
        } else {
            alert('Please select a login type');
        }
    }

    login_form = ()=>{
        let activeLoginTypeStyle={
            padding:'0px 10px', 
            textAlign:"center",
            fontFamily: 'Sailec-Medium',
            fontSize: '13px',
            color: '#323C47',
            letterSpacing: 0,
            textDecoration:'underline'
        }

        let inactiveLoginTypeStyle={
            padding:'0px 10px', 
            textAlign:"center",
            opacity: 0.45,
            fontFamily: 'Sailec-Medium',
            fontSize: '13px',
            color: '#989898',
            letterSpacing: 0,
        }
        return (
            <div className="scs">
                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                    <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                        <div className="login-form" style={{color:'black'}}>
                            <div className="login-form-inputs">
                                <div>
                                   <span className="login-text">Log in</span>
                                </div>

                                <div className="login-disclaimer">
                                    <span >This is a secure system and you will need to provide your login details to access the site</span>
                                </div>

                                <div>
                                    <input className="login-input-field" type="text" value="Email" />
                                </div>
                                
                                <div>
                                    <input className="login-input-field" type="text" value="Password" />
                                </div>
                                <div className="forgot-password-container">
                                    <div style={{backgroundColor:'#F5F8FA', paddingTop:5, paddingBottom:5, display:'flex', flexDirection:'row',justifyContent:'center', alignItems:'center'}}> 
                                        <div className="login-type-toggle" 
                                            style={(this.state.loginType === 'student')?activeLoginTypeStyle:inactiveLoginTypeStyle} 
                                            onClick={()=>{this.setState({loginType:'student'})}}>Student</div>
                                        <div className="login-type-toggle"
                                            style={(this.state.loginType === 'faculty')?activeLoginTypeStyle:inactiveLoginTypeStyle} 
                                            onClick={()=>{this.setState({loginType:'faculty'})}}>Faculty</div>
                                    </div>
                                    <span className="forgot-password" onClick={this.handleClick}>Forgot password?</span>
                                </div>
                                <div>
                                    <input className="login-submit" type="submit" value="Login" onClick={()=>{this.doLogin()}} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                        <div className="login-form" style={{color:'black'}}>
                            <div className="login-form-inputs">
                                <div>
                                    <span className="login-text">Reset Password</span>
                                </div>
                                <div className="login-disclaimer">
                                    <span >Let us help you regain your account <br />
                                        Please Enter Your Credentials First.
                                    </span>
                                </div>
                                <div>
                                    <input className="login-input-field" type="text" value="Email" />
                                </div>
                                <div>
                                    <input className="login-input-field" type="text" value="Re-Enter Email" />
                                </div>
                                <div style={{marginTop:20}}>
                                    <input className="login-submit" type="submit" value="Login" />
                                </div>
                                <div style={{textAlign:"center", marginTop:15, color: '#FFD012',fontSize: '13px', letterSpacing: '-0.16px'}}>
                                    <span onClick={this.handleClick}>Back to login</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactCardFlip>
                <div 
                    onClick={() => this.setState({activescreen: 'admin'})}
                    style={{textAlign:"center", marginTop:15, color: '#FFD012',fontSize: '13px', letterSpacing: '-0.16px',textAlign:'right', backgroundColor:'white', fontWeight:'bold'}}>Admin Login</div>
            </div>
        );
    }

    defaultObject = ()=> {
        return (
            <>
                <div className="main">
                    
                    <div className="login-wrapper" style={{backgroundImage: `url(${loginDoodle})`}}>
                        {this.login_form()}
                    </div>

                    <div style={{height:'100vh', width:'100vw', overflow:'hidden', position:'relative'}}>

                        <div className="login-wallpaper">
                            <img src={Background} className="login-wallpaper-img"/>
                        </div>

                        <div className="login-instruction-main-gradient" />
 
                        <div className="login-instruction-main">
                            <div className="max-600" style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%', width:'100%'}}>
                                <div className="max-600" style={{margin:' 0px 20px', color:'white', marginBottom:0, height:'100%', justifyContent:'center', display:'flex', flexDirection:'column', marginTop:0}}>
                                    <div className="hero-text">
                                        <div className="itp-1">B.E Project Management System</div>
                                        <div className="itp-2">Most valuable project vault</div>
                                        <div className="itp-3">To register your sytem please contact your administrator</div>
                                        <div className="itp-3">To register as admin contact us at support@bepms.com</div>
                                    </div>
                                </div>
                                <div className="instructions-wrapper">
                                    <div className="instructions">
                                        <p className="instruction-text-primary" style={{marginTop:0}}>For demo purpose you can use the foolwing credential (email | password)</p>
                                        <p className="instruction-text-secoundary">If you are new to the entire process try to logiin through each credentils sequesntially</p>
                                        <p className="instruction-text-primary" >Student: student1@ppms.com | 000</p>
                                        <p className="instruction-text-primary" >Guide: guide@ppms.com | 000</p>
                                        <p className="instruction-text-primary" >PC: pc@ppms.com | 000</p>
                                        <p className="instruction-text-primary" >HOD: hod@ppms.com | 000</p>
                                        <p className="instruction-text-primary" style={{marginBottom:0}}>Admin: admin@ppms.com | 000</p>
                                    </div>
                                </div>
                            </div>

                            <div class="desktop-login-cxc" style={{width:'100%', height:'100%', marginRight:'50px', backgroundImage: `url(${loginDoodle})`, overflow:'hidden'}} >
                                {this.login_form()}
                            </div>

                        </div>
                    </div>
                </div> 
            </>
        );
    }

    render(){
        return (
            this.renderComponent()
        );
    }
}

export default Login;
