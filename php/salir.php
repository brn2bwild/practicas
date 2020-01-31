<?php
	session_start();
	session_unset();
	$_SESSION['logged'] == "no";
	session_destroy();
	header("Location: ../index.php");
	exit();
?>