<?php
	require_once('conexionBD.php');

	$laboratorio = strip_tags($_POST['laboratorio']);
	$fecha = strip_tags($_POST['fecha']);

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `laboratorio` = '$laboratorio' AND `fecha_programada` = '$fecha' AND `realizada` = '0'")) die();

	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			$datos[$i] = $fila['id'].'-'.$fila['npractica'].'-'.$fila['practica'].'-'.$fila['laboratorio'].'-'.$fila['materia'].'-'.$fila['carrera'].'-'.$fila['horas_ocupadas'].'-'.$fila['maestro'].'-'.$fila['materiales'].'-'.$fila['alumnos_programados'].'-'.$fila['equipo'];
 			$i++;
		}
		$json = array('practicas' => $datos);
	}else{
		$json = array('practicas' => '0');
	}

	echo json_encode($json);
?>