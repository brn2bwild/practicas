<?php
	function conectarBD(){
		$server = "localhost";
		$user = "root";
		$pass = "";
		$bd = "practicas_server";

		try{
			$con = new PDO("mysql:host=$server;dbname=$bd;charset=utf8", $user, $pass);
			$con->SetAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			// echo "Conexión a la base de datos hecha";
		}catch(PDOException $e){
			echo "Conexión fallida ". $e->getMessage();
		}

		// $con = mysqli_connect($server, $user, $pass, $bd);

		// if(!$con){
		// 	echo "Error al conectarse con la base de datos";
		// }

		return $con;
	}
?>