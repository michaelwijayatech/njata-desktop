$(function () {
    //ADD BEFORE THIS FUNCTION
    // var fs = require('fs');
    // var request = require('request');
    //

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

    _loadCompanyData();
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
            console.log(responseJson);
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

// $('#input_image_ktp').change(function () {
//     readFileKTP(this);
// });
//
// function readFileKTP(input){
//     const global_var = remote.getGlobal('globalVariable');
//
//     const api = global_var.local_api_ip;
//     const url = api + 'uploadFile';
//
//     if (input.files && input.files[0]) {
//
//         console.log('1 : ' + input.files[0].path);
//
//         var req = request.post(url, function (err, resp, body) {
//             if (err) {
//                 console.log('Error!');
//             } else {
//                 console.log('URL: ' + body);
//             }
//         });
//         var form = req.form();
//         form.append('image', fs.createReadStream(input.files[0].path), {
//             filename: "image.jpg",
//             contentType: 'image/jpeg'
//         });
//
//     }
// }
//
// $('#btn-file-ktp').click(function () {
//     dialog.showOpenDialog((filename) => {
//         if(filename === undefined){
//             alert("No file selected.")
//         } else {
//             console.log(filename[0]);
//             $('#image-ktp').attr('src', filename[0]);
//         }
//     });
// });
//
// $('#btn-file-kk').click(function () {
//     dialog.showOpenDialog((filename) => {
//         if(filename === undefined){
//             alert("No file selected.")
//         } else {
//             console.log(filename[0]);
//             $('#image-kk').attr('src', filename[0]);
//         }
//     });
// });
//
// $('#btn-file-bpjs-ketenagakerjaan').click(function () {
//     dialog.showOpenDialog((filename) => {
//         if(filename === undefined){
//             alert("No file selected.")
//         } else {
//             console.log(filename[0]);
//             $('#image-bpjs-ketenagakerjaan').attr('src', filename[0]);
//         }
//     });
// });
//
// $('#btn-file-bpjs-kesehatan').click(function () {
//     dialog.showOpenDialog((filename) => {
//         if(filename === undefined){
//             alert("No file selected.")
//         } else {
//             console.log(filename[0]);
//             $('#image-bpjs-kesehatan').attr('src', filename[0]);
//         }
//     });
// });

$('#btn-save').click(function () {

    if(_checkInput_isEmpty("input_firstname")){
        return;
    }

    if(_checkInput_isEmpty("input_lastname")){
        return;
    }

    // if(_checkInput_isEmpty("input_email")){
    //     return;
    // }

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
    const url = api + 'employee_add_data';

    const data = {
        id_company: $('#input_company').val(),
        first_name: $('#input_firstname').val(),
        last_name: $('#input_lastname').val(),
        email: $('#input_email').val(),
        phone_1: $('#input_phonenumber_1').val(),
        phone_2: $('#input_phonenumber_2').val(),
        domicile_address: $('#input_address_domisili').val(),
        premi: $('#input_premi').val(),
        potongan_bpjs: $('#input_potongan_bpjs').val(),
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
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }
            //
            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
            //     alert(responseJson.message);
                global_var.temp_01 = responseJson.message;
                $('#contents-master-employee-add_images').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });

    /**
     * END UPLOAD DATA TO SERVER
     */


    // const global_var = remote.getGlobal('globalVariable');
    //
    // const api = global_var.local_api_ip;
    // const url = api + 'uploadFile';
    //
    // var req = request.post(url, function (err, resp, body) {
    //     if (err) {
    //         console.log('Error!');
    //     } else {
    //         console.log('URL: ' + body);
    //     }
    // });
    // var form = req.form();
    // form.append('file', fs.createReadStream(document.getElementById("input_image_ktp").files[0].path), {
    //     filename: "image.jpg",
    //     contentType: 'image/jpeg'
    // });

});