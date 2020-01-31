<?php
	require_once('conexionBD.php');

	$id = strip_tags($_POST['id']);
	$npractica = strip_tags($_POST['npractica']);
	$nombre = strip_tags($_POST['nombre']);
	$alumnos_presentes = strip_tags($_POST['alumnos_presentes']);
	$observaciones = strip_tags($_POST['observaciones']);
	$seguimiento = strip_tags($_POST['seguimiento']);
	$eficiencia = strip_tags($_POST['eficiencia']);
	$validada = strip_tags($_POST['validada']);

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion, "UPDATE `practicas_programadas` SET `confirma`='$nombre', `alumnos_presentes`='$alumnos_presentes', `observaciones`='$observaciones', `seguimiento`='$seguimiento', `eficiencia`=`eficiencia`+'$eficiencia', `validada`='$validada' WHERE `id`='$id' AND `npractica`='$npractica'")) die("Error- al hacer la consulta a la base de datos");

	desconectarBD($conexion);

	echo("Datos cargados");
?>