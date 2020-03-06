import React, {Component} from 'react';
import './studentreport.css';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';


import NetworkHelper from '../../Helpers/NetworkHelper';


class StudentReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false,
            createReportActive:false,
            percentageClaim:30,
            editReportActive:false,
            activeProjectId:'',
            reportSearchInput:'',
            activeProjectDetails:'',
            activeProjectPosition:'',
            newReportTitle:'',
            newReportDescription:'',
            newReportAttachment:'',
            newReportClaim:0,
            edit_report_attachment:''
        };
    }

    componentDidMount(){
        this.submitSearch();
    }
    
    submitEditReport =()=>{
        // let file;
        // const url = 'http://example.com/file-upload';
        // const formData = new FormData();
        // formData.append('file',file);
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }
        // post(url, formData,config)
        // .then((response)=>{
        //     console.log(response.data)
        // }
    }

    editReport = ()=>{
        let activeProjectDetails = this.state.activeProjectDetails;
        let xxx;
        if(!activeProjectDetails){
            xxx = <>Problem while loading the report...plz try again</>;
        } else {
            if(!this.state.edit_report_title){
                this.setState({
                    edit_report_title:activeProjectDetails.report_title, 
                    edit_report_description:activeProjectDetails.report_description, 
                    edit_report_attachment:activeProjectDetails.report_attachment,
                    edit_report_status_claim: activeProjectDetails.report_status_claim,
                    percentageClaim:parseInt(activeProjectDetails.report_status_claim)
                })
            }
            xxx = <>
                <div className="field-input-text-area-element">
                    <div className="input-field-lable">
                        <span className="input-field-lable-text" >Report title</span>
                    </div>
                    <div className="field-input">
                        <input 
                            className="field-input-element" type="text"
                            onChange={(event)=>{this.setState({edit_report_title: event.target.value})}}
                            value={this.state.edit_report_title} style={{color:'#CBCBCB'}}/>
                    </div>
                    <div className="field-error">
                        <span className="error-message-text">Invalid First Name</span>
                    </div>
                </div>

                <div className="field-input-text-area-element">
                    <div className="input-field-lable">
                        <span className="input-field-lable-text" >Description</span>
                    </div>
                    <div className="field-input-textarea" style={{overflow:'hidden'}}>
                        <textarea 
                            className="field-input-text-area-element" type="text"
                            onChange={(event)=>{this.setState({edit_report_description: event.target.value})}}
                            value={this.state.edit_report_description}
                            style={{color:'#CBCBCB'}}/>
                    </div>
                    <div className="field-error">
                        <span className="error-message-text">Invalid First Name</span>
                    </div>
                </div>

                <div className="field-input-text-area-element">
                    <div className="input-field-lable">
                        <span className="input-field-lable-text" >Attachments</span>
                    </div>
                    <div className="field-input">
                        <input
                            className="field-input-element" type="file"
                            onChange={(event)=>{this.setState({edit_report_attachment: event.target.files[0]})}}
                            style={{color:'#CBCBCB'}}/>
                    </div>
                    <div className="field-error">
                        <span className="error-message-text">Invalid File Type</span>
                    </div>
                </div>

                <div className="field-input-text-area-element">
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


                <div className="field-input-text-area-element">
                    <div className="setting-submit">
                        <input className="submit-button" type="submit" name="Submit" />
                    </div>
                </div>
            </>
        }
        return (
            <>
                <div className="create-report-setting-fields">
                    <div style={{marginTop:40, marginiBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                        <span>Edit Report</span>
                        <span onClick={()=>{
                            this.setState({
                                editReportActive:false,
                                edit_report_title:'',
                                edit_report_description:'', 
                                edit_report_attachment:'',
                                edit_report_status_claim: '',
                                percentageClaim:0
                            })
                        }}>Cancel</span>
                    </div>

                    {xxx}

                </div>
            </>
        );
    }

    validateNewReport = ()=>{
        return true;

        
    }

    submitNewReport = ()=>{

        if(!this.validateNewReport()){
            return ;
        }

        var networkHelper = new NetworkHelper();

        networkHelper.setFormData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setFormData('report_title', this.state.newReportTitle);
        networkHelper.setFormData('report_description', this.state.newReportDescription);
        networkHelper.setFormData('report_status_claim', this.state.newReportClaim);
        networkHelper.setFormData('project_id', this.state.activeProjectId);
        networkHelper.setFormData('report_attachments', this.state.newReportAttachment);
        networkHelper.setApiPath('leaderCreateReport');

        networkHelper.executeFilePost((response) => {
            if (response.status === 200){
                alert("report successfully created");
                this.setState({createReportActive:false});
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

    reportDetails = ()=> {

        if(this.state.editReportActive){
            return this.editReport();
        }

        if(this.state.createReportActive){
            return (
                <div className="createReport">
                    <div className="create-report-setting-fields">

                         <div style={{marginTop:40, marginiBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                            <span>Create New Report</span>
                            <span onClick={()=>{this.setState({createReportActive:false})}}>Cancel</span>
                        </div>

                        <div className="input-field">
                            <div className="input-field-lable">
                                <span className="input-field-lable-text" >Report title</span>
                            </div>
                            <div className="field-input">
                                <input 
                                    onChange={(e)=>{this.setState({newReportTitle:e.target.value})}}
                                    className="field-input-element" type="text" name="Search" 
                                    value={this.state.newReportTitle} style={{color:'#CBCBCB', }}/>
                            </div>
                            <div className="field-error">
                                <span className="error-message-text">Invalid First Name</span>
                            </div>
                        </div>

                        <div className="field-input-text-area-element">
                            <div className="input-field-lable">
                                <span className="input-field-lable-text" >Description</span>
                            </div>
                            <div className="field-input-textarea" style={{overflow:'hidden'}}>
                                <textarea
                                    onChange={(e)=>{this.setState({newReportDescription :e.target.value})}}
                                    className="field-input-text-area-element" type="text" name="Search" 
                                    value={this.state.newReportDescription} style={{color:'#CBCBCB', }}/>
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
                                <input 
                                    className="field-input-element" type="file"
                                    style={{color:'#CBCBCB'}}
                                    onChange={(e)=>{this.setState({newReportAttachment:e.target.files[0]})}}
                                />
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
                                        value={this.state.newReportClaim}
                                        onChange={value => this.setState({ newReportClaim: value })}
                                    />
                                </div>
                            </div>
                            <div className="field-error">
                                <span className="error-message-text">Invalid Percentage Name</span>
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="setting-submit">
                                <input className="submit-button" type="submit" name="Submit" onClick={()=>{this.submitNewReport()}}/>
                            </div>
                        </div>

                    </div>
                </div>
            );
        }

        if(!this.state.activeProjectDetails) return<>
           <div style={{marginTop:30, color:'grey', fontSize:'11px'}}>No Report Selected</div>
        </>;
        let activeProjectDetails = this.state.activeProjectDetails;
        return (
            <div className="report-xcx">
                <div className="report-head">
                    <table>
                        <tbody>
                            <tr className="report_title">
                                <td className="report_title_key">Title</td>
                                <td className="report_title_value">{activeProjectDetails.report_title || 'N.A'}</td>
                            </tr>
                            <tr className="report_date">
                                <td className="report_title_key">Date</td>
                                <td className="report_title_value">{activeProjectDetails.report_creation_date || "N.A"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                 
                <div className="card_rank mt20">
                    <div className="card_inner_rank">
                        <span>Description</span>
                    </div>
                    <div className="description-content">{activeProjectDetails.report_description || 'N.A'}</div>
                </div>

                <div className="card_rank mt20">
                    <div className="card_inner_rank">
                        <span>Attachment</span>
                    </div>
                    <div className="description-content">
                            <a target="_blank" rel="noopener noreferrer" style={{display: "table-cell"}} href={"http://zapy.tech/projects/bepms-ci/uploads/reports/"+(activeProjectDetails.report_attachment || 'N.A')}>
                                {activeProjectDetails.report_attachment || 'N.A'}
                            </a>
                    </div>
                </div>

                {(this.state.activeProjectPosition !== 'leader') ? <></> : <div className="card_rank mt20">
                    <div className="card_inner_rank report-action">
                        <div>Modify Report</div>
                        <div className="action_change_btn" onClick={()=>{this.setState({editReportActive:true})}}>Edit</div>
                    </div>
                </div>}

                <div className="card_rank mt20">
                    <table className="report-status-table">
                        <tbody>
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
                        </tbody>
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

    submitSearch = () => {
        var networkHelper = new NetworkHelper();

        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('project_id', this.props.project_id);
        networkHelper.setData('search_input', this.state.reportSearchInput);
        networkHelper.setApiPath('studentProjectReportListBySearchInput');

        networkHelper.execute((response) => {
            if (response.status === 200){
                let data = response.data.data;
                if(data === []){
                    this.setState({showLoading:false, fetchedReportList: data});
                } else {
                    try{
                        let data0 = data[0];
                        this.setState({showLoading:false, fetchedReportList: data, activeReportId: data0.report_id});
                        this.getReportDetailsByReportID(data0.report_id);
                    } catch {
                        
                    }
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

    

    getReportDetailsByReportID = (report_id) => {
        
        var networkHelper = new NetworkHelper();

        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('report_id', report_id);
        networkHelper.setApiPath('studentProjectReportDetailsByReportID');

        networkHelper.execute((response) => {
            if (response.status === 200){
                let data = response.data.data;
                if(data === []){
                    this.setState({showLoading:false, activeProjectDetails: data});
                } else {
                    try{
                        let data0 = data[0];
                        this.setState({showLoading:false, activeProjectDetails: data0, activeReportId: report_id});
                    } catch {
                        alert('seems like the report was not found!');
                    }
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

    renderReportList = (fetchedReportList = []) => {
        if(!Array.isArray(fetchedReportList) || fetchedReportList.length < 1){
            return <>
                <div style={{marginTop:10, color:'grey', fontSize:'11px'}}>
                    No Reports To Display, {(this.state.activeProjectPosition === 'leader') ? <>Create new report to be displayed</>:<>. Your Leader has not created any reports yet.</>}
                </div></>;
        }

        let render = fetchedReportList.map((element, key)=>{
            let gs = element.report_status_guide;
            let ps = element.report_status_pc;
            let hs = element.report_status_hod;
            let style;
            if(gs === "disapprove" || ps === "disapprove" || hs === "disapprove"){
                style={width:5, backgroundColor:'#FC577A', height:'auto'};
            } else if (gs === "modify" || ps === "modify" || hs === "modify") {
                style={width:5, backgroundColor:'#FFD012', height:'auto'};
            } else {
                style={width:5, backgroundColor:'#4DA1FF', height:'auto'};
            }
            return (<>
                <div key={'rsrl_cr'+key} className="report-search-result-list card_rank" onClick={()=>{
                        this.getReportDetailsByReportID(element.report_id);
                        this.setState({sideBarToggle:false,editReportActive:false, createReportActive:false})
                    }}>
                    <div key={'rsrl2_cr'+key} style={style} />
                    <div key={'rsrl_rd'+key} className="report-description">
                        <div key={'rsrl_rrt'+key} className="report-result-title">
                            <span key={'rsrl_rrtt'+key} className="report-result-title-text">{element.report_title}</span>
                        </div>
                        <div>
                            <span key={'rsrl_rrdt'+key} className="report-result-date-text">{element.report_creation_date}</span>
                        </div>
                    </div>
                </div>
            </>);
        });

        return render;
        
    }

    searchReport = ()=> {
        if(this.props.project_id !== this.state.activeProjectId){
            let project_id = this.props.project_id;
            let project_position_name = this.props.project_position_name;
            this.setState({activeProjectId:project_id, activeProjectPosition:project_position_name});
        }
        return (
            <>
                <div style={{marginBottom:10}}>Reports</div>

                {(this.state.activeProjectPosition !== 'leader') ? <></> :<div 
                    onClick={()=>{this.createReport()}}
                    style={{backgroundColor:'#4DA1FF', width:'100%', height:'50px', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'25px', flexDirection:'column', marginBottom:15}}>
                    <div style={{ color:'#fff', fontSize:'small'}}>Add New Report</div>
                    <div style={{ color:'#fff',fontSize:'small'}}>+</div>
                </div>}
                
                <div className="report-list">
                    <div className="report-search-input">
                        <input 
                            className="report-search-element" type="text" 
                            value={this.state.reportSearchInput} 
                            style={{color:'#CBCBCB', }}
                            onChange={(event)=>{this.setState({reportSearchInput:event.target.value})}}
                            onKeyDown = {(event)=>{if(event.key === 'Enter'){this.submitSearch()}}}
                            placeholder="Search"
                        />
                    </div>

                    {this.renderReportList(this.state.fetchedReportList)}

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


export default StudentReport;
