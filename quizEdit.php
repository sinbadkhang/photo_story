<?php
header('Content-Type:application/json');
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	if (isset($_POST['id']) && isset($_POST['question']) && isset($_POST['answer']) && isset($_POST['choice1']) && isset($_POST['choice2']) ) {
		// VARIABLES
		$id = $_POST['id'];
		$question = $_POST['question'];
		$choice1 = $_POST['choice1'];
		$choice2 = $_POST['choice2'];
		$answer = $_POST['answer'];
		// if NO IMAGE
		if (basename($_FILES['imageFile']['name']) === "" || !basename($_FILES['imageFile']['name']) ) {

			$sql = "UPDATE quiz SET question='".$question."',choice1='".$choice1."',choice2='".$choice2."',answer='".$answer."' WHERE id='".$id."'";
		// if CHOOSE IMAGE
		}else{
			$image = "image/".date('YmdHis').basename($_FILES['imageFile']['name']);
			move_uploaded_file($_FILES['imageFile']['tmp_name'], $image);
			// UPDATE SET
			$sql = "UPDATE quiz SET question='".$question."',choice1='".$choice1."',choice2='".$choice2."',answer='".$answer."',image='".$image."' WHERE id='".$id."'";
		}

		$result = mysqli_query($conn, $sql);
		$data['sql'] = $sql;
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