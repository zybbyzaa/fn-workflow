var _start =0;
var wrapHeight = $('.app-wrapper').height();
var tableHeight = $('.profit-table').height();
function drawChart(datalist,date){
    $("#pofit-chart").highcharts({
        title : false,
        chart: {
            margin: [10, 20, 24, 40]
        },
        credits:{
        	enabled: false
        },
        tooltip:{
        	backgroundColor:'#ff7e0c',
        	borderWidth:0,
              borderRadius: 5,
              shadow: false,
              style: {                      // 文字内容相关样式
                color: "#fff",
                fontSize: ".2rem",
                lineHeight: 1,
                padding: 5
              },
              useHTML: true,
              formatter: function(){
			if(this.y > 0){
				return '+' + this.y;
			}else{
				return this.y;
			}
		},
              valueDecimals: 2
        },
        xAxis: {
            startOnTick: true,
            categories:date,
            tickWidth: 0,
            tickmarkPlacement: 'on',
            minPadding: 0,
            lineColor: '#ff7e0c',
            labels: {
                //step: datalist.length-1,
                step: 1,
                style: {
                    color: "#b3b3b3"
                }
            }
        },
        yAxis: {
            title: false,
            allowDecimals: true,
            lineWidth: 0,
            gridLineColor: '#b3b3b3',
            gridLineWidth: 1,
            gridLineDashStyle: 'shortdash',
            tickmarkPlacement: 'on',
            minPadding: 0,
            labels: {
                style: {
                    color: "#b3b3b3"
                },
                formatter:function(){
                  if(this.value <= 0) {
                    return this.value;
                  }else {
                    return "+"+this.value;
                  }
                }
            }
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#ffca9b'],
                        [1, Highcharts.Color('#ffca9b').setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                	enabled:false
                },
                lineColor: '#e86913',
                lineWidth: 1,
                threshold: null
            }
        },
        series: [{
            data: datalist,
            type: 'area',
            states: { hover: { enabled: false }},
            marker: {
                enabled:false
            },
            linkedTo: ':previous',
            color: '#ecf2fd',
            zIndex: 0
        }]
    });

    //只显示第一个、最后一个及中间的三个数据
    var length = datalist.length;
    var opacity_index = [];//存放需要显示的点的x坐标的序号index值
    var all_check = false;//当需要显示的中间的那三个点都已经经过时，其他的点都需隐藏
    var check_num = 0;//最大值为3，当为3时all_check为true
    var x_axais = document.getElementsByClassName('highcharts-xaxis-labels')[0].childNodes;//所有x轴的点
    var i_in_list = false;//判断当前序号的是否是在显示列表内，true代表在，false不在
    if(length > 5){//5个以内全都显示
        for(var i = 0; i < 3; i++){
            opacity_index.push(Math.ceil((length-2)/4)*(i+1));//计算出需要显示的中间的三个点
        }

        for(var i = 1; i < length-1; i++){
            if(all_check){//如果需要检查的那三个序号都检查完了，那其他的都需要显示
                x_axais[i].setAttribute('opacity','0');
            }else{
                i_in_list = false;
                for(var index in opacity_index){
                    if(i == opacity_index[index]){
                        check_num++;
                        i_in_list = true;
                        break;
                    }
                }
                if(i_in_list){
                    if(check_num >= 3){
                        all_check = true;
                    }
                }else{
                    x_axais[i].setAttribute('opacity','0');
                }
            }
        }

    }

    x_axais[length-1].style.fill = '#ff7e0c';//最后一个点特殊色
}
$(function(){
    var hdHeight = $('.table-hd').height();
    var winHeight = $(window).height();
    var el = document.getElementById("data");
    drawChart([0.91, -1.54, +6.47, +9.22, 4.03, 6.01, 5.68, 8.52, 6.44, 4.19, -1.54, +6.47, +9.22, 4.03, 6.01, 5.68, 8.52, 6.44, 4.19, -1.54, +6.47, +9.22, 4.03, 6.01, 5.68, 8.52, 6.44, 4.19, -1.54, +6.47, +9.22, 4.03, 6.01, 5.68, 8.52, 6.44, 4.19, -1.54, +6.47, +9.22, 4.03, 6.01, 5.68, 8.52, 6.44, 4.19, -1.54, +6.47, +9.22, 4.03, 6.01, 5.68, 8.52, 6.44, 4.19],['10-01','10-02','10-03','10-04','10-05','10-06','10-07','10-08','10-09','10-10','10-02','10-03','10-04','10-05','10-06','10-07','10-08','10-09','10-10','10-02','10-03','10-04','10-05','10-06','10-07','10-08','10-09','10-10','10-02','10-03','10-04','10-05','10-06','10-07','10-08','10-09','10-10','10-02','10-03','10-04','10-05','10-06','10-07','10-08','10-09','10-10','10-02','10-03','10-04','10-05','10-06','10-07','10-08','10-09','10-10'])
    $(document).scroll(function(e){
        if($(document).scrollTop() > wrapHeight-tableHeight) {
            $('.table-hd').addClass('fixed-hd');
        } else {
            $('.table-hd').removeClass('fixed-hd');
        }
    });
    Transform(el);
    new AlloyFinger(el, {
        touchStart: function (evt) {
            _start = evt.touches[0].pageY;
        },
        touchEnd: function (evt) {
            if(el.translateY == -40) {
                $('#down').hide();
                $('#refresh').show();
                setTimeout(function(){
                    $("#data").append($(".worth-row").clone().slice(1,16));
                    $('#down').show();
                    $('#refresh').hide();
                    el.translateY = 0;
                    isCanRefresh = false;
                },3000)
            }
        },
        pressMove: function (evt) {
            var docHeight = $(document).height();
            var top = $(document).scrollTop();
            if(isCanRefresh && top+winHeight == docHeight && _start - evt.touches[0].pageY > 0){
                el.translateY = -40;
            }
        }
    });
});
