var ipc = null;
if (ipc === undefined || ipc === null){
    ipc = require('electron').ipcRenderer;
}

$(document).ready(function () {
    _checkUpdate();
});

function _checkUpdate() {
    ipc.send('check-for-update');
}

ipc.on('updater-feedback', function (event, info) {
    const message = info;
    $('#update_message').innerHTML = message;
});