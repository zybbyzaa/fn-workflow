//防止多次点击
var canClickLottery = true;
var g_Interval = 20;  // 数字转动的频率
var g_PersonCount = 9;//参加抽奖的数字
var g_Timer;          //数字转动的timer

Date.prototype.format = function(format) {
    /*
     * eg:format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+" : this.getMonth() + 1, // month
        "d+" : this.getDate(), // day
        "h+" : this.getHours(), // hour
        "m+" : this.getMinutes(), // minute
        "s+" : this.getSeconds(), // second
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" : this.getMilliseconds()
        // millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
                        - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? o[k]
                            : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

function updateRndNum(){
    var num_1 = Math.floor(Math.random()*g_PersonCount+1);
    var num_2 = Math.floor(Math.random()*g_PersonCount+1);
    var num_3 = Math.floor(Math.random()*g_PersonCount+1);
    var num_4 = Math.floor(Math.random()*g_PersonCount+1);
    var num_5 = Math.floor(Math.random()*g_PersonCount+1);
    var num_6 = Math.floor(Math.random()*g_PersonCount+1);
    $('.ResultNum1').html(num_1);
    $('.ResultNum2').html(num_2);
    $('.ResultNum3').html(num_3);
    $('.ResultNum4').html(num_4);
    $('.ResultNum5').html(num_5);
    $('.ResultNum6').html(num_6);
}

function beginTimer(){
    g_Timer = setTimeout(beat, g_Interval);
}

function beat() {
    g_Timer = setTimeout(beat, g_Interval);
    updateRndNum();
}

$(function(){
    beginTimer();
    $('.stop-btn').on('click',function(e){
        if(canClickLottery){
            canClickLottery = false;
        }else{
            return ;
        }
        setTimeout(function(){
            canClickLottery = true;
            //数字停止滚动
            clearTimeout(g_Timer);
            var result_str =  '007000';
            $('.ResultNum1').html(result_str[0]);
            $('.ResultNum2').html(result_str[1]);
            $('.ResultNum3').html(result_str[2]);
            $('.ResultNum4').html(result_str[3]);
            $('.ResultNum5').html(result_str[4]);
            $('.ResultNum6').html(result_str[5]);
            setTimeout(function(){
                // 设置体验卷上的体验金金额
                $('.amount').html(parseInt(result_str.slice(0,3))+','+result_str.slice(3,result_str.length));
                $('.box-slot').hide(200);
                $('.box-form').show(200);
            },1000);
        },500);
    });
    $('.slot-checkbox,.checkbox').on('click',function(e){
        if($('.slot-checkbox').hasClass('checked')){
            $('.slot-checkbox').removeClass('checked');
        } else{
            $('.slot-checkbox').addClass('checked');
        }
    });
    $('.form-checkbox,.checkbox').on('click',function(e){
        if($('.form-checkbox').hasClass('checked')){
            $('.form-checkbox').removeClass('checked');
        } else{
            $('.form-checkbox').addClass('checked');
        }
    });
    //注册第一步的按钮点击事件
    $('.js-goto-step2').on('click',function(e){
        //验证手机发送验证码

        //显示第二步的界面
        $('#registerFormStep1').fadeOut();
        $('#registerFormStep2').fadeIn();
    });
    // 跳转到登录界面的点击事件
    $('.js-goto-login').on('click',function(e){
        $('#registerFormStep1').fadeOut();
        $('#loginForm').fadeIn();
    });
    // 跳转到注册界面的点击事件
    $('.js-goto-register').on('click',function(e){
        $('#registerFormStep1').fadeIn();
        $('#registerFormStep2').fadeOut();
        $('#loginForm').fadeOut();
    });
});
