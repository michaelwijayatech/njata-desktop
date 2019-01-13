const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;

global.globalVariable = {
    // local_api_ip = '192.168.1.11/wijayatech/njata/webservice/public/api',
    local_api_ip: 'http://192.168.1.9/wijayatech/njata/webservice/public/api/',
    // local_api_ip: 'http://127.0.0.1/njata-webservice/public/api/',

    local_api_images: 'http://192.168.1.9/wijayatech/njata/webservice/public/images/employee/',

    STATUS_SUCCESS: 200,
    STATUS_ERROR: 404,
    STATUS_EXIST: 201,

    user_id: null,

    temp_01: null, // Employee ID
    temp_02: null, // Image KTP Name
    temp_03: null, // Image KK Name
    temp_04: null, // Image BPJS Ketenagakerjaan Name
    temp_05: null, // Image BPJS Kesehatan Name
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
        // frame: false
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