<?php
	require_once('includes/conexionBD.php');

	$nombre = strip_tags($_POST['nombre']);
	$clave = strip_tags($_POST['clave']);
	$carrera = strip_tags($_POST['tagcarrera']);
	$pass = sha1(strip_tags($_POST['pass']));
	$passr = sha1(strip_tags($_POST['passr']));
	$mail = strip_tags($_POST['mail']);


	if(empty($nombre)||empty($pass)||empty($passr)||empty($clave)){
		die("Algunos campos obligatorios están vacios");
	}

	$conexion = conectarBD();

	$resultado = mysqli_query($conexion, "SELECT * FROM `usuarios` WHERE `clave` = '$clave'");

	if(mysqli_num_rows($resultado) != 0){
		$resultado = mysqli_fetch_array($resultado);
		if($clave == $resultado['clave']){
			die('La clave ya está registrada');
		}
	} else{
		if($pass == $passr){
			$resp = mysqli_query($conexion, "INSERT INTO `usuarios`(`nombre`, `clave`, `carrera`, `pass`, `email`) VALUES ('$nombre', '$clave', '$carrera','$pass', '$mail')");
			if(!$resp){
				die('Datos no registrados');
			}
		}
	}
	desconectarBD($conexion);
?>