import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';

import classes from './Header.css';

import Logo from '../../components/UI/Logo/Logo';
import MyButton from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Toolbar extends Component{
    state = {
        show: false,
        showLoginModal: false,
        name: '',
        email: '',
        text: '',
        anchorEl: null,
        login: '',
        password: '',
    };

    nameHandleChange = name => event => {
        this.setState({ [name]: event.target.value});
    };

    emailHandleChange = email => event => {
        this.setState({ [email]: event.target.value});
    };

    textHandleChange = text => event => {
        this.setState({ [text]: event.target.value});
    };

    loginHandleChange = login => event => {
      this.setState({ [login]: event.target.value});
    };

    passwordHandleChange = password => event => {
      this.setState({ [password]: event.target.value});
    };

    showModal = ()=>{
        this.setState({show: true});
    };

    closeModal = ()=>{
        this.setState({show: false});
    };

    showLoginModal = ()=>{
      this.setState({showLoginModal: true});
    };

    closeLoginModal = ()=>{
      this.setState({showLoginModal: false});
    };

    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAddData(this.state.name, this.state.email, this.state.text);
        this.closeModal();
        this.props.onInitData();
    }

    submitLogInHandler = (event)=>{
      event.preventDefault();
      this.props.onAuthData(this.state.login, this.state.password);
      this.closeLoginModal();
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    render(){
        const { anchorEl } = this.state;
        return(
            <header className={classes.Header}>
                <Modal show={this.state.show} modalClosed={this.closeModal}>
                    <form className={classes.Modal} noValidate autoComplete="off" onSubmit={this.submitHandler}>
                        <TextField
                            id="standard-name"
                            label="Name"
                            value={this.state.name}
                            onChange={this.nameHandleChange('name')}
                            margin="normal"
                        />
                        <TextField
                            id="standard-name2"
                            label="Email"
                            value={this.state.email}
                            onChange={this.emailHandleChange('email')}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-static"
                            label="Your Task"
                            multiline
                            rows="4"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.text}
                            onChange={this.textHandleChange('text')}
                        />
                        <MyButton click={this.submitHandler}>Add task</MyButton>
                    </form>
                </Modal>
                <Logo/>
                <div className={classes.ButtonBlock}>
                  <MyButton click={this.showModal}>Add task</MyButton>
                  {this.props.isAuth? <MyButton click={this.props.onLogout}>
                      Logout
                    </MyButton> :
                    <MyButton click={this.showLoginModal}>
                      Login
                    </MyButton>
                  }
                  <Modal show={this.state.showLoginModal} modalClosed={this.closeLoginModal}>
                    <form className={classes.Modal} noValidate autoComplete="off" onSubmit={this.submitLogInHandler}>
                      <TextField
                          id="standard-login"
                          label="Login"
                          value={this.state.login}
                          onChange={this.loginHandleChange('login')}
                          margin="normal"
                      />
                      <TextField
                          id="standard-password-input"
                          label="Password"
                          type="password"
                          value={this.state.password}
                          onChange={this.passwordHandleChange('password')}
                          margin="normal"
                      />
                      <MyButton click={this.submitLogInHandler}>LOG IN</MyButton>
                    </form>
                  </Modal>
                  <Button
                      aria-owns={anchorEl ? 'simple-menu' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                      >
                      Sort tasks by {this.props.sort}
                  </Button>
                  <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleClose}
                  >
                      <MenuItem onClick={()=>{
                              this.handleClose()
                              return this.props.onInitData('id')
                      }}>ID</MenuItem>
                      <MenuItem onClick={()=>{
                              this.handleClose()
                              return this.props.onInitData('username')
                      }}>USERNAME</MenuItem>
                      <MenuItem onClick={()=>{
                              this.handleClose()
                              return this.props.onInitData('email')
                      }}>E-MAIL</MenuItem>
                      <MenuItem onClick={()=>{
                              this.handleClose()
                              return this.props.onInitData('status')
                      }}>STATUS</MenuItem>
                    </Menu>
                </div>
            </header>
        );
    };
};
const mapStateToProps = state =>{
    return {
        sort: state.data.sortBy,
        isAuth: state.auth.isAuth
    };
};
const mapDispatchToProps = dispatch =>{
    return{
        onAddData: (username, email, text)=>dispatch(action.addData(username, email, text)),
        onInitData: (sortBy)=> dispatch(action.initData(null, sortBy)),
        onAuthData: (login, password)=>dispatch(action.auth(login, password)),
        onLogout: ()=>dispatch({type: actionTypes.LOGOUT})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Toolbar, axios));