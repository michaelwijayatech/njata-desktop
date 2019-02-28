$(document).ready(function () {
    _loadData();

    $('#input_start_date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    $('#input_end_date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    _calcTableHeight();
});

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "supplier",
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
                    $("#table-body").append(
                        "<tr>" +
                        "<td>"+responseJson.message[i].name+"</td>" +
                        "<td id='"+responseJson.message[i].id+"@!#"+responseJson.message[i].name+"' onclick=\"_table_1_click(this)\" class=\"text-center width width-80 color-red1 cursor-pointer\">Choose</td>" +
                        // "<td id='contents-transaction-haid-info-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                        "</tr>"
                    )
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _table_1_click(element) {
    var _id = element.id;
    var supplier_id = _id.split("@!#")[0];
    var supplier_name = _id.split("@!#")[1];

    $('#supplier_id').val(supplier_id);
    $('#supplier_name').val(supplier_name);

    $('.step-1').addClass('display-none');
    $('.step-2').removeClass('display-none');
}

function _changeSupplier() {
    $('.step-2').addClass('display-none');
    $('.step-1').removeClass('display-none');
}

$('#btn-save').click(function () {
    var start_date = $('#input_start_date').val();
    var end_date = $('#input_end_date').val();
    var id_supplier = $('#supplier_id').val();
    // alert($('#potongan_bpjs:checked').val() );

    const global_var = remote.getGlobal('globalVariable');
    global_var.start_date = start_date;
    global_var.end_date = end_date;
    global_var.supplier = id_supplier;

    $('#contents-transaction-purchase-info').click();
});