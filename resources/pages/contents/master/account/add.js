$(document).ready(function () {

});

$('#btn-save').click(function () {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'add_data';

    const data = {
        table: "account",
        name: $('#input_name').val(),
        number: $('#input_account_number').val(),
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
            //
            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                //     alert(responseJson.message);
                $('#contents-master-account-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
});