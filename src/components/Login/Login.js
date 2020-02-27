import React , {Component} from 'react';
import './login.css';
import logo from '../../assets/images/bepms-logo.png';
import Background from '../../assets/images/loginwallpaper.jpg';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Faculty from '../Faculty/Faculty';
import Student from '../Student/Student';
import Admin from '../Admin/Admin';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activescreen: 'login'
        };
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

    defaultObject = ()=> {
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
                            onClick={() => this.setState({activescreen: 'faculty'})}
                        >
                            Login in system/faculty
                        </button>
                        <button
                            className="square"
                            onClick={() => this.setState({activescreen: 'student'})}
                        >
                            Login in system/student
                        </button>
                        <button
                            className="square"
                            onClick={() => this.setState({activescreen: 'admin'})}
                        >
                            Login in admin
                        </button>
                    </div>
                    <div style={{height:'100vh', width:'100vw', overflow:'hidden', position:'relative'}}>

                        <img src={Background} className="login-wallpaper"/>

                        <div className="login-instruction-main-gradient" />

                        <div className="login-instruction-main">
                            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%', width:'100%'}}>
                                <div style={{margin:'20px', color:'white', marginTop:'20vh'}}>
                                    <h2>B.E Project Management System</h2>
                                    <h1>Most valuable project vault</h1>
                                    <h3>To register your sytem please contact your administrator</h3>
                                    <h3>To register as admin contact us at support@bepms.com</h3>
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
