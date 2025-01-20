window.loading = function (isLoading) {
    if (isLoading) {
        $('#generalSpinner').show();
    } else {
        $('#generalSpinner').hide();
    }
};

$(document).ready(function () {
    //showSpinnerForFormsMvc();
    showNameOfFilesImport();
    showOrHidePassword();
});

//$(document).ajaxStart(function () {
//    loading(true);
//});

//$(document).ajaxComplete(function () {
//    loading(false);
//});

function showSpinnerForFormsMvc()
{
    $("#generalSpinner").hide();

    $("#form-submit").submit(function (e) {

        var isValid = $('#form-submit').valid();

        if (!isValid) {
            e.preventDefault();
            return;
        }

        $("#generalSpinner").show();
    });
}

function showNameOfFilesImport() {
    $('input[type="file"]').change(function () {
        var i = $(this).next('label').clone();
        var file = $('input[type="file"]')[0].files[0].name;
        $(this).next('label').text(file);
    });
}

function clearNameOfFilesImport() {
    $('input[type="file"]').val(null);
    $('input[type="file"]').next('label').text("Seleccione un archivo Excel...");
}

function showOrHidePassword() {
    $("#show_hide_password label").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_password input').attr("type") == "text") {
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass("fa-eye-slash");
            $('#show_hide_password i').removeClass("fa-eye");
        } else if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass("fa-eye-slash");
            $('#show_hide_password i').addClass("fa-eye");
        }
    });
}