<?php
	require_once('conexionBD.php');

	$id = strip_tags($_POST['id']);
	$npractica = strip_tags($_POST['npractica']);
	$carrera = strip_tags($_POST['carrera']);
	$materia = strip_tags($_POST['materia']);
	$semestre = strip_tags($_POST['semestre']);
	$grupo = strip_tags($_POST['grupo']);
	$turno = strip_tags($_POST['turno']);
	$practica = strip_tags($_POST['practica']);
	$descripcion = strip_tags($_POST['descripcion']);
	$materiales = strip_tags($_POST['materiales']);
	$equipo = strip_tags($_POST['equipo']);

	$conexion = conectarBD();

	if(!$resultado = mysqli_query($conexion, "UPDATE `practicas_programadas` SET `carrera`='$carrera',`materia`='$materia',`semestre`='$semestre',`grupo`='$grupo',`turno`='$turno',`practica`='$practica',`descripcion`='$descripcion',`materiales`='$materiales',`equipo`='$equipo' WHERE `id`='$id' AND `npractica`='$npractica'")) die("Error- al hacer la consulta a la base de datos");

	desconectarBD($conexion);

	echo("Datos cargados");
?>