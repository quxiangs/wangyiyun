window.onload = function() {
	// console.log(4)
	$("#logoText").mouseover(function() {
		$("#logoText #arr").removeClass().addClass("arrb");
		$("#signto").css("display", "block");
	}).mouseout(function() {
		$("#logoText #arr").removeClass().addClass("arrt");
		$("#signto").css("display", "none");
	});
	$("#signto li").hover(function() {
		$(this).css("background", "#f8f8f8");
	}, function() {
		$("li").css("background", "");
	});
	//注销操作
	var locauname = localStorage.getItem("uname")
	$(".logoff").on("click", function() {
		if (locauname) {
			localStorage.removeItem("uname");
		}
		$("#signto").css("display", "none");
		window.location.reload()
	});

	var userlogin = localStorage.getItem("uname");
	if (userlogin) {
		$(".text").html(userlogin);
		$(".text").css("color", "red");
	} else {
		$(".text").html("登录");
	}
	var cookie = localStorage.getItem(userlogin + "shopping");
	var cookieArr = JSON.parse(cookie);
	var newCookieArr = [];
	var countS = 0;
	for (var i = 0; i < cookieArr.length; i++) {
		newCookieArr.push(cookieArr[i].uId); //localStorage的数据
		countS += parseInt(cookieArr[i].count);
		// console.log(parseInt(cookieArr[i].count))
	}
	$(".countS").html(countS);
	$.ajax({
		type: "get",
		url: "cart.php",
		success: function(res) {
			//获取商品数量设置总金额；
			var json = JSON.parse(res);
			var str = `<li class="li_one f-4"><div>全部商品(  <span class="spanNum" >0</span>  )</div></li>`;

			for (var j = 0; j < newCookieArr.length; j++) { //localStorage的数据
				for (var i = 0; i < json.length; i++) { //php返回的数据
					if (newCookieArr[j] == json[i].shopid) { //对比 ，相同就拼接
						var newtypeArr = json[i].type.split(",");
						if (newtypeArr[i] == undefined) {
							newtypeArr[i] = "";
						}
						str +=
							`
						<li class="f-cb shopLi">
						<div class="numCart" style="display:none"> ${newCookieArr[j]} </div>
							<div class="check">
								<i class="checkboxs"></i>
							</div>
							<div class="coverwrap f-f1">
								<a href="../details/details.html?${json[i].shopid}" class="img_a"><img src="../mysqimg/${json[i].cartimg}"/></a>
							</div>
							<div class="product f-f1 text-p">
								<a href="../details/details.html?${json[i].shopid}" class="hove_a"><p>${json[i].content}</p></a>
								<p class="f-4 t-p">${newtypeArr[i]}</p>
							</div>
							<div class="pri1 f-f1 monry_li">￥<span>${json[i].monry}</span></div>
							<div class="num f-f1">
								<div class="num_count" onselectstart="return false">
									<i class="minus" onselectstart="return false">-</i>
									<input type="text" name="" class="price" value=${cookieArr[j].count} />
									<span class="add" onselectstart="return false">+</span>
								</div>
							</div>
							<div class="pri2 f-f1 monry_li pri2Color">
								￥<span>${cookieArr[j].count*json[i].monry}</span>
							</div>
							<div class="man f-f1 man_span">
								<span class="del"></span>
							</div>
						</li>`;
					}
				}
			}
			str +=
				`<li class="last">
							<div class="check">
								<i class="checkbox"></i>
							</div>
							<div class="coverwrap f-f1 f-4">
								全选
							</div>
							<div class="product f-f1 f-4">
								已选择<span style="color: #D33A31;" class="spanNum"> 0 </span>件商品
							</div>
							<div class="pri1 f-f1 monry_li"></div>
							<div class="num f-f1 f-4">
								<span>差 <span id="addnum">119</span>元免运费  |  </span>   
								<span class="total">合计：<em id="em">￥</em><span id="totalMonry">0.00</span></span>
							</div>
							<div class="man f-f1 last-p">
								结算
							</div>
						</li>`;
			$(".cartUl").html(str);
		}
	});
	//数量减少
	$(".cartUl").on("click", ".minus", function() {
		//判断是否选中
		var minVal = 0;
		var minSpan = 0;
		var index = parseInt($(this).parent().parent().parent().find(".price").val());
		console.log($(this).parent().parent().parent().find(".price").val());
		var delArrs = $(this).parent().parent().parent().find(".checkboxs").attr("class").split(" ");
		for (var i = 0; i < delArrs.length; i++) {
			console.log(delArrs[i])
			if (delArrs[i] == "aheckboxM") {
				minVal = parseInt($("#totalMonry").html() - $(this).parent().parent().parent().find(".pri1 span").html());
				minSpan = parseInt($(".spanNum").html());
				if (index <= 1) {
					console.log(index)
					break;
				} else {
					minSpan--;
				}
				$("#totalMonry").html(minVal);

				$(".spanNum").html(minSpan);
			}
		}
		var textNum = 0;
		var cartId = parseInt($(this).parent().parent().parent().find(".numCart").html());
		var cartNum = parseInt($(this).parent().parent().parent().find(".price").val());
		if (cartNum == 1) {
			cartNum = 1;
		} else {
			cartNum--;
		}
		$(this).parent().parent().parent().find(".price").val(cartNum);
		var cartMonry = parseInt($(this).parent().parent().parent().find(".pri1 span").html());
		for (var i = 0; i < cookieArr.length; i++) {
			if (cookieArr[i].uId == cartId) {
				cookieArr[i].count = cartNum;
				localStorage.setItem(userlogin + "shopping", JSON.stringify(cookieArr));
				var cartTotal = cartNum * cartMonry;
				$(this).parent().parent().parent().find(".pri2 span").html(cartTotal);
			}
			textNum += parseInt(cookieArr[i].count);
		}
		$(".countS").html(textNum);
	});

	//数量添加
	$(".cartUl").on("click", ".add", function() {
		var addText = 0;
		var index = parseInt($(this).parent().parent().parent().find(".price").val());
		var delArrs = $(this).parent().parent().parent().find(".checkboxs").attr("class").split(" ");
		for (var i = 0; i < delArrs.length; i++) {
			console.log(delArrs[i])
			if (delArrs[i] == "aheckboxM") {
				minVal = parseInt($("#totalMonry").html()) + parseInt($(this).parent().parent().parent().find(".pri1 span").html());
				minSpan = parseInt($(".spanNum").html());
				minSpan++;
				parseInt(minSpan);
				$("#totalMonry").html(minVal);
				$(".spanNum").html(minSpan);
			}
		}
		var cartId = parseInt($(this).parent().parent().parent().find(".numCart").html());
		var cartNum = parseInt($(this).parent().parent().parent().find(".price").val());
		cartNum++;
		$(this).parent().parent().parent().find(".price").val(cartNum);
		var cartMonry = parseInt($(this).parent().parent().parent().find(".pri1 span").html());
		for (var i = 0; i < cookieArr.length; i++) {
			if (cookieArr[i].uId == cartId) {
				cookieArr[i].count = cartNum;
				localStorage.setItem(userlogin + "shopping", JSON.stringify(cookieArr));
				var cartTotal = cartNum * cartMonry;
				$(this).parent().parent().parent().find(".pri2 span").html(cartTotal);
			}
			addText += parseInt(cookieArr[i].count);
		}
		$(".countS").html(addText);
	});

	///点击删除商品信息
	$(".cartUl").on("click", ".del", function() {
		var delNum = 0;
		var delMonery = 0;
		var delHtml = 0;
		var cartId = parseInt($(this).parent().parent().find(".numCart").html());
		for (var i = 0; i < cookieArr.length; i++) {
			if (cookieArr[i].uId == cartId) {
				cookieArr.splice(i, 1);
				localStorage.setItem(userlogin + "shopping", JSON.stringify(cookieArr));
			}
		}
		var delArr = $(this).parent().parent().find(".checkboxs").attr("class").split(" ");
		for (var i = 0; i < delArr.length; i++) {
			if (delArr[i] == "aheckboxM") {
				delNum = parseInt($(".spanNum").html() - $(this).parent().parent().find(".price").val());
				delMonery = parseInt($("#totalMonry").html() - $(this).parent().parent().find(".pri2 span").html());
				if (delMonery == 0) {
					delMonery = "0.00";
					$(".last-p").css("background", "#ccc");
				}
				$("#totalMonry").html(delMonery);
				$(".spanNum").html(delNum);
			}
		}
		delHtml = parseInt($(".countS").html() - $(this).parent().parent().find(".price").val())
		console.log(delHtml);
		$(".countS").html(delHtml);
		$(this).parent().parent().remove();
	});
	//商品全选操作
	var flag = true;
	$(".n-cart").on("click", ".checkbox", function() {

		var numCut = 0;
		var moneryCut = 0;
		if (flag) {
			$(".checkbox").addClass("aheckboxM");
			$(".checkboxs").addClass("aheckboxM");
			// console.log($("#totalMonry").html())
			$(".last-p").css("background", "#d33a31");
			$(".cartUl .shopLi").find(".price").each(function(index, item) {
				numCut += parseInt($(item).val());
			});
			$(".cartUl .shopLi").find(".pri2 span").each(function(index, item) {
				moneryCut += parseInt($(item).html());
			});
			$(".spanNum").html(numCut);
			$("#totalMonry").html(moneryCut);
			flag = false;
		} else {
			$(".checkbox").removeClass("aheckboxM");
			$(".checkboxs").removeClass("aheckboxM");
			$(".last-p").css("background", "#cccccc");
			$("#totalMonry").html("0.00")
			$(".spanNum").html("0");
			flag = true;
		}
	});
	$(".n-cart").on("click", ".checkboxs", function() {
		var fa = false;
		var fas = true;
		var ADDs = 0;
		var ADDnums = 0;
		var ARR = $(this).attr("class").split(" ");
		for (var i = 0; i < ARR.length; i++) {
			if (ARR[i] == "aheckboxM") {
				fa = true;
			}
		}
		if (fa) {
			$(this).removeClass("aheckboxM");
			$(".checkbox").removeClass("aheckboxM");
		} else {
			$(this).addClass("aheckboxM");
			$(".last-p").css("background", "#d33a31");
		}
		var ADD = 0;
		var ADDnum = 0;
		$(".checkboxs").each(function(index, item) {
			var itemC = $(item).attr("class").split(" ");
			for (var i = 0; i < itemC.length; i++) {
				if (itemC[1] != "aheckboxM") {
					fas = false;
				} else {
					ADDnum += parseInt($(item).parent().parent().find(".price").val());
					ADD += parseInt($(item).parent().parent().find(".pri2 span").html());
					break;
				}
			}
		});
		if (ADD == 0) {
			ADD = "0.00";
		}
		$(".spanNum").html(ADDnum);
		$("#totalMonry").html(ADD);
		if (fas) {
			$(".checkbox").addClass("aheckboxM");
			flag = false;
		} else {}
	});

	if ($("#totalMonry").html == "0.00") {
		$(".last-p").css("background", "#cccccc");
	}
}
