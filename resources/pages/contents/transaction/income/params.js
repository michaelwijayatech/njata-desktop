$(document).ready(function () {
    $('#start_date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });

    $('#end_date').datetimepicker({
        format: 'd-m-Y',
        timepicker:false,
    });
});

function _btn_next() {
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();
    // alert($('#potongan_bpjs:checked').val() );

    const global_var = remote.getGlobal('globalVariable');
    global_var.start_date = start_date;
    global_var.end_date = end_date;

    $('#contents-transaction-income-info').click();
}