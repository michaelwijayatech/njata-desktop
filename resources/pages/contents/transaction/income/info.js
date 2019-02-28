$(document).ready(function () {
    // _loadParams();

    _loadData();

    _calcTableHeight();
});

function _loadParams() {
    const global_var = remote.getGlobal('globalVariable');

    $('#start_date').val(global_var.start_date);
    $('#end_date').val(global_var.end_date);
}

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "income",
        id: "all",
        start_date: global_var.start_date,
        end_date: global_var.end_date,
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
                        "<td>"+responseJson.message[i].date+"</td>" +
                        "<td>"+responseJson.message[i].name+"</td>" +
                        "<td class='text-right'>"+responseJson.message[i].nominal+"</td>" +
                        "<td id='contents-transaction-income-detail-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
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

function _filterTableColumn1() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("table-search-column-1");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-body");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function _filterTableColumn2() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("table-search-column-2");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-body");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

//
// $('#btn-save').click(function () {
//     _updateStandardData();
// });
//
// function _updateStandardData() {
//     const global_var = remote.getGlobal('globalVariable');
//
//     const api = global_var.local_api_ip;
//     const url = api + 'update_data';
//
//     const data = {
//         table: "holiday",
//         id: global_var.temp_01,
//         date: $('#input_date').val(),
//         description: $('#input_description').val()
//     };
//
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
//             //
//             if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
//                 alert(responseJson.message);
//                 // $('#contents-master-contact-index').click();
//             }
//         })
//         .catch((error) => {
//             alert('Error : ' + error);
//         });
// }