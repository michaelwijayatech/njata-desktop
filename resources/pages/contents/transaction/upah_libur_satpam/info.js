$(document).ready(async function () {
    $('#input_date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    await _loadDataEmployee();
});

function _loadDataEmployee() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "employee",
        id: global_var.temp_01
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
                for(var i=0; i<responseJson.message.length; i++) {
                    $('#employee_id').val(responseJson.message[0].id);
                    if (responseJson.message[0].first_name === responseJson.message[0].last_name){
                        $('#employee_name').val(responseJson.message[0].first_name);
                    } else {
                        $('#employee_name').val(responseJson.message[0].first_name + ' ' + responseJson.message[0].last_name);
                    }
                }
                _loadDataLibur();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _loadDataLibur(){
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "libur_satpam",
        id: 'month',
        id_employee: $('#employee_id').val(),
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
            $("#table-body").html("");
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                for(var i=0; i<responseJson.message.length; i++) {
                    $("#table-body").append(
                        "<tr>" +
                        "<td>" + responseJson.message[i].date + "</td>" +
                        "<td id='" + responseJson.message[i].id + "' onclick=\"_deleteData(this)\" class=\"text-center width width-80 color-red1 cursor-pointer\">Delete</td>" +
                        // "<td id='contents-transaction-haid-info-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                        "</tr>"
                    );
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

$('#btn-save').click(function () {
    _checkIfLiburExist();
});

function _deleteData(element) {
    var id = element.id;

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'destroy_data';

    const data = {
        table: "libur_satpam",
        id: id
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
                _loadDataLibur();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _addLiburSatpam() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'add_data';

    const data = {
        table: "libur_satpam",
        id_employee: $('#employee_id').val(),
        date: $('#input_date').val()
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
                $('#input_date').val("");
                _loadDataLibur();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _checkIfLiburExist() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "libur_satpam",
        id: 'id_date',
        id_employee: $('#employee_id').val(),
        date: $('#input_date').val()
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
                $('#input_date').val("");
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                _addLiburSatpam();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}