$(document).ready(async function () {
    const global_var = remote.getGlobal('globalVariable');
    $('#input_id').val(global_var.temp_01);

    $('#input_dob').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    $('#input_start_date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    $('#input_premi').keyup(function () {
        $('#input_premi').val(_moneySeparator($('#input_premi').val()));
    });

    $('#input_potongan_bpjs').keyup(function () {
        $('#input_potongan_bpjs').val(_moneySeparator($('#input_potongan_bpjs').val()));
    });

    $('#input_tunjangan').keyup(function () {
        $('#input_tunjangan').val(_moneySeparator($('#input_tunjangan').val()));
    });

    await _loadCompanyData()

    await _loadEmployeeData();
});

function _loadCompanyData(){
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "company",
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
                    $("#input_company").append(
                        "<option value='"+responseJson.message[i].id+"' id='input-company-"+responseJson.message[i].id+"'>" + responseJson.message[i].name + "</option>"
                    )
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

async function _loadEmployeeData() {
    const global_var = remote.getGlobal('globalVariable');
    const api = global_var.local_api_ip;
    const url = api + 'employee_load_data';

    const data = {
        employee_id: global_var.temp_01
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
                $('#input_firstname').val(responseJson.message.first_name);
                $('#input_lastname').val(responseJson.message.last_name);
                $('#input_email').val(responseJson.message.email);
                $('#input_phonenumber_1').val(responseJson.message.phone_1);
                $('#input_phonenumber_2').val(responseJson.message.phone_2);
                $('#input_address_domisili').val(responseJson.message.domicile_address);
                if(responseJson.message.premi !== undefined || responseJson.message.premi !== "" || responseJson.message.premi !== null){
                    $('#input_premi').val(responseJson.message.premi);
                }
                if(responseJson.message.potongan_bpjs !== undefined || responseJson.message.potongan_bpjs !== "" || responseJson.message.potongan_bpjs !== null){
                    $('#input_potongan_bpjs').val(responseJson.message.potongan_bpjs);
                }
                if(responseJson.message.tunjangan !== undefined || responseJson.message.tunjangan !== "" || responseJson.message.tunjangan !== null){
                    $('#input_tunjangan').val(responseJson.message.tunjangan);
                }
                $('#input_dob').val(responseJson.message.dob);
                $('#input_start_date').val(responseJson.message.start_date);
                $('#input-gender-' + responseJson.message.gender).attr('selected', 'selected');
                $('#input-status-' + responseJson.message.status).attr('selected', 'selected');
                $('#input-company-' + responseJson.message.id_company).attr('selected', 'selected');
                if(responseJson.message.is_active === 2){
                    $('#_set_cuti').addClass('display-none');
                    $('#_remove_cuti').removeClass('display-none');
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

$('#btn-save').click(function () {

    if(_checkInput_isEmpty("input_firstname")){
        return;
    }

    if(_checkInput_isEmpty("input_lastname")){
        return;
    }

    if(_checkInput_isEmpty("input_dob")){
        return;
    }

    if(_checkInput_isEmpty("input_phonenumber_1")){
        return;
    }

    if(_checkInput_isEmpty("input_start_date")){
        return;
    }

    /**
     * START UPLOAD DATA TO SERVER
     */

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    const data = {
        table: "employee",
        id: global_var.temp_01,
        id_company: $('#input_company').val(),
        first_name: $('#input_firstname').val(),
        last_name: $('#input_lastname').val(),
        email: $('#input_email').val(),
        phone_1: $('#input_phonenumber_1').val(),
        phone_2: $('#input_phonenumber_2').val(),
        domicile_address: $('#input_address_domisili').val(),
        premi: $('#input_premi').val(),
        potongan_bpjs: $('#input_potongan_bpjs').val(),
        tunjangan: $('#input_tunjangan').val(),
        dob: $('#input_dob').val(),
        start_date: $('#input_start_date').val(),
        gender: $('#input_gender').val(),
        status: $('#input_job').val()
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
            // alert(responseJson.message);
            $('#contents-master-employee-info_images').click();
        })
        .catch((error) => {
            alert('Error : ' + error);
        });

    /**
     * END UPLOAD DATA TO SERVER
     */

});

function _employee_resign() {
    var today = new Date();
    var date = _addZeroOnFirstNumber(today.getDate());
    var month = _addZeroOnFirstNumber(today.getMonth()+1);
    var year = today.getFullYear();

    let date_now = date + "-" + month + "-" + year;

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'employee_resign';

    const data = {
        employee_id: global_var.temp_01,
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

function _set_employee_cuti() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    const data = {
        table: "employee_cuti",
        id: global_var.temp_01,
        status: "set_cuti"
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
                $('#_set_cuti').addClass('display-none');
                $('#_remove_cuti').removeClass('display-none');
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _remove_employee_cuti() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    const data = {
        table: "employee_cuti",
        id: global_var.temp_01,
        status: "set_active"
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
                $('#_set_cuti').removeClass('display-none');
                $('#_remove_cuti').addClass('display-none');
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}