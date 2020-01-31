<?php
	session_start();

	if(!isset($_SESSION['logged']) || $_SESSION['logged'] != "yes" || $_SESSION['tipo'] != "administrativo" && $_SESSION['tipo'] != "jefe"){
		exit();
	}
?>

<div class="wrapper-validar">
	<h2>Validación de prácticas</h2>
	<div class="datos-validar">
		<input class="entrada-texto" id="nombre" readonly="true" style="text-align: center;">
		<select class="entrada-texto" id="laboratorios"></select>
		<input type="date" class="entrada-texto" id="fecha">
		<input type="button" id="visualizar" value="Programadas" class="boton-buscar">
		<div id="modal_practicas" class="modal">
			<div class="practicas">
				<span class="close" id="cerrar">&times;</span>
				<input class="entrada-texto" id="laboratorio" disabled="true">
				<input class="entrada-texto" id="fecha_visualizar" disabled="true">
				<input class="entrada-texto" disabled="true" id="etiqueta_practicas" value="Prácticas"></label>
				<div id="practicas_programadas"></div>
			</div>
		</div>
		<input type="button" id="buscar" value="Realizadas" class="boton-buscar">
		<select class="entrada-texto" id="practicas">
			<option value="-" selected="true">Seleccione alguna práctica para confirmar</option>
		</select>
		<input type="text" class="entrada-texto" id="alumnos-programados" disabled="true" placeholder="Alumnos programados">
		<input type="text" class="entrada-texto" id="alumnos-asistencia" placeholder="Alumnos presentes">
		<textarea class="entrada-texto" id="materiales" placeholder="Materiales y/o insumos" style="height: 120px;" disabled="true"></textarea>
		<textarea class="entrada-texto" id="equipo" placeholder="Software, herramientas y/o equipo" style="height: 120px;" disabled="true"></textarea>
		<textarea class="entrada-texto" id="observacion_profesor" placeholder="Observaciones del profesor" style="height: 120px;" disabled="true"></textarea>
		<textarea class="entrada-texto" id="fallas" placeholder="Reporte de fallas" style="height: 120px;" disabled="true" hidden="true"></textarea>
		<textarea class="entrada-texto" id="seguimiento" placeholder="Seguimiento de fallas" style="height: 120px;" hidden="true" maxlength="150"></textarea>
		<textarea class="entrada-texto" id="observaciones" placeholder="Observaciones laboratorista" style="height: 120px;" maxlength="150"></textarea>
		<input type="checkbox" name="parametros-validar" value="30" id="check1-param"><label for="check1-param" class="param-validar">El laboratorio se encuentra en condiciones adecuadas para su uso(Laboratorio en orden y limpio, equipos funcionando, equipo y/o herramientas en orden). (30%)</label>
		<input type="checkbox" name="parametros-validar" value="10" id="check2-param"><label for="check2-param" class="param-validar">Profesor asistió puntual a la práctica. (10%)</label>
		<input type="checkbox" name="parametros-validar" value="10" id="check3-param"><label for="check3-param" class="param-validar">La práctica terminó a tiempo. (10%)</label>
		<input type="checkbox" name="parametros-validar" value="0" id="check4-param"><label for="check4-param" class="param-validar">¿Confirmar la realización de la práctica?</label>
		<input type="button" class="boton-validar" value="Validar" id="boton-validar">
	</div>
</div>

<script type="text/javascript">
	var nombre = "<?php echo $_SESSION["user"];?>";
	var carrera = "<?php echo $_SESSION["carrera"];?>";

	document.getElementById('nombre').value = nombre+' - '+carrera;

	var modal = document.getElementById('modal_practicas');

</script>
<script src="js/validacion.js"></script>