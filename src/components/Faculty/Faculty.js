import React, {Component} from 'react';
import './faculty.css';
import logo from '../../assets/images/bepms-logo.png';
import FacultyReport from './FacultyReport/FacultyReport';
import FacultySetting from './FacultySetting/FacultySetting';
import FacultyProject from './FacultyProject/FacultyProject';
import FacultyNotification from './FacultyNotification/FacultyNotification';


class Faculty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false,
            activeTab: 'home'
        };
    }

    renderComponent = () => {
        switch(this.state.activeTab){
            case 'home':
                return this.FacultyHome();
             
            case 'report':
                return <FacultyReport />;
              
            case 'setting':
                return <FacultySetting />;
              
            case 'project':
                return <FacultyProject />;
               
            case'notification':
                return <FacultyNotification />;
                
            default:
                return <div style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>This will render by default</div>;
        }
    }

    FacultyHome = () => {
        let sidebarWidth = (!this.state.sideBarToggle)?'0px':'100vw';
        return(
            <>
                <div className="sidenav" style={{width:sidebarWidth}}>
                    <div href="#" className="closebtn" onClick={()=>{this.setState({sideBarToggle: false})}}>&times;</div>
                        your current projects
                </div>
                <div className="toggle_search_wrapper">
                    <div className="drawer_toggle">
                        <span className="font30" onClick={()=>{this.setState({sideBarToggle: true})}}>&#9776;</span>
                    </div>
                    <div className="search_field">
                        search
                    </div>
                </div>
                <div className="search_result">
                    <div className="project_result">
                        Projects
                        <div style={{height:'150px', width:'100vw', backgroundColor:'red'}}></div>
                    </div>
                    <div className="report_result">
                        Reports
                        <div style={{height:'700px', width:'100vw', backgroundColor:'green'}}></div>
                    </div>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="main">
                <div className="banner"> 
                    <div className="icon_wrapper">
                        <img src={logo} width="60" alt="bepms"/>
                    </div>
                </div>
                <div className="navigation_mobile">
                    <div className="navigation">
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'home'})}}>Home</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'report'})}}>Report</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'project'})}}>Project</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'setting'})}}>Setting</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'notification'})}}>Notif</div>
                    </div>
                </div>
                <div className="content">
                    {this.renderComponent()}
                </div>
            </div>
        );
    }
}


export default Faculty;
