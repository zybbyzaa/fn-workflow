var delay = 60;
$(function(){
    var submitForm = function() {
    }
    // 表单验证
    $("#register-form").validate({
        onkeyup:false,
        submitHandler: function(form) {
            submitForm();
        },
        rules: {
            phone: {
                required: true
            }
        },
        messages:{
            phone: {
                required: "请输入手机号"
            }
        },
        errorPlacement: function(error, element) {
            element.addClass('form-input--error');
            error.appendTo(element.parent().children(".error-msg"));
        },
        success: function(label,element) {
            $(element).removeClass('form-input--error');
            $(element).parent().children(".error-msg").empty();
        }
    });
    // 手机APP按钮点击事件
    $('.link-download').on('click',function(){
        $(this).toggleClass('link-download--active');
        $('.app-qrcode').fadeToggle(300);
    });
    // checkbox切换事件
    $('#checkBox').on('change',function(){
        $('.form-label').toggleClass('checked');
    });
    // 用户协议点击事件
    $('.user-protocol-link').on('click',function(){
        layer.open({
            type: 1,
            closeBtn: 0,
            shade: 0.1,
            scrollbar: false,
            title: false,
            area: "560px",
            content: $(".user-protocol-dialog")
        });
    });
    $(".close-button").on('click',function() {
        layer.closeAll()
    });
    // 验证码点击事件
    $(".verify-code-img").on('click',function() {
        var d = $(this).attr("src");
        var c = (new Date()).valueOf();
        var b = d.indexOf("?");
        if (b != -1) {
            d = d.substring(0, b)
        }
        d = d + "?timestamp=" + c;
        $(this).attr("src", d)
    });
});
// 短信验证码发送事件
var sendSMSCode = function() {

    $(".sms-code").css("background","#ccc");
	$(".sms-code").css("color","#fff");
	$(".sms-code").attr("onclick","javascript:void(0);");
	if(delay == 60 || delay == 0) {
		delay = 60;
	    delayURL();
	}
}

function delayURL() {
    //最后的innerHTML不能丢，否则delay为一个对象
    if (delay > 0) {
        delay--;
        var msg = "<label>{Time}</label>s";
        $(".sms-code").html(msg.replace("{Time}", delay));
        setTimeout("delayURL()", 1000);
        //此处1000毫秒即每一秒跳转一次
    } else {
        $(".sms-code").html("重新发送");
        $(".sms-code").attr("onclick","javascript:sendSMSCode();");
        $(".sms-code").css("background","#fff");
        $(".sms-code").css("color","#ff7e0c");
        delay = 60;
    }
}
