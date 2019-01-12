$(document).ready(async function () {
    const global_var = remote.getGlobal('globalVariable');
    $('#input_id').val(global_var.temp_01);

    await _loadCompanyData();

    await _loadAdministratorData();
});

function _loadCompanyData(){
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "company",
        id: "all"
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
                for(var i=0; i<responseJson.message.length; i++){
                    $("#input_company").append(
                        "<option value='"+responseJson.message[i].id+"' id='input-company-"+responseJson.message[i].id+"'>" + responseJson.message[i].name + "</option>"
                    )
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _loadAdministratorData() {
    const global_var = remote.getGlobal('globalVariable');
    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        id: global_var.temp_01,
        table: 'administrator'
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
                $('#input_username').val(responseJson.message.user_name);
                $('#input_email').val(responseJson.message.email);
                $('#input_dob').val(responseJson.message.dob);
                $('#input-gender-' + responseJson.message.gender).attr('selected', 'selected');
                $('#input-company-' + responseJson.message.id_company).attr('selected', 'selected');
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _administrator_delete(){
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'administrator_delete_data';

    const data = {
        id: global_var.temp_01,
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
                $('#contents-master-administrator-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

$('#btn-save').click(function () {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    const data = {
        id: global_var.temp_01,
        table: 'administrator',
        id_company: $('#input_company').val(),
        first_name: $('#input_firstname').val(),
        last_name: $('#input_lastname').val(),
        user_name: $('#input_username').val(),
        email: $('#input_email').val(),
        dob: $('#input_dob').val(),
        gender: $('#input_gender').val(),
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
                $('#contents-master-administrator-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
});