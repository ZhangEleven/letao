

// 分页
$(function() {
  var currentPage = 1
  //指定一页有多少条
  var pageSize = 6

  //页面一加载调用一次
  render()

  function render() {
    //发送ajax请求
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function(e) {
        console.log(e)
        var htmlStr = template("tpl", e)
        $(".lt_main tbody").html(htmlStr)

        //在成功后的回调函数中配置分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,

          //当前页
          currentPage: e.page,
          //总页数
          totalPages: Math.ceil(e.total / e.size),

          //当页面被点击时触发
          onPageClicked: function(a, b, c, page) {
            currentPage = page
            // 调用
            render()
          }
        })
      }
    })
  }
  
  // 禁用模态框
  // 事件委托
  $('tbody').on('click','.btn',function(){
    // console.log('xuxuxu');
    $('#userModal').modal('show')
  
    // 获取id
    currentId = $(this).parent().data('id')
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1
  
  })
  
  $('#submitBtn').click (function(){
    
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id : currentId,
        isDelete : isDelete
      },
      success:function(e){
        // console.log('e')
        if(e.success){
          $('#userModal').modal('hide')
          render()
        }
        
      }
    })
  
  }) 
  

})  





