<?php
	header("content-type:text/html;charset=utf-8");
	$uname = $_GET["userName"];
	$db = mysqli_connect("localhost","root","zxc123");
	mysqli_select_db($db,'wangyiyun');
	mysqli_query($db,"set names utf-8");
	$sql = "select * from suer where uname = '$uname'";
	$result = mysqli_query($db,$sql);
	$arr = mysqli_fetch_array($result);
	if($arr){
		echo 1;
	}else{
		echo 0;
	}
?>