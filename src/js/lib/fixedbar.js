//判断是不是IE8，是的话返回true,否则返回false;
function isBrowserIE8(){
	var flag = true;
	if(navigator.userAgent.indexOf("MSIE")>0)
	{
	    if(navigator.userAgent.indexOf("MSIE 8.0")>0)
	    {
	    	return flag;
	    }
	}else
		{
			flag = false;
			return flag;
		}
}

var isServiceSideBarOn = false;

function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    return { 'x': x, 'y': y };
}

$(document).ready(function () {


	if(parseInt($(window).scrollTop()) <= parseInt($(window).height())){
		$('.index-part-fixedbar-top').css({'display':'none'});
	}

	if($(window).height() <= 960 && $(window).height() >= 480){
		 $('.index-part-fixedbar').css({'top':'75%'});

	 }else if($(window).height() >= 960){
		 $('.index-part-fixedbar').css({'top':'50%'});
	 }else if($(window).height() <= 480){
		 if($(window).scrollTop() <= 480){
			 $('.index-part-fixedbar').css({'display':'none'});
		 }else{
			 $('.index-part-fixedbar').css({'display':'block','top':'75%'});
		 }
	 }

	$('.index-part-fixedbar-service').hover(function(e){//悬浮在固定边栏时出现客服信息
		 $(this).children('.index-part-fixedbar-service-img').addClass('index-part-fixedbar-service-imghover');
		 $(this).css({'background':'#ff781e'});
		 var html = $(".fixedbar-service-wrap").html();
			layer.tips(html, '.index-part-fixedbar-service', {
			  tips: [4, '#fff'], //还可配置颜色
			  area:  ['231px', '149px'],
			  time: 60000
			});
			isServiceSideBarOn = true;
		$('.layui-layer-tips').hover(function(e){//每一次都要重新绑定
		},function(e){
			layer.closeAll('tips');
		});

	},function(e){

		$(this).children('.index-part-fixedbar-service-img').removeClass('index-part-fixedbar-service-imghover');
		 $(this).css({'background':'#fff'});
		 //layer.closeAll('tips');
		 isServiceSideBarOn = false;
		 var service_position = $('.index-part-fixedbar-service').offset();
		 var top = service_position.top;
		 var left = service_position.left
		 var left_side = left + $('.index-part-fixedbar-table').width();
		 var hand_position = getMousePos(e);
		 var y = hand_position.y;
		 var x = hand_position.x;
		 if(top > y || left_side < x){
			 layer.closeAll('tips');
		 }
	});



	$('.index-part-fixedbar-compute').hover(function(e){//鼠标悬浮边栏计算图标变换
		layer.closeAll('tips');
		 //$(this).children('img').attr('src',contextPath + '/images/index_images/float_icon4.png');
		 $(this).css({'background':'#ff781e'});
		 $(this).children('.index-part-fixedbar-compute-img').addClass('index-part-fixedbar-compute-imghover');
	},function(e){
		 //$(this).children('img').attr('src',contextPath + '/images/index_images/float_icon3.png');
		 $(this).css({'background':'#fff'});
		 $(this).children('.index-part-fixedbar-compute-img').removeClass('index-part-fixedbar-compute-imghover');
	});

	$('.index-part-fixedbar-top').hover(function(e){//鼠标悬浮边栏计算图标变换
		 //$(this).children('img').attr('src',contextPath + '/images/index_images/top-hover.png');
		 $(this).css({'background':'#ff781e'});
		 $(this).children('.index-part-fixedbar-top-img').addClass('index-part-fixedbar-top-imghover');
	},function(e){
		 //$(this).children('img').attr('src',contextPath + '/images/index_images/top.png');
		 $(this).css({'background':'#fff'});
		 $(this).children('.index-part-fixedbar-top-img').removeClass('index-part-fixedbar-top-imghover');
	});

	$('.index-part-fixedbar-compute').on('click',function(e){//点击悬浮边栏计算图标 弹出计算框
		 $('.fixedbar-compute-shadowbg').fadeIn();
		 var win_width = $(window).width();
		 var win_height = $(window).height();
		 var position_top = (win_height - $('.fixedbar-compute-shadow').height())/2;
		 var position_left = (win_width - $('.fixedbar-compute-shadow').width())/2;
		 $('.fixedbar-compute-shadow').css({'top':position_top+'px','left':position_left+'px'}).fadeIn();
	});

	//------------ 在计算框 显现时 点击背景使其消失的事件
	$('.fixedbar-compute-shadowbg').on('click',function(){
		$('.fixedbar-compute-shadow').fadeOut();
		$('.fixedbar-compute-shadowbg').fadeOut();
	});
	//------------ 在计算框 显现时 点击其关闭按钮使其消失的事件
	$('.fixedbar-compute-close-btn').on('click',function(){
		$('.fixedbar-compute-shadow').fadeOut();
		$('.fixedbar-compute-shadowbg').fadeOut();
	});

	//计算框 中 重置按钮
	$('.fixedbar-reset-btn').on('click',function(e){
		 $('.fixedbar-compute-top-input-rate').val('');
		 $('.fixedbar-compute-top-input-money').val('');
		 $('.fixedbar-compute-top-input-date').val('');
		 $(".fixedbar-compute-top-select").val("default");
	});

	/* ---右侧悬浮导航中 回到顶部 的点击事件 ---*/
	$('.index-part-fixedbar-top').on('click',function(e){
		if(isBrowserIE8()){
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
			window.pageYOffset = 0;
		}
		$('body').animate({scrollTop:0}, 512);
	    return false;
	});

	$('#calculator_amount,#calculator_interestRate,#calculator_investmentTerm').focus(function() {
		$(this).css("border-color","");
	});

});

$(window).resize(function(e){
	 var win_width = $(window).width();
	 var win_height = $(window).height();
	 var position_top = (win_height - $('.fixedbar-compute-shadow').height())/2;
	 var position_left = (win_width - $('.fixedbar-compute-shadow').width())/2;
	 $('.fixedbar-compute-shadow').css({'top':position_top+'px','left':position_left+'px'});
	 if($(window).height() <= 960 && $(window).height() >= 480){
		 $('.index-part-fixedbar').css({'top':'75%'});
	 }else if($(window).height() >= 960){
		 $('.index-part-fixedbar').css({'top':'50%'});
	 }else if($(window).height() <= 480){
		 if($(window).scrollTop() <= 480){
			 $('.index-part-fixedbar').css({'display':'none'});
		 }else{
			 $('.index-part-fixedbar').css({'display':'block','top':'75%'});
		 }
	 }
});

$(document).scroll(function(){
	if(parseInt($(window).scrollTop()) <= parseInt($(window).height())){
		$('.index-part-fixedbar-top').css({'display':'none'});
	}else{
		$('.index-part-fixedbar-top').css({'display':'block'});
	}
	 var service_offset = $('.index-part-fixedbar-service').offset();
	 var service_top = service_offset.top;

	 if(isServiceSideBarOn = true){//这是为了tips跟随fixedbar移动
		 $('.layui-layer-tips').css({'top':service_top+'px'});
	 }
});

var changeCalculatorBidType = function(value) {
	if (value == 2) {
		$("#investmentTerm-type").text("天");
	}else if(value == 8) {
		$("#investmentTerm-type").text("个月");
	}
}

var calculateIncome = function () {
	var amountStr = $("#calculator_amount").val();
	var interestRateStr = $("#calculator_interestRate").val();
	var bidType = $("#calculator_bid_type").val();
	var investmentTermStr = $("#calculator_investmentTerm").val();

	var reg = new RegExp("^[0-9]*$");

	if(!reg.test(amountStr)) {
		$("#calculator_amount").val("");
		$("#calculator_amount").attr("placeholder","请输入正确格式的数字");
		$("#calculator_amount").css("border-color","red");
		return ;
	}
	var amount = parseFloat(amountStr);
	if (!amount || amount <= 0) {
		$("#calculator_amount").val("");
		$("#calculator_amount").attr("placeholder","金额必须大于0");
		$("#calculator_amount").css("border-color","red");
		return ;
	}

	var patten = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
	if(!patten.test(interestRateStr)) {
		$("#calculator_interestRate").val("");
		$("#calculator_interestRate").attr("placeholder","请输入正确格式的小数");
		$("#calculator_interestRate").css("border-color","red");
		return ;
	}

	var interestRate = parseFloat(interestRateStr);
	if (!interestRate || interestRate <= 0) {
		$("#calculator_interestRate").val("");
		$("#calculator_interestRate").attr("placeholder","年利率必须大于0");
		$("#calculator_interestRate").css("border-color","red");
		return ;
	}

	if(!reg.test(investmentTermStr)) {
		$("#calculator_investmentTerm").val("");
		$("#calculator_investmentTerm").attr("placeholder","请输入正确格式的数字");
		$("#calculator_investmentTerm").css("border-color","red");
		return ;
	}

	var investmentTerm = parseInt(investmentTermStr);
	if (!investmentTerm || investmentTerm <= 1) {
		$("#calculator_investmentTerm").val("");
		$("#calculator_investmentTerm").attr("placeholder","期限必须大于1");
		$("#calculator_investmentTerm").css("border-color","red");
		return ;
	}

	if (bidType == 2) {
		var income = amount * interestRate * investmentTerm / 36500 ;
		var totalAmount = amount + income;
		$(".fixedbar-compute-result-total").text( totalAmount.toFixed(2) + "元");
		$(".fixedbar-compute-result-interest").text( income.toFixed(2) + "元");

	}else if(bidType == 8) {
		var month_rate = interestRate / 1200;
		var pow = Math.pow((1 + month_rate), investmentTerm);
		var profit = amount * month_rate * pow / (pow - 1);
		var income = profit * investmentTerm - amount;
		$(".fixedbar-compute-result-total").text( profit.toFixed(2) + "元 * " + investmentTerm + "期");
		$(".fixedbar-compute-result-interest").text( income.toFixed(2) + "元");
	}
}

var calculateReset = function() {
	$("#calculator_amount").val("");
	$("#calculator_interestRate").val("");
	$("#calculator_bid_type").val(2);
	$("#calculator_investmentTerm").val("");
}
