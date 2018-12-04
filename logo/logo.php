<?php
	$uname = $_GET["userName"];
	$upwd = $_GET["upwd"];
	$db = mysqli_connect("localhost","root","zxc123");
	mysqli_select_db($db,'wangyiyun');
	mysqli_query($db,"set names utf-8");
	$sql = "select * from suer where uname = '$uname'";
	$result = mysqli_query($db,$sql);
	$arr = mysqli_fetch_array($result);
	if($arr['uname'] == $uname){
		if($arr['upwd'] == $upwd){
		echo $uname;
		}
		else{
			echo 0;
		}
	}else{
		echo 1;
		
	}
?>