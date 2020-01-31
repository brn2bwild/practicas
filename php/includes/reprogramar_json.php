<?php
	require_once('conexionBD.php');

	$nombre = strip_tags($_POST['nombre']);

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `maestro` = '$nombre' AND `realizada` = '0'")) die("Error- al hacer la consulta a la base de datos");

	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			$datos[$i] = $fila;
 			$i++;
		}
		$json = array('practicas' => $datos);
		echo json_encode($json);
	}else{
		echo("Error- ninguna práctica encontrada");
	}

	
?>