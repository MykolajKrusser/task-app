import React from 'react';
import classes from './Loader.css';


const loader = (props)=>(
    <div className={classes.Loader}>
        <div className={classes.Lmain}>
            <div className={classes.Lsquare}><span></span><span></span><span></span></div>
            <div className={classes.Lsquare}><span></span><span></span><span></span></div>
            <div className={classes.Lsquare}><span></span><span></span><span></span></div>
            <div className={classes.Lsquare}><span></span><span></span><span></span></div>
        </div>
    </div>
);

export default loader;