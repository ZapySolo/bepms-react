import React, {Component} from 'react';
import './facultyreport.css';

import Expand from 'react-expand-animated';

import SearchIcon from '../../search.svg';

import NetworkHelper from '../../Helpers/NetworkHelper';

class FacultyReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false,
            descriptionToggle:true,
            attachmentToggle:false,
            reasonToggle:false,
            reportSearchInput:'',//search input
            fetchedReportList:[],//list of the searched report
            activeReportDetails:'',
            activeReportId:'',//to fetch the selected report details
            activeFacultyReportAction:'',//this helps to toggle the 'approve' 'disapprove' 'modify' action
            disapproveReason:'',//for submitting the disapprove action
            modifyReason:'',//use for sumitting modify reason
        };
    }

    componentDidMount(){
        this.searchReportResult();
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

    searchReportResult = () => {
        var networkHelper = new NetworkHelper();

        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('project_position_name', this.props.system_position);
        networkHelper.setData('system_id', this.props.system_id);
        networkHelper.setData('search_input', this.state.reportSearchInput);
        networkHelper.setApiPath('facultyReportSearchListsByPositionInSystem');

        networkHelper.execute((response) => {
            if (response.status === 200){
                let data = response.data.data;
                this.setState({showLoading:false, fetchedReportList: data});
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

    renderSearchReportResult = (fetchedReportList = []) => {

        if(fetchedReportList.length < 1) return <>no reports...</>;

        let render = fetchedReportList.map((element, key)=>{
            let style = {};
            if(element.user_report_status === 'pending'){style={width:5, backgroundColor:'#4DA1FF', height:'auto'}}
            else if (element.user_report_status === 'disapprove'){style={width:5, backgroundColor:'#FC577A', height:'auto'}}
            else if (element.user_report_status === 'modify'){style={width:5, backgroundColor:'#FFD012', height:'auto'}}
            else if (element.user_report_status === 'approved'){style={width:5, backgroundColor:'#97C66B', height:'auto'}}
            return <>
                <div className="report-search-result-list card_rank" 
                    onClick={()=>{
                        if(this.state.activeReportId !== element.report_id){
                            this.setState({activeReportId:element.report_id, sideBarToggle:false});
                            setTimeout(()=>{
                                this.fetchedReportDetails();
                            },100);
                        }
                    }}>
                    <div style={style} />
                    <div className="report-description">
                        <div className="report-result-title">
                            <span className="report-result-title-text-f">{element.report_title}</span>
                        </div>
                        <div>
                            <span className="report-result-date-text-f">{customTimeString(element.report_creation_date)}</span>
                        </div>
                    </div>
                </div>
            </>;
        });

        return render;
    }

    searchReport = () => {
        return (
            <>
                <div style={{marginBottom:10}} className="f-reports-main-text">Reports</div>
                <div className="report-list" style={{backgroundColor:''}}>
                    <div className="report-search-input-f">
                        <img src={SearchIcon} alt="s" style={{marginRight:'10px'}} />
                        <input 
                            onKeyDown = {(event)=>{if(event.key === 'Enter'){this.searchReportResult()}}}
                            onChange={(e)=>{this.setState({reportSearchInput:e.target.value})}}
                            className="report-search-element-f" type="text"
                            placeholder="Search" value={this.state.reportSearchInput} style={{color:'#CBCBCB', }}/>
                    </div>
                    <div style={{width:'100%', height:'100%', overflow:'scroll', backgroundColor:''}}>
                        {this.renderSearchReportResult(this.state.fetchedReportList)}
                    </div>
                </div>
            </>
        );
    }

    fetchedReportDetails= () => {
        console.log('retriving the details');
        let report_id = this.state.activeReportId;
        if(!report_id && report_id !== 0) return ;

        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('system_id', this.props.system_id);
        networkHelper.setData('project_position_name', this.props.system_position);
        networkHelper.setData('report_id', report_id);
        networkHelper.setApiPath('searchedReportDetails');

        networkHelper.execute((response) => {
            if (response.status === 200){
                let data = response.data.data;
                try {
                    this.setState({showLoading:false, activeReportDetails: data[0]});
                } catch {
                    console.log('no data found!');
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

    onPressApprove = () => {
        this.setState({activeFacultyReportAction: 'approve',reasonToggle:false});

        let report_id = this.state.activeReportId;
        if(!report_id && report_id !== 0) return ;

        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('system_id', this.props.system_id);
        networkHelper.setData('project_position_name', this.props.system_position);
        networkHelper.setData('report_id', report_id);
        networkHelper.setApiPath('facultyApproveReport');

        networkHelper.execute((response) => {
            if (response.status === 200){
                //if we fetch the current report data here them it will re-render the entire report again
                this.fetchedReportDetails();
                alert('report has been approved');
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
    onPressDisapprove = () => {
        if(this.state.reasonToggle){
            if(this.state.activeFacultyReportAction === 'disapprove'){
                this.setState({reasonToggle:false});
            } else {
                this.setState({activeFacultyReportAction: 'disapprove',reasonToggle:false});
                setTimeout(()=>{
                    this.setState({reasonToggle:true});
                },500);
            }
        } else {
            this.setState({activeFacultyReportAction: 'disapprove',reasonToggle:true});
        }
    }
    submitDisapproveAction = () => {

        let report_id = this.state.activeReportId;
        if(!report_id && report_id !== 0) return ;

        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('system_id', this.props.system_id);
        networkHelper.setData('project_position_name', this.props.system_position);
        networkHelper.setData('report_id', report_id);
        networkHelper.setData('report_disapproved_reason', this.state.disapproveReason);
        networkHelper.setApiPath('facultyDisapproveReport');

        networkHelper.execute((response) => {
            if (response.status === 200){
                //if we fetch the current report data here them it will re-render the entire report again
                this.fetchedReportDetails();
                alert('report has been disapproved');
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
    onPressModify = () => {
        if(this.state.reasonToggle){
            if(this.state.activeFacultyReportAction === 'modify'){
                this.setState({reasonToggle:false});
            } else {
                this.setState({activeFacultyReportAction: 'modify',reasonToggle:false});
                setTimeout(()=>{
                    this.setState({reasonToggle:true});
                },500);
            }
        } else {
            this.setState({activeFacultyReportAction: 'modify', reasonToggle:true});
        }
    }
    submitModifyAction = () => {
        let report_id = this.state.activeReportId;
        if(!report_id && report_id !== 0) return ;

        var networkHelper = new NetworkHelper();
        networkHelper.setData('Authorization', sessionStorage.getItem('token'));
        networkHelper.setData('system_id', this.props.system_id);
        networkHelper.setData('project_position_name', this.props.system_position);
        networkHelper.setData('report_id', report_id);
        networkHelper.setData('report_change_assign', this.state.modifyReason);
        console.log('1-'+this.props.system_id+'-2'+this.props.system_position+'-3-'+report_id+'-4-'+this.state.modifyReason);
        networkHelper.setApiPath('facultyAssignChangesReport');

        networkHelper.execute((response) => {
            if (response.status === 200){
                this.fetchedReportDetails();
                alert('report has been assigned for modifications');
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

    renderActionResaonBox = () => {
        if(this.state.activeFacultyReportAction === 'disapprove'){
            return <>
                <div className="description-content-f">
                    <span className="report-content-deader-f">Disapprove Reason(mandatory)</span>
                    <div className="action-input-element mt10">
                        <input 
                            onKeyDown = {(event)=>{if(event.key === 'Enter'){this.submitDisapproveAction()}}}
                            className="reason_input" type="text" 
                            name="reason" value={this.state.disapproveReason} style={{color:'#CBCBCB'}}
                            onChange={(event)=>{this.setState({disapproveReason:event.target.value})}}
                        />
                        <span 
                            onClick={()=>{this.submitDisapproveAction()}}
                            className="action_disapprove_btn bg_primary">Submit</span>
                    </div>
                </div>
            </>;
        } else if (this.state.activeFacultyReportAction === 'modify'){
            return <>
                <div className="description-content-f">
                    <span className="report-content-deader-f">Disapprove Reason(mandatory)</span>
                    <div className="action-input-element mt10">
                        <input 
                            onKeyDown = {(event)=>{if(event.key === 'Enter'){this.submitModifyAction()}}}
                            className="reason_input" type="text" 
                            name="reason" value={this.state.modifyReason} style={{color:'#CBCBCB'}}
                            onChange={(event)=>{this.setState({modifyReason:event.target.value})}}
                        />
                        <span 
                            onClick={()=>{this.submitModifyAction()}}
                            className="action_disapprove_btn bg_primary">Submit</span>
                    </div>
                </div>
            </>;
        }
    }


    //this.state.activeReport
    displayReportDetail = (activeReport) => {
        if(!this.state.activeReportId) return <>No Report Selected</>;
        if(!activeReport) return <>not data retrived!!</>;

        return <>
            <div className="report-head">
                <table>
                    <tbody>
                        <tr className="report_title">
                            <td className="report_title_key">Title</td>
                            <td className="report_title_value">{activeReport.report_title}</td>
                        </tr>
                        <tr className="report_date">
                            <td className="report_title_key">Date</td>
                            <td className="report_title_value">{activeReport.report_creation_date}</td>
                        </tr>
                    </tbody>
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
                            {activeReport.report_description}
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
                        <a href={activeReport.report_attachment}>
                            {activeReport.report_attachment}
                        </a>
                    </div>
                </Expand>
            </div>

            {(activeReport['report_status_'+this.props.system_position] === 'pending')
            ? <>
                <div className="card_rank mt20">
                    <div className="card_inner_rank report-action">
                        <div
                            className="action_approve_btn"
                            onClick={()=>{ this.onPressApprove()}}
                        >Approve</div>
                        {(this.props.system_position === 'guide')
                            ? <div
                                className="action_change_btn"
                                onClick={()=>{ this.onPressModify()}}
                            >Assign Changes</div>
                            :<></>}
                        <div
                            className="action_disapprove_btn"
                            onClick={()=>{ this.onPressDisapprove()}}
                        >Disapprove</div>
                    </div>
                    <Expand
                        open={this.state.reasonToggle}
                        duration={500}
                        transitions={["height", "opacity", "background"]}
                    >
                    {this.renderActionResaonBox()}
                    </Expand>
                </div>
            </>
            : <></> 
            }

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
                            <td className="table-status-text">{activeReport.report_status_guide}</td>
                            <td className="table-status-text">{activeReport.report_status_pc}</td>
                            <td className="table-status-text">{activeReport.report_status_hod}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>;
    }

    render() {

        //console.log('sytem_id='+this.props.system_id+' position='+this.props.system_position);

        return (
            <div style={{display:'flex', flexDirection:'row', height:'100%'}}>
                
                <div className="desktop-faculty-report-search" style={{overflow:'scroll'}}>
                    {this.searchReport()}
                </div>

                <div className="report-details-f">
    
                    {this.SideBar()}

                    <div className="toggle_select_report" style={{marginBottom:20}}>
                        <span className="toggle-button" onClick={()=>{this.setState({sideBarToggle: true})}}>Toggle Report</span>
                    </div>

                    {this.displayReportDetail(this.state.activeReportDetails)}

                </div>
            </div>
        );
    }
}

function customTimeString(time_in_string){
    let timestampNow = Date.now();
    let time = Date.parse(time_in_string); //in sec
    time = (timestampNow - time)/1000;
    if(time < 600){
        return 'now';
    } else if (time < 3600){
        return Math.floor(time / 60)+' min ago'; //sec to min
    } else if (time < 86400){
        return Math.floor(time / 3600)+' hour ago'; //sec to hour
    } else if (time < 1036800){
        return Math.floor(time / 86400)+' days ago'; //sec to day
    } else {
        let x = new Date (time * 1000);
        return x.getDate() + '/' + (x.getMonth()+1) + '/' + x.getFullYear();
    }
}

export default FacultyReport;
