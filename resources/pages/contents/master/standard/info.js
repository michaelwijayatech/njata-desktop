$(document).ready(async function () {
    $('#input_nominal').keyup(function () {
        $('#input_nominal').val(_moneySeparator($('#input_nominal').val()));
    });

    await _loadStandardData();
});

function _loadStandardData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "standard",
        id: global_var.temp_01
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
                $('#input_name').val(responseJson.message.name);
                $('#input_year').val(responseJson.message.year);
                $('#input_nominal').val(responseJson.message.nominal);
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

$('#btn-save').click(function () {
    _updateStandardData();
});

function _updateStandardData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    const data = {
        table: "standard",
        id: global_var.temp_01,
        name: $('#input_name').val(),
        year: $('#input_year').val(),
        nominal: $('#input_nominal').val()
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
                // $('#contents-master-contact-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}