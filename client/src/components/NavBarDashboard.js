import React, { Component } from "react";
import "./NavBarBlue.css";
import { Redirect } from "react-router-dom";
import { logout } from "../globalState/actions/authActions";
import parseJwt from "../helpers/decryptAuthToken";

export default class NavBarDashboard extends Component {
  state = {
    headerHeight: 0,
    screenHeight: 0,
    screenWidth: 0,
    dashboard: false,
    homepage: false,
    profile: false,
    electronicJournals: false,
    logout: false,
    type: ""
  };
  render() {
    try {
      const type = parseJwt(localStorage.jwtToken).type;
      this.state.type = type;
    } catch {}
    const opacity = 1 - Math.min(10 / this.state.currentScrollHeight, 1);
    const styles = {
      content: {
        backgroundColor: "rgba(255, 0, 0," + opacity + ")"
      },
      buttonColor: "red",
      SumergiteLabel: {
        color: this.props.sumergiteColor,
        fontSize: "28px",
        marginLeft: "100px",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: "bold",
        marginTop: "11px"
      },
      Header: {
        boxShadow: this.props.boxShadow,
        position: "fixed"
      },
      Dashboard: {
        fontWeight: this.props.dashboard, //either lighter or bold
        fontSize: "13px"
      },
      HomePage: {
        fontWeight: this.props.homepage, //either lighter or bold
        fontSize: "13px",
        marginRight: this.props.HomePageMargin //either 120px or 0px
      },
      Profile: {
        fontWeight: this.props.profile, //either lighter or bold
        fontSize: "13px",
        marginRight: this.props.ProfileMargin //either 120px or 0px
      },
      ElectronicJournals: {
        fontWeight: this.props.electronicJournals,
        fontSize: "13px"
      }
    };
    if (this.state.dashboard) {
      //dashboard
      this.state.dashboard = false;
      this.state.homepage = false;
      this.state.profile = false;
      this.state.electronicJournals = false;
      this.state.hero = false;
      this.state.logout = false;
      let redirectString = "/" + this.state.type.toString() + "Dashboard";
      return <Redirect to={redirectString} />;
    }
    if (this.state.homepage) {
      //homepage
      this.state.dashboard = false;
      this.state.homepage = false;
      this.state.profile = false;
      this.state.electronicJournals = false;
      this.state.hero = false;
      this.state.logout = false;
      return <Redirect to="/" />;
    }
    if (this.state.profile) {
      //profile
      this.state.dashboard = false;
      this.state.homepage = false;
      this.state.profile = false;
      this.state.electronicJournals = false;
      this.state.hero = false;
      this.state.logout = false;
      const type = this.state.type;
      let profileString = "";
      if (type.toString() === "investor") {
        profileString = "/profile";
      }
      if (type.toString() === "reviewer") {
        profileString = "/internalPortal/reviewer/profile";
      }
      if (type.toString() === "lawyer") {
        profileString = "/internalPortal/lawyer/profile";
      }
      if (type.toString() === "admin") {
        profileString = "/internalPortal/admin/profile";
      }
      return <Redirect to={profileString} />;
    }
    if (this.state.electronicJournals) {
      //electronicJournals
      this.state.dashboard = false;
      this.state.homepage = false;
      this.state.profile = false;
      this.state.electronicJournals = false;
      this.state.hero = false;
      this.state.logout = false;
      return <Redirect to="/ElectronicJournals" />;
    }
    if (this.state.hero) {
      this.state.dashboard = false;
      this.state.homepage = false;
      this.state.profile = false;
      this.state.electronicJournals = false;
      this.state.hero = false;
      this.state.logout = false;
      return <Redirect to="/" />;
    }
    if (this.state.logout) {
      logout();
      this.state.dashboard = false;
      this.state.homepage = false;
      this.state.profile = false;
      this.state.electronicJournals = false;
      this.state.hero = false;
      this.state.logout = false;
      window.location.reload();
      return <Redirect to="/" />;
    }
    return (
      //navbar navbar-default navbar-alt
      //navbar navbar-expand-lg navbar-dark bg-dark
      <div className="Header" id="Header" style={styles.Header} ref="Header">
        <nav
          className="navbar navbar-expand-lg navbar-light bg-"
          id="navbarmob"
        >
          {this.props.LeftButton ? (
            <button>
              <i class="left" />
            </button>
          ) : (
            <label />
          )}
          {/* on click handle whatever you want with the back button */}
          <label>
            <button
              style={styles.SumergiteLabel}
              onClick={() => {
                this.setState({ hero: true });
              }}
            >
              Sumergite
            </button>
          </label>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {this.props.DASHBOARD ? (
                <li className="nav-item mr-auto">
                  <button
                    // className="nav-link ml-auto"
                    className="button"
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    onClick={() => {
                      this.setState({ dashboard: true });
                    }}
                    // disableRipple = {true}
                  >
                    <span id="buttonHome" style={styles.Dashboard}>
                      Dashboard
                    </span>
                  </button>
                </li>
              ) : (
                <li className="nav-item mr-auto">
                  <button
                    // className="nav-link ml-auto"
                    className="button"
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    onClick={() => {
                      this.setState({ electronicJournals: true });
                    }}
                    // disableRipple = {true}
                  >
                    <span id="buttonHome" style={styles.ElectronicJournals}>
                      Electronic Journals
                    </span>
                  </button>
                </li>
              )}
              <li className="nav-item mr-auto">
                <button
                  // className="nav-link ml-auto"
                  className="button"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  onClick={() => {
                    this.setState({ homepage: true });
                  }}
                  // disableRipple = {true}
                >
                  <span id="buttonHome" style={styles.HomePage}>
                    Homepage
                  </span>
                </button>
              </li>
              {(this.props.PROFILE && !this.props.admin) ? (
                <li className="nav-item mr-auto">
                  <button
                    // className="nav-link ml-auto"
                    className="button"
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    onClick={() => {
                      this.setState({ profile: true });
                    }}
                    // disableRipple = {true}
                  >
                    <span id="buttonHome" style={styles.Profile}>
                      Profile
                    </span>
                  </button>
                </li>
              ) : (
                <label />
              )}
              <li className="nav-item mr-auto">
                <button
                  // className="nav-link ml-auto"
                  className="button"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  onClick={() => {
                    this.setState({ logout: true });
                  }}
                  // disableRipple = {true}
                >
                  <span id="buttonHome" style={styles.HomePage}>
                    Logout
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
        {/* {
                  this.state.login===true? <Redirect to={{pathname: '/Login'}}/>:
                  this.state.register===true? <Redirect to={{pathname: '/InvestorRegister'}}/>:<label/>
              } */}
      </div>
    );
  }
}
