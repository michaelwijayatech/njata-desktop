$(document).ready(function () {
    $('#attendance_date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    _loadData();
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
            console.log(responseJson);
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

    $('#employee_name').val(employee_name);
    $('#employee_id').val(employee_id);

    $('.first-step').addClass('display-none');
    $('.second-step').removeClass('display-none');
}

function _searchAttendance() {
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
            console.log(responseJson);
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