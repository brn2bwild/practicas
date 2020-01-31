<?php
	require_once('conexionBD.php');

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion, "SELECT `periodo` FROM `periodos` WHERE 1")) die("Error- Al requerir los datos de la base de datos");

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			array_push($datos,utf8_encode($fila['periodo']));
		}
		$json = array("periodos" => implode(',',$datos));

		echo json_encode($json); 
		desconectarBD($conexion);
	}else {
		desconectarBD($conexion);
		die("No existen datos en la base de datos");
	}
?>