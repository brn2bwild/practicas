<?php
	require_once('conexionBD.php');

	$carrera = utf8_decode(strip_tags($_POST['carrera']));

	$conexion = conectarBD();

	if($carrera == "direccion"){
		if(!$resultado = mysqli_query($conexion, "SELECT * FROM `materias` WHERE 1")) die();
	}else{
		if(!$resultado = mysqli_query($conexion, "SELECT * FROM `materias` WHERE `carrera`='$carrera'")) die();
	}

	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			array_push($datos,utf8_encode($fila['materia']));
			$i++;
		}
		$json = array('materias' => implode(",", $datos));
	}else{
		$json = array('materias' => '0');
	}
	echo json_encode($json);
?>