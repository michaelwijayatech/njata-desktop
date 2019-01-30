$(document).ready(function () {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'employee_load_data';

    const data = {
        employee_id: "all"
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
                        "<td>"+responseJson.message[i].first_name+"</td>" +
                        "<td>"+responseJson.message[i].last_name+"</td>" +
                        "<td>"+responseJson.message[i].email+"</td>" +
                        "<td id='contents-master-employee-info-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                        "<td id='"+responseJson.message[i].id+"' onclick=\"_employeeResign(this)\" class=\"text-center width width-80 color-red1 cursor-pointer\">Delete</td>" +
                        "</tr>"
                    )
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });

    _calcTableHeight();
});

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

function _employeeResign(element) {
    var today = new Date();
    var date = _addZeroOnFirstNumber(today.getDate());
    var month = _addZeroOnFirstNumber(today.getMonth()+1);
    var year = today.getFullYear();

    let date_now = date + "-" + month + "-" + year;

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'employee_resign';

    const data = {
        employee_id: element.id,
        end_date: date_now
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
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                $('#contents-master-employee-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}