// NProgress.start();

// 需求: 在第一个ajax发送的时候, 开启进度条
//       在全部的ajax回来的时候, 关闭进度条

//给document注册事件
$(document).ajaxStart(function() {
  NProgress.start()
})

$(document).ajaxStop(function() {
  setTimeout(function() {
    NProgress.done()
  }, 1000)
})

$(function() {
  // 二级导航
  var category = $(".lt_aside .nav .category")
  console.log(category)
  var childs = $(".lt_aside .nav .child")
  console.log(childs)

  category.click(function() {
    childs.stop().slideToggle()
    // console.log("xixixi")
  })

    //左侧菜单
  
  $('.icon_left').click(function() {
      // console.log('xixi');

      $('.lt_aside').toggleClass("hidemenu")
      $('.lt_top').toggleClass("hidemenu")
      $('.lt_content').toggleClass("hidemenu")
    })

    //右侧退出
    $('.icon_right').click(function() {
       
        $('#logoutModal').modal("show");
    });
    

    // 模态框中退出
    $('#outBtn').click(function() {
        // 发送ajax请求, 让后端销毁当前用户的登录状态
        $.ajax({
          type: "get",
          url: "/employee/employeeLogout",
          dataType: "json",
          success: function( info ) {
            console.log( info );
            if ( info.success ) {
              // 销毁登录状态成功
              location.href = "login.html";
            }
          }
        })
      })


})
