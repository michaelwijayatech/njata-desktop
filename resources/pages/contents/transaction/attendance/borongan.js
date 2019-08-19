$(document).ready(function () {
    _loadData();
    _calcTableHeight();

    $(document).on('blur', '.cartons', function () {
        var id = $(this).data('id1');
        var carton = $(this).text();
        _setPersonalCarton(id, carton);
    });

    $(document).on('blur', '.groups-cartons', function () {
        var id = $(this).data('id1');
        var carton = $(this).text();
        _setCarton(id, carton);
    });
});

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "attendance",
        id: "borongan"
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
            $("#custom-table").html("");
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                var employee_name = "";
                var employee_id = "";
                var att_carton = "";
                var attendance_id = "";
                var attendance_status = "";
                var attendance_carton = "";
                var isCanEdit = false;
                var btn_1 = "";
                var btn_2 = "";
                var btn_3 = "";
                var btn_4 = "";
                var btn_5 = "";
                for(var i=0; i<responseJson.message.length; i++){
                    $("#custom-table").append(
                        "<thead class='bg-dark color-white3'>" +
                            "<tr> <th colspan=\"5\">"+responseJson.message[i].group_name+"</th> <th colspan=\"1\" contenteditable='true' class='groups-cartons text-center' data-id1='"+responseJson.message[i].group_id+"'>"+responseJson.message[i].group_carton+"</th> </tr>"+
                        "</thead>"+
                        "<tbody id='"+responseJson.message[i].group_id+"'>" +
                        "</tbody>"
                    );
                    for(var j=0; j<responseJson.message[i].employee_datas.length; j++){
                        if (responseJson.message[i].employee_datas[j].employee_fname === responseJson.message[i].employee_datas[j].employee_lname){
                            employee_name = responseJson.message[i].employee_datas[j].employee_fname;
                        } else {
                            employee_name = responseJson.message[i].employee_datas[j].employee_fname + " " + responseJson.message[i].employee_datas[j].employee_lname;
                        }
                        employee_id = responseJson.message[i].employee_datas[j].employee_id;
                        attendance_id = responseJson.message[i].employee_datas[j].attendance_id;
                        attendance_status = responseJson.message[i].employee_datas[j].attendance_status;
                        attendance_carton = responseJson.message[i].employee_datas[j].attendance_carton;
                        if (attendance_status === ""){
                            isCanEdit = false;
                            att_carton = "0";
                            btn_1 = "<button id='"+employee_id+"' data-idtemp='1' class=\"1 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'masuk', 'add')\">MASUK</button>";
                            btn_2 = "<button id='"+employee_id+"' data-idtemp='2' class=\"2 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'setengah hari', 'add')\">SETENGAH HARI</button>";
                            btn_3 = "<button id='"+employee_id+"' data-idtemp='3' class=\"3 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'ijin', 'add')\">IJIN</button>";
                            btn_4 = "<button id='"+employee_id+"' data-idtemp='4' class=\"4 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'sakit', 'add')\">SAKIT</button>";
                            btn_5 = "<button id='"+employee_id+"' data-idtemp='5' class=\"5 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'tidak masuk', 'add')\">TIDAK MASUK</button>";
                        } else if (attendance_status === "0"){
                            isCanEdit = true;
                            att_carton = attendance_carton;
                            btn_1 = "<button id='"+employee_id+"' data-idtemp='1' class=\"1 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'masuk', '"+attendance_id+"')\">MASUK</button>";
                            btn_2 = "<button id='"+employee_id+"' data-idtemp='2' class=\"2 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'setengah hari', '"+attendance_id+"')\">SETENGAH HARI</button>";
                            btn_3 = "<button id='"+employee_id+"' data-idtemp='3' class=\"3 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'ijin', '"+attendance_id+"')\">IJIN</button>";
                            btn_4 = "<button id='"+employee_id+"' data-idtemp='4' class=\"4 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'sakit', '"+attendance_id+"')\">SAKIT</button>";
                            btn_5 = "<button id='"+employee_id+"' data-idtemp='5' class=\"5 btn btn-block button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'tidak masuk', '"+attendance_id+"')\">TIDAK MASUK</button>";
                        } else if (attendance_status === "1"){
                            isCanEdit = true;
                            att_carton = attendance_carton;
                            btn_1 = "<button id='"+employee_id+"' data-idtemp='1' class=\"1 btn btn-block button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'masuk', '"+attendance_id+"')\">MASUK</button>";
                            btn_2 = "<button id='"+employee_id+"' data-idtemp='2' class=\"2 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'setengah hari', '"+attendance_id+"')\">SETENGAH HARI</button>";
                            btn_3 = "<button id='"+employee_id+"' data-idtemp='3' class=\"3 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'ijin', '"+attendance_id+"')\">IJIN</button>";
                            btn_4 = "<button id='"+employee_id+"' data-idtemp='4' class=\"4 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'sakit', '"+attendance_id+"')\">SAKIT</button>";
                            btn_5 = "<button id='"+employee_id+"' data-idtemp='5' class=\"5 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'tidak masuk', '"+attendance_id+"')\">TIDAK MASUK</button>";
                        } else if (attendance_status === "2"){
                            isCanEdit = true;
                            att_carton = attendance_carton;
                            btn_1 = "<button id='"+employee_id+"' data-idtemp='1' class=\"1 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'masuk', '"+attendance_id+"')\">MASUK</button>";
                            btn_2 = "<button id='"+employee_id+"' data-idtemp='2' class=\"2 btn btn-block button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'setengah hari', '"+attendance_id+"')\">SETENGAH HARI</button>";
                            btn_3 = "<button id='"+employee_id+"' data-idtemp='3' class=\"3 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'ijin', '"+attendance_id+"')\">IJIN</button>";
                            btn_4 = "<button id='"+employee_id+"' data-idtemp='4' class=\"4 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'sakit', '"+attendance_id+"')\">SAKIT</button>";
                            btn_5 = "<button id='"+employee_id+"' data-idtemp='5' class=\"5 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'tidak masuk', '"+attendance_id+"')\">TIDAK MASUK</button>";
                        } else if (attendance_status === "3"){
                            isCanEdit = true;
                            att_carton = attendance_carton;
                            btn_1 = "<button id='"+employee_id+"' data-idtemp='1' class=\"1 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'masuk', '"+attendance_id+"')\">MASUK</button>";
                            btn_2 = "<button id='"+employee_id+"' data-idtemp='2' class=\"2 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'setengah hari', '"+attendance_id+"')\">SETENGAH HARI</button>";
                            btn_3 = "<button id='"+employee_id+"' data-idtemp='3' class=\"3 btn btn-block button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'ijin', '"+attendance_id+"')\">IJIN</button>";
                            btn_4 = "<button id='"+employee_id+"' data-idtemp='4' class=\"4 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'sakit', '"+attendance_id+"')\">SAKIT</button>";
                            btn_5 = "<button id='"+employee_id+"' data-idtemp='5' class=\"5 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'tidak masuk', '"+attendance_id+"')\">TIDAK MASUK</button>";
                        } else if (attendance_status === "5"){
                            isCanEdit = true;
                            att_carton = attendance_carton;
                            btn_1 = "<button id='"+employee_id+"' data-idtemp='1' class=\"1 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'masuk', '"+attendance_id+"')\">MASUK</button>";
                            btn_2 = "<button id='"+employee_id+"' data-idtemp='2' class=\"2 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'setengah hari', '"+attendance_id+"')\">SETENGAH HARI</button>";
                            btn_3 = "<button id='"+employee_id+"' data-idtemp='3' class=\"3 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'ijin', '"+attendance_id+"')\">IJIN</button>";
                            btn_4 = "<button id='"+employee_id+"' data-idtemp='4' class=\"4 btn btn-block button button-green color-white3 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'sakit', '"+attendance_id+"')\">SAKIT</button>";
                            btn_5 = "<button id='"+employee_id+"' data-idtemp='5' class=\"5 btn btn-block button button-black color-black2 width transition transition-_5 button-hover-black2 button-hover-color-white3 float-right\" onclick=\"_setAttendance(this, 'tidak masuk', '"+attendance_id+"')\">TIDAK MASUK</button>";
                        }
                        $("#"+responseJson.message[i].group_id).append(
                            "<tr> " +
                            "<th colspan=\"5\">"+employee_name+"</th> " +
                            "<th colspan=\"1\" contenteditable='"+isCanEdit+"' class='cartons text-center' data-id1='"+attendance_id+"'>"+att_carton+"</th> " +
                            "</tr>"+
                            "<tr> " +
                            "<td colspan=\"1\">"+btn_1+"</td> " +
                            "<td colspan=\"1\">"+btn_2+"</td> " +
                            "<td colspan=\"1\">"+btn_3+"</td> " +
                            "<td colspan=\"1\">"+btn_4+"</td> " +
                            "<td colspan=\"1\">"+btn_5+"</td> " +
                            "<td colspan=\"1\"></td> " +
                            "</tr>"
                        );
                    }
                    $("#"+responseJson.message[i].group_id).append(
                        "<tr> " +
                        "<th colspan=\"5\" class='text-right'></th> " +
                        "<th colspan=\"1\" class='text-center'></th> " +
                        "</tr>"
                    );
                }

                _setFilter();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _setFilter() {
    const global_var = remote.getGlobal('globalVariable');

    if (global_var.filter !== null) {
        $('#table-search-input-by-status').val(global_var.filter);
        // await _filterTableByStatus();
        $('#table-search-input-by-status').keyup();
    }
}

function _setCarton(id, carton) {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    const data = {
        table: "carton",
        id: id,
        carton: carton
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
                // alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                // _loadData();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _setPersonalCarton(id, carton) {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    const data = {
        table: "attendance_borongan_carton",
        id: id,
        carton: carton
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
            // $("#custom-table").html("");
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                // alert(responseJson.message);
                // _loadData();
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                // _loadData();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _setAttendance(element, status, _api) {
    $('.btn.float-right').addClass('display-none');
    var id = element.id;
    var _classes = element.className.split(' ');

    var att_status = status;
    var callback_api = _api;

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    var url = api + 'update_data';
    var data = {
        table: "attendance",
        id_employee: id,
        status: att_status,
        carton: '0',
        id: _api
    };
    if (callback_api === "add"){
        url = api + 'add_data';
        data = {
            table: "attendance",
            id_employee: id,
            status: att_status,
            carton: '0',
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
            // $("#custom-table").html("");
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
                /**
                 * $('.btn.float-right').removeClass('display-none');
                 */

                _loadData();
            }
            //
            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                //     alert(responseJson.message);
                /**
                 * if($('#table-search-input-by-status').val() !== ""){
                    global_var.filter = $('#table-search-input-by-status').val();
                }
                 */
                // $('#contents-transaction-attendance-index').click();

                
                 var button_id = ['1', '2', '3', '4'];
                 for (var i = 0; i<button_id.length; i++){
                    _removeGreenButton(id, button_id[i]);
                }

                 $('#'+id + '.'+_classes[0]).removeClass('button-black');
                 $('#'+id + '.'+_classes[0]).removeClass('color-black2');
                 $('#'+id + '.'+_classes[0]).addClass('button-green');
                 $('#'+id + '.'+_classes[0]).addClass('color-white3');
                 $('.btn.float-right').removeClass('display-none');

                

                // _loadData();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _removeGreenButton(id, ID) {
    if ($('#'+id + '.' + ID).hasClass('button-green')){
        $('#'+id + '.' + ID).removeClass('button-green');
        $('#'+id + '.' + ID).addClass('button-black');
        if ($('#'+id + '.' + ID).hasClass('color-white3')){
            $('#'+id + '.' + ID).removeClass('color-white3');
            $('#'+id + '.' + ID).addClass('color-black2');
        }
    }
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

async function _filterTableByStatus() {
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