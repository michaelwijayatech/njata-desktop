function _printToPDF() {
    const global_var = remote.getGlobal('globalVariable');
    main.openPDFWindow('test.pdf');
    // $('.LAYOUT_PAGE .LEFT').css('display', 'block');
}