//定义 log
var log = console.log.bind()

//生成 html,并插入到页面
var insertHtml = function(obj) {
    var t = `
    <div class="result_now">
        <h1 class='result_city_name'>${obj.city}天气查询结果</h1>
        <div class="result_temperature">当前气温：${obj.wendu}</div>
        <div class="result_aqi">空气质量指数：${obj.aqi}</div>
        <div class="result_fengli">风力等级：${obj.fl}</div>
        <div class="result_fengxiang">风向：${obj.fx}</div>
    </div>
    `
    //插入到页面
    var result = document.querySelector('.result')
    result.innerHTML = ''
    result.innerHTML += t
}

// ajax 回调函数 (参数是请求返回的数据)
var success = function(data) {
    log('data is',data)
    var input = document.querySelector('.input_city_name')
    var value = input.value
    //判断返回的数据是否正确
    if (data.desc == 'OK') {
        //城市
        var city = data.data.city
        //当前气温
        var nowTemperature = data.data.wendu
        //最低气温
        var low = data.data.forecast[0].low
        //最高气温
        var high = data.data.forecast[0].high
        //空气质量
        var aqi = data.data.aqi || '无数据'
        //感冒等级
        var ganmao = data.data.ganmao
        //风力
        var fl = data.data.forecast["0"].fengli
        //风向
        var fx = data.data.forecast["0"].fengxiang
    } else {
        var city = value
        //当前气温
        var nowTemperature = '无数据'
        //最低气温
        var low = '0'
        //最高气温
        var high = '0'
        //空气质量
        var aqi = '无数据'
        //感冒等级
        var ganmao = '无数据'
        //风力
        var fl = '无数据'
        //风向
        var fx = '无数据'
    }
    //生成对象
    var obj = {
        city: city,
        wendu: nowTemperature,
        low: low,
        high: high,
        aqi: aqi,
        ganmao: ganmao,
        fl: fl,
        fx: fx,
    }
    //生成 HTML 插入页面
    insertHtml(obj)
}

//查询天气函数
var weatherQuery = function() {
    var input = document.querySelector('.input_city_name')
    var value = input.value
    //从城市列表对象中查找对应的城市 ID，用于请求的 url
    var cityNum = cityList[value]
    // 设置 $ajax 参数
    var options = {
        //是否异步
        async: true,
        //请求方法
        type: "GET",
        //请求地址
        url: "http://wthrcdn.etouch.cn/weather_mini?citykey=" + cityNum,
        //请求错误时调用的函数
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus)
            alert(errorThrown)
            this // 调用本次AJAX请求时传递的options参数
        },
        //返回数据的格式
        dataType: "json",
        //回调函数 (参数是请求返回的数据)
        success: success,
    }
    //发送 ajax 请求
    $.ajax(options)
}

//绑定查询按钮点击事件
var bindQuery = function() {
    var query = document.querySelector('.button_query')
    query.addEventListener('click', weatherQuery)
}

//main
var main = function() {
    bindQuery()
}

main()
