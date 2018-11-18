const remote = require('electron').remote;
const dialog = remote.dialog;
const main = remote.require('./main.js');

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
    } else if (part === "contents") {
        $('#menus-' + id).addClass('active');
    }
}

function _loadDisplayMenu(element){
    var part = element.split("-")[0];

    if (part === "menus") {
        var page = element.split("-")[1];
        $('.LAYOUT_PAGE .RIGHT').load('./resources/pages/menus/' + page + '/index.html');
    } else if (part === "contents") {
        var parent = element.split("-")[1];
        var child = element.split("-")[2];
        var page = element.split("-")[3];
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