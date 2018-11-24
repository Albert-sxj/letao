$(function () {
    var currentPage = 1;
    var pageSize = 5;

    render();
    // 封装渲染页
    function render(currentPage, pageSize) {

        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            dataType: 'json',
            data: {
                page: currentPage || 1,
                pageSize: pageSize || 5,
            },

            success: function (info) {
                // console.log(info);

                var htmlStr = template('categoryTpl', info);



                $('tbody').html(htmlStr);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage, //当前页
                    totalPages: Math.ceil(info.total / info.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render(currentPage)


                    }
                });


            }



        })



    }



    //    添加模态框

    $('#addBtn').click(function () {


        $('#addModal').modal('toggle');

        // 点击添加分类的时候请求一级分类列表

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100,
            },
            dataType: 'json',

            success: function (info) {

                // console.log(info);

                var htmlStr = template('dropdownTpl', info);

                $('.dropdown-menu').html(htmlStr);



            }



        })



    })

    // 选中一级分类
    $('.dropdown-menu').on('click', "a", function () {

        var txt = $(this).text();

        // console.log(txt);

        $('#dropdownText').text(txt);

        var id = $(this).data('id');
        // console.log(id);


        $('[name=categoryId]').val(id);

        $("#form").data('bootstrapValidator').updateStatus("categoryId", "VALID");





    })


    // 调用 fileUpload


    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            // 获取图片地址
            var result = data.result;
            // console.log(result);
            var picAddr = result.picAddr;

            $('#img').attr('src', picAddr);
            $('[name=brandLogo]').val(picAddr)
            $("#form").data('bootstrapValidator').updateStatus("brandLogo", "VALID")


        }
    });





    // 5 添加表单校验

    //使用表单校验插件
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级分类'
                    },


                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    },


                }
            },

            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传图片'
                    },


                }
            },

        }

    });

    // 表单校验完成后阻止默认提交  使用ajax提交
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑

        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    $('#addModal').modal('toggle');
                    render();
                    $("#form").data('bootstrapValidator').resetForm(true);

                }

            }


        })


    });






})