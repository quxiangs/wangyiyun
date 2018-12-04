$(function(){

$("#logoText").mouseover(function(){
			$("#logoText #arr").removeClass().addClass("arrb");
			$("#signto").css("display","block");
		}).mouseout(function(){
			$("#logoText #arr").removeClass().addClass("arrt");
			$("#signto").css("display","none");
		});
		$("#signto li").hover(function(){
			$(this).css("background","#f8f8f8");
		},function(){
			$("li").css("background","");
		});



var cookie = localStorage.getItem(userlogin+"shopping");
	console.log(cookie)
	// 轮播设置
	var timer = setInterval(aotuPlay,2000);
	var bannerss = ["beatsbg.png","chovboxbg.jpg","cc.png","facialbg.png","fallbg.jpg","yiyanbg.png"]
	var index = 0;
	function aotuPlay(){
		if(index == 5){
			index =0;
		}else{
			index ++;
		}
		$("#ul_ban li").eq(index).show(1000).siblings().hide(1200);
		$(".banner")[0].style.background = `url(img/${bannerss[index]})`;
		$("#olIndex li").eq(index).addClass("olIndex").siblings().removeClass();
	}
	$(".banner").mouseover(function(){
		clearInterval(timer);
	}).mouseout(function(){
		clearInterval(timer);
		timer = setInterval(aotuPlay,2000);
	});
	$("#olIndex li").click(function(){
		index = $(this).index();
		$("#ul_ban li").eq(index).show().siblings().hide();
		$(".banner")[0].style.background = `url(img/${bannerss[index]})`;
		$(this).addClass("olIndex").siblings().removeClass();
	});
	$(".arrL").click(function(){
		if(index == 0){
			index = 5;
		}
		else{
			index --;
		}
		$("#ul_ban li").eq(index).show().siblings().hide();
		$(".banner")[0].style.background = `url(img/${bannerss[index]})`;
		$("#olIndex li").eq(index).addClass("olIndex").siblings().removeClass();
	});
	$(".arrR").click(function(){
		if(index == 5){
			index = 0;
		}
		else{
			index ++;
		}
		$("#ul_ban li").eq(index).show().siblings().hide();
		$(".banner")[0].style.background = `url(img/${bannerss[index]})`;
		$("#olIndex li").eq(index).addClass("olIndex").siblings().removeClass();
	});
	//侧导航定位的处理
	$(window).scroll(function(){
		var scro = $("body,html").scrollTop();
		if(scro>=310){
			$("#gdbR").css("position","fixed");
			$("#gdbR").css("top","192px");
		}else{
			$("#gdbR").css("position","absolute");
			$("#gdbR").css("top","0px");
		}
	});
	$("#Top").click(function(){
		$("body,html").scrollTop(0);
	});
	//改变登录状态
	var userlogin = localStorage.getItem("uname");
	var cookie = localStorage.getItem(userlogin+"shopping");
	var cookieArr = JSON.parse(cookie);
		var countS = 0;
			if(cookieArr){
				for(var i = 0; i < cookieArr.length; i++){
				console.log(parseInt(cookieArr[i].count))
				countS += parseInt(cookieArr[i].count);
				}
				$(".countS").html(countS);
		}
	if(userlogin){
		$(".text").html(userlogin);
		$(".text").css("color","#d33a31");
		// console.log(userlogin);
	}else{
		$(".text").html("登录");
	}
		//推介商品的数据处理
			$.ajax({
				type:"get",
				url:"php/tuijie.php",
				success:function(res){
					var jsons = JSON.parse(res);
					var strs ="";
					for(var j =0;j<jsons.length;j++){
						strs+=`
							<div class="list">
								<a  class="one"><img src="mysqimg/${jsons[j].url}"/></a>
								<div class="last_a">
									<em class="ema">${jsons[j].act}</em>
									<a>${jsons[j].contents}</a>
								</div>
								<p>¥<span class="list_num">${jsons[j].monry}</span></p>
							</div>
						`;
					}
					$(".m_block_box_a").html(strs);
					$(".ema").each(function(index,item){
						if($(item).html()==""){
							$(this).remove();
						}
					});
				}
			});
		//热门商品的数据处理
			$.ajax({
				type:"get",
				url:"php/shop.php",
				success:function(res){
					var json = JSON.parse(res);
					// console.log(json[0].shopid)
					var str ="";
					for(var i = 0;i<json.length-1;i++){
						// console.log(json[i].liimg);
						var st = json[i].liimg;
						var ss = st.split(",")
						str+=`
						<div class="list list_1">
							<i style="display: none;" class="numI">${json[i].shopid}</i>
							<a class="one target"><img src="mysqimg/${json[i].imgsrc}"/></a>
							<em class="ems">${json[i].activion}</em>
							<i style="display: none;" class="numI">${json[i].shopid}</i>
							<a class="target">${json[i].content}</a>
							<p>¥<span class="list_num">${json[i].monry}</span></p>
						</div>
						`;
					}
					$(".m_block_box_1").html(str);
					//添加点击传入一个id进行跳转详情页
					$(".target").on("click",function(){
						var  tarnum = $(this).prev().html();
						location.href = "details/details.html?"+tarnum;
					});	
					//删除空白文本的em标签
					$(".ems").each(function(index,item){
						if($(item).html() == ""){
						$(this).remove();
					}
				});	
			},
		});			
});