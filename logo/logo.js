window.onload = function(){
	
	//获取购物车携带的信息
	var cart = location.search.split("?")[1];
	// console.log(cart)
	function bodyScroll(event){  
		event.preventDefault();  
	} 
	//解除页面滚动
	function bodySc_a(){
		document.body.removeEventListener('touchmove',bodyScroll,false);   
		$("body").css({"position":"initial","height":"auto"});
	
	}
	//禁止页面滚动
	function bodySc(){	
		document.body.addEventListener('touchmove',bodyScroll,false);  
		$('body').css({'position':'fixed',"width":"100%"});
	}
	//头部滚动
	var  timer = setInterval(autoPlay,20);
	var num = -165;
	var W = $(".text").width()
	function autoPlay(){
		if(num >= W){
			num = -165;
		}else{
			num +=1;
		}
		$("#sp").css("left",num);
	}
	//乱七八糟
	$("#logon a").click(function(){
		$("#use").html("用户登录");
		$(".m-auto").css("display","block");
		$(".j_mob").css("display","block");
		$(".m_foot_L").css("display","none");
		$(".m-auto").css({
			left:418,
			top:174
		});
		// bodySc();
		divs.style.height = '10000px';
		divs.style.width = '10000px';
		divs.style.position = "fixed";
		divs.style.top = 0;
		document.body.appendChild(divs);
	});
	var divs = document.createElement("div");
	$(".m_foot_L").click(function(){
		$("#use").html("用户登录");
		$(".m_foot_R").css("display","block");
		$(".j_mob").css("display","block");
		$(".j_sign").css("display","none");
		$(".span_res").stop().hide(100);
		$(".divider").stop().hide(100);
		$(".yaz").stop().hide(100);
		$(this).css("display","none");
	});
	$(".m_foot_R").click(function(){
		$("#use").html("用户注册");
		$(".m_foot_L").css("display","block");
		$(".j_mob").css("display","none");
		$(".j_sign").css("display","block");
		$(this).css("display","none");
		$(".yaz").stop().hide(100);
		$(".pwdyaz").stop().hide(100);

	});
	$(".sign").click(function(){
		$("#use").html("用户注册");
		$(".m-auto").css("display","block");
		$(".j_sign").css("display","block");
		$(".m_foot_R").css("display","none");
		bodySc();
	});
	$(".a_go").click(function(){
		$("#use").html("用户登录");
		$(".m-auto").css("display","block");
		$(".j_mob").css("display","block");
		$(".m_foot_L").css("display","none");
		bodySc();
		$(".m-auto").css({
			left:418,
			top:174
		});
	});
	$(".zcls").click(function(){
		bodySc_a();
		$(".m-auto").css("display","none");
		$(".j_mob").css("display","none");
		$(".j_sign").css("display","none");
		$(".m_foot_R").css("display","block");
		$(".m_foot_L").css("display","block");
		$(".span_res").stop().hide(100);
		$(".divider").stop().hide(100);
		$(".yaz").stop().hide(100);
		$(".pwdyaz").stop().hide(100);
		divs.remove();
	});
	$("#use").bind("mousedown",function(e){
		var e = e || event;
		var x = e.offsetX;
		var y = e.offsetY;
		$(document).bind({
			mousemove:function(e){
				var l = e.pageX - x;
				var t = e.pageY - y;
				var L = document.documentElement.clientWidth - $(".m-auto")[0].offsetWidth;
				var T = document.documentElement.clientHeight - $(".m-auto")[0].offsetHeight;
				l = l <= 0 ? 0 : (l >= L ? L : l);
				t = t <= 0 ? 0 : (t >= T ? T : t);
				$(".m-auto").css({
					left:l,
					top:t
				});
				return false;
			},mouseup:function(e){
				$(this).unbind("mousemove");
			}
		});
	});
	
// 	//注册验证
// 	 	$("#username").blur(function(){
// 			if($(":text").val() == ""){
// 				$(".span_res").stop().show(100);
// 			}else{
// 			var pro = new Promise(function(success,failde){
// 				$.ajax({
// 					type:"get",
// 					url:"registe.php",
// 					data:{
// 						userName:$(":text").val(),
// 					},
// 					success : function(res){
// 						if(res == "1"){
// 							$(".yaz").stop().show(100);
// 							$(".yaz").html("用户名存在");
// 							$("#sign")[0].setAttribute("disabled","disabled");
// 						}else if(res == "0"){
// 							$(".yaz").stop().show(100);
// 							$(".yaz").html("用户名可用");
// 							$("#sign")[0].removeAttribute("disabled");
// 						}
// 					}
// 				});
// 			});
// 			} 
// 		}); 
		//注册跳转并保存用户名在localStorage中
		$("#sign").click(function(){
			console.log(cart)
			var promise_sign = new Promise(function(success,failde){
				$.ajax({
					type: "get",
					url:"registeC.php",
					data: {
						userName:$("#username").val(),
						upwd:$("#pwd").val()
					},
					success : function(res){
						if(res == 1){
							alert("注册失败重新注册")
							location.href = "logo.html";
						}else{
							if(cart){
								alert(res)
								localStorage.setItem("uname",res);
								location.href="../details/details.html?"+cart;
							}else{
								console.log("登录成功");
								console.log("uname"+res);
								location.href = "../index.html";
								//将用户名在localStorage中
								localStorage.setItem("uname",res);
							}
						}
					}
				});
			});
		});
	
	$("#a_go").click(function(){
		console.log(cart)
		var promise = new Promise(function(success,failde){
			$.ajax({
				type: "get",
				url:"logo.php",
				data: {
					userName:$("#u_name").val(),
					upwd:$("#u_pwd").val()
				},
				success : function(res){
					console.log(res)
					if(res == 1){
						$(".pwdyaz").stop().show();
						$(".pwdyaz").css("top",73);
						$(".pwdyaz").html("用户名错误");
					}else if(res == 0){
						$(".pwdyaz").stop().show();
						$(".pwdyaz").css("top",120);
						$(".pwdyaz").html("密码错误");
					}else{
						if(cart){
							alert(res)
							localStorage.setItem("uname",res);
							location.href="../details/details.html?"+cart;
						}else{
							console.log("登录成功");
							console.log("uname"+res);
							location.href = "../index.html";
							//将用户名在localStorage中
							localStorage.setItem("uname",res);
						}
					}
				}
			});
		});
	});
	
	//正则
// 	<div class="yaz">用户名可用</div>
// 	<div class="pwdyaz">密码可用</div>
// 	<div class="divider">请输入6位大小写字母或数字</div>
// 	<div class="span_res">请输入两个中文字符</div>
// 	<input type="text" placeholder="请输入两位字符的用户名" name="username" id="username"/>
// 	<input type="password" placeholder="设置登录密码,不少于6位" name="pwd" id="pwd"/>
	
	
	var reg = /^[\u4e00-\u9fa5]{2}$/;
	var passReg = /^\S{0,6}$/;
	$("#username").change(function(){
		if( reg.test($("#username").val())){
				if($(":text").val() == ""){
					$(".span_res").stop().show(100);
				}else{
				var pro = new Promise(function(success,failde){
					$.ajax({
						type:"get",
						url:"registe.php",
						data:{
							userName:$(":text").val(),
						},
						success : function(res){
							if(res == "1"){
								$(".yaz").stop().show(100);
								$(".yaz").html("用户名存在");
								$("#sign")[0].setAttribute("disabled","disabled");
							}else if(res == "0"){
								$(".yaz").stop().show(100);
								$(".yaz").html("用户名可用");
								$("#sign")[0].removeAttribute("disabled");
							}
						}
					});
				});
				} 
			$(".span_res").stop().hide(100);
		}else{
			
			$(".yaz").stop().hide(100);
			$(".span_res").stop().show(100);
		}
	});
	$("#username").focus(function(){
		$(".divider").stop().hide(100);
	});
	$("#pwd").change(function(){
		if( passReg.test($("#pwd").val())){
			$(".divider").stop().hide(100);
		}else{
			$(".divider").stop().show(100);
		}
	});
	$("#pwd").focus(function(){
		var fd = true;
		$(".divider").stop().hide(100);
	});
	$("#username").focus(function(){
		$(".span_res").stop().hide(100);
	});
	
	
	
	
// 	//登录
	new Goshoping();
	
	}
	class Goshoping{
			constructor(){
				this.logoin();
			}
			logoin(){
				var _this = this;
				$("#a_go").click(function(){
					// console.log(cart)
					var promise = new Promise(function(success,failde){
						$.ajax({
							type: "get",
							url:"logo.php",
							data: {
								userName:$("#u_name").val(),
								upwd:$("#u_pwd").val()
							},
							success : function(res){
								console.log(res)
								if(res == 1){
									console.log("用户名不存在");
								}else if(res == 0){
									console.log("密码错误");
								}else{
									if(cart =="1"){
										location.href="../details/details.html";
									}else{
										console.log("登录成功");
										console.log("uname"+res);
										location.href = "../index.html";
										//将用户名在localStorage中
										localStorage.setItem("uname",res);
									}
								}
							}
						});
					});
				});
			}
		}