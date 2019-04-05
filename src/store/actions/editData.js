import * as actionTypes from './actionTypes';
import $ from 'jquery';
import md5 from 'md5';


export const editStart = ()=>{
  return {
    type: actionTypes.EDIT_DATA_START
  };
};

export const editSuccess = (message)=>{
  return {
    type: actionTypes.EDIT_DATA_SUCCESS,
    message: message
  };
};

export const editFail = (error)=>{
  return {
    type: actionTypes.EDIT_DATA_FAILED,
    error: error
  };
};

export const encodeRfc3986 = string => {
  return encodeURIComponent(string).replace(/[!'()*]/g, function(c) {
  return '%' + c.charCodeAt(0).toString(16);
  });
}

export const generateSignature = (params, token) => {
  const keys = Object.keys(params);
  keys.sort((a, b) => a.localeCompare(b));
  let stringForEncode = keys.reduce((acc, val) => {
      return acc + `${val}=${encodeRfc3986(params[val])}&`;
  }, '')
  stringForEncode += `token=${token}`;
  return md5(stringForEncode);
}

export const editData = (id, text, status)=>{
  return dispatch=>{
    dispatch(editStart());
    let form = new FormData();
    form.append("text", text);
    form.append("status", status);
    form.append("token", "beejee");
    form.append("signature", generateSignature({status: status, text: text}, 'beejee'));

    $.ajax({
        url: 'https://uxcandy.com/~shapoval/test-task-backend/edit/' + id + '?developer=MKrusser',
        crossDomain: true,
        method: 'POST',
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        data: form,
        dataType: "json",
        success: function(data) {
          console.log(data);
        }
    });
  };
}