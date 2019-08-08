$(document).ready(function () {
    $(['#start_date_week_1', '#start_date_week_2', '#start_date_week_3', '#start_date_week_4', '#start_date_week_5', '#start_date_week_6']).datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    $(['#end_date_week_1', '#end_date_week_2', '#end_date_week_3', '#end_date_week_4', '#end_date_week_5', '#end_date_week_6']).datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    // $('#start_date_week_1').val("01-07-2019");
    // $('#end_date_week_1').val("06-07-2019");
    // $('#start_date_week_2').val("08-07-2019");
    // $('#end_date_week_2').val("13-07-2019");
    // $('#start_date_week_3').val("15-07-2019");
    // $('#end_date_week_3').val("20-07-2019");
    // $('#start_date_week_4').val("22-07-2019");
    // $('#end_date_week_4').val("27-07-2019");
    // $('#start_date_week_5').val("29-07-2019");
    // $('#end_date_week_5').val("31-07-2019");

});

function _calcRekapBulanan(){
    var start_date_week_1 = $('#start_date_week_1').val();
    var end_date_week_1 = $('#end_date_week_1').val();
    var start_date_week_2 = $('#start_date_week_2').val();
    var end_date_week_2 = $('#end_date_week_2').val();
    var start_date_week_3 = $('#start_date_week_3').val();
    var end_date_week_3 = $('#end_date_week_3').val();
    var start_date_week_4 = $('#start_date_week_4').val();
    var end_date_week_4 = $('#end_date_week_4').val();
    var start_date_week_5 = $('#start_date_week_5').val();
    var end_date_week_5 = $('#end_date_week_5').val();
    var start_date_week_6 = $('#start_date_week_6').val();
    var end_date_week_6 = $('#end_date_week_6').val();

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'print_data';

    // table: "rekap_bulanan",
    // table: "temp_langsung_hapus",
    const data = {
        table: "rekap_bulanan",
        start_date_week_1: start_date_week_1,
        end_date_week_1: end_date_week_1,
        start_date_week_2: start_date_week_2,
        end_date_week_2: end_date_week_2,
        start_date_week_3: start_date_week_3,
        end_date_week_3: end_date_week_3,
        start_date_week_4: start_date_week_4,
        end_date_week_4: end_date_week_4,
        start_date_week_5: start_date_week_5,
        end_date_week_5: end_date_week_5,
        start_date_week_6: start_date_week_6,
        end_date_week_6: end_date_week_6,
    };

    // const data = {
    //     table: "temp_langsung_hapus",
    //     start_date: start_date_week_1,
    //     end_date: end_date_week_1,
    // }

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
                // alert(responseJson.message);
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

// function _calcGaji() {
//     var start_date = $('#start_date').val();
//     var end_date = $('#end_date').val();

//     const global_var = remote.getGlobal('globalVariable');

//     const api = global_var.local_api_ip;
//     const url = api + 'print_data';

//     const data = {
//         table: "libur_satpam",
//         start_date: start_date,
//         end_date: end_date,
//     };

//     fetch(url, {
//         method: "POST",
//         headers: {
//             "Accept": "application/json",
//             "Content": "application/json",
//         },
//         body: JSON.stringify(data)
//     })
//         .then((response) => response.json())
//         .then((responseJson) => {
//             // console.log(responseJson);
//             if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
//                 alert(responseJson.message);
//             }

//             if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
//                 // _loadData();
//                 // console.log(responseJson.message);
//                 main.openPDFWindow(responseJson.message);
//             }
//         })
//         .catch((error) => {
//             alert('Error : ' + error);
//         });
// }