$(document).ready(function () {
    $('#input-date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });
});

function _searchByDate() {
    var date = $('#input-date').val();
    const global_var = remote.getGlobal('globalVariable');
    global_var.start_date = date;
    _loadData();
}

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "carton",
        id: "carton_by_date_all",
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
            $("#table-body").html("");
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                for(var i=0; i<responseJson.message.length; i++){
                    $("#table-body").append(
                        "<tr>" +
                        "<td>"+responseJson.message[i].group_name+"</td>" +
                        "<td contenteditable='false' class='cartons text-center' data-id1='"+responseJson.message[i].id_group+"'>"+responseJson.message[i].carton+"</td>" +
                        "<td id='"+responseJson.message[i].id+"' onclick=\"_destroyCarton(this)\" class=\"text-center width width-80 color-red1 cursor-pointer\">Destroy</td>" +
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

function _destroyCarton(element) {
    var _id = element.id;

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'destroy_data';

    const data = {
        table: "carton",
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