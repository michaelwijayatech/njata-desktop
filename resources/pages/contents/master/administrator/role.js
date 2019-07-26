$(document).ready(async function () {
    const global_var = remote.getGlobal('globalVariable');
    $('#input_id').val(global_var.temp_01);

    _loadData();
    _calcTableHeight(120);
});

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');
    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    var result = "";

    const data = {
        id: global_var.temp_01,
        table: 'administrator'
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
                result = responseJson.message.role;

                if (result === "all"){
                    $('input[name="role"]').attr('checked', true);
                } else {
                    var res = result.split('@!#');
                    for (var i=0; i<res.length; i++){
                        $('input[name="role"][value="'+res[i]+'"]').attr('checked', true);
                    }
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _saveRole() {
    var role = "";
    $.each($("input[name='role']:checked"), function(){
        role += $(this).val() + "@!#"
    });

    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    const data = {
        table: "administrator_role",
        id: global_var.temp_01,
        role: role,
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
                $('#contents-master-administrator-info').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}