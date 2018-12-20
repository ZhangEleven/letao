
$(function(){
    
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        dataType:'json',
        success:function( e ){
            console.log( e );
            var htmlStr = template("leftTpl", e);
            $('.lt_category_left ul').html( htmlStr );
            renderById( e.rows[0].id );
        }
    })

    $('.lt_category_left ul').on("click", "a", function() {

        $('.lt_category_left ul a').removeClass("current");  // 先去掉所有a的 current  排他
        $(this).addClass("current"); 

        // 2. 渲染二级分类
        var id = $(this).data("id");
        renderById( id );
    })

    

    // 根据 一级分类的 id 完成 二级分类的 渲染
    function renderById( id ) {
        // 发送 ajax, 获取二级分类数据, 进行模板渲染
        $.ajax({
        type: "get",
        url: "/category/querySecondCategory",
        data: {
            id: id
        },
        dataType: "json",
        success: function( info ) {
            console.log( info )
            var htmlStr = template("rightTpl", info);
            $('.lt_category_right ul').html( htmlStr );
        }
        })
    }
        
})