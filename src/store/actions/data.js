import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setData = (data, sortBy)=>{
    return {
        type: actionTypes.SET_DATA,
        data: data,
        sort: sortBy
    }
}

export const fetchDataFailed = ()=>{
    return {
        type: actionTypes.FETCH_DATA_FAILED
    }
}

export const initData = (page, sortBy)=>{
    let pageNumber = page;
    let pageSortBy = sortBy;
    return dispatch=>{
        axios.get('https://uxcandy.com/~shapoval/test-task-backend/?developer=MKrusser&page=' + pageNumber + '&sort_field=' + pageSortBy)
        .then(respons=>{
          dispatch(setData(respons, sortBy))
        })
        .catch(error=>{
          dispatch(fetchDataFailed(error))
        });
    }
}