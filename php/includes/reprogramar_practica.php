<?php
	require_once('conexionBD.php');

	$id = strip_tags($_POST['id']);
	$npractica = strip_tags($_POST['npractica']);
	$fecha1 = strip_tags($_POST['fecha1']);
	$fecha2 = strip_tags($_POST['fecha2']);
	$fecha3 = strip_tags($_POST['fecha3']);
	$fecha4 = strip_tags($_POST['fecha4']);
	$fecha5 = strip_tags($_POST['fecha5']);
	$horas1 = $_POST['horas1'];
	$horas2 = $_POST['horas2'];
	$horas3 = $_POST['horas3'];
	$horas4 = $_POST['horas4'];
	$horas5 = $_POST['horas5'];
	$justificacion = strip_tags($_POST['justificacion']);
	$especificacion = strip_tags($_POST['especificacion']);
	$laboratorio = strip_tags($_POST['laboratorio']);

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion, "UPDATE `practicas_programadas` SET `sesion1_fecha`='$fecha1', `sesion1_horas`='$horas1', `sesion2_fecha`='$fecha2', `sesion2_horas`='$horas2', `sesion3_fecha`='$fecha3', `sesion3_horas`='$horas3', `sesion4_fecha`='$fecha4', `sesion4_horas`='$horas4', `sesion5_fecha`='$fecha5', `sesion5_horas`='$horas5', `reprogramada`=`reprogramada`+1, `justificacion`='$justificacion', `especificacion`='$especificacion',`laboratorio`='$laboratorio' WHERE `id` = '$id' AND `npractica` = '$npractica'")) die("Error- al reprogramar la práctica");

	desconectarBD($conexion);

	$respuesta = array("reprogramada" => $resultado);

	echo json_encode($respuesta);
?>