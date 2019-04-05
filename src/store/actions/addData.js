import * as actionTypes from './actionTypes';
import $ from 'jquery';


export const addStart = ()=>{
  return {
      type: actionTypes.ADD_START
  };
};

export const addSuccess = (message)=>{
  return {
    type: actionTypes.ADD_SUCCESS,
    message: message
  };
};

export const addFail = (error)=>{
  return {
    type: actionTypes.ADD_FAILED,
    error: error
  };
};

export const addData = (username, email, text)=>{
  return dispatch=>{
    dispatch(addStart());
    let form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("text", text);

    $.ajax({
        url: 'https://uxcandy.com/~shapoval/test-task-backend/create?developer=MKrusser',
        crossDomain: true,
        method: 'POST',
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        data: form,
        dataType: "json",
        success: function(data) {
          console.log(data);
          if(data.status === 'error'){
            alert('Заполните все поля для добавления новой задачи!!')
          }
        }
    });
  };
}