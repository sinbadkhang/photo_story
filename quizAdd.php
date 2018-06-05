<?php
header('Content-Type:application/json');
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	if (isset($_POST['question']) && isset($_POST['answer']) && isset($_POST['choice1']) && isset($_POST['choice2']) ) {
		// VARIABLES
		$question = $_POST['question'];
		$answer = $_POST['answer'];
		$choice1 = ($_POST['choice1']);
		$choice2 = ($_POST['choice2']);
		// IMAGE
		$image = "image/".date('YmdHis').basename($_FILES['imageFile']['name']);
		move_uploaded_file($_FILES['imageFile']['tmp_name'], $image);
		// INSERT INTO
		$sql = "INSERT INTO quiz (question, choice1, choice2, answer, image) VALUES ('".$question."','".$choice1."','".$choice2."','".$answer."','".$image."')";

		$result = mysqli_query($conn, $sql);
		if ($result) {
			$data['message'] = "Add ".basename($_FILES['imageFile']['name'])." successfully";
			$data['result'] = true;
		}else{
			$data['message'] = "sql syntax";
			$data['result'] = false;
		}
	}else{
		$data['message'] = "Can not add, Error: ".mysqli_error($conn);
		$data['result'] = false;
	}
	
mysqli_close($conn);
echo json_encode($data);
}
?>