import React, { Component } from 'react';
import classes from './Tasks.css';

import Pagination from "react-js-pagination";

import Task from '../../components/Task/Task';

import {connect} from 'react-redux';
import * as action from '../../store/actions/index';
import axios from 'axios';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Loader from '../../components/UI/Loader/Loader';
import Wrap from '../../hoc/Wrap/Wrap';


class Tasks extends Component {
  state = {
    activePage : 1,
    isAuth: false
  }

  componentDidMount(){
    this.props.onInitData();
  }

  handlePageChange = (pageNumber)=>{
    this.setState({activePage: pageNumber});
    this.props.onInitData(pageNumber, this.props.sort);
  }

  render() {
    let tasks;
    if(this.props.loader){
      tasks = <Loader/>;
    }else{
      tasks = this.props.task.map(task => <Task key={task.id} name={task.username} email={task.email} text={task.text}/>)
    }
    return (
      <Wrap>
        <div className={classes.Container}>
          {tasks}
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={3}
          totalItemsCount={this.props.totalTaskCount}
          pageRangeDisplayed={3}
          onChange={this.handlePageChange}
        />
      </Wrap>
    );
  }
}

const mapStateToProps = state =>{
  return {
    task: state.data.data,
    totalTaskCount: state.data.totalTaskCount,
    loader: state.data.loader,
    sort: state.data.sortBy
  };
};
const mapDispatchToProps = dispatch =>{
  return{
    onInitData: (page, sort)=> dispatch(action.initData(page, sort)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Tasks, axios));