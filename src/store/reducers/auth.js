import * as actionsType from '../actions/actionTypes';

const initialState = {
  login: '',
  password: '',
  isAuth: false
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionsType.AUTH:
            let login = action.login;
            let password = action.password;
            let auth = false;
            if(login === 'admin' && password === '123'){
              auth = true;
            }
            return{
                ...state,
                login: login,
                password: password,
                isAuth: auth
            };
        case actionsType.LOGOUT:
            return{
                ...state,
                isAuth: false
            };
        default :
            return state;
    }
}

export default reducer;