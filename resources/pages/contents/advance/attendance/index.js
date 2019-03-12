$(document).ready(function () {
    $('#input-date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    _calcTableHeight(130);
});

function _searchByDate() {
    var date = $('#input-date').val();
    const global_var = remote.getGlobal('globalVariable');
    global_var.start_date = date;
    _loadData();
}
var status = "qwe";
function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "attendance",
        id: "advance_attendance_by_date",
        date: global_var.start_date
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
            $("#table-body").text("");
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                for(var i=0; i<responseJson.message.length; i++){
                    if (responseJson.message[i].status === '0') {
                        status = "Tidak masuk";
                    } else if (responseJson.message[i].status === '1') {
                        status = "Masuk";
                    } else if (responseJson.message[i].status === '2') {
                        status = "Setengah Hari";
                    } else if (responseJson.message[i].status === '3') {
                        status = "Ijin";
                    } else if (responseJson.message[i].status === '4') {
                        status = "Cuti";
                    }
                    $("#table-body").append(
                        "<tr>" +
                        "<td>"+responseJson.message[i].date+"</td>" +
                        "<td>"+responseJson.message[i].first_name+" "+responseJson.message[i].last_name+"</td>" +
                        "<td>"+status+"</td>" +
                        "<td id='"+responseJson.message[i].id+"' onclick=\"_destroyAttendance(this)\" class=\"text-center width width-80 color-red1 cursor-pointer\">Destroy</td>" +
                        "</tr>"
                    )
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _destroyAttendance(element) {
    var _id = element.id;

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'destroy_data';

    const data = {
        table: "attendance",
        id: _id
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
                _loadData();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _filterTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("table-search-input");
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