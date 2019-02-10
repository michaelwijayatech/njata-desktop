$(document).ready(async function () {
    await _loadGlobalVariable();
    
    await _loadData();
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
            console.log(responseJson);
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                for(var i=0; i<responseJson.message.length; i++){
                    var name_haid = "";
                    var name_ijin = "";
                    if (responseJson.message[i].haid > 0){
                        name_haid = responseJson.message[i].haid_name.split('@!#');
                    }
                    if (responseJson.message[i].ijin > 0){
                        name_ijin = responseJson.message[i].ijin_name.split('@!#');
                    }
                    $("#table-body").append(
                        "<tr>" +
                        "<td>"+responseJson.message[i].group_name+"</td>" +
                        "<td>"+responseJson.message[i].carton+"</td>" +
                        "<td>"+responseJson.message[i].haid+" | "+name_haid+"</td>" +
                        "<td>"+responseJson.message[i].ijin+" | "+name_ijin+"</td>" +
                        "<td class='text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].potongan_bpjs)+"</td>" +
                        "<td class='text-right'>"+_moneySeparatorNoKeyCode(responseJson.message[i].total)+"</td>" +
                        "</tr>"
                    )
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}