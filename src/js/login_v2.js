$(function(){
    var submitForm = function() {
    }
    // 表单验证
    $("#login-form").validate({
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
    // banner跳转事件
    $('.banner').on('click',function(){
        var url = $(this).data('url');
        location.href = url;
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
});
