<?php

	$db = mysqli_connect("localhost","root","zxc123");
	mysqli_select_db($db,'wangyiyun');
	mysqli_query($db,"set names utf-8");
	$sql = "select * from shoping";
	$result = mysqli_query($db,$sql);
	while($row = mysqli_fetch_array($result)){
		$arr[] = $row;
	}
	$json = json_encode($arr);
	echo $json
?>