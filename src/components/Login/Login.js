import React , {Component} from 'react';
import './login.css';

import loginDoodle from '../../assets/images/login-doodle.png';

import Background from '../../assets/images/loginwallpaper.jpg';

import ReactCardFlip from 'react-card-flip';

import NetworkHelper from '../Helpers/NetworkHelper';

import {withRouter} from 'react-router';

const baseUrl = process.env.PUBLIC_URL;


//<img src={require('../../assets/bepms-loading.gif')} alt="loading..." />
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            loginType:'student',//student, faculty
            loginPage:'admin',//system, admin
            userEmail: '21nikhilpatil1998@gmail.com',
            reEnterEmail:'',
            userPassword: '000',
            loginError:false
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

    doLogin = ()=> {

        this.setState({ showLoading: true ,loginError:false});
        
        if(this.state.loginPage==='system' && (this.state.loginType === 'student' || this.state.loginType === 'faculty')){
            
            var networkHelper = new NetworkHelper();
            networkHelper.setData('email', this.state.userEmail);
            networkHelper.setData('password', this.state.userPassword);
            networkHelper.setData('login_as', this.state.loginType);
            networkHelper.setApiPath('systemLogin');

            networkHelper.execute((response) => {
                if (response.status === 200){
                    console.log(response.data.data.access_token);
                    sessionStorage.setItem('token', response.data.data.access_token);
                    this.setState({showLoading:false,userEmail:'',userPassword:''});
                    console.log('redirecting to ...'+baseUrl+'/'+this.state.loginType)
                    try{
                        this.props.history.push(baseUrl+'/'+this.state.loginType);
                    } catch {
                        if(typeof window !== 'undefined'){
                            console.log('using the window method');
                            window.location.href = (baseUrl+'/'+this.state.loginType);
                        }
                    }
                    
                }
            }, (errorMsg,StatusCode) => {
                //if status code is 401 then credentials are wrong
                if(StatusCode === 401){
                    this.setState({ showLoading: false, loginError:true });
                } else {
                    alert(errorMsg);
                    this.setState({ showLoading: false });
                }
            }, () => {
                alert("SERVER ERROR OCCURED, if this continues please contact your admin");
                this.setState({ showLoading: false })
            });

        } else if (this.state.loginPage==='admin'){ 

            var networkHelper = new NetworkHelper();
            networkHelper.setData('email', this.state.userEmail);
            networkHelper.setData('password', this.state.userPassword);
            networkHelper.setApiPath('adminLogin');

            networkHelper.execute((response) => {
                if (response.status === 200){
                    sessionStorage.setItem('token', response.data.data.access_token);
                    this.setState({showLoading:false,userEmail:'',userPassword:''});
                    this.props.history.push(baseUrl+'/'+this.state.loginPage);
                }
            }, (errorMsg,StatusCode) => {
                //if status code is 401 then credentials are wrong
                if(StatusCode === 401){
                    this.setState({ showLoading: false, loginError:true });
                } else {
                    alert(errorMsg);
                    this.setState({ showLoading: false });
                }
            }, () => {
                alert("SERVER ERROR OCCURED, if this continues please contact your admin");
                this.setState({ showLoading: false })
            });
        }
    }


    doForgotPassword = () => {
        this.setState({ showLoading: true })
        setTimeout(()=>{
            this.setState({ showLoading: false })
        },1000);
    }
    
    submitButton = () => {
        return (this.state.showLoading) ? <>
            <div className="login-submit">
                <img src={require('../../assets/bepms-loading.gif')} alt="loading..." width={35} height={35} />
            </div>
        </> : <>
            <input className="login-submit" type="submit" value="Login" onClick={()=>{this.doLogin()}} />
        </>;
    }

    submitForgotPasswordButton = () => {
        return (this.state.showLoading) ? <>
            <div className="login-submit" style={{marginTop:20}}>
                <img src={require('../../assets/bepms-loading.gif')} alt="loading..." width={35} height={35} />
            </div>
        </> : <>
            <input className="login-submit" style={{marginTop:20}} type="submit" value="Login" onClick={()=>{this.doForgotPassword()}} />
        </>;
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

        let errorInputStyle = (this.state.loginError)?{
            border: "1px solid #FC577A"
        } : {}

        if(this.state.loginPage === 'system'){
            
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
                                        <input 
                                            onChange={(event)=>{this.setState({userEmail: event.target.value})}}
                                            className="login-input-field"
                                            style={errorInputStyle}
                                            type="text" 
                                            placeholder="Email"
                                            value={this.state.userEmail}
                                            />
                                    </div>
                                    
                                    <div>
                                        <input 
                                            onChange={(event)=>{this.setState({userPassword: event.target.value})}}
                                            className="login-input-field"
                                            style={errorInputStyle}
                                            type="text" 
                                            value={this.state.userPassword}
                                        />
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
                                        {this.submitButton()}
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
                                        <input 
                                            onChange={(event)=>{this.setState({userEmail: event.target.value})}}
                                            className="login-input-field" type="text" value={this.state.userEmail} />
                                    </div>
                                    <div>
                                        <input 
                                            onChange={(event)=>{this.setState({reEnterEmail: event.target.value})}}
                                            className="login-input-field" type="text" value={this.state.reEnterEmail} />
                                    </div>
                                    <div>
                                        {this.submitForgotPasswordButton()}
                                    </div>
                                    <div style={{textAlign:"center", marginTop:15, color: '#FFD012',fontSize: '13px', letterSpacing: '-0.16px'}}>
                                        <span onClick={this.handleClick}>Back to login</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ReactCardFlip>
                    <div 
                        onClick={() => this.setState({loginPage: 'admin'})}
                        style={{marginTop:15, color: '#FFD012',fontSize: '13px', letterSpacing: '-0.16px',textAlign:'right', backgroundColor:'white', fontWeight:'bold'}}>Admin Login</div>
                </div>
            );
        } else {
            return (
                <div className="scs">
                    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                        <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                            <div className="login-form" style={{color:'black'}}>
                                <div className="login-form-inputs">
                                    <div>
                                       <span className="login-text">Admin Log In</span>
                                    </div>
    
                                    <div className="login-disclaimer">
                                        <span >This is a secure system and you will need to provide your login details to access the admin panel.</span>
                                    </div>
    
                                    <div>
                                        <input 
                                            onChange={(event)=>{this.setState({userEmail: event.target.value})}}
                                            className="login-input-field"
                                            style={errorInputStyle}
                                            type="text" 
                                            placeholder="Email"
                                            value={this.state.userEmail}
                                            />
                                    </div>
                                    
                                    <div>
                                        <input 
                                            onChange={(event)=>{this.setState({userPassword: event.target.value})}}
                                            className="login-input-field"
                                            style={errorInputStyle}
                                            type="text" 
                                            value={this.state.userPassword}
                                        />
                                    </div>
                                    <div className="forgot-password-container" style={{justifyContent:'flex-end'}}>
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
                                        <input 
                                            onChange={(event)=>{this.setState({userEmail: event.target.value})}}
                                            className="login-input-field" type="text" value={this.state.userEmail} />
                                    </div>
                                    <div>
                                        <input 
                                            onChange={(event)=>{this.setState({reEnterEmail: event.target.value})}}
                                            className="login-input-field" type="text" value={this.state.reEnterEmail} />
                                    </div>
                                    {this.submitForgotPasswordButton()}
                                    <div style={{textAlign:"center", marginTop:15, color: '#FFD012',fontSize: '13px', letterSpacing: '-0.16px'}}>
                                        <span onClick={this.handleClick}>Back to Admin login</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ReactCardFlip>
                    <div 
                        onClick={() => this.setState({loginPage: 'system'})}
                        style={{marginTop:15, color: '#FFD012',fontSize: '13px', letterSpacing: '-0.16px',textAlign:'left', backgroundColor:'white', fontWeight:'bold'}}>System Login</div>
                </div>
            );
        }

    }

    render(){
        console.log('baseUrl==>',baseUrl);
        return (
            <div className="main">

                <div className="login-wrapper" style={{backgroundImage: `url(${loginDoodle})`}}>
                    {this.login_form()}
                </div>

                <div style={{height:'100vh', width:'100vw', overflow:'hidden', position:'relative'}}>

                    <div className="login-wallpaper">
                        <img alt="bg-img" src={Background} className="login-wallpaper-img"/>
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
                                    <p className="instruction-text-primary" style={{marginTop:0}}>For demo purpose you can use the following credential (email | password)</p>
                                    <p className="instruction-text-secoundary">If you are new to the entire process try to logiin through each credentils sequesntially</p>
                                    <p className="instruction-text-primary" >Student: student1@ppms.com | 000</p>
                                    <p className="instruction-text-primary" >Guide: guide@ppms.com | 000</p>
                                    <p className="instruction-text-primary" >PC: pc@ppms.com | 000</p>
                                    <p className="instruction-text-primary" >HOD: hod@ppms.com | 000</p>
                                    <p className="instruction-text-primary" style={{marginBottom:0}}>Admin: admin@ppms.com | 000</p>
                                </div>
                            </div>
                        </div>

                        <div className="desktop-login-cxc" style={{width:'100%', height:'100%', marginRight:'50px', backgroundImage: `url(${loginDoodle})`, overflow:'hidden'}} >
                            {this.login_form()}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
