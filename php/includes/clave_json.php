<?php
	require_once('conexionBD.php');

	$clave = strip_tags($_GET['clave']);

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion, "SELECT * FROM `usuarios` WHERE `clave` = '$clave'")) die();

	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			$datos[$i] = $fila;
			$i++;
		}

		$json = array('id' => $datos[0]['id'],
					'nombre' => $datos[0]['nombre'],
					'clave' => $datos[0]['clave'],
					'carrera' => $datos[0]['carrera'],
					'email' => $datos[0]['email']);
		//$json = array("clave" => $datos);

		//print_r($json);

	} else{
		$json = array("clave" => "0");
	}

	echo json_encode($json);
?>