import React, { Component } from 'react';
import {connect} from 'react-redux';
//import * as actionTypes from './store/actions/actionTypes';

import Wrap from './hoc/Wrap/Wrap';
import Header from './containers/Header/Header';
import Layout from './components/Layout/Layout';
import Tasks from './containers/Tasks/Tasks';


class App extends Component {
  
  render() {
    return (
      <Wrap>
        <Header/>
        <Layout>
          <Tasks/>
        </Layout>
      </Wrap>
    );
  }
}

const mapStateToProps = state =>{
  return {
    
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);