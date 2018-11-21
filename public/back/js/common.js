$(function () {
    // NProgress.start();
    // NProgress .done();
    $(document).ajaxStart(function () {
        // $( ".log" ).text( "Triggered ajaxStart handler." );
        NProgress.start();

    });

    $(document).ajaxStop(function () {
        // $(".log").text("Triggered ajaxStop handler.");
    // NProgress .done();

    });


})