/*
 * 全站公共脚本,基于jquery-1.9.1脚本库
*/
$(function(){
	//flash
	if ( $(".flash").length )
	{
		var play_num =1;
		//设置轮播间隔时间
		var auto_time = 4000;
		//获取图片数量
		var auto_num = $(".ul_flash img").length;
		var auto_width = $(".flash").width();
		var auto_height = 400;
		//插入数字番号列表，并为首个列表单元添加样式
		$(".flash").addClass("swiper-container").append("<div class='pagination'></div>");
		$(".ul_flash").addClass("swiper-wrapper").find("li").addClass("swiper-slide");
		function flash()
		{
			//获取图片高度
			if ( document.documentElement.clientWidth >=640 )
			{
				//auto_width = 640;
				//auto_height = 400;
				auto_width = document.documentElement.clientWidth;
				auto_height = 400 * auto_width / 640;
			}
			else
			{
				auto_width = document.documentElement.clientWidth;
				auto_height = 400 * auto_width / 640;
			}
			$(".flash").width(auto_width).height(auto_height);
			$(".ul_flash li").width(auto_width);
			$(".ul_flash").width(auto_width*auto_num);
			//$(".pagination").css("left",(auto_width - $(".pagination").width()) / 1.05);
		}
		flash();
		$(window).resize(function(){flash()});
		var mySwiper = $('.swiper-container').swiper({
			pagination: '.pagination',
			mode:'horizontal',
			loop: true,
			autoplay:5000
		})
		//$(".pagination").css("left",(auto_width - $(".pagination").width()) / 1.05);
	}
})