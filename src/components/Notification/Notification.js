import React, {Component} from 'react';
import './notification.css';


class Notification extends Component {
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
                        <div className="notification-wrapper">

                            <div className="notification-header">
                                <span className="notification-header-text">Notifications</span>
                            </div>

                            <div className="notification-list">

                                <div className="notification-container">
                                    <div className="notification_element card_rank">
                                        <div className="notification-1">
                                            <div className="notification-title">You have a new report from Kunal Karma</div>
                                            <div className="notification-date">date.now()</div>
                                        </div>
                                        <div className="notification-2">
                                            <span className="notification-action">Mark Read</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="notification-container">
                                    <div className="notification_element card_rank">
                                        <div className="notification-1">
                                            <div className="notification-title">You have a new report from Kunal Karma</div>
                                            <div className="notification-date">date.now()</div>
                                        </div>
                                        <div className="notification-2">
                                            <span className="notification-action">Mark Read</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default Notification;
