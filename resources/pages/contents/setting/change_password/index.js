// const remote = require('electron').remote;

$('#btn-save').click(function () {
    var new_password = $('#input_new_password').val();
    var re_password = $('#input_retype_password').val();

    if(new_password === re_password){
        const global_var = remote.getGlobal('globalVariable');

        const api = global_var.local_api_ip;
        const url = api + 'administrator_reset_password';

        const data = {
            id: global_var.user_id,
            new_password: new_password
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
                    alert(responseJson.message);
                    $('#menus-setting').click();
                }
            })
            .catch((error) => {
                alert('Error : ' + error);
            });
    } else {
        alert("Please check your input.");
    }
});