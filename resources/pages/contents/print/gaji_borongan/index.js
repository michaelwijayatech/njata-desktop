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