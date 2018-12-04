<?php
	$db = mysqli_connect("localhost","root","zxc123");
	mysqli_select_db($db,'wangyiyun');
	mysqli_query($db,"set names utf-8");
	$sql = "select * from shoping";
	$result = mysqli_query($db,$sql);
	while($arr = mysqli_fetch_array($result)){
		$newArr[]=$arr;
	}
	$json = json_encode($newArr);
	echo $json;
?>
