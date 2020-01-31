<?php
	require_once('conexionBD.php');

	$nombre = strip_tags($_POST['nombre']);
	$periodo = strip_tags($_POST['periodo']);
	$tipo = strip_tags($_POST['tipo']);

	$conexion = conectarBD();

	if($tipo == 'materia'){
		if(!$resultado = mysqli_query($conexion, "SELECT DISTINCT `materia` FROM `practicas_programadas` WHERE `maestro` = '$nombre' AND `periodo`='$periodo'")) die("Error- Al consultar la base de datos");		
	}else if($tipo == 'laboratorio'){
		if(!$resultado = mysqli_query($conexion, "SELECT DISTINCT `laboratorio` FROM `practicas_programadas` WHERE `maestro` = '$nombre' AND `periodo`='$periodo'")) die("Error- Al consultar la base de datos");
	}

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			$datos[$i] = $fila;
			$i++;
		}

		$json = array("opciones" => $datos);
		desconectarBD($conexion);
		echo json_encode($json);
	}else{
		desconectarBD($conexion);
		die("Error- No existen datos en la base de datos");
	}
	
?>