import React, {Component} from 'react';
import './setting.css';

import NetworkHelper from '../Helpers/NetworkHelper';


class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    inputValidation = () => {
        return true;
    }

    submitForm = ()=>{
        if(!this.inputValidation()) return ;

        var networkHelper = new NetworkHelper();

        networkHelper.setData('Authorization', sessionStorage.getItem('token'));

        if(this.state.user_first_name !== this.state.edit_user_first_name)
            networkHelper.setData('user_first_name', this.state.edit_user_first_name);

        if(this.state.user_last_name !== this.state.edit_user_last_name)
            networkHelper.setData('user_last_name', this.state.edit_user_last_name);

        if(this.state.user_display_name !== this.state.edit_user_display_name)
            networkHelper.setData('user_display_name', this.state.edit_user_display_name);

        if(this.state.user_email !== this.state.edit_user_email){
            networkHelper.setData('user_email', this.state.edit_user_email);
            networkHelper.setData('user_confirm_email', this.state.edit_re_user_email);
        }

        if(this.state.edit_user_mobile !== this.state.edit_user_mobile)
            networkHelper.setData('user_mobile', this.state.edit_user_mobile);

        if(this.state.edit_user_password && (this.state.edit_user_password === this.state.edit_re_user_password)){
            networkHelper.setData('user_password', this.state.edit_user_password);
            networkHelper.setData('user_confirm_password', this.state.edit_re_user_password);
        }
        
        networkHelper.setApiPath('updateUserProfile');

        networkHelper.execute((response) => {
            if (response.status === 200){
                console.log(response);
                alert(response.data.message);
            }
        }, (errorMsg, StatusCode) => {
            if(StatusCode === 401){
                alert(errorMsg);
            } else {
                alert(errorMsg);
            }
        }, () => {
            alert("SERVER ERROR OCCURED");
        });
    }

    componentDidMount(){
        var networkHelper = new NetworkHelper();

        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setApiPath('getUserProfileDetails');

        networkHelper.execute((response) => {
            if (response.status === 200){
                let data = response.data.data;
                if(data === []){
                    alert("No user found!");
                } else {
                    try{
                        let data0 = data[0];
                        this.setState({
                            showLoading:false, 
                            user_profile_image: data0.user_profile_image,
                            edit_user_profile_image: data0.user_profile_image,
                            user_first_name: data0.user_first_name,
                            edit_user_first_name: data0.user_first_name,
                            user_last_name: data0.user_last_name,
                            edit_user_last_name: data0.user_last_name, 
                            user_display_name: data0.user_display_name,
                            edit_user_display_name: data0.user_display_name,
                            user_email: data0.user_email,
                            edit_user_email: data0.user_email,
                            user_mobile:data0.user_mobile,
                            edit_user_mobile:data0.user_mobile,
                        });
                    } catch {
                        alert("Error Occured while receiving data!");
                    }
                }
            }
        }, (errorMsg, StatusCode) => {
            if(StatusCode === 401){
                alert(errorMsg);
            } else {
                alert(errorMsg);
            }
        }, () => {
            alert("SERVER ERROR OCCURED");
        });
    }

    render() {
        
        return (
            <>
                <div className="faculty-settings"> 
                    <div className="profile-setting">

                        <div className="profile-image-setting">
                            <div style={{height:100, width:100, position:'relative', marginBottom: 25, marginTop:20, textAlign:'center', borderRadius:50}}>
                                <img onClick={this.handleFileSelect} src="https://source.unsplash.com/random/100x100" alt="profile_img" style={{height:100, width:100 ,borderRadius:50}} />
                                <div className="profile-edit">
                                    <span className="profile-edit-text">Edit</span>
                                </div>
                            </div>
                        </div>

                        <div className="setting-fields">
                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >First Name</span>
                                </div>
                                <div className="field-input">
                                    <input 
                                        onChange={(e)=>{this.setState({edit_user_first_name:e.target.value})}}
                                        className="field-input-element" type="text" 
                                        value={this.state.edit_user_first_name} 
                                        style={{color:'#CBCBCB'}}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Invalid First Name</span>
                                </div>
                            </div>

                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >Last Name</span>
                                </div>
                                <div className="field-input">
                                    <input 
                                        onChange={(e)=>{this.setState({edit_user_last_name:e.target.value})}}
                                        className="field-input-element" type="text" 
                                        name="Search" value={this.state.edit_user_last_name}
                                        style={{color:'#CBCBCB', }}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Invalid First Name</span>
                                </div>
                            </div>

                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >Display Name</span>
                                </div>
                                <div className="field-input">
                                    <input 
                                        onChange={(e)=>{this.setState({edit_user_display_name:e.target.value})}}
                                        className="field-input-element" type="text" 
                                        name="Search" value={this.state.edit_user_display_name} 
                                        style={{color:'#CBCBCB', }}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Invalid Display Name (can only contain one white space and period symbol)</span>
                                </div>
                            </div>

                            <div> </div>

                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >Email</span>
                                </div>
                                <div className="field-input">
                                    <input 
                                        onChange={(e)=>{this.setState({edit_user_email:e.target.value})}}
                                        className="field-input-element" type="text" 
                                        name="Search" value={this.state.edit_user_email}
                                        style={{color:'#CBCBCB', }}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Invalid Email</span>
                                </div>
                            </div>

                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >Re-Enter Email</span>
                                </div>
                                <div className="field-input">
                                    <input 
                                        onChange={(e)=>{this.setState({edit_re_user_email:e.target.value})}}
                                        className="field-input-element" type="text" 
                                        name="Search" value={this.state.edit_re_user_email} 
                                        style={{color:'#CBCBCB'}}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">email do not match</span>
                                </div>
                            </div>

                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >Password</span>
                                </div>
                                <div className="field-input">
                                    <input
                                        onChange={(e)=>{this.setState({edit_user_password:e.target.value})}} 
                                        className="field-input-element" type="text" name="Search" 
                                        value={this.state.edit_user_password} style={{color:'#CBCBCB', }}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Invalid Password</span>
                                </div>
                            </div>

                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >Re-Enter Password</span>
                                </div>
                                <div className="field-input">
                                    <input
                                        onChange={(e)=>{this.setState({edit_re_user_password:e.target.value})}}  
                                        className="field-input-element" type="text" name="Search" 
                                        value={this.state.edit_re_user_password} style={{color:'#CBCBCB'}}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Password Do not match</span>
                                </div>
                            </div>

                            

                        </div>
                        <div className="input-field input-field-submit" style={{margin:'auto'}}>
                                <div className="setting-submit">
                                    <input
                                        onClick={()=>{this.submitForm()}}
                                        className="submit-button" type="submit" name="Submit" />
                                </div>
                            </div>
                    </div>
                </div>
            </>
        );
    }
}


export default Setting;
