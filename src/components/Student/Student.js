import React, {Component} from 'react';
import './student.css';
import logo from '../../assets/images/bepms-logo.png';

import StudentReport from './StudentReport/StudentReport';
import StudentSetting from '../Setting/Setting';
import Notification from '../Notification/Notification';
import FolderIcon from '../../assets/images/folder_icon.png';
import HomepageIcon from '../../homepage-logo.svg';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import NetworkHelper from '../Helpers/NetworkHelper';

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false,
            activeTab: 'home',
            sideBarWidth:'100vh',
            modalIsOpen:false,
            fetchedProjectList:'',
            activeProject:'',
            fetchedProjectDetails:{},
            projectTab:'details', //details, attachments, todo
            currentProjectID:'',
            currentProjectPosition:'',
            editProjectTitle:'',
            editProjectDescription:'',


            //errors
            fetchingProjectDetailerror:false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount(){
        this.getProjectList();
    }

    getProjectList = () => {

        this.setState({fetchingProjectDetailListFlag:true})

        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setApiPath('studentProjectList');

        networkHelper.execute((response) => {
            if (response.status === 200){
                let data = response.data.data;
                if(data === []){
                    this.setState({showLoading:false, fetchedProjectList: data, fetchingProjectDetailListFlag:false});
                } else {
                    try{
                        this.setState({showLoading:false, fetchedProjectList: data, activeProject: data[0], fetchingProjectDetailListFlag:false});
                        if(!this.state.currentProjectID){
                            data = data[0];
                            this.getProjectDetailsByProjectId(data.project_id);
                            this.setState({currentProjectID:data.project_id, currentProjectPosition:data.project_position_name});
                        }
                    } catch {

                    }
                }
            }
        }, (errorMsg, StatusCode) => {
            if(StatusCode === 401){
                alert(errorMsg);
                this.setState({fetchingProjectDetailListFlag:false});
            } else {
                alert(errorMsg);
                this.setState({fetchingProjectDetailListFlag:false});
            }
        }, () => {
            alert("SERVER ERROR OCCURED");
        });
    }

    handleOpenModal () {
        this.setState({ modalIsOpen: true });
    }
      
    handleCloseModal () {
        this.setState({ modalIsOpen: false });
    }

    renderComponent = () => {
        switch(this.state.activeTab){
            case 'home':
                return this.StudentHome();
             
            case 'report':
                let activeProject = this.state.activeProject;
                return <StudentReport project_id={this.state.currentProjectID} project_position_name={this.state.currentProjectPosition} activeProjectName={activeProject.project_name}/>;
              
            case 'setting':
                return <StudentSetting />;
               
            case'notification':
                return <Notification />;
                
            default:
                return <div style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>This will render by default</div>;
        }
    }

    ProgressBar = (project_status = 0) => {
        project_status = parseInt(project_status);
        return (
            <CircularProgressbar
                value={project_status}
                text={`${project_status}%`}
                styles={{
                    root: { height:'150px' },
                    path: {
                        stroke: `rgba(46, 212, 122, 100)`,
                        strokeLinecap: 'butt',
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                    },
                    trail: {
                        stroke: '#F7685B',
                        strokeLinecap: 'butt',
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                    },
                    text: {
                        fill: '#000',
                        fontSize: '16px',
                    },
                    background: { fill: '#3e98c7' },
                }}
            />
        );
    }

    changeActiveProjectToId = (project_id) => {
        let projectList = this.state.fetchedProjectList;
        let activeProject = this.state.activeProject;
        let flag = false;
        let positionName;
        projectList.forEach((element, key) => {
            if(element.project_id === project_id){
                if(JSON.stringify(element) !== JSON.stringify(activeProject)){
                    this.setState({activeProject: element});
                    flag = true;
                    positionName = element.project_position_name;
                }
            }
        });
        if(flag){
            this.getProjectDetailsByProjectId(project_id);
            setTimeout(()=>{
                this.setState({sideBarToggle:false, currentProjectID:project_id, currentProjectPosition:positionName});
            },100);
        }
    }

    currentProject = (activeProject) => {
        return (
            <>
                <div key={"cs_c_mn_"+1} className="currentSystem_content_s">
                    <span key={"csoic_c_"+2} className="current_system_title">{activeProject.project_name}</span>
                    <span key={"cs_kjbc_c_"+3} className="current_system_position_name">Your Position: {activeProject.project_position_name}</span>
                </div>
            </>
        );
    }

    otherProjects = (otherProjects) => {
        if(Array.isArray(otherProjects)){
            let render = otherProjects.map((element, key) => {
                let project_id = element.project_id;
                let project_name = element.project_name;
                return <>
                    <div key={"cs_c_c_"+key} className="currentSystem_content_s" 
                        onClick={()=>{
                            this.setState({fetchedProjectDetails:''});
                            this.changeActiveProjectToId(project_id);
                        }}
                        >
                        <div key={"o_s_t_"+key} className="other_system_title">
                            <div key={"fic_"+key} className="folderIconContainer">
                                <img key={"fi_afkj"+key} src={FolderIcon} alt="folder_icon" height="28" />
                            </div>
                            <div key={"ost_"+key} className="otherSystemTitle">{project_name}</div>
                        </div>
                    </div>
                </>
            });
            return render;
        }
    }

    SelectProjects = ()=> {
        let fetchedProjectList = this.state.fetchedProjectList;
        let activeProject = this.state.activeProject;
        if(this.state.fetchingProjectDetailListFlag){
            return <div style={{marginTop:20, display:'flex', alignItems:'center',justifyContent:'center'}}>
                <img src={require('../../assets/bepms-loading.gif')} alt="loading projects..." width={35} height={35} />
            </div>
        }
        return (
            <div className="selectProjects">
                <div className="currentSystem">
                    <span>Your Current Project</span>
                    {this.currentProject(activeProject)}
                </div>
                <div className="currentSystem" style={{marginTop:20}}>
                    <span>All Project</span>
                    {this.otherProjects(fetchedProjectList)}
                </div>
            </div>
        );
    }

    SideBar = () => {
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
                    {this.SelectProjects()}
                </div>
            </div>
        );
    }

    getProjectDetailsByProjectId = (project_id)=>{

        var networkHelper = new NetworkHelper();

        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('project_id', project_id);
        networkHelper.setApiPath('studentProjectDetails');

        networkHelper.execute((response) => {
            if (response.status === 200){
                let data = response.data.data;
                data = data[0];
                this.setState({showLoading:false, fetchedProjectDetails: data});
                this.setState({editProjectDescription:data.project_description, editProjectTitle:data.project_name})
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

    submitEditProjectDetails = () => {
        let activeProject = this.state.activeProject;

        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('project_id', activeProject.project_id);
        if(activeProject.project_name === this.state.editProjectTitle && activeProject.project_description === this.state.editProjectDescription){
            alert('tried submitting unchanges values');
            return ;
        }
        if(activeProject.project_name !== this.state.editProjectTitle){
            networkHelper.setData('project_name', this.state.editProjectTitle);
        }
        if(activeProject.project_description !== this.state.editProjectDescription){
            networkHelper.setData('project_description', this.state.editProjectDescription);
        }
        networkHelper.setApiPath('leaderEditProjectDetails');

        networkHelper.execute((response) => {
            if (response.status === 200){
                this.getProjectDetailsByProjectId(activeProject.project_id);
                this.getProjectList();
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

    projectDetails = ()=>{
        let fetchedProjectDetails = this.state.fetchedProjectDetails;

        if(Object.keys(fetchedProjectDetails).length < 1){
            if(this.state.fetchingProjectDetailerror){
                return <>Error Occured while fetching data</>;
            }
            return <div style={{marginTop:20, display:'flex', alignItems:'center',justifyContent:'center'}}>
                    <img src={require('../../assets/bepms-loading.gif')} alt="loading..." width={35} height={35} />
                </div>;
        }
        let project_name = fetchedProjectDetails.project_name || 'N.A';
        let project_description = fetchedProjectDetails.project_description || 'N.A';
        let project_status = fetchedProjectDetails.project_status || 0;
        let project_members = fetchedProjectDetails.project_members || [];

        let project_member_render = project_members.map((element, key) => {
            let member_name = element.user_display_name;
            let member_profile_img = element.user_profile_image;
            let member_position_name = element.project_position_name;
            return <>
                <div key={'mp'+key} className="member-profie mb10">
                    <div key={'md'+key} className="member-detail">
                        <img key={'mpimg'+key} src={"http://zapy.tech/projects/bepms-ci/uploads/profiles/"+member_profile_img} alt="profile" className="member-profile-img" />
                        <span key={'sml'+key} style={{marginLeft:10}} >{member_name}</span>
                    </div>
                    <div key={'mp_X'+key} className="member-position">
                        <span key={'pdvt'+key} className="project-description-value-text">{member_position_name}</span>
                    </div>
                </div>
            </>
        });

        let details = (<>
            <div className="project-header">
                <span className="project-title-text">{project_name}</span>
            </div>

            <div className="project-description-rank card_rank">
                <div className="project-description-key">
                    <span className="project-description-key-text">Description</span>
                </div>
                <div className="project-description-value">
                    <span className="project-description-value-text">{project_description}</span>
                </div>
            </div>

            <div className="project-description-rank card_rank">
                <div className="project-description-key">
                    <span className="project-description-key-text">Project Status</span>
                </div>
                <div className="project-description-value">
                    {this.ProgressBar(project_status)}
                </div>
            </div>

            <div className="project-member-rank card_rank">

                <div className="project-description-key">
                    <span className="project-description-key-text">Members</span>
                </div>

                <div className="project-description-value project-member-value">
                    {project_member_render}
                </div>

            </div>
        </>);

        let attachments = (<>
            <div style={{width:'100%', height:'100%', padding:'10px', display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                <img src={FolderIcon} alt="folderIcon" style={{height:100, width:100, margin:5}}/>
                <img src={FolderIcon} alt="folderIcon" style={{height:100, width:100, margin:5}}/>
                <img src={FolderIcon} alt="folderIcon" style={{height:100, width:100, margin:5}}/>
            </div>
        </>);

        let todo = (<>
            ToDo has not been implemented
        </>);

        let edit = (<>
            <div>
                <div className="input-field" style={{width:'100%'}}>
                    <div className="input-field-lable">
                        <span className="input-field-lable-text" >Project Title</span>
                    </div>
                    <div className="field-input">
                        <input 
                            onChange={(e)=>{this.setState({editProjectTitle :e.target.value})}}
                            className="field-input-element" type="text" 
                            value={this.state.editProjectTitle} 
                            style={{color:'#CBCBCB'}}/>
                    </div>
                    <div className="field-error">
                        <span className="error-message-text">title cannot be empty</span>
                    </div>
                </div>

                <div className="input-field" style={{width:'100%'}}>
                    <div className="input-field-lable">
                        <span className="input-field-lable-text" >Project Description</span>
                    </div>
                    <div className="field-input">
                        <input 
                            onChange={(e)=>{this.setState({editProjectDescription :e.target.value})}}
                            className="field-input-element" type="text" 
                            value={this.state.editProjectDescription} 
                            style={{color:'#CBCBCB'}}/>
                    </div>
                    <div className="field-error">
                        <span className="error-message-text">description must be more than 200 characters</span>
                    </div>
                </div>

                <div className="input-field input-field-submit" style={{margin:'auto'}}>
                    <div className="setting-submit">
                        <input
                            onClick={()=>{this.submitEditProjectDetails()}}
                            className="submit-button" type="submit" name="Submit" />
                    </div>
                </div>
                
            </div>
        </>);

        let xxx = (<></>);
        if(this.state.projectTab === 'details') xxx = details;
        else if (this.state.projectTab === 'attachments') xxx = attachments;
        else if (this.state.projectTab === 'todo') xxx = todo;
        else if (this.state.projectTab === 'edit') xxx = edit;

        return (<>
                <div className="project-image">
                    <div className="cover-image-padd" style={{height:'170px', width:'100%'}}>
                        <img src="https://source.unsplash.com/random/400x200" style={{objectFit:"cover"}} height="170px" width="100%" alt="profile" />
                    </div>
                </div>
                <div className="project-options">
                    <div>
                        <div className="project-profile-img">
                            <img className="project-profile-img-element" src="https://source.unsplash.com/random/100x100" alt="profile" />
                        </div>
                    </div>
                    <div className="card_rank project-options-elements">
                        <div
                            onClick={()=>this.setState({projectTab:'details'})} 
                            className="project-action">
                            <span className="project-action-text">Details</span>
                        </div>
                        <div 
                            onClick={()=>this.setState({projectTab:'attachments'})}
                            className="project-action">
                            <span className="project-action-text">Attachments</span>
                        </div>
                        <div
                            onClick={()=>this.setState({projectTab:'todo'})}
                            className="project-action">
                            <span className="project-action-text">To-Do</span>
                        </div>
                        {(this.state.currentProjectPosition === 'leader') 
                            ? <div
                                onClick={()=>this.setState({projectTab:'edit'})}
                                className="project-action">
                                <span className="project-action-text">Edit</span>
                            </div> 
                            : <></>}
                        
                    </div>
                </div>
                
                <div className="project-section-2">
                    {xxx}
                </div>
        </>);
    }

    StudentHome = () => {

        return(
            <div className="studentName">
                <div className="toggle_search_wrapper">
                    <div className="drawer_toggle" style={{flexDirection:'row', justifyContent:'flex-start', width:'100%'}}>
                        <span className="font30" onClick={()=>{this.setState({sideBarToggle: true})}}>&#9776;</span>
                    </div>
                </div>
                <div className="select-projects">
                    {this.SelectProjects()}
                </div>
                <div className="current-project-details">
                    {this.projectDetails()}
                </div>
            </div>
        );
    }

    render() {

        return (
            <>
            {this.SideBar()}
            <div className="main-mobile">
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
                            <img src={HomepageIcon}  alt="home"/>
                            <span className="navigation_title">Homepage</span>
                        </div>
                        <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'report'})}}>
                            <img  src={HomepageIcon} alt="home"/>
                            <span className="navigation_title">Reports</span>
                        </div>
                        <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'setting'})}}>
                            <img  src={HomepageIcon} alt="home"/>
                            <span className="navigation_title">Setting</span>
                        </div>
                        <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'notification'})}}>
                            <img  src={HomepageIcon} alt="home"/>
                            <span className="navigation_title">Notifications</span>
                        </div>
                    </div>
                </div>

                <div className="right-main">
                    <div className="tablet-banner"> </div>
                    <div className="content-tablet" style={{height:window.innerHeight-111, overflow:'scroll'}}>
                        {this.renderComponent()}
                    </div>
                </div>

            </div>
            </>
        );
    }
}


export default Student;


/* <Modal
    isOpen={this.state.modalIsOpen}
    onRequestClose={this.handleCloseModal}
    className="student-modal-content"
    overlayClassName="student-modal-overlay"
    >
    <div>
        <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between', height:30,padding:10}}>
            <span>Attachments</span>
            <button onClick={this.handleCloseModal}>Close</button>
        </div>
        <div style={{width:'100%', height:'100%', padding:'10px', display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
            <img src={FolderIcon} alt="folderIcon" style={{height:100, width:100, margin:5}}/>
            <img src={FolderIcon} alt="folderIcon" style={{height:100, width:100, margin:5}}/>
            <img src={FolderIcon} alt="folderIcon" style={{height:100, width:100, margin:5}}/>
        </div>
    </div>
</Modal> */