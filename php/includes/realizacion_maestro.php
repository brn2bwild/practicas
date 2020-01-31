<?php
	require_once('conexionBD.php');

	$id = strip_tags($_POST['id']);
	$npractica = strip_tags($_POST['npractica']);
	$reporte = strip_tags($_POST['reporte_fallas']);
	$observaciones = strip_tags($_POST['observaciones']);
	$eficiencia = strip_tags($_POST['eficiencia']);

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion, "UPDATE `practicas_programadas` SET `fecha_realizacion`=CURRENT_TIMESTAMP, `realizada`='1', `fallas`='$reporte', `observacion_prof`='$observaciones', `eficiencia`='$eficiencia' WHERE `id`='$id' AND `npractica`='$npractica'")) die("Error- al hacer la consulta a la base de datos");

	desconectarBD($conexion);

	echo("Datos cargados");
?>