$(document).ready(function () {
    _loadContactData();
    _calcTableHeight();
});

function _loadContactData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "contact",
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
            $("#table-body").html("");
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                for(var i=0; i<responseJson.message.length; i++){
                    $("#table-body").append(
                        "<tr>" +
                        "<td>"+responseJson.message[i].first_name+ " " +responseJson.message[i].last_name+"</td>" +
                        "<td>"+responseJson.message[i].description+"</td>" +
                        "<td class='text-right'>"+_phoneSeparatorNoKeyCode(responseJson.message[i].phone_1)+"</td>" +
                        "<td id='contents-master-contact-info-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                        "<td id='"+responseJson.message[i].id+"' onclick=\"_deleteData(this)\" class=\"text-center width width-80 color-red1 cursor-pointer\">Delete</td>" +
                        "</tr>"
                    )
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _deleteData(element) {
    if (confirm("Are you sure?")) {
        const global_var = remote.getGlobal('globalVariable');
    
        const api = global_var.local_api_ip;
        const url = api + 'delete_data';
    
        const data = {
            table: "contact",
            id: element.id
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
                    alert(responseJson.message);
                    _loadContactData();
                }
            })
            .catch((error) => {
                alert('Error : ' + error);
            });
    } else {
        alert("Delete Cancelled");
    }
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