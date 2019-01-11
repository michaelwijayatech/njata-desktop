const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;

global.globalVariable = {
    // local_api_ip = '192.168.1.11/wijayatech/njata/webservice/public/api',
    // local_api_ip: 'http://192.168.1.8/wijayatech/njata/webservice/public/api/',
    local_api_ip: 'http://127.0.0.1/njata-webservice/public/api/',

    STATUS_SUCCESS: 200,
    STATUS_ERROR: 404,
    STATUS_EXIST: 201,

    user_id: null
};

app.on('browser-window-created',function(e,window) {
    window.setMenu(null);
});

app.on('ready', () => {
    let win = new BrowserWindow({
        width: 1024,
        height: 728,
        minWidth: 800, 
        minHeight: 600,
        frame: false
    });
    // win.webContents.openDevTools();
    win.loadURL(`file://${__dirname}/index.html`);
});

exports.openWindow = (filename) => {
    let win = new BrowserWindow({
        width: 1024,
        height: 728,
        minWidth: 800, 
        minHeight: 600,
    });
    win.webContents.openDevTools();
    win.loadURL(`file://${__dirname}/` + filename + `.html`);
};