$(function () {

    var currentPage = 1;
    var pageSize = 5;

    render();

function render(currentPage,pageSize) {
    $.ajax({
        type: "get",
        url: '/user/queryUser',
        data: {
            page: currentPage || 1,
            pageSize: pageSize || 5,
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);

            var htmlStr = template('tmp', info);

            $('tbody').html(htmlStr);

            // 分页插件
            $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                currentPage: info.page, //当前页
                totalPages: Math.ceil(info.total / info.size), //总页数
                // size:"small",//设置控件的大小，mini, small, normal,large
                onPageClicked: function (event, originalEvent, type, page) {
                    //为按钮绑定点击事件 page:当前点击的按钮值

                   currentPage = page;

                   render(currentPage);

                }
            });


        }


    })

}



// 2 点击启用禁用模态框 是动态生成了 事件委托

var currentId ;

var isDelete;

 $('tbody').on('click',".btn ",function() {

  
    $('#userModal').modal('show');

   currentId = $(this).parent().data("id");

   isDelete =  $(this).hasClass('btn-danger')? 0 : 1;






 })
    

    // 3点击模态框 确定 完成用户的启用和禁用

    $("#submitBtn").click(function() {

        $.ajax({

            type:'post',
            url:'/user/updateUser',
            data: {
                id:currentId,
                isDelete:isDelete ,
            },
            dataType:'json',
            success:function(info) {


                if(info.success) {

                    render();
                    $('#userModal').modal('toggle');

                }
               
                
            }
      


        })




   })
    



})