<?php
	require_once('conexionBD.php');

	$nombre = strip_tags($_POST['nombre']);
	$tipo = strip_tags($_POST['tipo']);
	$periodo = strip_tags($_POST['periodo']);

	$conexion = conectarBD();

	if($tipo == "materia"){
		if(!$resultado = mysqli_query($conexion, "SELECT DISTINCT `materia` FROM `practicas_programadas` WHERE `maestro` = '$nombre' AND `periodo` = '$periodo' AND `realizada` = '0'")) die("Error- al hacer la consulta a la base de datos");
	}else if($tipo == "laboratorio"){
		if(!$resultado = mysqli_query($conexion, "SELECT DISTINCT `laboratorio` FROM `practicas_programadas` WHERE `maestro` = '$nombre' AND `periodo` = '$periodo' AND `realizada` = '0'")) die("Error- al hacer la consulta a la base de datos");
	}else if($tipo == "carrera"){
		if(!$resultado = mysqli_query($conexion, "SELECT DISTINCT `carrera` FROM `practicas_programadas` WHERE `maestro` = '$nombre' AND `periodo` = '$periodo' AND `realizada` = '0'")) die("Error- al hacer la consulta a la base de datos");
	}

	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			$datos[$i] = $fila;
			$i++;
		}
		$json = array("opciones" => $datos);
	}else{
		die("Error- no se encontró ningun resultado");
	}

	echo json_encode($json);
?>