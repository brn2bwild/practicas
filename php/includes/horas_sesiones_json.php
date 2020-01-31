<?php
	require_once('conexionBD.php');

	$fecha = strip_tags($_POST['fecha']);
	$laboratorio = strip_tags($_POST['laboratorio']);

	$sql = "SELECT * FROM `practicas_programadas` WHERE `laboratorio`='$laboratorio' AND (`sesion1_fecha`='$fecha' OR `sesion2_fecha`='$fecha' OR `sesion3_fecha`='$fecha' OR `sesion4_fecha`='$fecha' OR `sesion5_fecha`='$fecha')";

	$con = conectarBD();

	if(!$resultado = mysqli_query($con,$sql)) die();

	desconectarBD($con);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			if($fila['sesion1_fecha'] == $fecha){
				array_push($datos, $fila['sesion1_horas']);	
			}
			if($fila['sesion2_fecha'] == $fecha){
				array_push($datos, $fila['sesion2_horas']);	
			}
			if($fila['sesion3_fecha'] == $fecha){
				array_push($datos, $fila['sesion3_horas']);	
			}
			if($fila['sesion4_fecha'] == $fecha){
				array_push($datos, $fila['sesion4_horas']);	
			}
			if($fila['sesion5_fecha'] == $fecha){
				array_push($datos, $fila['sesion5_horas']);	
			}
			$i++;
		}

		$json = array('horas_ocupadas' => implode(",", $datos));
	} else{
		$json = array('horas_ocupadas' => '0');
	}
	echo json_encode($json);
?>