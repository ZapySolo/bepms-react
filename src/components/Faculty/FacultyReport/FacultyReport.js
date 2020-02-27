import React, {Component} from 'react';
import './facultyreport.css';

class FacultyReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false,
        };
    }

    render() {
        let sidebarWidth = (!this.state.sideBarToggle)?'0px':'100vw';
        return (
            <>
                <div className="report-details">
                    {/**Report Side Bar*/}
                    <div className="sidenav" style={{width:sidebarWidth}}>
                        <div className="sidebar_content">
                            <div href="#" className="closebtn" onClick={()=>{this.setState({sideBarToggle: false})}}>&times;</div>
                            <div style={{marginBottom:10}}>Reports</div>
                            <div className="report-list">
                                <div className="report-search-input">
                                    <input className="report-search-element" type="text" name="Search" value="Search" style={{color:'#CBCBCB', }}/>
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
                        </div>
                    </div>

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
                        <div className="card_inner_rank">
                            <span>Description</span>
                        </div>
                        <div className="description-content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </div>
                    </div>

                    <div className="card_rank mt20">
                        <div className="card_inner_rank">
                            <span>Attachment</span>
                        </div>
                        <div className="description-content">
                                pdf gif .docx
                        </div>
                    </div>

                    <div className="card_rank mt20">
                        <div className="card_inner_rank report-action">
                            <div className="action_approve_btn">Approve</div>
                            <div className="action_change_btn">Assign Changes</div>
                            <div className="action_disapprove_btn">Disapprove</div>
                        </div>
                        <div className="description-content">
                                <span>Disapprove Reason</span>
                                <div className="action-input-element mt10">
                                    <input className="reason_input" type="text" name="reason" value="Search" style={{color:'#CBCBCB', }}/>
                                    <span className="action_disapprove_btn bg_primary">Submit</span>
                                </div>
                        </div>
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
            </>
        );
    }
}


export default FacultyReport;
