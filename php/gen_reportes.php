<?php
	session_start();

	if(!isset($_SESSION['logged']) || $_SESSION['logged'] != "yes" || $_SESSION['tipo'] != "docente"){
		exit();
	}
?>
<div class="wrapper-reportes">
	<h2>Generar reportes</h2>
	<div class="datos-reportes">
		<input type="text" name="nombre" class="entrada-texto" id="nombre" readonly="true" style="text-align: center;" />
		<select id="selperiodo" class="entrada-texto"></select>
		<select id="seltipo" class="entrada-texto" name="tagtipo">
			<option value="materia" selected="true">Materia</option>
			<option value="laboratorio">Laboratorio</option>
		</select>
		<select id="selopcion" class="entrada-texto" name="tagopciones">
			<option value="0" selected="true">Da click en Buscar para seleccionar la materia</option>
		</select>
		<select id="semestre" class="entrada-texto" name="tagsemestre" hidden="true">
				<option value="1" selected="true">1°</option>
				<option value="2">2°</option>
				<option value="3">3°</option>
				<option value="4">4°</option>
				<option value="5">5°</option>
				<option value="6">6°</option>
				<option value="7">7°</option>
				<option value="8">8°</option>
				<option value="9">9°</option>
			</select>
			<select id="grupo" class="entrada-texto" name="taggrupo" hidden="true">
				<option value="A" selected="true">A</option>
				<option value="B">B</option>
			</select>
			<select id="turno" class="entrada-texto" name="tagturno" hidden="true">
				<option value="Matutino" selected="true">Matutino</option>
				<option value="Vespertino">Vespertino</option>
			</select>
		<label id="reporte" class="label-horas" style="width: 50%; float: left; text-align: center;"><input class="check" id="reporte-full" type="checkbox" name="reporte" style="margin: 0 auto;"/>Reporte planeación de prácticas</label>
		<label id="materiales-completos" class="label-horas" style="width: 50%; float: left; text-align: center;"><input class="check" id="materiales-full" type="checkbox" name="materiales-full" style="margin: 0 auto;" />Lista de materiales y/o equipo completa</label>
	</div>
	<div class="botones-reportes">
		<input type="button" id="buscar" class="boton-buscar" value="Buscar" />
		<input class="boton-reporte" type="button" value="Generar" id="generar"/>
	</div>
</div>
<script src="js/jspdf/jspdf.debug.js"></script>
<script src="js/generar.js"></script>
<script type="text/javascript">
	var nombre = "<?php echo $_SESSION["user"];?>";
	var carrera = "<?php echo $_SESSION["carrera"];?>";

	document.getElementById("nombre").value = nombre+' - '+carrera;
</script>