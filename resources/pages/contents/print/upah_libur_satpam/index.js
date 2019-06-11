$(document).ready(function () {
    $('#start_date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    $('#end_date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

});

function _calcGaji() {
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'print_data';

    const data = {
        table: "libur_satpam",
        start_date: start_date,
        end_date: end_date,
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
                // _loadData();
                // console.log(responseJson.message);
                main.openPDFWindow(responseJson.message);
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}