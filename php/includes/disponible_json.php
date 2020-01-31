<?php
	require_once('conexionBD.php');

	$laboratorio = utf8_decode(strip_tags($_POST['laboratorio']));

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion, "SELECT * FROM `laboratorios` WHERE `laboratorio` = '$laboratorio'")) die();

	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		$filas = mysqli_fetch_array($resultado);
		$datos = $filas['disponible'];
		$json = array("disponible" => $datos, "capacidad" => $filas['capacidad']);
	}else{
		$json = array("disponible" => "0");
	}
	echo json_encode($json);

?>