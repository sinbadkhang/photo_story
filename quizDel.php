<?php 
header('Content-Type:application/json');
require 'config.php';

if (isset($_POST['id']) ) {
	$id = $_POST['id'];
	// delete query
	$sql = "DELETE FROM quiz WHERE id = ".$id;
	$result = mysqli_query($conn, $sql);

	if ($result) {
		$data['message'] = "Delete successfully";
		$data['result'] = true;
	}else{
		$data['message'] = "sql syntax";
		$data['result'] = false;
	}
}else{
	$data['message'] = "Can not delete, Error: ".mysqli_error($conn);
	$data['result'] = false;
}

mysqli_close($conn);
echo json_encode($data);
?>