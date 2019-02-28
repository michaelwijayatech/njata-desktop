$(document).ready(function () {
    _loadData();

    $('#input_nominal').keyup(function () {
        $('#input_nominal').val(_moneySeparator($('#input_nominal').val()));
    });

    _calcTableHeight();
});

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "supplier",
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
                        "<td>"+responseJson.message[i].name+"</td>" +
                        "<td id='"+responseJson.message[i].id+"@!#"+responseJson.message[i].name+"' onclick=\"_table_1_click(this)\" class=\"text-center width width-80 color-red1 cursor-pointer\">Choose</td>" +
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

function _table_1_click(element) {
    var _id = element.id;
    var supplier_id = _id.split("@!#")[0];
    var supplier_name = _id.split("@!#")[1];

    $('#supplier_id').val(supplier_id);
    $('#supplier_name').val(supplier_name);

    $('.step-1').addClass('display-none');
    $('.step-2').removeClass('display-none');
}

function _changeSupplier() {
    $('.step-2').addClass('display-none');
    $('.step-1').removeClass('display-none');
}

function _btn_save() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'add_data';

    const data = {
        table: "purchase",
        id_supplier: $('#supplier_id').val(),
        name: $('#input_name').val(),
        description: $('#input_description').val(),
        nominal: $('#input_nominal').val(),
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
                alert(responseJson.message);
                _clear_input();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _clear_input() {
    $('#supplier_id').val('');
    $('#supplier_name').val('');
    $('#input_name').val('');
    $('#input_nominal').val('');
    $('#input_description').val('');
    _changeSupplier();
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