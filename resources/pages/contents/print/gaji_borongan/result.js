$(document).ready(async function () {
    await _loadGlobalVariable();

    await _loadData();

    $(document).on('blur', '.revisi_gaji_bulanan', function () {
        var id_employee = $(this).data('idemployee');
        var totalbefore = $(this).data('totalbefore');
        var revisi = $(this).text();
        _setRevisiGaji(id_employee, totalbefore, revisi);
    });
});

function _loadGlobalVariable() {
    const global_var = remote.getGlobal('globalVariable');

    $('#start_date').val(global_var.start_date);
    $('#end_date').val(global_var.end_date);
    $('#potongan_bpjs').val(global_var.is_checked);
}

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "gaji_borongan",
        id: "all",
        start_date: global_var.start_date,
        end_date: global_var.end_date,
        potongan_bpjs: global_var.is_checked
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
                    var name_haid = "";
                    var name_ijin = "";
                    var name_sakit = "";
                    if (responseJson.message[i].haid > 0){
                        name_haid = responseJson.message[i].haid_name.split('@!#');
                    }
                    if (responseJson.message[i].ijin > 0){
                        name_ijin = responseJson.message[i].ijin_name.split('@!#');
                    }
                    if (responseJson.message[i].sakit > 0){
                        name_sakit = responseJson.message[i].sakit_name.split('@!#');
                    }
                    $("#table-body").append(
                        "<tr>" +
                        "<td>"+responseJson.message[i].group_name+"</td>" +
                        "<td>"+responseJson.message[i].carton+"</td>" +
                        "<td>"+responseJson.message[i].haid+" | "+name_haid+"</td>" +
                        "<td>"+responseJson.message[i].ijin+" | "+name_ijin+"</td>" +
                        "<td>"+responseJson.message[i].sakit+" | "+name_sakit+"</td>" +
                        "<td class='text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].potongan_bpjs)+"</td>" +
                        "<td contenteditable='true' class='total-revision revisi_gaji_bulanan text-center' data-idemployee='"+responseJson.message[i].id_group+"' data-totalbefore='"+responseJson.message[i].total+"'>"+'0'+"</td>" +
                        "<td class='total_after text-right' id='"+responseJson.message[i].id_group+"'>"+_moneySeparatorNoKeyCode(responseJson.message[i].total)+"</td>" +
                        "</tr>"
                    )
                }
                $("#table-body").append(
                    "<tr>" +
                    "<td colspan='7' class='text-right'>"+"Total"+"</td>" +
                    "<td id='total_final' class='text-right'>"+"000"+"</td>" +
                    "</tr>"
                );
                _calcFinalTotal();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _setRevisiGaji(id_employee, totalbefore, revisi) {
    if (parseInt(revisi) < 0){
        var pengurang = revisi.substring(1);
        var totalafter = parseInt(totalbefore) - parseInt(pengurang);
        $('.total_after#'+id_employee).text(_moneySeparatorNoKeyCode(totalafter));
        // alert("minus : " + totalafter);
    } else {
        var totalafter = parseInt(totalbefore) + parseInt(revisi);
        $('.total_after#'+id_employee).text(_moneySeparatorNoKeyCode(totalafter));
        // alert("plus : " + totalafter);
    }
    _calcFinalTotal();
}

function _calcFinalTotal(){
    var final = 0;
    var table, tr, i;
    table = document.getElementById("table-body");
    tr = table.getElementsByTagName("tr");
    td = tr[0].getElementsByTagName("td");
    td_length = td.length - 1;
    for (i = 0; i < tr.length-1; i++) {
        var subtotal = tr[i].getElementsByTagName("td")[7].textContent || tr[i].getElementsByTagName("td")[7].innerText;
        var _subtotal = parseInt(_removeMoneySeparator(subtotal));
        final += _subtotal;
    }
    $('#total_final').text(_moneySeparatorNoKeyCode(final));
    // console.log(_moneySeparatorNoKeyCode(final));
}

function _print() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'print_data';

    var start_date = global_var.start_date;
    var end_date = global_var.end_date;

    const data = {
        table: "borongan_mingguan",
        start_date: start_date,
        end_date: end_date,
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
                // _loadData();
                // console.log(responseJson.message);
                main.openPDFWindow(responseJson.message);
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}