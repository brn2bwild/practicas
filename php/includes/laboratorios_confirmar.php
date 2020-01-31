<?php
	require_once('conexionBD.php');

	$carrera = utf8_decode(strip_tags($_POST['carrera']));

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion, "SELECT * FROM `laboratorios` WHERE `carrera` = '$carrera'")) die();

	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			array_push($datos,utf8_encode($fila['laboratorio']));
			$i++;
		}
		$json = array("laboratorios" => implode(",", $datos));
	}else{
		$json = array("laboratorios" => "0");
	}

	echo json_encode($json);
?>