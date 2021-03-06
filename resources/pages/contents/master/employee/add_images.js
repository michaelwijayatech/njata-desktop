var fs = require('fs');
var request = require('request');

$(document).ready(function () {
    //ADD BEFORE THIS FUNCTION
    // var fs = require('fs');
    // var request = require('request');
    //

    _calcTableHeight();
});

function updateEmployeeImageData(field_name, image_name){
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    const data = {
        table: "employee_image_data",
        id: global_var.temp_01,
        field: field_name,
        name: image_name,
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
                // $('#contents-master-product-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

//region KTP
$('#btn-file-ktp').click(function () {
    $('#input_image_ktp').click();
});

$('#input_image_ktp').change(function () {
    $('#image-ktp').attr('src', this.files[0].path);
    readAndUploadFileKTP(this);
});

function readAndUploadFileKTP(input){
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'employee_upload_image';

    if (input.files && input.files[0]) {
        var req = request.post(url, function (err, resp, body) {
            if (err) {
                alert('Error! : ' + err);
            } else {
                // alert('URL: ' + body);
                var response = JSON.parse(body);
                // alert('Image Name : ' + response.message);
                global_var.temp_02 = response.message;
                updateEmployeeImageData("ktp", response.message);
            }
        });
        var form = req.form();
        form.append('image', fs.createReadStream(input.files[0].path), {
            filename: "image.jpg",
            contentType: 'image/jpeg'
        });

    }
}
//endregion

//region KK
$('#btn-file-kk').click(function () {
    $('#input_image_kk').click();
});

$('#input_image_kk').change(function () {
    $('#image-kk').attr('src', this.files[0].path);
    readAndUploadFileKK(this);
});

function readAndUploadFileKK(input){
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'employee_upload_image';

    if (input.files && input.files[0]) {
        var req = request.post(url, function (err, resp, body) {
            if (err) {
                alert('Error! : ' + err);
            } else {
                // alert('URL: ' + body);
                var response = JSON.parse(body);
                // alert('Image Name : ' + response.message);
                global_var.temp_03 = response.message;
                updateEmployeeImageData("kk", response.message);
            }
        });
        var form = req.form();
        form.append('image', fs.createReadStream(input.files[0].path), {
            filename: "image.jpg",
            contentType: 'image/jpeg'
        });

    }
}
//endregion

//region BPJS KETENAGAKERJAAN
$('#btn-file-bpjs-ketenagakerjaan').click(function () {
    $('#input_image_bpjs_ketenagakerjaan').click();
});

$('#input_image_bpjs_ketenagakerjaan').change(function () {
    $('#image-bpjs-ketenagakerjaan').attr('src', this.files[0].path);
    readAndUploadFileBPJSKetenagakerjaan(this);
});

function readAndUploadFileBPJSKetenagakerjaan(input){
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'employee_upload_image';

    if (input.files && input.files[0]) {
        var req = request.post(url, function (err, resp, body) {
            if (err) {
                alert('Error! : ' + err);
            } else {
                // alert('URL: ' + body);
                var response = JSON.parse(body);
                // alert('Image Name : ' + response.message);
                global_var.temp_04 = response.message;
                updateEmployeeImageData("bpjs_ketenagakerjaan", response.message);
            }
        });
        var form = req.form();
        form.append('image', fs.createReadStream(input.files[0].path), {
            filename: "image.jpg",
            contentType: 'image/jpeg'
        });

    }
}
//endregion

//region BPJS KESEHATAN
$('#btn-file-bpjs-kesehatan').click(function () {
    $('#input_image_bpjs_kesehatan').click();
});

$('#input_image_bpjs_kesehatan').change(function () {
    $('#image-bpjs-kesehatan').attr('src', this.files[0].path);
    readAndUploadFileBPJSKesehatan(this);
});

function readAndUploadFileBPJSKesehatan(input){
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'employee_upload_image';

    if (input.files && input.files[0]) {
        var req = request.post(url, function (err, resp, body) {
            if (err) {
                alert('Error! : ' + err);
            } else {
                // alert('URL: ' + body);
                var response = JSON.parse(body);
                // alert('Image Name : ' + response.message);
                global_var.temp_05 = response.message;
                updateEmployeeImageData("bpjs_kesehatan", response.message);
            }
        });
        var form = req.form();
        form.append('image', fs.createReadStream(input.files[0].path), {
            filename: "image.jpg",
            contentType: 'image/jpeg'
        });

    }
}
//endregion

$('#btn-save').click(function () {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'employee_add_image_data';

    const data = {
        employee_id: global_var.temp_01,
        image_ktp: global_var.temp_02,
        image_kk: global_var.temp_03,
        image_bpjs_ketenagakerjaan: global_var.temp_04,
        image_bpjs_kesehatan: global_var.temp_05
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
                alert(responseJson.message);
                // global_var.temp_01 = responseJson.message;
                $('#contents-master-employee-index').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
});