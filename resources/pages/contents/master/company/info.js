$(document).ready(function () {
    _loadCompanyData();
});

function _loadCompanyData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "company",
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
                $('#input_email').val(responseJson.message.email);
                $('#input_address').val(responseJson.message.address);
                $('#input_description').val(responseJson.message.description);
                $('#input_phone_1').val(responseJson.message.phone_1);
                $('#input_phone_2').val(responseJson.message.phone_2);
                $('#input_phone_3').val(responseJson.message.phone_3);
                $('#input_phone_4').val(responseJson.message.phone_4);
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

$('#btn-save').click(function () {
    _updateCompanyData();
});

function _updateCompanyData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    const data = {
        id: global_var.temp_01,
        table: "company",
        name: $('#input_name').val(),
        email: $('#input_email').val(),
        address: $('#input_address').val(),
        description: $('#input_description').val(),
        phone_1: $('#input_phone_1').val(),
        phone_2: $('#input_phone_2').val(),
        phone_3: $('#input_phone_3').val(),
        phone_4: $('#input_phone_4').val(),
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
                // $('#contents-master-company-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}