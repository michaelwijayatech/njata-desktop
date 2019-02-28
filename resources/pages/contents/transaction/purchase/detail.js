$(document).ready(async function () {
    await _loadData();

    $('#input_date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });
});

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "purchase_detail",
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
        table: "purchase",
        id: global_var.temp_01,
        date: $('#input_date').val(),
        name: $('#input_name').val(),
        description: $('#input_description').val(),
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
                alert(responseJson.message);
                $('#contents-transaction-purchase-info').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
});