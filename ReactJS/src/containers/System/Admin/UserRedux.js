import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import { selectFilter } from "react-bootstrap-table2-filter";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      role: [],
      previewImgURL: '',
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position:"",
      role: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // this.props.dispatch(action.getGenderStart())
    // try{
    //         let res = await getAllCodeServiece('gender');
    //         if(res && res.errCode === 0 ){
    //             this.setState({
    //                 genderArr: res.data
    //             })
    //         }
    //         console.log('thudb check res: ', res)
    // }catch(e){
    //     console.log(e)
    // }
  }
  // update gender trong compe lk voi redux
  componentDidUpdate(prevProps, prevState, snapshot) {
    //render => diupdate
    //hiện tại (this) và quá khứ (previous)
    //[] [3] phần tử
    // [3] [3]
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders =  this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles =  this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions =  this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
      });
    }
  }

  handleonChangeImage = ( event ) =>{
    let data = event.target.files;
    let file = data[0];
    if(file){
      let objectUrl = URL.createObjectURL(file)
      this.setState({
        previewImgURL: objectUrl,
        avatar: file
      })
    }
  }

  openPreviewImage = () =>{
    this.setState({
      isOpen:true
    })
  }
  handleSaveUser = () => {
      let isValid = this.checkValidInput()
      if(isValid === false) return;



      //fire redux action
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address:this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
      })
  }
  
  checkValidInput = () => {
    let isValid = true;
    let arrCheck = ['email', 'password', 'firstName','lastName', 'phoneNumber', 'address']
    for( let i = 0; i < arrCheck.length; i++){
      if(!this.state[arrCheck[i]]){
        isValid = false;
        alert('this input is required: ' + arrCheck[i])
        break;
      }
    }
    return isValid;
  }

  onChangeInput = (event, id) =>{
    let copyState = { ...this.state}
    copyState[id] = event.target.value;

    this.setState({
      ...copyState
    })
  }
  //router quản lý user redux
  render() {
    let language = this.props.language;
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let isLoadingGender = this.props.isLoadingGender;

    let {email, password, firstName, lastName, 
      phoneNumber, address, gender, position, 
      role, avatar } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">Minh đẹp trai có nhiều em ghệ đích bự</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <FormattedMessage id="manage-user.add" />{" "}
              </div>
              <div className="col-12">
                {isLoadingGender === true ? "Loading gender" : ""}{" "}
              </div>
              <form class="row g-3">
                <div class="col-3">
                  <label for="inputEmail4" class="form-label">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input type="email" class="form-control" id="inputEmail4" 
                    value={email}
                    onChange={(event) => {this.onChangeInput(event,'email')}}
                  />
                </div>

                <div class="col-3">
                  <label for="inputPassword4" class="form-label">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password" class="form-control" id="inputPassword4"
                    value={password}
                    onChange={(event) => {this.onChangeInput(event,'password')}}/>
                </div>

                <div class="col-3">
                  <label for="inputfirstName" class="form-label">
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input type="text" class="form-control" id="inputfirstName" 
                    value={firstName}
                    onChange={(event) => {this.onChangeInput(event,'firstName')}}/>
                </div>

                <div class="col-3">
                  <label for="inputlastName" class="form-label">
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input type="text" class="form-control" id="inputlastName" 
                   value={lastName}
                   onChange={(event) => {this.onChangeInput(event,'lastName')}}
                  />
                </div>

                <div class="col-3">
                  <label for="inputphoneNumber" class="form-label">
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input type="text" class="form-control" id="inputphoneNumber"
                      value={phoneNumber}
                      onChange={(event) => {this.onChangeInput(event,'phoneNumber')}}
                  />
                </div>

                <div class="col-9">
                  <label for="inputAddress" class="form-label">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input type="text" class="form-control" id="inputAddress" 
                    value={address}
                    onChange={(event) => {this.onChangeInput(event,'address')}}
                  />
                </div>

                <div class="col-3">
                  <label for="inputGender" class="form-label">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select id="inputGender" class="form-select" onChange={(event) => {this.onChangeInput(event,'gender')}}>
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div class="col-3">
                  <label for="inputPosition" class="form-label">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select id="inputPosition" class="form-select" onChange={(event) => {this.onChangeInput(event,'position')}}>
                  {positions && positions.length > 0 && positions.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div class="col-3">
                  <label for="inputRoleID" class="form-label" >
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select id="inputRoleID" class="form-select" onChange={(event) => {this.onChangeInput(event,'role')}}>
                    {roles && roles.length > 0 && roles.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div class="col-3">
                  <label for="inputImage" class="form-label">
                    <FormattedMessage id="manage-user.image" />
                    <div className="preview-img-container">
                    <input id="previewImg" type="file" hidden
                    onChange={(event) => this.handleonChangeImage(event)}
                    />           
                    <label className="label-upload" htmlFor="previewImg">Tải Ảnh <i class="fas fa-upload"></i></label>
                    <div className="preview-image"
                    style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                    onClick={() => this.openPreviewImage()}
                    >
                    </div>
                    </div>
                  </label>
                </div>

                <div class="col-12">
                  <button type="submit" class="btn btn-primary"
                  onClick={() => this.handleSaveUser()}
                  > <FormattedMessage id="manage-user.save" />
                  </button>
                </div>
                <div className="col-12">
                <TableManageUser />
                </div>
              </form>
            </div>
          </div>
         
        
        </div>
        {this.state.isOpen === true &&
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),

    getPositionStart: () => dispatch(actions.fetchPositionStart()),

    getRoleStart: () => dispatch(actions.fetchRoleStart()),

    createNewUser: (data) => dispatch(actions.createNewUser(data))
    // processLogout: () => dispatch(actions.processLogout()),
    // changelanguageAppRedux: (language) => dispatch(actions.changelanguageApp(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
