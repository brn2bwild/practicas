<?php
	require_once("conexionBD.php");

	$tipo = strip_tags($_POST['tipo']);
	$carrera = strip_tags($_POST['carrera']);

	$conexion = conectarBD();

	if($carrera == "Dirección"){
		if($tipo == "maestro"){
			if(!$resultado = mysqli_query($conexion,"SELECT DISTINCT `maestro` FROM `practicas_programadas` WHERE 1")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "laboratorio"){
			if(!$resultado = mysqli_query($conexion,"SELECT DISTINCT `laboratorio` FROM `practicas_programadas` WHERE 1")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "carrera"){
			if(!$resultado = mysqli_query($conexion,"SELECT DISTINCT `carrera` FROM `practicas_programadas` WHERE 1")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "materia"){
			if(!$resultado = mysqli_query($conexion,"SELECT DISTINCT `materia` FROM `practicas_programadas` WHERE 1")) die("Error- al hacer la consulta a la base de datos");
		}
	}else{
		if($tipo == "maestro"){
			if(!$resultado = mysqli_query($conexion,"SELECT DISTINCT `maestro` FROM `practicas_programadas` WHERE `carrera`='$carrera' ")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "laboratorio"){
			if(!$resultado = mysqli_query($conexion,"SELECT DISTINCT `laboratorio` FROM `practicas_programadas` WHERE `carrera`='$carrera' ")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "carrera"){
			if(!$resultado = mysqli_query($conexion,"SELECT DISTINCT `carrera` FROM `practicas_programadas` WHERE `carrera`='$carrera'")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "materia"){
			if(!$resultado = mysqli_query($conexion,"SELECT DISTINCT `materia` FROM `practicas_programadas` WHERE `carrera`='$carrera'")) die("Error- al hacer la consulta a la base de datos");
		}
	}

	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			$datos[$i] = $fila[$tipo];
			$i++;
		}

		$json = array("datos" => implode(',', $datos));
	}else{
		die("Error- la consulta no arrojó datos de la base de datos");
	}

	echo json_encode($json);
?>