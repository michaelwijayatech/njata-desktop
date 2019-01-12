const remote = require('electron').remote;
const dialog = remote.dialog;
const main = remote.require('./main.js');
const global_var = remote.getGlobal('globalVariable');

$(document).ready(function(){

    // LOAD SIDEBAR
    $('.LAYOUT_PAGE .LEFT').load('./resources/pages/sidebar/index.html');

    // LOAD DASHBOARD
    $('.LAYOUT_PAGE .RIGHT').load('./resources/pages/menus/dashboard/index.html');
    
});

function _setActiveSidebar(element){
    _removeSidebarActive();
    _setSidebarActive(element.id);
    _loadDisplayMenu(element.id);
    _setCustomScript(element.id);
    // _loadDisplayMenu(element.id.split("-")[1]);
}

function _removeSidebarActive(){
    $("#body-sidebar").children('div').each(function(){
        let id_div =  $(this).attr('id');
        if($('#' + id_div).hasClass('active')){
            $('#' + id_div).removeClass('active');
        }
    });
}

function _setSidebarActive(element){
    var part = element.split("-")[0];
    var id = element.split("-")[1];

    if (part === "menus") {
        $('#menus-' + id).addClass('active');
        _removeTempVariable();
    } else if (part === "contents") {
        $('#menus-' + id).addClass('active');
    }
}

function _loadDisplayMenu(element){
    var part = element.split("-")[0];

    if (part === "menus") {
        var page = element.split("-")[1];
        if(page === "logout"){
            _removeTempVariable();
            global_var.user_id = null;
            var window = remote.getCurrentWindow();
            main.openWindow('index');
            window.close();
        } else {
            $('.LAYOUT_PAGE .RIGHT').load('./resources/pages/menus/' + page + '/index.html');
        }
    } else if (part === "contents") {
        var parent = element.split("-")[1];
        var child = element.split("-")[2];
        var page = element.split("-")[3];

        if(element.split("-")[4] !== undefined){
            global_var.temp_01 = element.split("-")[4];
        }

        $('.LAYOUT_PAGE .RIGHT').load('./resources/pages/contents/' + parent + '/' + child + '/' + page + '.html');
    }
}

function _setCustomScript(element) {
    var part = element.split("-")[0];
    var parent = element.split("-")[1];
    var child = element.split("-")[2];
    var page = element.split("-")[3];

    if(page !== undefined){
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = './resources/pages/' + part + '/' + parent + '/' + child + '/' + page + '.js';
        s.innerHTML = null;
        s.id = "script-custom";
        document.getElementById("parent-script").innerHTML = "";
        document.getElementById("parent-script").appendChild(s);
    }
}

function _moneySeparator(nStr) {
    if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
        return;
    }

    var input = nStr;

    var input = input.replace(/[\D\s\._\-]+/g, "");
    input = input ? parseInt( input, 10 ) : 0;

    return ( input === 0 ) ? "" : input.toLocaleString( ['ban', 'id'] );
}

function _checkInput_isEmpty(id){
    var cek_input = $('#' + id).val();
    if(cek_input === "" || cek_input === null){
        // console.log('Input with id : ' + id + ' is empty.');
        alert('Please check your input.');
        return true;
    }
}

function _removeTempVariable() {
    global_var.temp_01 = null;
    global_var.temp_02 = null;
    global_var.temp_03 = null;
    global_var.temp_04 = null;
    global_var.temp_05 = null;
}

function _addZeroOnFirstNumber(elem) {
    if(elem < 10){
        return "0" + elem;
    }
    return elem;
}

function _loadCompanyData(){
    // const global_var = remote.getGlobal('globalVariable');

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