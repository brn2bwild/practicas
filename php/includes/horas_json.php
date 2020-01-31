<?php
	require_once('conexionBD.php');

	$fecha = strip_tags($_POST['fecha']);
	$lab = strip_tags($_POST['laboratorio']);
	$dato = strip_tags($_POST['dato']);

	$sql = "SELECT * FROM `practicas_programadas` WHERE `fecha_programada`='$fecha' && `laboratorio`='$lab'";

	$con = conectarBD();

	if(!$resultado = mysqli_query($con,$sql)) die();

	desconectarBD($con);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			array_push($datos,$fila[$dato]);
			$i++;
		}

		$json = array($dato => implode(",", $datos));
	} else{
		$json = array($dato => '0');
	}
	echo json_encode($json);
?>