$(document).ready(function () {
    $('#attendance_date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    _loadData();

    _calcTableHeight();
});

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "employee",
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
                        "<td>"+responseJson.message[i].first_name+" "+responseJson.message[i].last_name+"</td>" +
                        "<td>"+responseJson.message[i].status+"</td>" +
                        "<td id='"+responseJson.message[i].id+"@!#"+responseJson.message[i].first_name+" "+responseJson.message[i].last_name+"' onclick=\"_setChooseEmployee(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Choose</td>" +
                        "</tr>"
                    )
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _searchEmployee() {
    $('.first-step').removeClass('display-none');
    $('.second-step').addClass('display-none');
}

function _setChooseEmployee(element) {
    var _id = element.id;
    var employee_id = _id.split("@!#")[0];
    var employee_name = _id.split("@!#")[1];
    // _calcTableHeight();
    $('#employee_name').val(employee_name);
    $('#employee_id').val(employee_id);

    $('.first-step').addClass('display-none');
    $('.second-step').removeClass('display-none');
}

function _searchAttendance() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const _emp_id = $('#employee_id').val();
    const _date = $('#attendance_date').val();

    global_var.temp_02 = _emp_id;
    global_var.temp_03 = _date;

    const data = {
        table: "attendance",
        id: "update_attendance",
        id_employee: _emp_id,
        date: _date
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
            $('.third-step').removeClass('display-none');
            $("#attendance_button").html("");
            if(responseJson.message === null){
                $("#attendance_button").append(
                    "<button id='new_masuk' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'masuk', 'add')\">MASUK</button>" +
                    "<button id='new_setengah_hari' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'setengah hari', 'add')\">STGH HARI</button>" +
                    "<button id='new_tidak_masuk' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'tidak masuk', 'add')\">TDK MASUK</button>" +
                    "<button id='new_ijin' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'ijin', 'add')\">IJIN</button>" +
                    "<button id='new_sakit' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'sakit', 'add')\">SAKIT</button>"
                )
            } else {
                if (responseJson.message.status === "1") {
                    $("#attendance_button").append(
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'masuk', '" + responseJson.message.id + "')\">MASUK</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'setengah hari', '" + responseJson.message.id + "')\">STGH HARI</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'tidak masuk', '" + responseJson.message.id + "')\">TDK MASUK</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'ijin', '" + responseJson.message.id + "')\">IJIN</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'sakit', '" + responseJson.message.id + "')\">SAKIT</button>"
                    )
                } else if (responseJson.message.status === "2") {
                    $("#attendance_button").append(
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'masuk', '" + responseJson.message.id + "')\">MASUK</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'setengah hari', '" + responseJson.message.id + "')\">STGH HARI</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'tidak masuk', '" + responseJson.message.id + "')\">TDK MASUK</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'ijin', '" + responseJson.message.id + "')\">IJIN</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'sakit', '" + responseJson.message.id + "')\">SAKIT</button>"
                    )
                } else if (responseJson.message.status === "3") {
                    $("#attendance_button").append(
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'masuk', '" + responseJson.message.id + "')\">MASUK</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'setengah hari', '" + responseJson.message.id + "')\">STGH HARI</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'tidak masuk', '" + responseJson.message.id + "')\">TDK MASUK</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'ijin', '" + responseJson.message.id + "')\">IJIN</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'sakit', '" + responseJson.message.id + "')\">SAKIT</button>"
                    )
                } else if (responseJson.message.status === "5") {
                    $("#attendance_button").append(
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'masuk', '" + responseJson.message.id + "')\">MASUK</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'setengah hari', '" + responseJson.message.id + "')\">STGH HARI</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'tidak masuk', '" + responseJson.message.id + "')\">TDK MASUK</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'ijin', '" + responseJson.message.id + "')\">IJIN</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'sakit', '" + responseJson.message.id + "')\">SAKIT</button>"
                    )
                } else if (responseJson.message.status === "0") {
                    $("#attendance_button").append(
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'masuk', '" + responseJson.message.id + "')\">MASUK</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'setengah hari', '" + responseJson.message.id + "')\">STGH HARI</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'tidak masuk', '" + responseJson.message.id + "')\">TDK MASUK</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'ijin', '" + responseJson.message.id + "')\">IJIN</button>" +
                        "<button id='" + responseJson.message.id + "' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3\" onclick=\"_setAttendance(this, 'sakit', '" + responseJson.message.id + "')\">SAKIT</button>"
                    )
                }
            }

        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _setAttendance(element, status, _api) {
    var id = element.id;
    var att_status = status;
    var callback_api = _api;

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    var url = api + 'update_data';
    var data = {
        table: "attendance",
        id_employee: id,
        status: att_status,
        id: _api
    };
    if (callback_api === "add"){
        url = api + 'add_data';
        data = {
            table: "attendance",
            id_employee: $('#employee_id').val(),
            status: att_status,
            date: $('#attendance_date').val()
        };
    }

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
                $('#btn_search_attendance').click();
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