$(function () {

    var currentPage;
    var pageSize;

    render();

    function render(currentPage, pagesize) {

        //   1发送ajax请求 进行页面渲染  
        $.ajax({

            type: 'get',
            url: "/category/queryTopCategoryPaging",

            data: {
                page: currentPage || 1,
                pageSize: pageSize || 5,

            },
            dataType: "json",
            success: function (info) {

                // console.log(info);

                var htmlStr = template('categoryTpl', info);

                $('tbody').html(htmlStr);
                // 分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage, //当前页
                    totalPages: Math.ceil(info.total / info.size), //总页数
                    // size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        console.log(page);
                        currentPage = page;

                        render(currentPage);


                    }
                });



            }



        })

    }

    $('#add_category').click(function () {


        $('#addModal').modal('toggle');



    })










    //   表单校验

    $("#form").bootstrapValidator({


        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '分类不能为空'
                    },


                }
            },
        }

    });



    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();

        // 添加一级分类
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#form').serialize(),
            dataType: "json",
            success: function (info) {

                if (info.success) {
                    $('#addModal').modal('toggle');
                    render(1);

                    $("#form").data('bootstrapValidator').resetForm(true);

                }


            }


        })

    });



})