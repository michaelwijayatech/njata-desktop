var ipc = null;
if (ipc === undefined || ipc === null){
    ipc = require('electron').ipcRenderer;
}

$(document).ready(async function () {
    await _loadGlobalVariable();
    
    await _loadData();

    $(document).on('blur', '.revisi_gaji_harian', function () {
        var id_employee = $(this).data('idemployee');
        var totalbefore = $(this).data('totalbefore');
        var revisi = $(this).text();
        _setRevisiGaji(id_employee, totalbefore, revisi);
    });


    _calcTableHeight(200);
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
            console.log(responseJson);
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                $('#total_hari').val(responseJson.message[0]._attendance.length);

                $_temp_date = [];
                $_temp_show = "";
                $_temp_hari = "";
                for (var j=0; j<responseJson.message[0]._attendance.length; j++){
                    if (!$_temp_date.includes(responseJson.message[0]._attendance[j].date)) {
                        $_temp_date.push(responseJson.message[0]._attendance[j].date);
                    }
                }
                // $_temp_date.sort();

                for (var k=0; k<$_temp_date.length;k++){
                    $_temp_show += "<th class=\"text-center width width-30 display-none1\">"+$_temp_date[k].substring(0,2)+"</th>";
                    $_temp_hari += $_temp_date[k] + "#";
                }

                $('#hari').val($_temp_hari);

                for(var i=0; i<responseJson.message.length; i++){
                    /**
                     * GENERATE TABLE HEADER
                     */

                    $('.table thead tr').html(
                        "<th class=\"display-none\">ID</th>" +
                        "<th>Name</th>" +
                        "<th class=\"text-center width width-30 display-none\">L / P</th>" +
                        "<th class=\"text-center width width-100 display-none\">M | S | I | T</th>" +
                        "<th class=\"text-center width width-80\">L | R</th>" +
                        $_temp_show +
                        "<th class=\"text-center width\">Pokok</th>" +
                        "<th class=\"text-center width\">Premi</th>" +
                        "<th class=\"text-center width\">Haid</th>" +
                        "<th class=\"text-center width\">Potongan BPJS</th>" +
                        "<th class=\"total-before text-center width\">Total</th>" +
                        "<th class=\"total-revision text-center width width-50\">Revisi</th>" +
                        "<th class=\"total-after text-center width\">Total</th>" +
                        "<th class=\"name-helper display-none\">Name</th>"
                    );

                    $_temp_att_status_show = "";
                    $_temp_date_data = [];
                    for (var l=0; l<responseJson.message[i]._attendance.length; l++){
                        $_temp_stat = "";
                        if (responseJson.message[i]._attendance[l].status === "0") {
                            $_temp_stat = "0";
                        } else if (responseJson.message[i]._attendance[l].status === "1") {
                            $_temp_stat = "1";
                        } else if (responseJson.message[i]._attendance[l].status === "2") {
                            $_temp_stat = "0.5";
                        } else if (responseJson.message[i]._attendance[l].status === "3") {
                            $_temp_stat = "i";
                        } else if (responseJson.message[i]._attendance[l].status === "4") {
                            $_temp_stat = "c";
                        } else if (responseJson.message[i]._attendance[l].status === "5") {
                            $_temp_stat = "s";
                        }
                        $_temp_att_status_show += "<td class='text-center display-none1'>"+$_temp_stat+"</td>";
                    }
                    
                    $gender = "";
                    if (responseJson.message[i].gender === 1){
                        $gender = "L";
                    } else {
                        $gender = "P";
                    }

                    /**
                     * ADD DATA TO TABLE
                     */
                    $("#table-body").append(
                        "<tr>" +
                        "<td class='display-none'>"+responseJson.message[i].id_employee+"</td>" +
                        "<td>"+responseJson.message[i].employee_name+"</td>" +
                        "<td class='display-none'>"+$gender+"</td>" +
                        "<td class='text-center display-none'>"+responseJson.message[i].msit+"</td>" +
                        "<td class='text-center'>"+responseJson.message[i].libur+ " | " +responseJson.message[i].rajang+ "</td>" +
                        $_temp_att_status_show +
                        "<td class='text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].pokok)+"</td>" +
                        "<td class='text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].premi)+"</td>" +
                        "<td class='text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].haid)+"</td>" +
                        "<td class='text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].potongan_bpjs)+"</td>" +
                        "<td class='total-before text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].total)+"</td>" +
                        "<td contenteditable='true' class='total-revision revisi_gaji_harian text-center' data-idemployee='"+responseJson.message[i].id_employee+"' data-totalbefore='"+responseJson.message[i].total+"'>"+'0'+"</td>" +
                        "<td class='total_after text-right' id='"+responseJson.message[i].id_employee+"'>"+_moneySeparatorNoKeyCode(responseJson.message[i].total)+"</td>" +
                        "<td class='name-helper display-none'>"+responseJson.message[i].employee_name+"</td>" +
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

function _saveGaji(element) {
    var id = element.id;

    var datas = "";
    var table, tr, i;
    table = document.getElementById("table-body");
    tr = table.getElementsByTagName("tr");
    td = tr[0].getElementsByTagName("td");
    td_length = td.length - 1;
    for (i = 0; i < tr.length; i++) {
        var id_employee = tr[i].getElementsByTagName("td")[0].textContent || tr[i].getElementsByTagName("td")[0].innerText;
        var name = tr[i].getElementsByTagName("td")[1].textContent || tr[i].getElementsByTagName("td")[1].innerText;
        var gender = tr[i].getElementsByTagName("td")[2].textContent || tr[i].getElementsByTagName("td")[2].innerText;
        var msit = tr[i].getElementsByTagName("td")[3].textContent || tr[i].getElementsByTagName("td")[3].innerText;
        var lr = tr[i].getElementsByTagName("td")[4].textContent || tr[i].getElementsByTagName("td")[4].innerText;

        var d1, d2, d3, d4, d5, d6, abs = "";
        var totd = parseInt($('#total_hari').val());
        if (totd === 6){
            d1 = tr[i].getElementsByTagName("td")[5].textContent || tr[i].getElementsByTagName("td")[5].innerText;
            d2 = tr[i].getElementsByTagName("td")[6].textContent || tr[i].getElementsByTagName("td")[6].innerText;
            d3 = tr[i].getElementsByTagName("td")[7].textContent || tr[i].getElementsByTagName("td")[7].innerText;
            d4 = tr[i].getElementsByTagName("td")[8].textContent || tr[i].getElementsByTagName("td")[8].innerText;
            d5 = tr[i].getElementsByTagName("td")[9].textContent || tr[i].getElementsByTagName("td")[9].innerText;
            d6 = tr[i].getElementsByTagName("td")[10].textContent || tr[i].getElementsByTagName("td")[10].innerText;
            abs = d1 + "#" + d2 + "#" + d3 + "#" + d4 + "#" + d5 + "#" + d6;
        } else if (totd === 5){
            d1 = tr[i].getElementsByTagName("td")[5].textContent || tr[i].getElementsByTagName("td")[5].innerText;
            d2 = tr[i].getElementsByTagName("td")[6].textContent || tr[i].getElementsByTagName("td")[6].innerText;
            d3 = tr[i].getElementsByTagName("td")[7].textContent || tr[i].getElementsByTagName("td")[7].innerText;
            d4 = tr[i].getElementsByTagName("td")[8].textContent || tr[i].getElementsByTagName("td")[8].innerText;
            d5 = tr[i].getElementsByTagName("td")[9].textContent || tr[i].getElementsByTagName("td")[9].innerText;
            abs = d1 + "#" + d2 + "#" + d3 + "#" + d4 + "#" + d5;
        } else if (totd === 4){
            d1 = tr[i].getElementsByTagName("td")[5].textContent || tr[i].getElementsByTagName("td")[5].innerText;
            d2 = tr[i].getElementsByTagName("td")[6].textContent || tr[i].getElementsByTagName("td")[6].innerText;
            d3 = tr[i].getElementsByTagName("td")[7].textContent || tr[i].getElementsByTagName("td")[7].innerText;
            d4 = tr[i].getElementsByTagName("td")[8].textContent || tr[i].getElementsByTagName("td")[8].innerText;
            abs = d1 + "#" + d2 + "#" + d3 + "#" + d4;
        } else if (totd === 3){
            d1 = tr[i].getElementsByTagName("td")[5].textContent || tr[i].getElementsByTagName("td")[5].innerText;
            d2 = tr[i].getElementsByTagName("td")[6].textContent || tr[i].getElementsByTagName("td")[6].innerText;
            d3 = tr[i].getElementsByTagName("td")[7].textContent || tr[i].getElementsByTagName("td")[7].innerText;
            abs = d1 + "#" + d2 + "#" + d3;
        } else if (totd === 2){
            d1 = tr[i].getElementsByTagName("td")[5].textContent || tr[i].getElementsByTagName("td")[5].innerText;
            d2 = tr[i].getElementsByTagName("td")[6].textContent || tr[i].getElementsByTagName("td")[6].innerText;
            abs = d1 + "#" + d2;
        } else if (totd === 1){
            d1 = tr[i].getElementsByTagName("td")[5].textContent || tr[i].getElementsByTagName("td")[5].innerText;
            abs = d1;
        }

        var totdr = parseInt(totd + 1);
        var pokok = tr[i].getElementsByTagName("td")[totdr + 4].textContent || tr[i].getElementsByTagName("td")[totdr + 4].innerText;
        var premi = tr[i].getElementsByTagName("td")[totdr + 5].textContent || tr[i].getElementsByTagName("td")[totdr + 5].innerText;
        var haid = tr[i].getElementsByTagName("td")[totdr + 6].textContent || tr[i].getElementsByTagName("td")[totdr + 6].innerText;
        var potongan_bpjs = tr[i].getElementsByTagName("td")[totdr + 7].textContent || tr[i].getElementsByTagName("td")[totdr + 7].innerText;
        var total_before = tr[i].getElementsByTagName("td")[totdr + 8].textContent || tr[i].getElementsByTagName("td")[totdr + 8].innerText;
        var total_revisi = tr[i].getElementsByTagName("td")[totdr + 9].textContent || tr[i].getElementsByTagName("td")[totdr + 9].innerText;
        var total_after = tr[i].getElementsByTagName("td")[totdr + 10].textContent || tr[i].getElementsByTagName("td")[totdr + 10].innerText;
        // alert(id_employee + ' | ' + total_before + ' | ' + total_revisi + ' | ' + total_after);

        datas += id_employee + '#' + name + '#' + gender + '#' + msit  + '#' + lr + '#' + abs + '#' + pokok + '#' + premi + '#' + haid + '#' + potongan_bpjs + '#' + total_before + '#' + total_revisi + '#' + total_after + '@';

        // _uploadRevision(id_employee, msit, pokok, premi, haid, potongan_bpjs, total_before, total_revisi, total_after);
        // if (i==0){
        //     alert(datas);
        // }
    }
    if (id === "btn-print-tt") {
        _uploadGajiHarianTT(datas);
    } else {
        _uploadGajiHarian(datas);
    }
    // alert('Data saved successfully');
    // $('#contents-print-gaji_harian-index').click();
    $('#btn-next').css('display', 'none');
    $('#btn-print').css('display', 'block');
}

function _uploadGajiHarian(DATAS) {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'print_data';

    const data = {
        table: "gaji_harian",
        start_date: global_var.start_date,
        end_date: global_var.end_date,
        potongan_bpjs: global_var.is_checked,
        days: $('#hari').val(),
        datas: DATAS
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

function _uploadGajiHarianTT(DATAS) {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'print_data';

    const data = {
        table: "gaji_harian_tt",
        start_date: global_var.start_date,
        end_date: global_var.end_date,
        potongan_bpjs: global_var.is_checked,
        days: $('#hari').val(),
        datas: DATAS
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
            // console.log(responseJson);
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

function _printToPDF() {
    const global_var = remote.getGlobal('globalVariable');
    global_var.start_date = null;
    global_var.end_date = null;
    global_var.is_checked = null;

    $('#btn-group-custom').removeClass('mt-2');
    $('#btn-group-custom').removeClass('mb-4');
    $('.table #table-body tr td').css('font-size', '16px');

    $('.total-before').css('display', 'none');
    $('.total-revision').css('display', 'none');
    $('.name-helper').css('display', 'block');
    $('#btn-print').css('display', 'none');
    $('.LAYOUT_PAGE .LEFT').css('display', 'none');
    ipc.send('print-to-pdf');
    $('#contents-print-gaji_harian-index').click();
    // $('.LAYOUT_PAGE .LEFT').css('display', 'block');
}