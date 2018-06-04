<?php
header('Content-Type:application/json');
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	if (isset($_POST['id']) && isset($_POST['question']) && isset($_POST['answer']) ) {
		// VARIABLES
		$id = $_POST['id'];
		$question = $_POST['question'];
		$answer = $_POST['answer'];
		// if NO IMAGE
		if (basename($_FILES['imageFile']['name']) === "" || !basename($_FILES['imageFile']['name']) ) {

			$sql = "UPDATE quiz SET question='".$question."',answer='".$answer."' WHERE id='".$id."'";
		// if CHOOSE IMAGE
		}else{
			$image = "image/".date('YmdHis').basename($_FILES['imageFile']['name']);
			move_uploaded_file($_FILES['imageFile']['tmp_name'], $image);
			// UPDATE SET
			$sql = "UPDATE quiz SET question='".$question."',answer='".$answer."',image='".$image."' WHERE id='".$id."'";
		}

		$result = mysqli_query($conn, $sql);
		if ($result) {
			$data['message'] = "Update successfully";
			$data['result'] = true;
		}else{
			$data['message'] = "sql syntax";
			$data['result'] = false;
		}
	}else{
		$data['message'] = "Can not update, Error: ".mysqli_error($conn);
		$data['result'] = false;
	}

mysqli_close($conn);
echo json_encode($data);
}
?>