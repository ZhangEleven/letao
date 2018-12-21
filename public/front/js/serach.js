
  /*
   以下三句话, 放在控制台执行, 专门用于添加假数据
      var arr = [ "匡威", "阿迪王", "匡威王", "特步王" ];
      var jsonStr = JSON.stringify( arr );
      localStorage.setItem("search_list", jsonStr)
  * */

  $(function(){
      
      /*
      * 功能1: 历史记录渲染
      * (1) 从本地存储取出搜索历史
      * (2) 取出来的是 jsonStr, 转成数组
      * (3) 利用模板引擎渲染  (将数组包装成对象)
      * */

    //   一进入页面先渲染一次
     render()

    //   获取本地历史
    function getHistory(){
        var jsonStr = localStorage.getItem('search_list') || '[]'
        var arr = JSON.parse(jsonStr)
        return arr
    }

    //  读取本地路历史进行渲染
    function render(){
        var arr = getHistory()
        var htmlStr = template('searchTpl',{arr : arr})
        $('.lt_history').html(htmlStr)
    }
    

      /*
        * 功能2: 清空历史记录
        * (1) 给清空按钮添加点击事件 (事件委托绑定);
        * (2) 利用removeItem清空历史
        * (3) 重新渲染
        * */

    $('.lt_history').on('click','.btn_empty',function(){
        localStorage.removeItem('search_list')
        render()
    })


  /*
  * 功能3: 删除单个功能
  * (1) 给所有删除按钮, 添加点击事件  (事件委托绑定)
  * (2) 获取下标, 删除数组的对应项  splice(从哪开始, 删几个, 替换的项1, 替换的项2, .....);
  * (3) 将数组转成 jsonStr, 存储到本地历史中
  * (4) 重新渲染
  * */

//   $('.lt_history').on('click', 'btn_delete', function(){
//       var index = $(this).data('index')
//       var arr = getHistory()
//       //删除数组的对应项
//       arr.splicce(index , 1)

       
//   })


})