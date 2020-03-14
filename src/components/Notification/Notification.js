import React, {Component} from 'react';
import './notification.css';

import NetworkHelper from '../Helpers/NetworkHelper';


class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount(){
        this.fetchNotificationList();
    }

    fetchNotificationList = () => {
        this.setState({fetchingNotificationlistFlag:true});

        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setApiPath('getUserNotification');

        networkHelper.execute((response) => {
            if (response.status === 200){
                let data = response.data.data;
                this.setState({showLoading:false, fetchedNotificationList: data, fetchingNotificationlistFlag:false});
            }
        }, (errorMsg, StatusCode) => {
            if(StatusCode === 401){
                this.setState({fetchingNotificationlistFlag:false});
                alert(errorMsg);
            } else {
                this.setState({fetchingNotificationlistFlag:false});
                alert(errorMsg);
            }
        }, () => {
            alert("SERVER ERROR OCCURED");
            this.setState({fetchingNotificationlistFlag:false});
        });
    }


    userDeleteNotification = (notification_id) => {
        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('notification_id', notification_id);
        networkHelper.setApiPath('userDeleteNotificaton');

        networkHelper.execute((response) => {
            if (response.status === 200){
                this.fetchNotificationList();
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


    renderList = () => {

        if(this.state.fetchingNotificationlistFlag){
            return <div style={{marginTop:20, display:'flex', alignItems:'center',justifyContent:'center'}}>
                    <img src={require('../../assets/bepms-loading.gif')} alt="loading projects..." width={35} height={35} />
                </div>
            ;
        }
        
        if(this.state.fetchedNotificationList){
            let list = this.state.fetchedNotificationList;
            if(list.length > 0){
                let render = list.map((value, key)=>{
                    return (<>
                        <div className="notification-container">
                            <div className="notification_element card_rank">
                                <div className="notification-1">
                                    <div className="notification-title">{value.notification_message}</div>
                                    <div className="notification-date">{value.notification_creation_date}</div>
                                </div>
                                <div className="notification-2">
                                    <span className="notification-action" onClick={()=>{this.userDeleteNotification(value.notification_id)}}>Remove</span>
                                </div>
                            </div>
                        </div>
                    </>);
                });
                return render;
            } else {
                return <>No Notifications</>;
            }
        } 

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
                                {this.renderList()}
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default Notification;
