

$(function(){
    var currentPage = 1
    var pageSize = 3
    var picArr = []

    render()

    function render(){
        // 发送ajax请求
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page : currentPage,
                pageSize : pageSize
            },
            dataType:'json',
            success:function(info){
                console.log(info)
                var htmlStr = template('productTpl',info)
                $('tbody').html(htmlStr)
                
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil( info.total / info.size ),
                    onPageClicked:function(q, w, e, page){
                        currentPage = page
                        render()
                    }
                })
            }
        })
    }


    // 点击添加按钮
    $('.addBtn').click(function(){
        //模态框展示
        $('#addModal').modal("show")
    
        //发送ajax请求
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page : 1,
                pageSize : 100
            },
            dataType:"json",
            success:function(info){
                console.log(info)
                var htmlStr = template("dropdownTpl",info)
                $('.dropdown-menu').html(htmlStr)          
            }
        })
    })
    
    
      // 给所有的下拉框的 a 添加点击事件  事件委托
    
      $('.dropdown-menu').on('click', 'a' , function(){
          var txt = $(this).text()
          $('.dropdown_text').text(txt)
    
          var id = $(this).data('id')
          $('[name = "brandId"]').val(id)
    
          //手动修改隐藏域校验状态
        // $('#form').data('bootstrapValidator').updateStatus("brandId", "VALID")
      })
    
    
      //文件上传
      $('#fileupload').fileupload({
          dataType:'json',
          done:function(e,data){
            console.log(data)
            var picObj = data.result
            picArr.unshift( picObj )
            var picUrl = picObj.picAddr

         // 将新得到的图片, 添加到结构最前面
            $('#imgBox').prepend('<img src = " '+ picUrl+' " style="width: 100px" alt="">')

            if(picArr.length > 3){
                picArr.pop()
                $('#imgBox img:last-of-type').remove()
            }

            if(picArr.length === 3){
                $('#form').data('bootstrapValidator').updateStatus("picStatus", "VALID")
            }
            console.log( picArr );

          }
      })



    //   表单校验
    $('#form').bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',         // 校验成功
            invalid: 'glyphicon glyphicon-remove',   // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
          },
          fields:{
              brandId:{
                  validators:{
                      notEmpty:{
                           message:'请选择二级分类'
                      }
                  }
              },
              proName:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品名称'
                        }
                    }             
             },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'请输入商品描述'
                    }
                }   
            },
            num:{
                validators:{
                    notEmpty:{
                        message:'请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,     // 1   11    121
                        message: '商品库存必须是非零开头的数字'
                    }
                }       
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    // 正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码要求必须是 xx-xx 的格式, xx为两位数字'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
        
            // 标记图片是否上传满 3 张
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传 3 张图片"
                    }
                }
            }
        }
    })


    // 注册表单校验成功事件 阻止默认提交

    $('#form').on('success.form.bv',function(e){
        e.preventDefault()

        var paramsStr = $('#form').serialize()
        paramsStr += "&picArr=" + JSON.stringify( picArr )

        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:paramsStr,
            dataType:'json',
            success:function( info ){
               console.log(info);
               if( info .success){
                   $('#addModal').modal('hide')
                   currentPage = 1
                   render()

                //    重置
                $('#form').data('bootstrapValidator').resetForm(true)
                //下拉按钮和图片重置
                $('.dropdown_text').text("请选择二级分类");
                $('#imgBox img').remove();
                picArr = [];
                
               }
               
            }
        })
    })
})    


