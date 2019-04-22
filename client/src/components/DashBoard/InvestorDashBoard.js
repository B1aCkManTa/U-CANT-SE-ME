import React, { Component } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav";
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MyCompanies from "../GetMyCompanies/MyCompanies";
import CaseSwitch from "../caseComponents/CaseSwitch";
import InvestorFillForm from "../InvestorFillForm/InvestorFillForm";
// import "./DashBoard.css"
export default class InvestorDashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dashboardwidth:0
        }
      }
    async componentDidMount(){
      const width = document.getElementById("dashboard").clientWidth
      await this.setState({dashboardwidth:width});
    }
    handleSelect = selected => {
    console.log(selected);
    
    document.getElementById("MyCompanies").style.display="none";
    document.getElementById("FillForm").style.display="none";
    document.getElementById("AskLawyer").style.display="none";
    document.getElementById("AllCompanies").style.display="none";
    document.getElementById("AwaitingPayment").style.display="none";
    document.getElementById("NeedUpdate").style.display="none";
    document.getElementById("Pending").style.display="none";

    if(selected === "viewmycompanies")
        document.getElementById("MyCompanies").style.display="flex";

    if (selected === "createnewcompany/fillform")
        document.getElementById("FillForm").style.display="flex";

    if (selected === "createnewcompany/lawyer")
        document.getElementById("AskLawyer").style.display="flex";

    if (selected === "viewongoingcompanyrequests/all")
        document.getElementById("AllCompanies").style.display="flex";

    if (selected === "viewongoingcompanyrequests/awaitingpayment")
        document.getElementById("AwaitingPayment").style.display="flex";

    if (selected === "viewongoingcompanyrequests/fillform")
        document.getElementById("NeedUpdate").style.display="flex";

    if (selected === "viewongoingcompanyrequests/pending")
        document.getElementById("Pending").style.display="flex";


  };
  render() {
    const styles = {
      iconStyle: {
        fontSize: "1.75em"
      },
      navStyle: {
        background: "#3480E3",
        zindex:"0"
      },
      divStyleShow:{
        display: ' inline',
        marginLeft:this.state.dashboardwidth,
        background:"red",
        // display: 'flex', 
        justifyContent: 'center'
      },
      divStyleHide:{
        display: 'none',
        textAlign: "center",
        marginLeft:this.state.dashboardwidth,
        // background:"red",
        justifyContent: 'center'
      }
    };
    //font-style:SF Pro Display
    return (
      <Router>
        <SideNav id="dashboard" onSelect={this.handleSelect} style={styles.navStyle}>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="viewmycompanies">
            
            <NavItem eventKey="viewmycompanies">
              <NavIcon>
                <i className="fa fa-home" style={styles.iconStyle} />
              </NavIcon>
              <NavText>My Companies</NavText>
            </NavItem>
            
            <NavItem eventKey="createnewcompany">
              <NavIcon>
                <i className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>Create Your Company</NavText>
              <NavItem eventKey="createnewcompany/fillform">
                <NavText>Fill The Form</NavText>
              </NavItem>
              <NavItem eventKey="createnewcompany/lawyer">
                <NavText>Ask A Lawyer</NavText>
              </NavItem>
            </NavItem>

            <NavItem eventKey="viewongoingcompanyrequests">
              <NavIcon>
                <i className="fa fa-list-alt" style={styles.iconStyle} />
              </NavIcon>
              <NavText>View Ongoing Requests</NavText>
              <NavItem eventKey="viewongoingcompanyrequests/all">
                <NavText>All Companies</NavText>
              </NavItem>
              <NavItem eventKey="viewongoingcompanyrequests/awaitingpayment">
                <NavText>Awaiting Payment</NavText>
              </NavItem>
              <NavItem eventKey="viewongoingcompanyrequests/needupdate">
                <NavText>Need Update</NavText>
              </NavItem>
              <NavItem eventKey="viewongoingcompanyrequests/pending">
                <NavText>Pending</NavText>
              </NavItem>
            </NavItem>

          </SideNav.Nav>
        </SideNav>
        <div id="MyCompanies" style={styles.divStyleShow} >
          <MyCompanies/>
        </div>
        <div id="FillForm" style={styles.divStyleHide} >
          <InvestorFillForm/>
        </div>
        <div id="AskLawyer" style={styles.divStyleHide} >
        </div>
        <div id="AllCompanies" style={styles.divStyleHide} >
        </div>
        <div id="AwaitingPayment" style={styles.divStyleHide} >
        </div>
        <div id="NeedUpdate" style={styles.divStyleHide} >
        </div>
        <div id="Pending" style={styles.divStyleHide} >
        </div>
      </Router>
    );
  }
}
