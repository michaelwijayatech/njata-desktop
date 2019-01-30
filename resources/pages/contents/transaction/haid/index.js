$(document).ready(function () {
    _loadData();
    _calcTableHeight();
});

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "haid",
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
                    if(responseJson.message[i].date === ""){
                        $("#table-body").append(
                            "<tr>" +
                            "<td>"+responseJson.message[i].first_name+" "+responseJson.message[i].last_name+"</td>" +
                            "<td>"+responseJson.message[i].status+"</td>" +
                            "<td id='"+responseJson.message[i].id+"' onclick=\"_setCutiHaid(this)\" class=\"text-center width width-80 color-red1 cursor-pointer\">CUTI</td>" +
                            // "<td id='contents-transaction-haid-info-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                            "</tr>"
                        )
                    } else {
                        $("#table-body").append(
                            "<tr>" +
                            "<td>"+responseJson.message[i].first_name+" "+responseJson.message[i].last_name+"</td>" +
                            "<td>"+responseJson.message[i].status+"</td>" +
                            "<td>"+responseJson.message[i].date+"</td>" +
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