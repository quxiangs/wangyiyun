<?php
	$shopid = $_GET["idshop"];
	$db = mysqli_connect("localhost","root","zxc123");
	mysqli_select_db($db,'wangyiyun');
	mysqli_query($db,"set names utf-8");
	$sql = "select * from shoping where shopid = $shopid";
	$result = mysqli_query($db,$sql);
	$arr = mysqli_fetch_array($result);
	$json = json_encode($arr);
	echo $json;
?>