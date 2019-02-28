var account_id = [];
var account_name = [];
$(document).ready(async function () {
    await _loadAccountData();

    $('#input_date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    $('#input_nominal').keyup(function () {
        $('#input_nominal').val(_moneySeparator($('#input_nominal').val()));
    });
});

function _loadAccountData(){
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "account",
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
                    account_id.push(responseJson.message[i].id);
                    account_name.push(responseJson.message[i].name);
                    $("#input_account").append(
                        "<option value='"+responseJson.message[i].id+"' id='input-account-"+responseJson.message[i].id+"'>" + responseJson.message[i].name + "</option>"
                    )
                }
                _loadData();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "expenses",
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
                $('#input_id').val(responseJson.message.id);
                $('#input_date').val(responseJson.message.date);
                $('#input_name').val(responseJson.message.name);
                $('#input_nominal').val(responseJson.message.nominal);
                $('#input_description').val(responseJson.message.description);
                var account_index = account_id.indexOf(responseJson.message.id_account);
                $('#input_account_text').val(account_name[account_index]);
                $('#input-account-' + responseJson.message.id_account).attr('selected', 'selected');
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
        table: "expenses",
        id: global_var.temp_01,
        id_account: $('#input_account').val(),
        date: $('#input_date').val(),
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
                $('#contents-transaction-expenses-info').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
});