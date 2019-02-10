$(document).ready(async function () {
    $('#input_price').keyup(function () {
        $('#input_price').val(_moneySeparator($('#input_price').val()));
    });

    await _loadData();
});

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "product",
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
                $('#input_price').val(responseJson.message.price);
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

$('#btn-save').click(function () {
    _updateData();
});

function _updateData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    const data = {
        table: "product",
        id: global_var.temp_01,
        name: $('#input_name').val(),
        price: $('#input_price').val()
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