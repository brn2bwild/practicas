<?php
	session_start();
	
	if(!isset($_SESSION['logged']) || $_SESSION['logged'] != "yes" || $_SESSION['tipo'] != "docente"){
		exit();
	}
?>

<div class="wrapper-editar">
	<h2>Edición de práctica</h2>
	<div class="datos-editar">
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
		<select id="carrera" name="tagcarrera" class="entrada-texto">
			<option value="Ing. Informática" selected="true">Ing. Informática</option>
			<option value="Ing. Electromecánica">Ing. Electromecánica</option>
			<option value="Ing. Agronomía">Ing. Agronomía</option>
			<option value="Ing. Industrial">Ing. Industrial</option>
			<option value="Ing. Administración">Ing. Administración</option>
			<option value="Ing. Bioquímica">Ing. Bioquímica</option>
			<option value="Ing. Energías Renovables">Ing. Energías Renovables</option>
		</select>
		<select id="materias" class="entrada-texto">
			<option value="-" selected="true">Selecciona alguna materia</option>
		</select>
		<select id="semestre" class="entrada-texto" name="tagsemestre">
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
		<select id="grupo" class="entrada-texto" name="taggrupo">
			<option value="A" selected="true">A</option>
			<option value="B">B</option>
		</select>
		<select id="turno" class="entrada-texto" name="tagturno">
			<option value="Matutino" selected="true">Matutino</option>
			<option value="Vespertino">Vespertino</option>
		</select>
		<input id="practica" type="text" name="practica" class="entrada-texto" placeholder="Nombre de la práctica" maxlength="150"> <!--cambiar en la base de datos el maximo de caracteres del nombre de la práctica-->
		<textarea id="descripcion" name="descripcion" placeholder="Descripción" class="entrada-texto" maxlength="500" style="height: 120px;"></textarea>
		<textarea id="materiales" name="materiales" placeholder="Materiales, Reactivos a utilizar" class="entrada-texto" maxlength="750" style="height: 120px;"></textarea>
		<textarea id="equipo" name="equipo" placeholder="Software, Herramientas, Equipos" class="entrada-texto" maxlength="750" style="height: 120px;"></textarea>
	</div>
	<div class="botones-editar">
		<input type="button" name="boton-editar" class="boton-enviar" id="enviar" value="Enviar">
	</div>
</div>

<script type="text/javascript">
	var nombre = "<?php echo $_SESSION["user"];?>";
	var carrera = "<?php echo $_SESSION["carrera"];?>";

	document.getElementById('nombre').value = nombre+' - '+carrera;
</script>
<script src="js/editar.js"></script>