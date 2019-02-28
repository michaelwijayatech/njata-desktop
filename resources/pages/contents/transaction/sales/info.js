$(document).ready(function () {
    _calcTableHeight(280);
});

async function _btn_search() {
    await _load_header($('#nota_number').val());
}

function _load_header(NOTA_NUMBER) {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "sales",
        id: NOTA_NUMBER,
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
                    $('#distributor_id').val(responseJson.message[i].sales_id_distributor);
                    $('#distributor_name').val(responseJson.message[i].distributor_name);
                    $('#sales_date').val(responseJson.message[i].date);
                    $('#total_price').val(responseJson.message[i].total);
                    $('#total_paid').val(responseJson.message[i].paid);
                    $('#sales_id').val(responseJson.message[i].sales_id);
                }
                _load_detail($('#sales_id').val());
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _load_detail(ID_SALES) {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "sales_detail",
        id: ID_SALES,
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
                $("#table-body-product").text("");
                for(var i=0; i<responseJson.message.length; i++){
                    $("#table-body-product").append(
                        "<tr>" +
                        "<td class='display-none'>"+responseJson.message[i].sd_id+"</td>" +
                        "<td class='display-none'>"+responseJson.message[i].sd_id_product+"</td>" +
                        "<td>"+responseJson.message[i].product_name+"</td>" +
                        "<td class='text-right'>"+responseJson.message[i].sd_quantity+"</td>" +
                        "<td class='text-right'>"+responseJson.message[i].sd_price+"</td>" +
                        "<td class='text-right'>"+responseJson.message[i].sd_total+"</td>" +
                        // "<td id='contents-transaction-purchase-detail-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                        "</tr>"
                    )
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}