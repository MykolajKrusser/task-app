import * as actionTypes from './actionTypes';
import $ from 'jquery';


export const editStart = ()=>{
  return {
    type: actionTypes.EDIT_DATA_START
  };
};

export const editSuccess = (message)=>{
  return {
    type: actionTypes.EDIT_DATA_SUCCESES,
    message: message
  };
};

export const editFail = (error)=>{
  return {
    type: actionTypes.EDIT_DATA_FAILED,
    error: error
  };
};

export const editData = (id, text, status)=>{
  return dispatch=>{
    dispatch(editStart());
    let form = new FormData();
    form.append("text", text);
    form.append("status", status);
    form.append("token", "beejee");

    $.ajax({
        url: 'https://uxcandy.com/~shapoval/test-task-backend/edit/:' + id + '?developer=MKrusser',
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