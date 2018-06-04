<?php 
header('Content-Type:application/json');
require 'config.php';
//query
$sql = "SELECT * FROM quiz";
$result = mysqli_query($conn, $sql);

if (!$result) {
	$data['message'] = "Can't query data.";
	$data['result'] = false;

}else{
	if (mysqli_num_rows($result) > 0) {
		// if exist quiz
		while($row = mysqli_fetch_assoc($result) ) {
			$json[] = $row;
		}
		
		$data['quizs'] = $json;
		$data['result'] = true;
	}else{
		// if no quiz
		$data['message'] = "0 quiz";
		$data['result'] = false;
	}
} 

mysqli_close($conn);
echo json_encode($data);
 ?>