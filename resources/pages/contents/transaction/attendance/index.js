$(document).ready(function () {
    _loadData();
});

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "attendance",
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
                    if (responseJson.message[i].attendance === ""){
                        $("#table-body").append(
                            "<tr>" +
                            "<td>"+responseJson.message[i].first_name+" "+responseJson.message[i].last_name+"</td>" +
                            "<td>"+responseJson.message[i].status+"</td>" +
                            "<td>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'ijin', 'add')\">IJIN</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'tidak masuk', 'add')\">TDK MASUK</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'setengah hari', 'add')\">STGH HARI</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'masuk', 'add')\">MASUK</button>" +
                            "</td>" +
                            // "<td id='contents-transaction-haid-info-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                            "</tr>"
                        )
                    } else if (responseJson.message[i].attendance === "0"){
                        $("#table-body").append(
                            "<tr>" +
                            "<td>"+responseJson.message[i].first_name+" "+responseJson.message[i].last_name+"</td>" +
                            "<td>"+responseJson.message[i].status+"</td>" +
                            "<td>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'ijin', '"+responseJson.message[i].attendance_id+"')\">IJIN</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'tidak masuk', '"+responseJson.message[i].attendance_id+"')\">TDK MASUK</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'setengah hari', '"+responseJson.message[i].attendance_id+"')\">STGH HARI</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'masuk', '"+responseJson.message[i].attendance_id+"')\">MASUK</button>" +
                            "</td>" +
                            // "<td id='contents-transaction-haid-info-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                            "</tr>"
                        )
                    } else if (responseJson.message[i].attendance === "1"){
                        $("#table-body").append(
                            "<tr>" +
                            "<td>"+responseJson.message[i].first_name+" "+responseJson.message[i].last_name+"</td>" +
                            "<td>"+responseJson.message[i].status+"</td>" +
                            "<td>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'ijin', '"+responseJson.message[i].attendance_id+"')\">IJIN</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'tidak masuk', '"+responseJson.message[i].attendance_id+"')\">TDK MASUK</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'setengah hari', '"+responseJson.message[i].attendance_id+"')\">STGH HARI</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'masuk', '"+responseJson.message[i].attendance_id+"')\">MASUK</button>" +
                            "</td>" +
                            // "<td id='contents-transaction-haid-info-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                            "</tr>"
                        )
                    } else if (responseJson.message[i].attendance === "2"){
                        $("#table-body").append(
                            "<tr>" +
                            "<td>"+responseJson.message[i].first_name+" "+responseJson.message[i].last_name+"</td>" +
                            "<td>"+responseJson.message[i].status+"</td>" +
                            "<td>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'ijin', '"+responseJson.message[i].attendance_id+"')\">IJIN</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'tidak masuk', '"+responseJson.message[i].attendance_id+"')\">TDK MASUK</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'setengah hari', '"+responseJson.message[i].attendance_id+"')\">STGH HARI</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'masuk', '"+responseJson.message[i].attendance_id+"')\">MASUK</button>" +
                            "</td>" +
                            // "<td id='contents-transaction-haid-info-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                            "</tr>"
                        )
                    } else if (responseJson.message[i].attendance === "3"){
                        $("#table-body").append(
                            "<tr>" +
                            "<td>"+responseJson.message[i].first_name+" "+responseJson.message[i].last_name+"</td>" +
                            "<td>"+responseJson.message[i].status+"</td>" +
                            "<td>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'ijin', '"+responseJson.message[i].attendance_id+"')\">IJIN</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'tidak masuk', '"+responseJson.message[i].attendance_id+"')\">TDK MASUK</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'setengah hari', '"+responseJson.message[i].attendance_id+"')\">STGH HARI</button>" +
                            "<button id='"+responseJson.message[i].id+"' class=\"btn button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'masuk', '"+responseJson.message[i].attendance_id+"')\">MASUK</button>" +
                            "</td>" +
                            // "<td id='contents-transaction-haid-info-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                            "</tr>"
                        )
                    }
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
            id_employee: id,
            status: att_status,
            date: ''
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
                $('#contents-transaction-attendance-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _setCutiHaid(element) {
    var id = element.id;

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'add_data';

    const data = {
        table: "haid",
        id_employee: id,
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
                $('#contents-transaction-haid-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _filterTableByName() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("table-search-input-by-name");
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

function _filterTableByStatus() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("table-search-input-by-status");
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