import React, {Component} from 'react';
import './faculty.css';
import logo from '../../assets/images/bepms-logo.png';
import FolderIcon from '../../assets/images/folder_icon.png';
import HomepageIcon from '../../homepage-logo.svg';
import SearchIcon from '../search.svg';

import FacultyReport from './FacultyReport/FacultyReport';
import FacultySetting from '../Setting/Setting';
import FacultyProject from './FacultyProject/FacultyProject';
import FacultyNotification from '../Notification/Notification';

import NetworkHelper from '../Helpers/NetworkHelper';

class Faculty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false,
            activeTab: 'home',
            searchTypeToggle:'allSystem', //currentSystem, allSystem
            fetchedSystemList:'',
            activeSystem:'',
            activeSystemPositionName:'',
            searchInput:'',//home screen search bar
            searchResultProject:'',//homepage search result
            searchResultReport:'',//homepage search result
        };
    }
    componentDidMount(){
        this.getSystemList();
    }

    getSystemList = () => {
        var networkHelper = new NetworkHelper();

        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setApiPath('facultySystemList');

        networkHelper.execute((response) => {
            if (response.status === 200){
                let data = response.data.data;
                this.setState({showLoading:false, fetchedSystemList: data});
                try{
                    let data0 = data[0];
                    this.setState({activeSystem: data0});
                    this.submitSearch();
                } catch {

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

    renderComponent = () => {
        switch(this.state.activeTab){
            case 'home':
                return this.FacultyHome();
             
            case 'report':
                let activeSystem = this.state.activeSystem;
                let activeSystemId = activeSystem.system_id;
                let activeSystemPositionName = this.state.activeSystemPositionName;
                return <FacultyReport system_id={activeSystemId} system_position={activeSystemPositionName} />;
              
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

    SideBar = ()=> {
        let sidebarWidth = '100vw';

        if(window.innerWidth >= 450) {
            sidebarWidth = (!this.state.sideBarToggle)?'0px':'450px';
        } else {
            sidebarWidth = (!this.state.sideBarToggle)?'0px':'100vw';
        }

        return (
            <div className="sidenav" style={{width:sidebarWidth}}>
                <div className="sidebar_content">
                    <div href="#" className="closebtn" 
                        onClick={()=>{
                            this.setState({sideBarToggle: false});
                        }}>&times;</div>
                    {this.SelectSystem()}
                </div>
            </div>
        );
    }

    currentSystemRender(activeSystem){
        if(!activeSystem) return ;

        let positions = activeSystem.project_position_name;

        if(!this.state.activeSystemPositionName || !positions.includes(this.state.activeSystemPositionName)){
            this.setState({activeSystemPositionName: positions[0]})
        }


        let currentSystemRender = <>
            <div className="currentSystem_content_f">
                <span className="current_system_title">{activeSystem.system_name}</span>
                <span className="current_system_position_name">Your Position:<span className="uppercase">{this.state.activeSystemPositionName}</span></span>
            </div>
        </>;
        
        let changePositionRender = positions.map((element, key) => {
            if(this.state.activeSystemPositionName !== element){
                return <>
                    <div className="currentSystem_content_f change_position" 
                    onClick={()=>{
                        this.setState({activeSystemPositionName:element});
                        setTimeout(()=>{
                            this.submitSearch();
                        }, 100);
                    }}>
                        <span className="change_position_text_f">Change Your Position To {element}</span>
                    </div>
                </>;
            } else {
                return <></>;
            }
        });

        return <>
            <div className="currentSystem">
                <span className="your-current-system-text-f">Your Current System</span>
                {currentSystemRender}
                {changePositionRender}
            </div>
        </>;
    }

    allSystemRender = (allSystems) => {
        if(!allSystems || !Array.isArray(allSystems)) return ;
        let render = allSystems.map((element, key)=>{
            return <>
                <div className="currentSystem_content_f" onClick={()=>{
                        if(this.state.activeSystem !== element) {
                            console.log(this.state.activeSystem, element);
                            this.setState({activeSystem:element});
                            this.submitSearch();
                        }
                    }}>
                    <div className="other_system_title">
                        <div className="folderIconContainer"><img src={FolderIcon} alt="folder_icon" height="28" /></div>
                        <div className="otherSystemTitle">{element.system_name}</div>
                    </div>
                </div>
            </>;
        });
        return render;
    }

    SelectSystem = ()=> {
        return (
            <>
                {this.currentSystemRender(this.state.activeSystem)}
                <div className="currentSystem" style={{marginTop:20}}>
                    <span className="your-current-system-text-f">All System</span>
                    {this.allSystemRender(this.state.fetchedSystemList)}
                </div>
            </>
        );
    }

    submitSearch = () => {
        let activeSystem = this.state.activeSystem;
        if(!activeSystem) return ;

        this.setState({submitSearchFlag:true});

        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('search_input', this.state.searchInput);
        if(this.state.searchTypeToggle === 'currentSystem'){
            networkHelper.setData('system_id', activeSystem.system_id);
        } else {
            networkHelper.setData('system_id', '');
        }
        networkHelper.setData('user_position', this.state.activeSystemPositionName);
        networkHelper.setApiPath('facultyHomeProjectAndReports');
        networkHelper.execute((response) => {
            if (response.status === 200){
                let data = response.data.data;
                this.setState({searchResultProject:data.project, searchResultReport:data.report,submitSearchFlag:false});
            }
        }, (errorMsg, StatusCode) => {
            if(StatusCode === 401){
                this.setState({submitSearchFlag:false});
                alert(errorMsg);
            } else {
                this.setState({submitSearchFlag:false});
                alert(errorMsg);
            }
        }, () => {
            this.setState({submitSearchFlag:false});
            alert("SERVER ERROR OCCURED");
        });

    }

    renderProjectList = (searchResultProject = []) => {

        if(this.state.submitSearchFlag){
            return <div style={{marginTop:20, display:'flex'}}>
                    <img src={require('../../assets/bepms-loading.gif')} alt="loading projects..." width={35} height={35} />
                </div>;
        }

        if(!searchResultProject || searchResultProject.length < 1) 
            return <div style={{marginTop:10, color:'grey', fontSize:'11px'}}>
                No Projects To Display
            </div>;

        let render = searchResultProject.map((element, key)=>{
            return <>
                <div className="project card_rank">
                    <div>
                        <img src="https://source.unsplash.com/random/150*100"  alt="project_img" style={{borderRadius:5}} height='100' width='150' />
                    </div>
                    <div className="project-title-text-f">{element.project_name}</div>
                    <div className="project-leader-text-f">{element.leader_display_name}</div>
                </div>
            </>;
        });
        return render;
    }

    renderReportList = (searchResultReport = []) => { //remaining, need to change the api data

        if(this.state.submitSearchFlag){
            return <div style={{marginTop:20, display:'flex'}}>
                    <img src={require('../../assets/bepms-loading.gif')} alt="loading projects..." width={35} height={35} />
                </div>;
        }


        if(!searchResultReport || searchResultReport.length < 1) {
            return <div style={{color:'grey', fontSize:'11px'}}>
                No Reports To Display
            </div>;
        }
        console.log(searchResultReport);

        let pendingDiv;
        let render = searchResultReport.map((element, key)=>{
            pendingDiv = (element.report_status_user === 'pending') ? <div className="report_status_pending" /> : <></>;
            return <>
                <div className="report_x card_rank">
                    <div className="report-wrapper-xzx">
                        <div className="report-project-img">
                            <img alt="project_img" src="https://source.unsplashh.com/random/40x40" height="40" width="40" style={{borderRadius:20}} />
                        </div>

                        <div className="report-description">
                            <span className="report-project-name-text-f">{element.project_name}<span className="report-project-name-text-f-date"> • {element.report_creation_date}</span></span>
                            <span className="report-leader-name-text-f">{element.leader_display_name}</span>
                            <span className="report-description-text-f">{element.report_description}</span>
                        </div>
                        {pendingDiv}
                    </div>
                </div>
            </>;
        });

        return render;
    }

    FacultyHome = () => {

        let currentSystemClassName = (this.state.searchTypeToggle === 'currentSystem') ? 'search_active_toggle_f' : 'search_inactive_toggle_f';
        let allSystemClassName = (this.state.searchTypeToggle === 'allSystem') ? 'search_active_toggle_f' : 'search_inactive_toggle_f';
  
        return(
            <div style={{display:'flex', flexDirection:'row'}}>

                {this.SideBar()}

                <div className="desktop-home-select-system-f">
                    {this.SelectSystem()}
                </div> 
                
                <div className="xvxbx">
                    <div className="toggle_search_wrapper_x">
                        <div className="drawer_toggle_home_f">
                            <span className="font30" onClick={()=>{this.setState({sideBarToggle: true})}}>&#9776;</span>
                        </div>
                        <div className="search_field-fs">
                            <div className="search-field-container-f">
                                <img src={SearchIcon} alt="s" style={{marginRight:'10px'}} />
                                <input
                                    onKeyDown = {(event)=>{if(event.key === 'Enter'){this.submitSearch()}}}
                                    onChange={(e)=>{this.setState({searchInput: e.target.value})}}
                                    className="search_input_f" type="text"
                                    placeholder="Search" value={this.state.searchInput} style={{color:'#CBCBCB'}}/>
                            </div>
                            <div className="faculty_search_toggle card_rank">
                                <span 
                                    onClick={()=>{this.setState(({ searchTypeToggle: 'currentSystem'}))}}
                                    className={currentSystemClassName}>Current System</span>
                                <span 
                                    onClick={()=>{this.setState(({ searchTypeToggle: 'allSystem'}))}}
                                    className={allSystemClassName}>All System</span>
                            </div>
                        </div>
                    </div>
                    <div className="search_result">
                        <div className="project_result">
                            <span className="project_text_f">Projects</span>
                            <div className="project_result_container">
                                {this.renderProjectList(this.state.searchResultProject)}
                            </div>
                        </div>
                        <div className="report_result">
                            <span className="project_text_f">Reports</span>
                            <div className="reports_result_container">
                                {this.renderReportList(this.state.searchResultReport)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
            <div className="faculty-main">
                <div className="banner"> 
                    <div className="icon_wrapper">
                        <img src={logo} height="30" alt="bepms"/>
                    </div>
                </div>
                <div className="navigation_mobile">
                    <div className="navigation">
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'home'})}}>Home</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'report'})}}>Report</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'setting'})}}>Setting</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'notification'})}}>Notif</div>
                    </div>
                </div>
                <div className="content">
                    {this.renderComponent()}
                </div>
            </div>

            <div className="main-tablet">
                <div className="left-navigator">
                        <div className="logo-box" >
                            <div style={{height:'111px' , width:'111px', display:'flex', justifyContent:'center', alignItems:'center'}}><img src={logo} height="30" alt="bepms"/></div>
                        </div>
                        <div className="left-navigation-options">
                            <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'home'})}}>
                                <img src={HomepageIcon} alt="Home" />
                                <span className="navigation_title"  >Homepage</span>
                            </div>
                            <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'report'})}}>
                                <img  src={HomepageIcon} alt="Home" />
                                <span className="navigation_title" >Reports</span>
                            </div>
                            <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'setting'})}}>
                                <img  src={HomepageIcon} alt="Home" />
                                <span className="navigation_title" >Setting</span>
                            </div>
                            <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'notification'})}}>
                                <img  src={HomepageIcon} alt="home" />
                                <span className="navigation_title" >Notifications</span>
                            </div>
                        </div>
                    </div>
                <div className="right-main">
                    <div className="tablet-banner">
                
                    </div>
                    <div className="content-tablet" style={{height:window.innerHeight-111, overflow:'scroll'}}>
                        {this.renderComponent()}
                    </div>

                </div>

            </div>
        </>
        );
    }
}


export default Faculty;
