const remote = require('electron').remote;
const main = remote.require('./main.js');

$('#button-login').click(function(){
    var window = remote.getCurrentWindow();
    main.openWindow('layout');
    window.close();
});