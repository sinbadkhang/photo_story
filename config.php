<?php 
// Variables
$servername = "localhost";
$username = "root";
$password = "";
$database = "quiz";
// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);
// Check connection
if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}

?>