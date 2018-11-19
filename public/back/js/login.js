$(function () {

    //使用表单校验插件
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
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 8,
                        message: '用户名长度必须在2到8之间'
                    },
                    // //正则校验
                    // regexp: {
                    //     regexp: /^[a-zA-Z0-9_\.]+$/,
                    //     message: '用户名由数字字母下划线和.组成'
                    // }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 8,
                        message: '密码长度必须在5到12之间'
                    },
                    // //正则校验
                    // regexp: {
                    //     regexp: /^[a-zA-Z0-9_\.]+$/,
                    //     message: '用户名由数字字母下划线和.组成'
                    // }
                }
            },
        }

    });

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        console.log('阻止默认的提交');

        $.ajax({
            type: "post",
            url: '/employee/employeeLogin',
            data:$("#form").serialize(),
            dataType:'json',
            success:function(info) {
                console.log(info);
                if(info.success) {
                    location.href = "index.html"
                }
                if(info.error ===1000) {
                    alert(info.message)
                }
                if(info.error === 1001) {
                    alert(info.message)
                }
                
            }
        })


    });

    $('[type=reset]').on('click',function() {

        $("#form").data('bootstrapValidator').resetForm(true);
        

    })


})