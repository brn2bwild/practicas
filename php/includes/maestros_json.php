<?php
	require_once('conexionBD.php');

	$materia = strip_tags($_GET['materia']);
	$periodo = strip_tags($_GET['periodo']);

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion,"SELECT DISTINCT `maestro` FROM `practicas_programadas` WHERE `materia` = '$materia' AND `periodo`='$periodo'")) die("Error- al hacer la consulta a la base de datos");

	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			$datos[$i] = $fila['maestro'];
			$i++;
		}
		$json = array("maestros" => implode(',', $datos));
	}else{
		$json = array("maestros" => "0");
	}

	echo json_encode($json);
?>