$(document).ready(function () {
    $('#input_nominal').keyup(function () {
        $('#input_nominal').val(_moneySeparator($('#input_nominal').val()));
    });
});

$('#btn-save').click(function () {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'add_data';

    const data = {
        table: "standard",
        name: $('#input_name').val(),
        year: $('#input_year').val(),
        nominal: $('#input_nominal').val(),
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
                $('#contents-master-standard-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
});