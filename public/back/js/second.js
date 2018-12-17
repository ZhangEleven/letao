$(function() {
    var currentPage = 1
    var pageSize = 5
    render()
    function render() {
      $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
          page: currentPage,
          pageSize: pageSize
        },
        dataType: "json",
        success: function( info ) {
          // console.log(e)
          var htmlStr = template("secondtpl", info)
          $("tbody").html(htmlStr)
  
          // 配置分页
          $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion: 3,
            currentPage: info.page,
            totalPages: Math.ceil(info.total / info.size),
            //添加点击事件
            onPageClicked: function(q, w, e, page) {
              // console.log(page)
              currentPage = page
              render()
            }
          })
        }
      })
    }

  // 2. 点击添加分类按钮, 显示模态框

  $('.addBtn').on('click',function(){
      $('#addModal').modal('show')
  })


  $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      dataType:'json',
      data:{
          page : 1,
          pageSize : 100
      },
      success:function(e){
        console.log(e);
        var htmlStr = template('dropdownTpl',e)
        $('.dropdown-menu').html(htmlStr)
        
      }
  })
  





})