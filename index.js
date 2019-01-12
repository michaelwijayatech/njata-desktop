const remote = require('electron').remote;
const main = remote.require('./main.js');

$(document).ready(function () {
    $('#username').focus();
});

$('#button-login').click(function(){
    // console.log(remote.getGlobal('sharedObj').user_id);  
    // remote.getGlobal('sharedObj').user_id = 'asd';

    
    // const url = 'https://randomuser.me/api/?results=10';



    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'signin';

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if(username === "admin" && password === "admin"){
        var window = remote.getCurrentWindow();
        main.openWindow('layout');
        window.close();
    }

    const data = {
        username: username,
        password: password
    };
    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((responseJson) => {
        // console.log(responseJson);
        if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
            alert(responseJson.message);
        }

        if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
            global_var.user_id = responseJson.message;
            var window = remote.getCurrentWindow();
            main.openWindow('layout');
            window.close();
        }
    })
    .catch((error) => {
        alert('Error : ' + error);
    });
});