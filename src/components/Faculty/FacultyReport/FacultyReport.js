import React, {Component} from 'react';
import './facultyreport.css';

import Expand from 'react-expand-animated';

import SearchIcon from '../../search.svg';

class FacultyReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false,
            descriptionToggle:true,
            attachmentToggle:false,
            reasonToggle:false
        };
    }

    SideBar = ()=>{
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
                            this.setState({sideBarToggle: false})
                        }}>&times;
                    </div>

                    {this.searchReport()}

                </div>
            </div>
        );

    }

    searchReport = () => {
        return (
            <>
                <div style={{marginBottom:10}} className="f-reports-main-text">Reports</div>
                <div className="report-list">
                    <div className="report-search-input-f">
                        <img src={SearchIcon} alt="s" style={{marginRight:'10px'}} />
                        <input className="report-search-element-f" type="text" name="Search" value="Search" style={{color:'#CBCBCB', }}/>
                    </div>
                    <div className="report-search-result-list card_rank">
                        <div style={{width:5, backgroundColor:'red', height:'auto'}} />
                        <div className="report-description">
                            <div className="report-result-title">
                                <span className="report-result-title-text-f">Completed making the changes in the description.</span>
                            </div>
                            <div>
                                <span className="report-result-date-text-f">25 Jan 2020</span>
                            </div>
                        </div>
                    </div>

                    <div className="report-search-result-list card_rank">
                        <div style={{width:5, backgroundColor:'red', height:'auto'}} />
                        <div className="report-description">
                            <div className="report-result-title">
                                <span className="report-result-title-text">Completed making the changes in the description.</span>
                            </div>
                            <div>
                                <span className="report-result-date-text">25 Jan 2020</span>
                            </div>
                        </div>
                    </div>

                    <div className="report-search-result-list card_rank">
                        <div style={{width:5, backgroundColor:'red', height:'auto'}} />
                        <div className="report-description">
                            <div className="report-result-title">
                                <span className="report-result-title-text">Completed making the changes in the description.</span>
                            </div>
                            <div>
                                <span className="report-result-date-text">25 Jan 2020</span>
                            </div>
                        </div>
                    </div>

                    <div className="report-search-result-list card_rank">
                        <div style={{width:5, backgroundColor:'red', height:'auto'}} />
                        <div className="report-description">
                            <div className="report-result-title">
                                <span className="report-result-title-text">Completed making the changes in the description.</span>
                            </div>
                            <div>
                                <span className="report-result-date-text">25 Jan 2020</span>
                            </div>
                        </div>
                    </div>

                    <div className="report-search-result-list card_rank">
                        <div style={{width:5, backgroundColor:'red', height:'auto'}} />
                        <div className="report-description">
                            <div className="report-result-title">
                                <span className="report-result-title-text">Completed making the changes in the description.</span>
                            </div>
                            <div>
                                <span className="report-result-date-text">25 Jan 2020</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    render() {

        return (
            <div style={{display:'flex', flexDirection:'row', height:'100%'}}>
                
                <div className="desktop-faculty-report-search">
                    {this.searchReport()}
                </div>

                <div className="report-details-f">
    
                    {this.SideBar()}

                    <div className="toggle_select_report" style={{marginBottom:20}}>
                        <span className="toggle-button" onClick={()=>{this.setState({sideBarToggle: true})}}>Toggle Report</span>
                    </div>

                    

                    <div className="report-head">
                        <table>
                            <tr className="report_title">
                                <td className="report_title_key">Title</td>
                                <td className="report_title_value">Completed making the changes in the description</td>
                            </tr>
                            <tr className="report_date">
                                <td className="report_title_key">Date</td>
                                <td className="report_title_value">25 Jan 2020</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div className="card_rank mt20">
                        <div 
                            className="card_inner_rank"
                            onClick={()=>{ this.setState(prevState => ({ descriptionToggle: !prevState.descriptionToggle }))}}
                        >
                            <span className="report-content-deader-f">Description</span>
                        </div>
                        
                            <Expand
                                open={this.state.descriptionToggle}
                                duration={500}
                                transitions={["height", "opacity", "background"]}
                            >
                                <div className="description-content-f">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                                </div>
                            </Expand>
                        
                    </div>

                    <div className="card_rank mt20">
                        <div className="card_inner_rank"
                        onClick={()=>{ this.setState(prevState => ({ attachmentToggle: !prevState.attachmentToggle }))}}
                        >
                            <span className="report-content-deader-f">Attachment</span>
                        </div>
                        <Expand
                                open={this.state.attachmentToggle}
                                duration={500}
                                transitions={["height", "opacity", "background"]}
                            >
                            <div className="description-content-f">
                                pdf gif .docx
                            </div>
                        </Expand>
                    </div>

                    <div className="card_rank mt20">
                        <div className="card_inner_rank report-action">
                            <div 
                                className="action_approve_btn"
                                onClick={()=>{ this.setState(prevState => ({ reasonToggle: !prevState.reasonToggle }))}}
                            >Approve</div>
                            <div 
                                className="action_change_btn"
                                onClick={()=>{ this.setState(prevState => ({ reasonToggle: !prevState.reasonToggle }))}}
                            >Assign Changes</div>
                            <div 
                                className="action_disapprove_btn"
                                onClick={()=>{ this.setState(prevState => ({ reasonToggle: !prevState.reasonToggle }))}}
                            >Disapprove</div>
                        </div>
                        
                            <Expand
                                open={this.state.reasonToggle}
                                duration={500}
                                transitions={["height", "opacity", "background"]}
                            >
                            <div className="description-content-f">
                                <span className="report-content-deader-f">Description</span>
                                <div className="action-input-element mt10">
                                    <input className="reason_input" type="text" name="reason" value="Search" style={{color:'#CBCBCB', }}/>
                                    <span className="action_disapprove_btn bg_primary">Submit</span>
                                </div>
                                </div>
                            </Expand>
                        
                    </div>

                    <div className="card_rank mt20">
                        <table className="report-status-table">
                            <tr className="table-head">
                                <th className="table-head-text">Leader</th>
                                <th className="table-head-text">Guide</th>
                                <th className="table-head-text">Project Coordinator</th>
                                <th className="table-head-text">HOD</th>
                            </tr>
                            <tr className="position-status">
                                <td className="table-status-text">sent</td>
                                <td className="table-status-text">pending</td>
                                <td className="table-status-text">---</td>
                                <td className="table-status-text">---</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default FacultyReport;
