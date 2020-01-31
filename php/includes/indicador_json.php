<?php
	require_once('conexionBD.php');

	$tipo = strip_tags($_POST['tipo']);
	$selector = strip_tags($_POST['selector']);
	$periodo = strip_tags($_POST['periodo']);
	$jefatura = strip_tags($_POST['jefatura']);

	$conexion = conectarBD();

	if($jefatura == "Dirección"){
		if($tipo == "maestro"){
			if(!$resultado = mysqli_query($conexion,"SELECT * FROM `practicas_programadas` WHERE `maestro` = '$selector' AND `periodo`='$periodo' ")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "laboratorio"){
			if(!$resultado = mysqli_query($conexion,"SELECT * FROM `practicas_programadas` WHERE `laboratorio` = '$selector' AND `periodo`='$periodo'")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "carrera"){
			if(!$resultado = mysqli_query($conexion,"SELECT * FROM `practicas_programadas` WHERE `carrera` = '$selector' AND `periodo`='$periodo'")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "institucion"){
			if(!$resultado = mysqli_query($conexion,"SELECT * FROM `practicas_programadas` WHERE `periodo`='$periodo'")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "materia"){
			if(!$resultado = mysqli_query($conexion,"SELECT * FROM `practicas_programadas` WHERE `materia` ='$selector' AND `periodo`='$periodo' ")) die("Error- al hacer la consulta a la base de datos");
		}
	}else{
		if($tipo == "maestro"){
			if(!$resultado = mysqli_query($conexion,"SELECT * FROM `practicas_programadas` WHERE `maestro` = '$selector' AND `periodo`='$periodo' AND `carrera`='$jefatura'")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "laboratorio"){
			if(!$resultado = mysqli_query($conexion,"SELECT * FROM `practicas_programadas` WHERE `laboratorio` = '$selector' AND `periodo`='$periodo' AND `carrera`='$jefatura'")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "carrera"){
			if(!$resultado = mysqli_query($conexion,"SELECT * FROM `practicas_programadas` WHERE `carrera` = '$selector' AND `periodo`='$periodo'")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "institucion"){
			if(!$resultado = mysqli_query($conexion,"SELECT * FROM `practicas_programadas` WHERE `periodo`='$periodo'")) die("Error- al hacer la consulta a la base de datos");
		}else if($tipo == "materia"){
			if(!$resultado = mysqli_query($conexion,"SELECT * FROM `practicas_programadas` WHERE `materia` ='$selector' AND `periodo`='$periodo' AND `carrera`='$jefatura'")) die("Error- al hacer la consulta a la base de datos");
		}
	}
	
	desconectarBD($conexion);

	$datos = array();
	$i = 0;

	if(mysqli_num_rows($resultado) != 0){
		while($fila = mysqli_fetch_array($resultado)){
			$datos[$i] = $fila;/*['maestro'].':'.$fila['materia'].':'.$fila['carrera'].':'.$fila['npractica'].':'.$fila['practica'].':'.$fila['laboratorio'].':'.$fila['horas_ocupadas'].':'.$fila['fecha_programada'].':'.$fila['reprogramada'].':'.$fila['fecha_realizacion'].':'.$fila['realizada'];*/
			$i++;
		}
		$json = array("practicas" => $datos);
	}else{
		die("Error- no existen datos con los parámetros solicitados");
	}

	echo json_encode($json);

?>