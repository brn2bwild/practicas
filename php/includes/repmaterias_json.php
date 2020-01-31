<?php
	require_once('conexionBD.php');

	$nombre = strip_tags($_POST['nombre']);
	$periodo = strip_tags($_POST['periodo']);

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion, "SELECT DISTINCT `materia`,`semestre`,`grupo`,`turno` FROM `practicas_programadas` WHERE `maestro` = '$nombre' AND `periodo`='$periodo'")) die("Error- Al consultar la base de datos");

	$datos = array();

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			array_push($datos, $fila);
		}

		$json = array("materias" => implode(',', $datos));

		desconectarBD($conexion);
		echo json_encode($json);
	}else{
		desconectarBD($conexion);
		die("Error- No existen datos en la base de datos");
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<p id="test_id"></p>
</body>
</html>