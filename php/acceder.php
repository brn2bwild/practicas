<?php
	session_start();
	require_once('includes/conexionBD.php');
	
	$clave = filter_var($_POST["clave"], FILTER_SANITIZE_STRING);
	$pass = filter_var(sha1($_POST["pass"]), FILTER_SANITIZE_STRING);

	$conexion = conectarBD();
	if($conexion){
		$stmt = $conexion->prepare("SELECT * FROM usuarios WHERE clave = :clave AND pass = :pass");

		$stmt->bindParam(":clave", $clave);
		$stmt->bindParam(":pass", $pass);

		$stmt->execute();

		$array = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		if($array > 0){
			$_SESSION['user'] = $array[0]['nombre'];
			$_SESSION['carrera'] = $array[0]['carrera'];
			$_SESSION['tipo'] = $array[0]['tipo'];
			$_SESSION['logged'] = 'yes';
		}
	}else{
		echo "Error al conectarse a la base de datos";
	}

	// if(!$resultado = mysqli_query($conexion, "SELECT * FROM `personal` WHERE `clave` = '$clave' AND `pass` = '$pass'")){ 
	// 	die('Clave o contraseña incorrectas');
	// }
	// $resultado = mysqli_query($conexion, "SELECT * FROM `personal` WHERE `clave` = 'infdoc0001' AND `pass` = '1ebe191c99e8b3c4cc3dbd3b60aa8478f5eb0568'");

	// echo $resultado;

	// if(mysqli_num_rows($resultado) != 0){
	// 	if($row = mysqli_fetch_array($resultado)){
	// 		$_SESSION['user'] = $row['nombre'];
	// 		$_SESSION['tipo'] = $row['tipo'];
	// 		$_SESSION['carrera'] = $row['carrera'];
	// 		$_SESSION['logged'] = 'yes';
	// 	}
	// }else{
	// 	die("El usuario no se encuentra registrado");
	// }
	$stmt = null;
	$conexion = null;
?>