$(function () {

 


    // NProgress.start();
    // NProgress .done();
    $(document).ajaxStart(function () {
        // $( ".log" ).text( "Triggered ajaxStart handler." );
        NProgress.start();

    });

    $(document).ajaxStop(function () {
        // $(".log").text("Triggered ajaxStop handler.");
    NProgress .done();

    });


    /* 公共 */

/* 1 左侧二级切换 */
/* 2 左侧菜单切换 */
/* 公共退出功能 */

$('#category').click (function() {
    // $(this).next().stop().slideDown();
    $(this).next().stop().slideToggle();

})

$('.icon_left').click (function() {
    // $(this).next().stop().slideDown();
    $(".aside").toggleClass('hidemenu');
    $(".lt_main").toggleClass('hidemenu');
    $(".lt_main .header").toggleClass('hidemenu');


})


// 3 退出功能

$('.lt_main .inco-right').click (function() {


  $('#myModal').modal('show')
 
    
})


$('#logoutBtn').click(function() {
    
  $.ajax({
    type:"get",
    url:'/employee/employeeLogout',
    dateType:"json",
    success:function(info) {
            if (info.success) {
                location.href = "login.html";
            }
    }




  })

})







})

