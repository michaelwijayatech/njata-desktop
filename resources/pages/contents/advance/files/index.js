$(document).ready(function () {
    _calcTableHeight();
    _loadData();
});

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'get_public_files';

    const data = {
        table: "pdf",
        id: "all",
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
            // console.log("Length : " + responseJson.message.length);
            // console.log(responseJson.message[0].length);
            $("#table-body").html("");
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                for(var i=2; i<responseJson.message[0].length; i++){
                    $("#table-body").append(
                        "<tr>" +
                        "<td>"+responseJson.message[0][i]+"</td>" +
                        "<td id='"+responseJson.message[0][i]+"' onclick=\"_openOnPDF(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Download</td>" +
                        // "<td contenteditable='true' class='cartons text-center' data-id1='"+responseJson.message[i].id_group+"'>"+responseJson.message[i].carton+"</td>" +
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

function _openOnPDF(element) {
    const global_var = remote.getGlobal('globalVariable');
    var _id = element.id;
    console.log(global_var.local_api_pdf + _id);
    main.openPDFWindow(global_var.local_api_pdf + _id);
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