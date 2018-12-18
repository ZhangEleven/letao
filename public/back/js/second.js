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
      success: function(info) {
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

  $(".addBtn").click(function() {
    $("#addModal").modal("show")

    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      dataType: "json",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function(e) {
        console.log(e)
        var htmlStr = template("dropdownTpl", e)
        $(".dropdown-menu").html(htmlStr)
      }
    })
  })

  // 下拉列表注册点击事件 事件委托
  $(".dropdown-menu").on("click", "a", function() {
    var txt = $(this).text()
    console.log(txt)

    $(".dropdown_text").text(txt)
    var id = $(this).data("id")
    console.log(id)

    // 赋值给隐藏域
    $('[name = "categoryId"]').val(id)

    // 更新隐藏域的校验状态
    // $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID")
  })

  //  调用fileupload方法完成文件上传初始化
  $("#fileupload").fileupload({
    dataType: "json",
    done: function(e, data) {
      console.log(data)
      var result = data.result
      var picUrl = result.picAddr

      // 设置给img的src属性
      $("#imgBox img").attr("src", picUrl)
      $('[name ="brandLogo"]').val(picUrl)
      // $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  })

  //表单校验
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入一级分类"
          }
        }
      },
       //长度校验
       brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  })

  $("#form").on("success.form.bv", function(e) {
    e.preventDefault()

    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("#form").serialize(),
      dataType: "json",
      success: function(info) {
        console.log(info)
        if (info.success) {
          // 关闭模态框
          $("#addModal").modal("hide")
          // 重新渲染第一页
          currentPage = 1
          render()

          // 重置
          $("#form")
            .data("bootstrapValidator")
            .resetForm(true)

          $(".dropdown_text").text("请选择一级分类")
          $("#imgBox img").attr("src", "./images/none.png")
        }
      }
    })
  })
})
