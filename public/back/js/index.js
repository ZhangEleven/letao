

$(function() {
  // 绘制柱状图
  var echarts_left = echarts.init(document.querySelector(".echarts_left")); 
  var option1 = {
    // 大标题
    title: {
      text: '2018年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',   
      data: [500, 400, 1000, 600, 700, 400]
    }]
  };

  echarts_left.setOption(option1);



  // 绘制饼图
  var echarts_right = echarts.init(document.querySelector(".echarts_right"));

  var option2 = {
    // 标题组件
    title : {
      text: '热门品牌销售',
      
      subtext: '2018年12月',
     
      x:'center',


    },
    // 提示框组件
    tooltip : {
      trigger: 'item',
     
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','阿迪王','老北京','老奶奶']
    },
  
    series : [
      {
        name: '热门品牌',
        type: 'pie',   
        radius : '55%', 
        center: ['50%', '60%'], 
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'阿迪王'},
          {value:135, name:'老北京'},
          {value:1548, name:'老奶奶'}
        ],
      
      }
    ]
  };

  echarts_right.setOption(option2);
})
