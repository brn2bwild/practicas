<?php
	require_once('conexionBD.php');

	$maestro = strip_tags($_POST['maestro']);
	$carrera = strip_tags($_POST['carrera']);
	$materia = strip_tags($_POST['materia']);
	$semestre = strip_tags($_POST['semestre']);
	$grupo = strip_tags($_POST['grupo']);
	$turno = strip_tags($_POST['turno']);

	$conexion = conectarBD();

	//if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `maestro`='$maestro' AND `carrera`='$carrera' AND `materia`='$materia' AND `semestre`='$semestre' AND `grupo` ='$grupo' AND `turno`='$turno' ORDER BY `id` DESC LIMIT 1")) die();

	if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `maestro`='$maestro' AND `carrera`='$carrera' AND `materia`='$materia' AND `semestre`='$semestre' AND `grupo` ='$grupo' AND `turno`='$turno'")) die();

	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			$datos[$i] = $fila;
			$i++;
		}

		$json = array("npractica" => $i);
		//$json = array("npractica" => $datos[0]['npractica']);
	} else{
		$json = array("npractica" => "0");
	}

	echo json_encode($json);
?>