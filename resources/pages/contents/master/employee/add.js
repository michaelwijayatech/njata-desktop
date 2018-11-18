var fs = require('fs');
var request = require('request');

$('#input_image_ktp').change(function () {
    readFileKTP(this);
});

function readFileKTP(input){
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'uploadFile';

    if (input.files && input.files[0]) {

        console.log('1 : ' + input.files[0].path);

        var req = request.post(url, function (err, resp, body) {
            if (err) {
                console.log('Error!');
            } else {
                console.log('URL: ' + body);
            }
        });
        var form = req.form();
        form.append('image', fs.createReadStream(input.files[0].path), {
            filename: "image.jpg",
            contentType: 'image/jpeg'
        });

    }
}

$('#btn-file-ktp').click(function () {
    dialog.showOpenDialog((filename) => {
        if(filename === undefined){
            alert("No file selected.")
        } else {
            console.log(filename[0]);
            $('#image-ktp').attr('src', filename[0]);
        }
    });
});

$('#btn-file-kk').click(function () {
    dialog.showOpenDialog((filename) => {
        if(filename === undefined){
            alert("No file selected.")
        } else {
            console.log(filename[0]);
            $('#image-kk').attr('src', filename[0]);
        }
    });
});

$('#btn-file-bpjs-ketenagakerjaan').click(function () {
    dialog.showOpenDialog((filename) => {
        if(filename === undefined){
            alert("No file selected.")
        } else {
            console.log(filename[0]);
            $('#image-bpjs-ketenagakerjaan').attr('src', filename[0]);
        }
    });
});

$('#btn-file-bpjs-kesehatan').click(function () {
    dialog.showOpenDialog((filename) => {
        if(filename === undefined){
            alert("No file selected.")
        } else {
            console.log(filename[0]);
            $('#image-bpjs-kesehatan').attr('src', filename[0]);
        }
    });
});

$('#btn-save').click(function () {

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'uploadFile';

    var req = request.post(url, function (err, resp, body) {
        if (err) {
            console.log('Error!');
        } else {
            console.log('URL: ' + body);
        }
    });
    var form = req.form();
    form.append('file', fs.createReadStream(document.getElementById("input_image_ktp").files[0].path), {
        filename: "image.jpg",
        contentType: 'image/jpeg'
    });

   // const files_ktp = document.querySelector('[type=file]').files;
   // const formData = new FormData();
   //
   // for (let i = 0; i<files_ktp.length; i++){
   //     let file = files_ktp[i];
   //
   //     formData.append('files[]', file);
   // }
   //

   //
   //
   //
   //  fetch('POST', url, {
   //      Authorization: "Bearer Access-token",
   //      otherHeader: "image_upload",
   //      'Content-Type': 'multipart/form-data',
   //  }, [
   //      {
   //          name: 'image',
   //          filename: 'image.png',
   //          type: 'image/png',
   //          data: data
   //      },
   //  ])
   //      .then((response) => response.json())
   //      .then((responseJson) => {
   //          console.log(responseJson);
   //          // if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
   //          //     alert(responseJson.message);
   //          // }
   //          //
   //          // if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
   //          //     alert(responseJson.message);
   //          //     $('#menus-setting').click();
   //          // }
   //      })
   //      .catch((error) => {
   //          alert('Error : ' + error);
   //      });

    // fetch(url, {
    //     method: "POST",
    //     headers: {
    //         "Accept": "application/json",
    //         "Content": "application/json",
    //     },
    //     body: JSON.stringify(data)
    // })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         console.log(responseJson);
    //         // if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
    //         //     alert(responseJson.message);
    //         // }
    //         //
    //         // if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
    //         //     alert(responseJson.message);
    //         //     $('#menus-setting').click();
    //         // }
    //     })
    //     .catch((error) => {
    //         alert('Error : ' + error);
    //     });

   // fetch(url, {
   //     method: "POST",
   //     body: formData
   // }).then(response => {
   //     console.log(response);
   // })
});