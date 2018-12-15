
$(function() {
    $('#form').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },

        
        fields:{
            username:{
                validators:{
                    //非空
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    //长度校验
                    stringLength:{
                        min:2,
                        max:6,
                        message:'用户名长度必须在2~6位之间'
                    },
                    callback:{
                        message:'用户名不存在!'
                    }

                }
            },
            password:{
                validators:{
                    //非空
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度必须在6~12位之间'
                    },
                    callback:{
                        message:'密码错误!'
                    }
                }
            }
        }

    })

    $('#form').on('success.form.bv',function(e){
        e.preventDefault();
        //通过ajax提交
        $.ajax({
            type:'post',
            data: $('#form').serialize(),
            url: '/employee/employeeLogin',
            dataType:'json',
            success:function(info){
                console.log(info)
                //成功跳转到首页
                if(info.success){
                    location.href = 'index.html'
                }
                if(info.error === 1000){
                    $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }
                if(info.error === 1001){
                    $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
                
            }            
            
        })
    })


    //重置按钮
    $('[type = "reset"]').click(function(){
        $('#form').data("bootstrapValidator").resetForm();
    })

})