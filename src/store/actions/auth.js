import * as actionTypes from './actionTypes';


export const auth = (login, password)=>{
  return {
      type: actionTypes.AUTH,
      login: login,
      password: password
  }
}

export const logout = ()=>{
  return {
      type: actionTypes.LOGOUT,
  }
}