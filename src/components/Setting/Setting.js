import React, {Component} from 'react';
import './setting.css';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <>
                <div className="faculty-settings">
                    <div className="profile-setting">
                        <div className="profile-image-setting">
                            <div className="profile-image-container" style={{height:110, width:110}}>
                                <img src="https://source.unsplash.com/random/100x100" alt="profile_img" style={{height:100, width:100 ,borderRadius:50}} />
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
                                    <input className="field-input-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Invalid First Name</span>
                                </div>
                            </div>

                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >First Name</span>
                                </div>
                                <div className="field-input">
                                    <input className="field-input-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Invalid First Name</span>
                                </div>
                            </div>

                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >First Name</span>
                                </div>
                                <div className="field-input">
                                    <input className="field-input-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Invalid First Name</span>
                                </div>
                            </div>

                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >First Name</span>
                                </div>
                                <div className="field-input">
                                    <input className="field-input-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Invalid First Name</span>
                                </div>
                            </div>

                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >First Name</span>
                                </div>
                                <div className="field-input">
                                    <input className="field-input-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Invalid First Name</span>
                                </div>
                            </div>

                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >First Name</span>
                                </div>
                                <div className="field-input">
                                    <input className="field-input-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Invalid First Name</span>
                                </div>
                            </div>

                            <div className="input-field">
                                <div className="input-field-lable">
                                    <span className="input-field-lable-text" >First Name</span>
                                </div>
                                <div className="field-input">
                                    <input className="field-input-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                                </div>
                                <div className="field-error">
                                    <span className="error-message-text">Invalid First Name</span>
                                </div>
                            </div>

                            <div className="input-field">
                                <div className="setting-submit">
                                    <input className="submit-button" type="submit" name="Submit" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default Setting;
