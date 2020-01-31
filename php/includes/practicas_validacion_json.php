<?php
	require_once('conexionBD.php');

	$laboratorio = strip_tags($_POST['laboratorio']);
	$fecha = strip_tags($_POST['fecha']);

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion, "SELECT * FROM `practicas_programadas` WHERE `laboratorio` = '$laboratorio' AND `realizada` = '1' AND `validada` = '0' AND (`sesion1_fecha` = '$fecha' OR `sesion2_fecha` = '$fecha' OR `sesion3_fecha` = '$fecha' OR `sesion4_fecha` = '$fecha' OR `sesion5_fecha` = '$fecha')")) die("Error- al hacer la consulta a la base de datos");

	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			$datos[$i] = $fila;
 			$i++;
			//$datos[$i] = $fila['id'].'-'.$fila['npractica'].'-'.$fila['practica'].'-'.$fila['laboratorio'].'-'.$fila['materia'].'-'.$fila['carrera'].'-'.$fila['horas_ocupadas'].'-'.$fila['maestro'].'-'.$fila['materiales'].'-'.$fila['alumnos_programados'].'-'.$fila['equipo'];
		}
		$json = array('practicas' => $datos);
	}else{
		die("Error- ninguna práctica realizada encontrada");
	}

	echo json_encode($json);
?>