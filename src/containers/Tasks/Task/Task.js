import React, { Component } from 'react';
import classes from './Task.css'
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import Wrap from '../../../hoc/Wrap/Wrap';
import MyButton from '../../../components/UI/Button/Button';

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Task extends Component{
  state = {
    checkedB: true,
    anchorEl: null,
    text: '',
    status: null
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  textChangeHandler= (event) => {
    this.setState({text: event.target.value})
  }

  statusChangeHandler = (data) => {
    this.setState({status: data})
  }
  
  submitHandler = (event)=>{
    event.preventDefault();
    this.props.onEditData(event.target.id, this.state.text, this.state.status);
    this.props.onInitData(this.props.page, this.props.sort);
  }

  render(){
    let forAllusers;
    const { anchorEl } = this.state;
    if(this.props.isAuth){
      forAllusers =  <Wrap>
          <p>Task: {this.props.text}</p>
          <input type='text' value={this.state.text} onChange={this.textChangeHandler} placeholder='Task change'/>
          <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
                >
                Task status
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                <MenuItem onClick={()=>{
                        this.handleClose()
                        return this.statusChangeHandler(10)
                }}>Complete</MenuItem>
                <MenuItem onClick={()=>{
                        this.handleClose()
                        return this.statusChangeHandler(0)
                }}>Not complete</MenuItem>
            </Menu>
            <button id={this.props.id} onClick={this.submitHandler}>Submit changes</button>
          <Checkbox
            checked={this.props.status === 0 ? false : true}
          />
        </Wrap>
    }else{
      forAllusers = <Wrap>
        <p>Task: {this.props.text}</p>
        <Checkbox
          checked={this.props.status === 0 ? false : true}
          disabled
        />
      </Wrap>
    }
    return(
      <div className={classes.Block}>
        <h2>User: {this.props.name}</h2>
        <p>E-mail: {this.props.email}</p>
        {forAllusers}
      </div>
    );
  };
};

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    sort: state.data.sortBy,
    page: state.data.page
  };
};
const mapDispatchToProps = dispatch =>{
  return{
    onEditData: (id, text, status)=>dispatch(action.editData(id, text, status)),
    onInitData: (page, sort)=> dispatch(action.initData(page, sort)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Task);