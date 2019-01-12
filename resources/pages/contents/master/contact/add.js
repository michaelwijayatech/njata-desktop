$(document).ready(function () {
    _loadCompanyData();
});

$('#btn-save').click(function () {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'add_data';

    const data = {
        table: "contact",
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
                //     alert(responseJson.message);
                $('#contents-master-contact-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
});