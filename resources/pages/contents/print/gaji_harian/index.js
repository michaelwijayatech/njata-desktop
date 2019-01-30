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

function _calcGaji() {
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();
    // alert($('#potongan_bpjs:checked').val() );

    const global_var = remote.getGlobal('globalVariable');
    global_var.start_date = start_date;
    global_var.end_date = end_date;
    if($('#potongan_bpjs:checked').val() === "on"){
        global_var.is_checked = true;
    } else {
        global_var.is_checked = false;
    }

    $('#contents-print-gaji_harian-result').click();
}