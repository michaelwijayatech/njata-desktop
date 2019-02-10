$(document).ready(function () {
    $('#input_price').keyup(function () {
        $('#input_price').val(_moneySeparator($('#input_price').val()));
    });
});

$('#btn-save').click(function () {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'add_data';

    const data = {
        table: "product",
        name: $('#input_name').val(),
        price: $('#input_price').val(),
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
                $('#contents-master-product-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
});