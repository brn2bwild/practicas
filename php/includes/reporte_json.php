<?php
	require_once('conexionBD.php');

	$nombre = strip_tags($_POST['nombre']);
	$opcion = strip_tags($_POST['opcion']);
	$periodo = strip_tags($_POST['periodo']);
	$tipo = strip_tags($_POST['tipo']);
	$semestre = strip_tags($_POST['semestre']);
	$grupo = strip_tags($_POST['grupo']);
	$turno = strip_tags($_POST['turno']);

	$conexion = conectarBD();

	if($tipo == 'materia'){
		if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `maestro`='$nombre' AND `materia`='$opcion' AND `periodo`='$periodo' AND `semestre`='$semestre' AND `grupo`='$grupo' AND `turno`='$turno'")) die("Error- Al conectarse a la base de datos");
	}else if($tipo == 'laboratorio'){
		if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `maestro`='$nombre' AND `laboratorio`='$opcion' AND `periodo`='$periodo'")) die("Error- Al conectarse a la base de datos");
	}

	$datos = array();

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			array_push($datos, $fila);
		}

		$json = array("practicas" => $datos);
		desconectarBD($conexion);

		echo json_encode($json);
	}else{
		die("Error- No existen datos en la base de datos");
	}
?>