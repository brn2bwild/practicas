<?php
	require_once('conexionBD.php');

	$nombre = 	strip_tags($_POST['nombre']);
	$tipo = 	strip_tags($_POST['tipo']);
	$opcion = 	strip_tags($_POST['opcion']);

	$conexion = conectarBD();

	if($tipo == "materia"){
		if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `maestro` = '$nombre' AND `materia` = '$opcion' AND `realizada` = '0'")) die("Error- al hacer la consulta a la base de datos");
	}else if($tipo == "laboratorio"){
		if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `maestro` = '$nombre' AND `laboratorio` = '$opcion' AND `realizada` = '0'")) die("Error- al hacer la consulta a la base de datos");
	}else if($tipo = "carrera"){
		if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `maestro` = '$nombre' AND `carrera` = '$opcion' AND `realizada` = '0'")) die("Error- al hacer la consulta a la base de datos");
	}

	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			$datos[$i] = $fila;
			$i++;
		}
		$json = array("resultados" => $datos);
	}else{
		die("Error- no se encontró ninguna práctica");
	}

	echo json_encode($json);
?>