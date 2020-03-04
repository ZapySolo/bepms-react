//import liraries
import React, { Component } from 'react';
import './adminsystem.css';
import SearchIcon from '../../search.svg';

import Expand from 'react-expand-animated';

// create a component
class AdminSystem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modifyActionDropboxtoggle: false,
            toggleToAction:''
        };
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
    

    render() {
        return (
            <div className="admin-system-main">
                <div>
                <div className="admin-systems">
                    <div className="system-search-title">
                        <div className="system-search-title-text">System</div> 
                        <div className="system-search-title-text sytt-flex">5 
                            <div 
                                onClick={()=>{ this.toggleExpandingBox('addNewSystem')}}
                                className="add-new-button"> + Add new system</div>
                        </div>
                    </div>
                    <div className="system-search-input">
                        <img src={SearchIcon} height={15} alt="img"/>
                        <input className="admin-search-input" type="text" value="Search" />
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

                    <div className="table-data-container">

                        <div className="table-data-row">
                            <div className="table-data-index">
                                A012
                            </div>
                            <div className="table-data-main-title">
                                Computer Department 2020
                            </div>
                            <div className="table-data-storage">
                                11GB
                            </div>
                            <div className="table-data-action">
                                Edit | Delete
                            </div>
                        </div>

                        <div className="table-data-row">
                            <div className="table-data-index">
                                A012
                            </div>
                            <div className="table-data-main-title">
                                Computer Department 2020
                            </div>
                            <div className="table-data-storage">
                                11GB
                            </div>
                            <div className="table-data-action">
                                Edit | Delete
                            </div>
                        </div>

                        

                    </div>
                </div>

                <div className="admin-systems mt-30">
                    <div className="system-search-title">
                        <div className="system-search-title-text">Computer Department 2019-2020</div> 
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

                        <div className="table-data-row">
                            <div className="table-data-index">
                                A012
                            </div>
                            <div className="table-data-main-title">
                                Computer Department 2020
                            </div>
                            <div className="table-data-storage">
                                11GB
                            </div>
                            <div className="table-data-action">
                                Edit | Delete
                            </div>
                        </div>

                        <div className="table-data-row">
                            <div className="table-data-index">
                                A012
                            </div>
                            <div className="table-data-main-title">
                                Computer Department 2020
                            </div>
                            <div className="table-data-storage">
                                11GB
                            </div>
                            <div className="table-data-action">
                                Edit | Delete
                            </div>
                        </div>

                    </div>
                </div>

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
