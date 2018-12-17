$(function() {
  var currentPage = 1
  var pageSize = 5
  render()
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(e) {
        // console.log(e)
        var htmlStr = template("firsttpl", e)
        $("tbody").html(htmlStr)

        // 配置分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: e.page,
          totalPages: Math.ceil(e.total / e.size),
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

  //给添加按钮注册点击事件 显示模态框

  $(".addBtn").on("click", function() {
    $("#addModal").modal("show")
  })

  //表单插件校验

  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  })

  // 阻止默认提交
  $("#form").on("success.form.bv", function(e) {
    // 阻止默认的提交
    e.preventDefault()

    // 发送 ajax
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("#form").serialize(),
      dataType: "json",
      success: function(info) {
        console.log(info)
        if (info.success) {
          // 关闭模态框
          $("#addModal").modal("hide")
          // 重新渲染第1页
          currentPage = 1
          render()

          // 重置表单内容
          // resetForm(true)  表示内容和状态都重置
          // resetForm()      只重置状态
          $("#form")
            .data("bootstrapValidator")
            .resetForm(true)
        }
      }
    })
  })
})
