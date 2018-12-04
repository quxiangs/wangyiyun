window.onload = function(){

	
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
	//注销操作
	var locauname = localStorage.getItem("uname")
	$(".logoff").on("click",function(){
		if(locauname){
			localStorage.removeItem("uname");
		}
		$("#signto").css("display","none");
		window.location.reload()
	});
	
	
	//改变登录状态
	var userlogin = localStorage.getItem("uname");
	if(userlogin){
		$(".text").html(userlogin);
		$(".text").css("color","#d33a31");
		// console.log(userlogin);
	}
	
	//分享拖拽效果
	//点击显示,同时创建一个空的div用于覆盖html的其他行为
	var divs = document.createElement("div");
	$(".share").click(function(){
		$(".layer").css("display","block");
		divs.style.height = '10000px';
		divs.style.width = '10000px';
		divs.style.position = "fixed";
		divs.style.top = 0;
		document.body.appendChild(divs);
	});
	$(".fenx").click(function(){
		$(".layer").css("display","none");
		divs.remove()
	});
	$(".move_p").bind("mousedown",function(e){
		var e = e || event;
		var x = e.offsetX;
		var y = e.offsetY;
		$(document).bind({
			mousemove:function(e){
				var l = e.pageX - x;
				var t = e.pageY - y;
				var L = document.documentElement.clientWidth - $(".layer")[0].offsetWidth;
				var T = document.body.scrollHeight - $(".layer")[0].offsetHeight;
				l = l <= 0 ? 0 : (l >= L ? L : l);
				t = t <= 0 ? 0 : (t >= T ? T : t);
				$(".layer").css({
					left:l,
					top:t
				});
				return false;
			},mouseup:function(e){
				$(this).unbind("mousemove");
			}
		});
	});
	//放大镜效果
	$(".pic").mouseover(function(){
		$(".move").css("display","block");
		$(".picBox").css("display","block");
	}).mouseout(function(){
		$(".move").css("display","none");
		$(".picBox").css("display","none");
	});
	$(".pic").mousemove(function(e){
		// 取最外层容器的e.page
		var e = e || event;
		var l = e.pageX - $(".hasFootr")[0].offsetLeft - $(".move")[0].offsetWidth/2;
		var t = e.pageY - $(".move")[0].offsetHeight-60;
		var L = $(".pic")[0].clientWidth -$(".move")[0].offsetWidth;
		var T = $(".pic")[0].clientHeight -$(".move")[0].offsetHeight;
		l = l <= 0 ? 0 : (l >= L ? L : l );
		t = t <= 0 ? 0 : (t >= T ? L : t );
		$(".move")[0].style.left = l + "px";
		$(".move")[0].style.top = t + "px";
	   var picBoxL = l * $(".picBoxImg")[0].offsetWidth / $(".pic")[0].clientWidth;
	   var picBoxT = t * $(".picBoxImg")[0].offsetHeight / $(".pic")[0].clientHeight;
	   $(".picBoxImg")[0].style.left = -picBoxL + "px";
	   $(".picBoxImg")[0].style.top = -picBoxT + "px";
	});
	
	//侧导航的处理
	$(window).scroll(function(){
		var scro = $("body,html").scrollTop();
		// console.log(scro)
		if(scro >= 100){
			$(".TOP").css("display","block");
		}else{
			$(".TOP").css("display","none");
		}
		if(scro >= 1000){
			$(".j-topbar").css("display","block");
		}else{
			$(".j-topbar").css("display","none");
		}
	});
		$(".TOP").click(function(){
			$("body,html").scrollTop(0);
			$(this).css("display","none");
		});
		
		
	//页面数据的请求
		var idshop = location.search.split("?")[1];
		// alert(idshop)
		$.ajax({
			type:"get",
			url:"details.php",
			data:{
				idshop:idshop,
			},
			success:function(res){
				var json = JSON.parse(res);
				//颜色类型数据处理
				var type = json.type.split(",");
				strType = "";
				for (var i = 0; i < type.length; i++) {
					strType += `
						<p class="type_p">${type[i]}</p>
					`;
				}
				$(".colorC").html(strType);
				$(".type_p").each(function(index,item){
					if($(item).html()==""){
						$(".j-nweskutn").remove();
						$(".basic").css("margin-bottom","25px");
					}else if($(item).html() == "1100毫安"){
						$(".j-nweskutn h4").html("容量:");
					}
				});
				
				//li图片的数据处理
				var liImg = json.liimg.split(",");
				strliImg ="";
				// console.log(liImg)
				for(var i = 0; i <liImg.length; i++){
					strliImg +=`
					<li><img src="../mysqimg/${liImg[i]}"/></li>
					`;
				}
				$(".picmin").html(strliImg);
				//小图Li数据处理
				var imgMin = json.imgmin.split(",");
				var imgMax = json.imgmax.split(",");
				$(".picmin li").on("click",function(){
					$(this).addClass("boredrColor").siblings().removeClass("boredrColor");
					var index = $(this).index();
					$(".pic img").attr("src",`../mysqimg/${imgMin[index]}`);
					$(".picBox img").attr("src",`../mysqimg/${imgMax[index]}`);
				});
				//对应pic中li图片的获取
					var arrImgMin = [];
					var typeImgMin = json.typeimgmin.split(":");
					// console.log(typeImgMin)
					for(var i = 0; i < typeImgMin.length; i++){
						arrImgMin.push(typeImgMin[i].split(","));
					}
					//对应picBox中li图片的获取
						var arrImgMax = [];
						var typeImgMax = json.typeimgmax.split(":");
						// console.log(typeImgMax)
						for(var i = 0; i < typeImgMax.length; i++){
							arrImgMax.push(typeImgMax[i].split(","));
						}
						// console.log(arrImgMax)
				//颜色图片的选择
				var arrColor = [];
				var typeImg = json.typeimg.split(":");
				for(var i = 0; i < typeImg.length;i++){
					arrColor.push(typeImg[i].split(","));
				}
				$(".type_p").on("click",function(){
					var indexColor = $(this).index();
					//获取改变pic中li点击后的图片数组
					var newarrImgMin = arrImgMin[indexColor];
					// console.log(newarrImgMin)
					//获取改变picBox中li点击后的图片数组
					var newarrImgMax = arrImgMax[indexColor];
					// console.log(newarrImgMax)
					//商品颜色点击边框换色
					$(this).css("height","24px").siblings().css("height","26px");
					$(this).addClass("activeP").siblings().removeClass("activeP");
					$(".picmin li").remove();
					var strColor = "";
					for(var j = 0; j < arrColor[indexColor].length; j++){
						strColor += `
						<li><img src="../mysqimg/${arrColor[indexColor][j]}"/></li>
						`;
					}
					$(".picmin").html(strColor);
					// console.log($(".picmin li").eq(0))
					//点击后给第一个li添加边框、去背景和改变图片
					$(".picmin li").eq(0).addClass("boredrColor")
					$(".picmin li").css("background","#fff");
					$(".pic img").attr("src",`../mysqimg/${newarrImgMin[0]}`);
					$(".picBox img").attr("src",`../mysqimg/${newarrImgMax[0]}`);
					$(".picmin li").on("click",function(){
						$(this).addClass("boredrColor").siblings().removeClass("boredrColor");
						var index = $(this).index();
						// console.log(newarrImgMin)
						console.log(newarrImgMax[index])
						// console.log(imgMin);
						$(".pic img").attr("src",`../mysqimg/${newarrImgMin[index]}`);
						$(".picBox img").attr("src",`../mysqimg/${newarrImgMax[index]}`);
					});
				});
				$("#pointer").html(json.content);
				$(".basic h2").html(json.content);
				$(".p_one").html(json.appe);
				$("#monry").html(json.monry);
				//加载显示图片
				$(".pic img").attr("src",`../mysqimg/${imgMin[0]}`);
				$(".picBox img").attr("src",`../mysqimg/${imgMax[0]}`);
			}
		});
		
		//购物车跳转
		// console.log(userlogin)
		var cart = location.search.split("?")[1];
		var num = parseInt($("#price").val())
		// console.log(num)
		$(".u_count i").on("click",function(){
			if(num==1){
				num=1;
			}else{
				num--;
			}
			$("#price").val(num);
		})
		
		$(".u_count span").on("click",function(){
			// console.log("+")
				num++;
				$("#price").val(num);
		});

		class goShoping{
			constructor(){
				this.init();
			}
			init(){
				var that = this;
				this.addCart();
				
				
					$(".targetCart").on("click",function(){
						// alert($("#price").val())
				if(userlogin == null){
					location.href = "../logo/logo.html?"+cart;
				}else{
					var json = [
						{
							"uId":cart,
							"count":$("#price").val()
						}
					];
					var cookie = localStorage.getItem(userlogin+"shopping");
					var obj = {"uId":cart,"count":$("#price").val()};
					if(cookie){
						var cookieArr = JSON.parse(cookie);
						var flage = true;
						for(var i = 0; i < cookieArr.length; i++){
							if(cookieArr[i].uId ==cart){
								var countA = parseInt(cookieArr[i].count)
								countA += parseInt($("#price").val());
								cookieArr[i].count = countA;
								
								flage = false;
							}
						}
						if(flage){
							cookieArr.push(obj);
						}
						localStorage.setItem(userlogin+"shopping",JSON.stringify(cookieArr));
					}else{
						localStorage.setItem(userlogin+"shopping",JSON.stringify(json));
					}
				}
				that.addCart();
			});
		};
		addCart(){
			var cookie = localStorage.getItem(userlogin+"shopping");
			//console.log(cookie);
			var cookieArr = JSON.parse(cookie);
			var countS = 0;
			if(cookieArr){
				for(var i = 0; i < cookieArr.length; i++){
					// console.log(parseInt(cookieArr[i].count))
				countS += parseInt(cookieArr[i].count);
				}
				$(".countS").html(countS);
			}
		};
	}
		new	goShoping()
}

