<?php
	require_once('conexionBD.php');

	$jefatura = strip_tags($_POST['jefatura']);
	$opcion1 = strip_tags($_POST['opcion1']);
	$opcion2 = strip_tags($_POST['opcion2']);
	$periodo = strip_tags($_POST['periodo']);

	$conexion = conectarBD();

	if($opcion1 == 'Carrera'){
		if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `carrera`='$opcion2' AND `periodo`='$periodo'")) die("Error- Al conectarse a la base de datos");
	}else if($opcion1 == 'Maestro'){
		if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `maestro`='$opcion2' AND `carrera` = '$jefatura' AND `periodo`='$periodo'")) die("Error- Al conectarse a la base de datos");
	}else if($opcion1 == 'Asignatura'){
		if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `materia`='$opcion2' AND `carrera` = '$jefatura' AND `periodo`='$periodo'")) die("Error- Al conectarse a la base de datos");
	}else if($opcion1 == 'Laboratorio'){
		if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `laboratorio`='$opcion2' AND `carrera` = '$jefatura' AND `periodo`='$periodo'")) die("Error- Al conectarse a la base de datos");
	}else if($opcion1 == 'Institución'){
		if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `periodo`='$periodo'")) die("Error- Al conectarse a la base de datos");
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