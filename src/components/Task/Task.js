import React from 'react';
import classes from './Task.css'

const task = (props)=>{
  return <div className={classes.Block}>
    <h1>{props.name}</h1>
    <p>{props.email}</p>
    <p>{props.text}</p>
  </div>
}

export default task;