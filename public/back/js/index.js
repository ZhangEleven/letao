

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
      data: ['蒂芙尼','ck','宝格丽','Boy','AJ']
    },
  
    series : [
      {
        name: '热门品牌',
        type: 'pie',   
        radius : '55%', 
        center: ['50%', '60%'], 
        data:[
          {value:310, name:'蒂芙尼'},
          {value:234, name:'ck'},
          {value:135, name:'宝格丽'},
          {value:335, name:'Boy'},
          {value:1548, name:'AJ'},
        ],
      
      }
    ]
  };

  echarts_right.setOption(option2);
})
