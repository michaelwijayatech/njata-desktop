$(document).ready(async function () {
    await _loadGlobalVariable();
    
    await _loadData();

    $(document).on('blur', '.revisi_gaji_harian', function () {
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
        table: "gaji_harian",
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
                    $("#table-body").append(
                        "<tr>" +
                        "<td class='display-none'>"+responseJson.message[i].id_employee+"</td>" +
                        "<td>"+responseJson.message[i].employee_name+"</td>" +
                        "<td class='text-center'>"+responseJson.message[i].msit+"</td>" +
                        "<td class='text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].pokok)+"</td>" +
                        "<td class='text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].premi)+"</td>" +
                        "<td class='text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].haid)+"</td>" +
                        "<td class='text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].potongan_bpjs)+"</td>" +
                        "<td class='text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].total)+"</td>" +
                        "<td contenteditable='true' class='revisi_gaji_harian text-center' data-idemployee='"+responseJson.message[i].id_employee+"' data-totalbefore='"+responseJson.message[i].total+"'>"+'0'+"</td>" +
                        "<td class='total_after text-right' id='"+responseJson.message[i].id_employee+"'>"+_moneySeparatorNoKeyCode(responseJson.message[i].total)+"</td>" +
                        "</tr>"
                    )
                }
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
}

function _saveGaji() {
    var table, tr, i;
    table = document.getElementById("table-body");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        var id_employee = tr[i].getElementsByTagName("td")[0].textContent || tr[i].getElementsByTagName("td")[0].innerText;
        var msit = tr[i].getElementsByTagName("td")[2].textContent || tr[i].getElementsByTagName("td")[2].innerText;
        var pokok = tr[i].getElementsByTagName("td")[3].textContent || tr[i].getElementsByTagName("td")[3].innerText;
        var premi = tr[i].getElementsByTagName("td")[4].textContent || tr[i].getElementsByTagName("td")[4].innerText;
        var haid = tr[i].getElementsByTagName("td")[5].textContent || tr[i].getElementsByTagName("td")[5].innerText;
        var potongan_bpjs = tr[i].getElementsByTagName("td")[6].textContent || tr[i].getElementsByTagName("td")[6].innerText;
        var total_before = tr[i].getElementsByTagName("td")[7].textContent || tr[i].getElementsByTagName("td")[7].innerText;
        var total_revisi = tr[i].getElementsByTagName("td")[8].textContent || tr[i].getElementsByTagName("td")[8].innerText;
        var total_after = tr[i].getElementsByTagName("td")[9].textContent || tr[i].getElementsByTagName("td")[9].innerText;
        // alert(id_employee + ' | ' + total_before + ' | ' + total_revisi + ' | ' + total_after);

        _uploadRevision(id_employee, msit, pokok, premi, haid, potongan_bpjs, total_before, total_revisi, total_after);
    }
    alert('Data saved successfully');
    $('#contents-print-gaji_harian-index').click();
}

function _uploadRevision(id_employee, msit, pokok, premi, haid, potongan_bpjs, total_before, total_revisi, total_after) {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'add_data';

    const data = {
        table: "revision_salary",
        id_employee: id_employee,
        msit: msit,
        pokok: pokok,
        premi: premi,
        haid: haid,
        potongan_bpjs: potongan_bpjs,
        total_before: total_before,
        total_revisi: total_revisi,
        total_after: total_after
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
                // _loadData();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}