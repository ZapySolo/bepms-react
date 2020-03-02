import React, {Component} from 'react';
import './studentreport.css';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';


class FacultyReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false,
            createReportActive:false,
            percentageClaim:30,
            editReportActive:false
        };
    }

    editReport = ()=>{

        return (
            <>
                <div className="create-report-setting-fields">
                    <div style={{marginTop:40, marginiBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                        <span>Edit Report</span>
                        <span onClick={()=>{this.setState({editReportActive:false})}}>Cancel</span>
                    </div>

                    <div className="input-field">
                        <div className="input-field-lable">
                            <span className="input-field-lable-text" >Report title</span>
                        </div>
                        <div className="field-input">
                            <input className="field-input-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                        </div>
                        <div className="field-error">
                            <span className="error-message-text">Invalid First Name</span>
                        </div>
                    </div>

                    <div className="field-input-text-area-element">
                        <div className="input-field-lable">
                            <span className="input-field-lable-text" >Description</span>
                        </div>
                        <div className="field-input-textarea">
                            <textarea className="field-input-text-area-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                        </div>
                        <div className="field-error">
                            <span className="error-message-text">Invalid First Name</span>
                        </div>
                    </div>

                    <div className="input-field">
                        <div className="input-field-lable">
                            <span className="input-field-lable-text" >Attachments</span>
                        </div>
                        <div className="field-input">
                            <input className="field-input-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                        </div>
                        <div className="field-error">
                            <span className="error-message-text">Invalid First Name</span>
                        </div>
                    </div>

                    <div className="input-field">
                        <div className="input-field-lable">
                            <span className="input-field-lable-text" >Percentage Completed</span>
                        </div>
                        <div className="field-input">
                            <div style={{margin:10, marginTop:20}}>
                                <InputRange
                                    maxValue={100}
                                    minValue={0}
                                    value={this.state.percentageClaim}
                                    onChange={value => this.setState({ percentageClaim: value })}
                                />
                            </div>
                        </div>
                        <div className="field-error">
                            <span className="error-message-text">Invalid First Name</span>
                        </div>
                    </div>


                    <div className="input-field">
                        <div className="setting-submit">
                            <input className="submit-button" type="submit" name="Submit" />
                        </div>
                    </div>

                </div>
            </>
        );
    }

    reportDetails = ()=> {

        if(this.state.editReportActive){
            return this.editReport();
        }

        if(this.state.createReportActive){
            return (
                <div class="createReport">
                    <div className="create-report-setting-fields">
                        <div style={{marginTop:40, marginiBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                            <span>Create New Report</span>
                            <span onClick={()=>{this.setState({createReportActive:false})}}>Cancel</span>
                        </div>

                        <div className="input-field">
                            <div className="input-field-lable">
                                <span className="input-field-lable-text" >REport title</span>
                            </div>
                            <div className="field-input">
                                <input className="field-input-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                            </div>
                            <div className="field-error">
                                <span className="error-message-text">Invalid First Name</span>
                            </div>
                        </div>

                        <div className="field-input-text-area-element">
                            <div className="input-field-lable">
                                <span className="input-field-lable-text" >Description</span>
                            </div>
                            <div className="field-input-textarea">
                                <textarea className="field-input-text-area-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                            </div>
                            <div className="field-error">
                                <span className="error-message-text">Invalid First Name</span>
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="input-field-lable">
                                <span className="input-field-lable-text" >Attachments</span>
                            </div>
                            <div className="field-input">
                                <input className="field-input-element" type="text" name="Search" value="Dameon" style={{color:'#CBCBCB', }}/>
                            </div>
                            <div className="field-error">
                                <span className="error-message-text">Invalid First Name</span>
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="input-field-lable">
                                <span className="input-field-lable-text" >Percentage Completed</span>
                            </div>
                            <div className="field-input">
                                <div style={{margin:10, marginTop:20}}>
                                    <InputRange
                                        maxValue={100}
                                        minValue={0}
                                        value={this.state.percentageClaim}
                                        onChange={value => this.setState({ percentageClaim: value })}
                                    />
                                </div>
                            </div>
                            <div className="field-error">
                                <span className="error-message-text">Invalid First Name</span>
                            </div>
                        </div>


                        <div className="input-field">
                            <div className="setting-submit">
                                <input className="submit-button" type="submit" name="Submit" />
                            </div>
                        </div>

                    </div>
                </div>
            );
        }

        return (
            <div class="report-xcx">
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
                        <div>Modify Report</div>
                        <div className="action_change_btn" onClick={()=>{this.setState({editReportActive:true})}}>Edit</div>
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
        );
    }

    showReport = () => {
        this.setState({sideBarToggle: false, createReportActive: false});
    }

    createReport = () => {
        this.setState({sideBarToggle: false, createReportActive: true});
    }

    searchReport = ()=> {
        return (
            <>
                <div style={{marginBottom:10}}>Reports</div>
                <div 
                    onClick={()=>{this.createReport()}}
                    style={{backgroundColor:'#4DA1FF', width:'100%', height:'50px', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'25px', flexDirection:'column', marginBottom:15}}>
                    <div style={{ color:'#fff', fontSize:'small'}}>Add New Report</div>
                    <div style={{ color:'#fff',fontSize:'small'}}>+</div>
                </div>
                <div className="report-list">
                    <div className="report-search-input">
                        <input className="report-search-element" type="text" name="Search" value="Search" style={{color:'#CBCBCB', }}/>
                    </div>

                    <div className="report-search-result-list card_rank" onClick={()=>{this.showReport()}}>
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

            </>
        );
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

    render() {

        
        
        return (
            <div className="report-details">
                {/**Report Side Bar*/}
                
                {this.SideBar()}

                <div className="select-reports">
                    {this.searchReport()}
                </div>

                <div className="reportDetails">
                    <span className="toggle-report-button" onClick={()=>{this.setState({sideBarToggle: true})}}>Toggle Report</span>
                    {this.reportDetails()}
                </div>
                
            </div>
        );
    }
} 


export default FacultyReport;
