$(document).ready(async function () {
    await _loadCompanyData();

    await _loadContactData();
});

function _loadContactData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "contact",
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
                $('#input_firstname').val(responseJson.message.first_name);
                $('#input_lastname').val(responseJson.message.last_name);
                $('#input_email').val(responseJson.message.email);
                $('#input_address').val(responseJson.message.address);
                $('#input_description').val(responseJson.message.description);
                $('#input_phone_1').val(responseJson.message.phone_1);
                $('#input_phone_2').val(responseJson.message.phone_2);
                $('#input_phone_3').val(responseJson.message.phone_3);
                $('#input_phone_4').val(responseJson.message.phone_4);
                $('#input_phone_5').val(responseJson.message.phone_5);
                $('#input_phone_6').val(responseJson.message.phone_6);
                $('#input-company-' + responseJson.message.id_company).attr('selected', 'selected');
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

$('#btn-save').click(function () {
    _updateContactData();
});

function _updateContactData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    const data = {
        table: "contact",
        id: global_var.temp_01,
        first_name: $('#input_firstname').val(),
        last_name: $('#input_lastname').val(),
        email: $('#input_email').val(),
        id_company: $('#input_company').val(),
        address: $('#input_address').val(),
        description: $('#input_description').val(),
        phone_1: $('#input_phone_1').val(),
        phone_2: $('#input_phone_2').val(),
        phone_3: $('#input_phone_3').val(),
        phone_4: $('#input_phone_4').val(),
        phone_5: $('#input_phone_5').val(),
        phone_6: $('#input_phone_6').val(),
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