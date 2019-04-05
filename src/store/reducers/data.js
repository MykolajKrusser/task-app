import * as actionsType from '../actions/actionTypes';

const initialState = {
    data: null,
    totalTaskCount: null,
    loader: true,
    error:false,
    sortBy: null
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionsType.SET_DATA:
            let newData = action.data;
            return{
                ...state,
                data: newData.data.message.tasks,
                totalTaskCount: newData.data.message.total_task_count,
                sortBy: action.sort,
                loader: false,
                error: false,
            };
        case actionsType.FETCH_DATA_FAILED:
            return{
                ...state,
                error: true
            };
        default :
            return state;
    }
}

export default reducer;