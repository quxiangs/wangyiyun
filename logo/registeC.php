<?php
	header("content-type:text/html;charset=utf-8");
	$uname = $_GET["userName"];
	$upwd = $_GET["upwd"];
	$db = mysqli_connect("localhost","root","zxc123");
	mysqli_select_db($db,'wangyiyun');
	mysqli_query($db,"set names utf-8");
	$sql = "insert into suer (uname,upwd) values ('$uname','$upwd')";
	$row = mysqli_query($db,$sql);
	if($row){
		echo $uname;
	}
	else{
		echo 1;
	}
	
?>