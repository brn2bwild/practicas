<?php
	session_start();

	if(!isset($_SESSION['logged']) || $_SESSION['logged'] != "yes" || $_SESSION['tipo'] != "docente"){
		exit();
	}
?>
<div class="wrapper-realizacion">
	<h2>Realización de práctica</h2>
	<div class="datos-realizacion">
		<input class="entrada-texto" id="nombre" readonly="true" style="text-align: center;">
		<select class="entrada-texto" id="tipo">
			<option value="materia" selected="true">Materia</option>
			<option value="laboratorio">Laboratorio</option>
			<option value="carrera">Carrera</option>
		</select>
		<select class="entrada-texto" id="periodo"></select>
		<input type="button" class="boton-buscar" id="buscar" value="Buscar">
		<select class="entrada-texto" id="opciones">
			<option value="0" selected="true">Da click en Buscar</option>
		</select>
		<select class="entrada-texto" id="resultados">
			<option value="-" selected="true">Selecciona alguna opción</option>
		</select>
	</div>
	<div class="calificacion-realizacion">
		<input type="checkbox" name="parametros-profesor" value="10" id="check1-param"><label for="check1-param" class="param-profesor">El laboratorio se encuentra en condiciones adecuadas para la realización de la práctica (Laboratorio límpio y en orden, equipos funcionando y en orden). (10%)</label>
		<input type="checkbox" name="parametros-profesor" value="10" id="check2-param"><label for="check2-param" class="param-profesor">La práctica se realizó con un protocolo (o manual) definido, siendo mayormente un proceso práctico, aplicando los conocimientos adquiridos en el aula. (10%)</label>
		<input type="checkbox" name="parametros-profesor" value="10" id="check3-param"><label for="check3-param" class="param-profesor">Los materiales y/o equipo utilizado, se usó de manera adecuada y eficiente. (10%)</label>
		<input type="checkbox" name="parametros-profesor" value="10" id="check4-param"><label for="check4-param" class="param-profesor">Se hizo una descripción de la actividad a los alumnos para la realización de la práctica, así como para el mejor aprovechamiento de los equipos y/o materiales utilizados en la práctica. (10%)</label>
		<input type="checkbox" name="parametros-profesor" value="10" id="check5-param"><label for="check5-param" class="param-profesor">Se presenta evidencia de la realización de la práctica por parte de los alumnos. (10%)</label>
		<input type="checkbox" name="parametros-profesor" value="0" id="check6-param"><label for="check6-param" class="param-profesor">Observaciones de la práctica (Desarrollo)</label>
		<textarea class="entrada-texto" id="observaciones" maxlength="400" placeholder="Observaciones" style="margin: 5px 0 0 0;" hidden="true"></textarea>
		<input type="checkbox" name="parametros-profesor" value="-5" id="check7-param"><label for="check7-param" class="param-profesor">Reporte de fallas. (-5%)</label>
		<textarea class="entrada-texto" id="reporte-fallas" maxlength="250" placeholder="Reporte de fallas (especifique)" style="margin: 5px 0 0 0;" hidden="true"></textarea>
	</div>
	<div class="botones-realizacion">
		<input type="button" name="boton-realizacion" class="boton-enviar" id="enviar" value="Enviar">
	</div>
</div>

<script type="text/javascript">
	var nombre = "<?php echo $_SESSION["user"];?>";
	var carrera = "<?php echo $_SESSION["carrera"];?>";

	document.getElementById('nombre').value = nombre+' - '+carrera;
</script>
<script src="js/realizacion.js"></script>