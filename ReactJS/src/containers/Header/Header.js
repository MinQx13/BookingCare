import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils"
import { FormattedMessage } from "react-intl";
class Header extends Component {
  // tạo sự kiện onClick
  handleChangeLanguage = (language) =>{
    this.props.changelanguageAppRedux(language)
  //
  }
  render() {
    const { processLogout, language,userInfo } = this.props;
    console.log('check userinfo',userInfo);
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        {/* tạo active lang */}
        <div className="Languages">
            {/* dịch welcome trang header */}
            <span className="welcome"><FormattedMessage id="homeheader.welcome" />
            {/* dk để ra đc tên firstname tránh bị lỗi */}
            {userInfo && userInfo.firstName ? userInfo.firstName : ' '}!</span>

            <span className={language === LANGUAGES.VI ?  "Language-VI active " : "Language-VI"} 
            onClick={() => this.handleChangeLanguage (LANGUAGES.VI)}>VN</span>
            <span className={language === LANGUAGES.EN ?  "Language-EN active " : "Language-EN"} 
            onClick={() => this.handleChangeLanguage (LANGUAGES.EN)}>EN</span>
            {/* nút logout */}
            <div className="btn btn-logout" onClick={processLogout} title="log out">
              <i className="fas fa-sign-out-alt"></i>
            </div>
        </div>
      </div>
    );
  }S
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changelanguageAppRedux: (language) => dispatch(actions.changelanguageApp(language))
  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
