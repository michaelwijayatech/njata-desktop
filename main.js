const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const {autoUpdater} = require('electron-updater');
const PDFWindow = require('electron-pdf-window');
// var electronInstaller = require('electron-winstaller');

const path = require('path');
const url = require('url');
const nativeImage = electron.nativeImage;

const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;

let app_icon = nativeImage.createFromPath(path.join(__dirname, 'resources', 'assets', 'Images', 'Logos', 'windows', '256x256.png'));
// let app_icon = nativeImage.createFromPath(path.join(__dirname, '64x64.png'));

const api_address = 'http://192.168.1.10';
// const api_address = 'http://wijayatech.com';

global.globalVariable = {
    // local_api_ip = '192.168.1.11/wijayatech/njata/webservice/public/api',
    // local_api_ip: 'http://127.0.0.1/njata-webservice/public/api/',

    // PAKE
    local_api_ip: api_address + '/wijayatech/njata/webservice/public/api/',
    // local_api_ip: 'http://wijayatech.com/project/njata/webservice/public/api/',

    local_api_images: api_address + '/wijayatech/njata/webservice/public/images/employee/',
    // local_api_images: 'http://wijayatech.com/project/njata/webservice/public/images/employee/',

    local_api_pdf: api_address + '/wijayatech/njata/webservice/public/pdf/',
    // local_api_pdf: 'http://wijayatech.com/project/njata/webservice/public/pdf/',

    //END PAKE

    STATUS_SUCCESS: 200,
    STATUS_ERROR: 404,
    STATUS_EXIST: 201,

    user_id: null,

    temp_01: null, // Employee ID
    temp_02: null, // Image KTP Name
    temp_03: null, // Image KK Name
    temp_04: null, // Image BPJS Ketenagakerjaan Name
    temp_05: null, // Image BPJS Kesehatan Name

    start_date: null,
    end_date: null,
    is_checked: null,
    supplier: null,

    filter: null,
    roles: null,
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
        icon: app_icon,
        // frame: false
    });
    win.webContents.openDevTools();
    win.loadURL(`file://${__dirname}/index.html`);
});

exports.openWindow = (filename) => {
    let win = new BrowserWindow({
        width: 1024,
        height: 728,
        minWidth: 800,
        minHeight: 600,
        icon: app_icon,
    });
    win.webContents.openDevTools();
    win.loadURL(`file://${__dirname}/` + filename + `.html`);
};

exports.openPDFWindow = (filename) => {
    let win = new PDFWindow({
        width: 1024,
        height: 728,
        minWidth: 800,
        minHeight: 600,
        icon: app_icon,
    });
    // win.webContents.openDevTools();
    win.loadURL(globalVariable.local_api_pdf + filename);
};

exports.openPopUpWindow = (filename) => {
    let win = new BrowserWindow({
        width: 400,
        height: 728,
        minWidth: 400,
        minHeight: 600,
        icon: app_icon,
    });
    // win.webContents.openDevTools();
    win.loadURL(`file://${__dirname}/` + filename + `.html`);
};

ipc.on('print-to-pdf', function (event) {
    const pdfPath = path.join(os.tmpdir(), 'print.pdf');
    // const pdfPathServer = path.join('http://wijayatech.com/project/njata/webservice/public/pdf/test.pdf');
    const win = BrowserWindow.fromWebContents(event.sender);

    win.webContents.printToPDF({}, function (error, data) {
        if (error) return console.log(error.message);

        fs.writeFile(pdfPath, data, function (err) {
            if (err) return console.log(err.message);
            // shell.openExternal('file://' + pdfPath);
            shell.openExternal('file://' + pdfPath);
            event.sender.send('wrote-pdf', pdfPath);
        });
    });
});

ipc.on('check-for-update', function (event) {
    var updateFeed = "";
    if (os.platform() === 'darwin'){
        updateFeed = 'http://wijayatech.com/njata/webservice/public/updater/mac/latest';
    } else {
        updateFeed = 'http://wijayatech.com/njata/webservice/public/updater/windows/latest';
    }

    autoUpdater.setFeedURL(updateFeed);

    autoUpdater.checkForUpdates();

    autoUpdater.on('error', function (err) {
        event.sender.send('updater-feedback', err);
    });

    autoUpdater.on('checking-for-update', function () {
        event.sender.send('updater-feedback', 'Checking for update...');
    });

    autoUpdater.on('update-available', function (info) {
        event.sender.send('updater-feedback', info);
    });

    autoUpdater.on('update-not-available', function (info) {
        event.sender.send('updater-feedback', info);
    });

    autoUpdater.on('download-progress', function (progressObj) {
        event.sender.send('updater-feedback', 'Download Speed : ' + progressObj.bytesPerSecond + ' - Downloaded : ' + progressObj.percent + '% - ' + '( '+ progressObj.transferred +' )');
    });

    autoUpdater.on('update-downloaded', function (info) {
        event.sender.send('updater-feedback', 'Update downloaded. Program will restart in a second.');

        autoUpdater.quitAndInstall();
    });
});