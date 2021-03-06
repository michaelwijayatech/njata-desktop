$(document).ready(function () {
    $('#input_nominal').keyup(function () {
        $('#input_nominal').val(_moneySeparator($('#input_nominal').val()));
    });

    _calcTableHeight(360);
});

$('#btn-save').click(function () {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'add_data';

    const data = {
        table: "income",
        name: $('#input_name').val(),
        nominal: $('#input_nominal').val(),
        description: $('#input_description').val(),
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
                alert(responseJson.message);
                $('#contents-transaction-income-add').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
});