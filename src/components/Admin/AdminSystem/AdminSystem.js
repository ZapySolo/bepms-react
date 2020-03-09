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
            activeSystem:''
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

    expandBoxComponent = () => {
        //actions === 'addNewSystem editSystem addNewProject editProject'
        //return expanding components

        if(this.state.toggleToAction === 'addNewSystem'){
            return this.createNewSystem();
        }

        return <>Something went wrong</>;
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

    createNewSystem = () => {
        return(
            <>
                <div className="system-search-title mt-10">Add New System/Edit</div>

                <div className="admin-input-component">
                    <div className="admin-input-label">Label</div>
                    <div className="admin-input-field-box">
                        <input className="admin-input-element" type="text" value="eg. Computer Department 2020" />
                    </div>
                    <div className="input-warning">input warning</div>
                </div>

                <div className="admin-input-component">
                    <div className="admin-input-label">Label</div>
                    <div className="admin-input-field-box">
                        <input className="admin-input-element" type="text" value="eg. Computer Department 2020" />
                    </div>
                    <div className="input-warning">input warning</div>
                </div>

                <div className="admin-input-component">
                    <div className="admin-input-label">Label</div>
                    <div className="admin-input-field-box">
                        <input className="admin-input-element" type="text" value="eg. Computer Department 2020" />
                    </div>
                    <div className="input-warning">input warning</div>
                </div>

                <div className="admin-input-component mt-10">
                    <div className="admin-input-submit-button">
                        Submit
                    </div>
                </div>
            </>
        );
    }

    rendersysList = (fetchedSystemList = []) => {
        let render = fetchedSystemList.map((element, key)=>{
            return <>
                <div className="table-data-row" onClick={()=>{
                    if(this.state.activeSystem === element){
                        this.setState({activeSystem: '', activeSystemProjects:''});
                    } else {
                        this.setState({activeSystem: element, activeSystemProjects:''});
                        setTimeout(()=>{
                            this.getProjectListBySystemId(element.system_id);
                        },100);
                    }
                    }}>
                    <div className="table-data-index">
                        {element.system_id}
                    </div>
                    <div className="table-data-main-title">
                        {element.system_name}
                    </div>
                    <div className="table-data-storage">
                        --GB
                    </div>
                    <div className="table-data-action">
                        Edit | Delete
                    </div>
                </div>
            </>;
        });

        return render;
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
                    <img src={SearchIcon} height={15} alt="img"/>
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
                    Edit | Delete
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
                    </div>
                </div>

                <div className="table-title mt-20">
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
