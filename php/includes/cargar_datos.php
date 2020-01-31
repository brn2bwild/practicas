<?php
	require_once('conexionBD.php');

	$conexion = conectarBD();

	mysqli_query($conexion, "SET NAMES 'utf-8'");

	$maestro = 		strip_tags($_POST['maestro']);
	$carrera =		strip_tags($_POST['carrera']);
	$periodo = 		strip_tags($_POST['periodo']);
	$materia = 		strip_tags($_POST['materia']);
	$laboratorio = 	strip_tags($_POST['laboratorio']);
	$semestre = 	strip_tags($_POST['semestre']);
	$grupo = 		strip_tags($_POST['grupo']);
	$turno = 		strip_tags($_POST['turno']);
	$practica =		strip_tags($_POST['practica']);
	$n_pract = 		strip_tags($_POST['npractica']);
	$descripcion = 	strip_tags($_POST['descripcion']);
	$materiales = 	strip_tags($_POST['materiales']);
	$equipo = 		strip_tags($_POST['equipo']);
	//$fecha = 		strip_tags($_POST['fecha']);
	//$horas = 		$_POST['horas'];
	$alumnos =		strip_tags($_POST['alumnos']);
	$fecha1 = 		strip_tags($_POST['fecha1']);
	$horas1 = 		$_POST['horas1'];
	$fecha2 = 		strip_tags($_POST['fecha2']);
	$horas2 = 		$_POST['horas2'];
	$fecha3 = 		strip_tags($_POST['fecha3']);
	$horas3 = 		$_POST['horas3'];
	$fecha4 = 		strip_tags($_POST['fecha4']);
	$horas4 = 		$_POST['horas4'];
	$fecha5 = 		strip_tags($_POST['fecha5']);
	$horas5 = 		$_POST['horas5'];

	//$str_horas= implode(",", $horas);

	//if(!$resp = mysqli_query($conexion, "INSERT INTO `practicas_programadas`(`horas_ocupadas`, `maestro`, `materia`, `periodo`, `carrera`, `semestre`, `grupo`, `turno`, `laboratorio`, `materiales`, `equipo`, `descripcion`, `fecha_programada`, `practica`, `npractica`, `realizada`, `alumnos_programados`,`sesion1_fecha`,`sesion1_horas`,`sesion2_fecha`,`sesion2_horas`,`sesion3_fecha`,`sesion3_horas`,`sesion4_fecha`,`sesion4_horas`,`sesion5_fecha`,`sesion5_horas`) VALUES ('$horas','$maestro','$materia', '$periodo', '$carrera', '$semestre', '$grupo', '$turno', '$laboratorio', '$materiales', '$equipo', '$descripcion','$fecha', '$practica', '$n_pract',0,'$alumnos','$fecha1','$horas1','$fecha2','$horas2','$fecha3','$horas3','$fecha4','$horas4','$fecha5','$horas5')")) die("Error- al hacer la consulta a la base de datos");

	if(!$resp = mysqli_query($conexion, "INSERT INTO `practicas_programadas`(`maestro`, `materia`, `periodo`, `carrera`, `semestre`, `grupo`, `turno`, `laboratorio`, `materiales`, `equipo`, `descripcion`, `practica`, `npractica`, `realizada`, `alumnos_programados`, `sesion1_fecha`, `sesion1_horas`, `sesion2_fecha`, `sesion2_horas`, `sesion3_fecha`, `sesion3_horas`, `sesion4_fecha`, `sesion4_horas`, `sesion5_fecha`, `sesion5_horas`) VALUES ('$maestro','$materia', '$periodo', '$carrera', '$semestre', '$grupo', '$turno', '$laboratorio', '$materiales', '$equipo', '$descripcion','$practica', '$n_pract',0,'$alumnos','$fecha1','$horas1','$fecha2','$horas2','$fecha3','$horas3','$fecha4','$horas4','$fecha5','$horas5')")) die("Error- al hacer la consulta a la base de datos");

	desconectarBD($conexion);

	echo "Práctica registrada con éxito";
?>