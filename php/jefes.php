<?php
	session_start();
	if(!isset($_SESSION['logged']) || $_SESSION['logged'] != "yes" || $_SESSION['tipo'] != "jefe" && $_SESSION['tipo'] != "direccion"){
		exit();
	}
?>
<div>
	<div class="wrapper-jefes" id="jefes">
		<div class="datos-jefes" id="datos-jefes">
			<input type="text" name="nombre" class="entrada-texto" id="nombre" readonly="true" style="text-align: center"/>
			<select id="selopciones" class="entrada-texto">
				<option value="1" selected="true">Generar reportes</option>
				<option value="2">Obtener indicadores</option>
			</select>
			<select class="entrada-texto" id="selperiodo"></select>
			<select id="selespecificacion1" class="entrada-texto" name="tagespecifica1"></select>
			<select id="selespecificacion2" class="entrada-texto" name="tagespecifica2"></select>
			<input class="boton-jefes" type="button" value="Generar" id="generar"/>
		</div>
	</div>

	<div id="indicadores" class="grafico-indicadores"></div>
	<div id="practicas" class="relacion-practicas"></div>
	<div id="justificaciones" class="grafico-reprogramaciones"></div>
</div>

<script type="text/javascript">

	var nombre = "<?php echo $_SESSION["user"]?>";
	var carrera = "<?php echo $_SESSION["carrera"]?>";

	datos = nombre + ' - ' + carrera;
	document.getElementById('nombre').value = datos;
	
</script>
<script src="js/jefes.js"></script>