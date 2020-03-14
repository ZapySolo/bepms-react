//import liraries
import React, { Component } from 'react';
import './adminsystem.css';
import SearchIcon from '../../search.svg';

import Expand from 'react-expand-animated';

import NetworkHelper from '../../Helpers/NetworkHelper';

// create a component
class AdminSystem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modifyActionDropboxtoggle: false,
            toggleToAction:'',
            systemSearchInput:'',//input value for search input
            fetchedSystemList:'',//storing the fetched list of system
            activeSystemProjects:'',
            activeSystem:'',
            newSystemName:'',//input for creating new system
            newSystemDescription:'',//input for creating new system
            newProjectHODEmail:'',//input for creating new project
            newProjectPCEmail:'',//input for creating new project
            newProjectGuideEmail:'',//input for creating new project
            newProjectLeaderEmail:'',//input for creating new project
            newProjectMemberEmail:[],//input for creating new project
        };
    }

    componentDidMount(){
        this.searchSystemListBySearchInput();
    }

    searchSystemListBySearchInput = () => {
        var networkHelper = new NetworkHelper();

        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('search_input', this.state.systemSearchInput);
        networkHelper.setApiPath('adminSystemListBySearchInput');

        networkHelper.execute((response) => {
            if (response.status === 200){
                let data = response.data.data;
                this.setState({showLoading:false, fetchedSystemList: data});
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

    adminDeleteProject = (project_id) => {
        let activeSystem = this.state.activeSystem;
        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('project_id', project_id);
        networkHelper.setApiPath('adminDeleteProject');
        networkHelper.execute((response) => {
            if (response.status === 200){
                this.getProjectListBySystemId(activeSystem.system_id);
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

    getProjectListBySystemId = (system_id) => {
        console.log('setting projects of system_id ', system_id);
        var networkHelper = new NetworkHelper();

        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('system_id', system_id);
        networkHelper.setApiPath('adminSystemProjects');

        networkHelper.execute((response) => {
            if (response.status === 200){
                let data = response.data.data;
                this.setState({showLoading:false, activeSystemProjects: data});
            }
        }, (errorMsg, StatusCode) => {
            this.setState({showLoading:false, activeSystemProjects: ''});
            if(StatusCode === 401){
                alert(errorMsg);
            } else {
                alert(errorMsg);
            }
        }, () => {
            alert("SERVER ERROR OCCURED");
        });
    }

    
    toggleExpandingBox = (type)=>{
        if(!this.state.modifyActionDropboxtoggle){
            this.setState(prevState => ({ modifyActionDropboxtoggle: true, toggleToAction:type }));
        } else {
            if(this.state.toggleToAction === type){
                this.setState({ modifyActionDropboxtoggle: false });
            } else {
                this.setState({ modifyActionDropboxtoggle: false });
                setTimeout(()=>{this.setState({ modifyActionDropboxtoggle: true, toggleToAction:type }) }, 500);
            }
        }
    }

    projectMemberEmailInput = () => {
        let newProjectMemberEmail = this.state.newProjectMemberEmail || [];
        let render = newProjectMemberEmail.map((element, key)=>{
            //element -> member email
            //key is index, start at 0
            return <>
                <div className="admin-input-component">
                <div className="admin-input-label" style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <span>Member {key+1} Email</span>
                    <span onClick={()=>{
                        let x = newProjectMemberEmail;
                        x.splice(key, 1);
                        this.setState({newProjectMemberEmail:x});
                    }}>X</span>
                </div>
                <div className="admin-input-field-box">
                    <input 
                        onChange={(e)=>{
                            let x = newProjectMemberEmail;
                            x[key] = e.target.value;
                            this.setState({newSystemName: x})
                        }}
                        className="admin-input-element" type="text" 
                        placeholder={"eg. member@gmail.com"+(key+1)+'@gmail.com'} value={element} />
                </div>
                <div className="input-warning">Invalid email</div>
            </div>
            </>;
        });

        return render;
    }

    addNewProject = () => {
        let activeSystem = this.state.activeSystem;
        return <>
            <div className="system-search-title mt-10">Add New Project</div>
                <div className="cgdn">Adding New Project in System: {activeSystem.system_name}</div>

                <div className="admin-input-component">
                    <div className="admin-input-label">HOD Email</div>
                    <div className="admin-input-field-box">
                        <input 
                            onChange={(e)=>{this.setState({newProjectHODEmail: e.target.value})}}
                            className="admin-input-element" type="text" 
                            placeholder="eg. hod@gmail.com" value={this.state.newProjectHODEmail} />
                    </div>
                    <div className="input-warning">Invalid email</div>
                </div>

                <div className="admin-input-component">
                    <div className="admin-input-label">PC Email</div>
                    <div className="admin-input-field-box">
                        <input 
                            onChange={(e)=>{this.setState({newProjectPCEmail: e.target.value})}}
                            className="admin-input-element" type="text" 
                            placeholder="eg. pc@gmail.com" value={this.state.newProjectPCEmail} />
                    </div>
                    <div className="input-warning">Invalid email</div>
                </div>

                <div className="admin-input-component">
                    <div className="admin-input-label">Guide Email</div>
                    <div className="admin-input-field-box">
                        <input 
                            onChange={(e)=>{this.setState({newProjectGuideEmail: e.target.value})}}
                            className="admin-input-element" type="text" 
                            placeholder="eg. guide@gmail.com" value={this.state.newProjectGuideEmail} />
                    </div>
                    <div className="input-warning">Invalid email</div>
                </div>

                <div className="admin-input-component">
                    <div className="admin-input-label">Leader Email</div>
                    <div className="admin-input-field-box">
                        <input 
                            onChange={(e)=>{this.setState({newProjectLeaderEmail: e.target.value})}}
                            className="admin-input-element" type="text" 
                            placeholder="eg. leader@gmail.com" value={this.state.newProjectLeaderEmail} />
                    </div>
                    <div className="input-warning">Invalid email</div>
                </div>

                {this.projectMemberEmailInput()}

                <div
                    onClick={()=>{
                        let membersEmail = this.state.newProjectMemberEmail;
                        membersEmail.push('member@domain.com');
                        this.setState({projectMemberEmailInput: membersEmail});
                    }}
                    className="admin-input-component" style={{textAlign:'center'}}>
                    <div className="admin-input-label" style={{padding:'10px 20px',border:'1px solid black', borderRadius:5}}>+ Add Member</div>
                </div>

                <div className="admin-input-component mt-10">
                    <div
                        onClick={()=>{this.submitNewProject()}}
                        className="admin-input-submit-button">
                        Submit
                    </div>
                </div>
        </>;
    } 

    editProjectDetails = () => {
        let activeSystem = this.state.activeSystem;
        return <>
            <div className="system-search-title mt-10">Edit Project</div>
                <div className="cgdn">Editing Project in System: {activeSystem.system_name}</div>

                <div className="admin-input-component">
                    <div className="admin-input-label">HOD Email</div>
                    <div className="admin-input-field-box">
                        <input 
                            onChange={(e)=>{this.setState({newProjectHODEmail: e.target.value})}}
                            className="admin-input-element" type="text" 
                            placeholder="eg. hod@gmail.com" value={this.state.newProjectHODEmail} />
                    </div>
                    <div className="input-warning">Invalid email</div>
                </div>

                <div className="admin-input-component">
                    <div className="admin-input-label">PC Email</div>
                    <div className="admin-input-field-box">
                        <input 
                            onChange={(e)=>{this.setState({newProjectPCEmail: e.target.value})}}
                            className="admin-input-element" type="text" 
                            placeholder="eg. pc@gmail.com" value={this.state.newProjectPCEmail} />
                    </div>
                    <div className="input-warning">Invalid email</div>
                </div>

                <div className="admin-input-component">
                    <div className="admin-input-label">Guide Email</div>
                    <div className="admin-input-field-box">
                        <input 
                            onChange={(e)=>{this.setState({newProjectGuideEmail: e.target.value})}}
                            className="admin-input-element" type="text" 
                            placeholder="eg. guide@gmail.com" value={this.state.newProjectGuideEmail} />
                    </div>
                    <div className="input-warning">Invalid email</div>
                </div>

                <div className="admin-input-component">
                    <div className="admin-input-label">Leader Email</div>
                    <div className="admin-input-field-box">
                        <input 
                            onChange={(e)=>{this.setState({newProjectLeaderEmail: e.target.value})}}
                            className="admin-input-element" type="text" 
                            placeholder="eg. leader@gmail.com" value={this.state.newProjectLeaderEmail} />
                    </div>
                    <div className="input-warning">Invalid email</div>
                </div>

                {this.projectMemberEmailInput()}

                <div
                    onClick={()=>{
                        let membersEmail = this.state.newProjectMemberEmail;
                        membersEmail.push('');
                        this.setState({projectMemberEmailInput: membersEmail});
                    }}
                    className="admin-input-component" style={{textAlign:'center'}}>
                    <div className="admin-input-label" style={{padding:'10px 20px',border:'1px solid black', borderRadius:5}}>+ Add Member</div>
                </div>

                <div className="admin-input-component mt-10">
                    <div
                        onClick={()=>{this.submitEditProject()}}
                        className="admin-input-submit-button">
                        Submit
                    </div>
                </div>
        </>;
    }

    submitNewProject = () => {
        let activeSystem = this.state.activeSystem;

        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('hod_email', activeSystem.system_id);
        if(this.state.newProjectHODEmail){
            networkHelper.setData('hod_email', this.state.newProjectHODEmail);
        }
        if(this.state.newProjectPCEmail){
            networkHelper.setData('pc_email', this.state.newProjectPCEmail);
        }
        if(this.state.newProjectGuideEmail){
            networkHelper.setData('guide_email', this.state.newProjectGuideEmail);
        }
        if(this.state.newProjectLeaderEmail){
            networkHelper.setData('leader_email', this.state.newProjectLeaderEmail);
        }
        if(this.state.newProjectMemberEmail){
            networkHelper.setData('member_email', this.state.newProjectMemberEmail);
        }
        networkHelper.setApiPath('adminAddProjectToSystem');
        
        networkHelper.execute((response) => {
            if (response.status === 200){
                this.getProjectListBySystemId(activeSystem.system_id);
                this.setState({toggleToAction:''});
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

    expandBoxComponent = () => {
        //actions === 'addNewSystem editSystem addNewProject editProject'
        //return expanding components

        if(this.state.toggleToAction === 'addNewSystem')
            return this.createNewSystem();
        else if (this.state.toggleToAction === 'editSystem')
            return this.editSystem();
        else if(this.state.toggleToAction === 'addNewProject')
            return this.addNewProject();
        else if(this.state.toggleToAction === 'editProject')
            return this.editProjectDetails();
        return <></>;
    }

    submitEditProject = () => {
        alert('api pending!');
    }

    editSystem = ()=> {
        let activeSystem = this.state.activeSystem;
        return <>
            <div className="system-search-title mt-10">Change System Details</div>
                <div className="cgdn">Editing system: {activeSystem.system_name}</div>
                <div className="admin-input-component">
                    <div className="admin-input-label">System Name</div>
                    <div className="admin-input-field-box">
                        <input 
                            onChange={(e)=>{this.setState({newSystemName: e.target.value})}}
                            className="admin-input-element" type="text" 
                            placeholder="eg. Computer Department 2020" value={this.state.newSystemName} />
                    </div>
                    <div className="input-warning">Invalid system name</div>
                </div>

                <div className="admin-input-component">
                    <div className="admin-input-label">System Description</div>
                    <div className="admin-input-field-box-description">
                        <input 
                            onChange={(e)=>{this.setState({newSystemDescription: e.target.value})}}
                            className="admin-input-element-description" type="text" 
                            placeholder="optional" value={this.state.newSystemDescription} />
                    </div>
                    <div className="input-warning">only 500 characters.</div>
                </div>

                <div className="admin-input-component mt-10">
                    <div
                        onClick={()=>{this.submitEditProject()}} 
                        className="admin-input-submit-button">
                        Submit
                    </div>
                </div>
        </>;
    }

    createNewSystem = () => {
        return(
            <>
                <div className="system-search-title mt-10">Add New System</div>

                <div className="admin-input-component">
                    <div className="admin-input-label">System Name</div>
                    <div className="admin-input-field-box">
                        <input 
                            onChange={(e)=>{this.setState({newSystemName: e.target.value})}}
                            className="admin-input-element" type="text" 
                            placeholder="eg. Computer Department 2020" value={this.state.newSystemName} />
                    </div>
                    <div className="input-warning">Invalid system name</div>
                </div>

                <div className="admin-input-component">
                    <div className="admin-input-label">System Description</div>
                    <div className="admin-input-field-box-description">
                        <input 
                            onChange={(e)=>{this.setState({newSystemDescription: e.target.value})}}
                            className="admin-input-element-description" type="text" 
                            placeholder="optional" value={this.state.newSystemDescription} />
                    </div>
                    <div className="input-warning">only 500 characters.</div>
                </div>

                <div className="admin-input-component mt-10">
                    <div
                        onClick={()=>{this.submitNewReport()}} 
                        className="admin-input-submit-button">
                        Submit
                    </div>
                </div>

            </>
        );
    }

    submitNewReport = () => {
        if(!this.state.newSystemName){
            alert('System name cannot be empty!');
        }

        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('system_name', this.state.newSystemName);
        networkHelper.setData('system_description', this.state.newSystemDescription);
        networkHelper.setApiPath('adminCreateNewSystem', this.state.newSystemDescription);
        
        networkHelper.execute((response) => {
            if (response.status === 200){
                this.searchSystemListBySearchInput();
            }
        }, (errorMsg, StatusCode) => {
            this.setState({showLoading:false, activeSystemProjects: ''});
            if(StatusCode === 401){
                alert(errorMsg);
            } else {
                alert(errorMsg);
            }
        }, () => {
            alert("SERVER ERROR OCCURED");
        });
    }



    rendersysList = (fetchedSystemList = []) => {
        let render = fetchedSystemList.map((element, key)=>{
            return <>
                <div className="table-data-row">
                    <div className="table-data-index">
                        {element.system_id}
                    </div>
                    <div 
                        onClick={() => {
                            if(this.state.activeSystem === element){
                                this.setState({activeSystem: '', activeSystemProjects:'', toggleToAction:''});
                            } else {
                                this.setState({activeSystem: element, activeSystemProjects:''});
                                setTimeout(()=>{
                                    this.getProjectListBySystemId(element.system_id);
                                },100);
                            }
                        }}
                        className="table-data-main-title">
                        {element.system_name}
                    </div>
                    <div className="table-data-storage">
                        --GB
                    </div>
                    <div className="table-data-action">
                        <span onClick={()=>{ 
                            this.setState({activeSystem:element});
                            setTimeout(()=>{
                                this.getProjectListBySystemId(element.system_id);
                                this.toggleExpandingBox('editSystem');
                            },100)}}>Edit</span> |
                        <span onClick={()=>{ 
                            if (window.confirm('Are you sure you wish to delete this system?\nyou\'ll lose all the projects and corresponding reports!'))
                                this.adminDeleteSystem(element.system_id);
                        }}>Delete</span> 
                    </div>
                </div>
            </>;
        });

        return render;
    }

    adminDeleteSystem = (system_id) => {
        let activeSystem = this.state.activeSystem;
        if(activeSystem.system_id === system_id){
            this.setState({activeSystem:'', activeSystemProjects:'', activeSystemProjectsL:''});
        }
        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('system_id', system_id);
        networkHelper.setApiPath('adminDeleteSystem');
        networkHelper.execute((response) => {
            if (response.status === 200){
                this.searchSystemListBySearchInput();
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

    renderSystemList = () => {
        if(!this.state.fetchedSystemList) return <div style={{width:'600px'}}>fetching list...</div>;
        let fetchedSystemList = this.state.fetchedSystemList;

        let systemContainerClass = (this.state.activeSystem)?'table-data-container':'table-data-container mxh470px';
        
        return <>
            <div className="admin-systems">
                <div className="system-search-title">
                    <div className="system-search-title-text">System</div> 
                    <div className="system-search-title-text sytt-flex">{fetchedSystemList.length}
                        <div 
                            onClick={()=>{ this.toggleExpandingBox('addNewSystem')}}
                            className="add-new-button"> + Add new system</div>
                    </div>
                </div>
                
                <div className="system-search-input">
                    <img
                        onClick={()=>{this.searchSystemListBySearchInput()}}
                        src={SearchIcon} height={15} alt="img"/>
                    <input 
                        onKeyDown = {(event)=>{if(event.key === 'Enter'){this.searchSystemListBySearchInput()}}}
                        onChange={(e)=>{this.setState({systemSearchInput:e.target.value})}}
                        className="admin-search-input" type="text"
                        value={this.state.systemSearchInput}
                        placeholder="Search" />
                </div>

                <div className="table-title">
                    <div className="table-index">
                        #
                    </div>
                    <div className="table-main-title">
                        System Name
                    </div>
                    <div className="table-storage">
                        Storage
                    </div>
                    <div className="table-action">
                        Actions
                    </div>
                </div>

                <div className={systemContainerClass}>

                    {this.rendersysList(fetchedSystemList)}
                    
                </div>
            </div>
        </>;
    } 

    projectListRender = () => {
        if(!this.state.activeSystemProjects){return <>fetching projects...</>}

        let activeSystemProjects = this.state.activeSystemProjects;

        let render = activeSystemProjects.map((element, key)=>{
            return <>
            <div className="table-data-row">
                <div className="table-data-index">
                    {element.project_id}
                </div>
                <div className="table-data-main-title">
                    {element.project_name}
                </div>
                <div className="table-data-storage">
                    --GB
                </div>
                <div className="table-data-action">
                    <span onClick={()=>{ this.toggleExpandingBox('editProject')}}>Edit</span> 
                        | 
                    <span onClick={()=>{
                        if (window.confirm('Are you sure you wish to delete this\nthis will also delete the corresponding reports and attachments'))
                            this.adminDeleteProject(element.project_id);
                        }}>Delete</span>
                </div>
            </div>
        </>;
        });
        return render;
    }

    renderSystemProjects = () => {
        if(!this.state.activeSystem){ return <></> ; }
        let activeSystem = this.state.activeSystem;
        return <>
            <div className="admin-systems mt-30">
                <div className="system-search-title">
                    <div className="system-search-title-text">{activeSystem.system_name}</div> 
                    <div className="system-search-title-text sytt-flex">4 
                        <div 
                            onClick={()=>{ this.toggleExpandingBox('addNewProject')}}
                            className="add-new-button"> + Add new Project</div>
                            <span onClick={()=>{this.setState({activeSystemProjectsL:'', activeSystem: '',toggleToAction:''})}}>&nbsp; &times; &nbsp;</span>
                    </div>
                </div>

                <div className="table-title mt-20">
                    <div className="table-index">
                        #
                    </div>
                    <div className="table-main-title">
                        Project Name
                    </div>
                    <div className="table-storage">
                        Storage
                    </div>
                    <div className="table-action">
                        Actions
                    </div>
                </div>

                <div className="table-data-container">

                    {this.projectListRender()}

                </div>
            </div>
        </>;
    }
    

    render() {

        return (
            <div className="admin-system-main">
                <div>
                    
                        {this.renderSystemList()}
                    

                        {this.renderSystemProjects()}

                </div>

                <div className="modify-action-dropbox">
                    <Expand
                        open={this.state.modifyActionDropboxtoggle}
                        duration={500}
                        transitions={["height", "opacity", "background"]}>

                        {this.expandBoxComponent()}
                        
                    </Expand>
                </div>
            </div>
        );
    }
}


//make this component available to the app
export default AdminSystem;
