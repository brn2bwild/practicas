<?php 
	session_start();
	
	if(!isset($_SESSION['logged']) || $_SESSION['logged'] != "yes" || $_SESSION['tipo'] != "docente"){
		exit();
	}
?>
<div class="wrapper-registrar">
	<form id="formulario" class="form-datos">
		<div class="datos-registrar" id="datos-registrar">
			<h2>Ingrese los datos de la práctica</h2>
			<input type="text" name="maestro" id="maestro" class="entrada-texto" placeholder="Maestro"readonly="true" style="text-align: center;">
			<select id="selcarrera" name="tagcarrera" class="entrada-texto">
				<option value="Ing. Informática" selected="true">Ing. Informática</option>
				<option value="Ing. Electromecánica">Ing. Electromecánica</option>
				<option value="Ing. Agronomía">Ing. Agronomía</option>
				<option value="Ing. Industrial">Ing. Industrial</option>
				<option value="Ing. Administración">Ing. Administración</option>
				<option value="Ing. Bioquímica">Ing. Bioquímica</option>
				<option value="Ing. Energías Renovables">Ing. Energías Renovables</option>
			</select>
			<select id="selperiodo" name="tagperiodo" class="entrada-texto"></select>
			<select id="selmateria" name="tagmateria" class="entrada-texto"></select>
			<select id="sellaboratorio" name="taglaboratorio" class="entrada-texto"></select>
			<input type="text" name="capacidad" id="capacidad" placeholder="Capacidad" class="entrada-texto" disabled="true">
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
			<input type="text" name="alumnos" id="alumnos" placeholder="No. alumnos" class="entrada-texto">
			<input type="text" name="npractica" id="npractica" class="entrada-texto" placeholder="No. práctica" readonly="true">
			<input id="practica" type="text" name="practica" class="entrada-texto" placeholder="Nombre de la práctica" maxlength="100">

			<input type="checkbox" name="sesiones-registro" value="0" id="check1-sesion" checked="true"><label for="check1-sesion" class="sesiones">Sesión 1</label>
			<input id="fecha" type="date" name="fecha" placeholder="Fecha" class="entrada-texto" disabled="true">
			<input type="checkbox" name="sesiones-registro" value="0" id="check1-horas"><label for="check1-horas" class="sesiones">Horas</label>
			<input id="horas_sesion1" type="text" name="horas_sesion1" class="entrada-texto" placeholder="Horas sesión 1" maxlength="100" disabled="true">

			<input type="checkbox" name="sesiones-registro" value="0" id="check2-sesion"><label for="check2-sesion" class="sesiones">Sesión 2</label>
			<input id="fecha2" type="date" name="fecha" placeholder="Fecha" class="entrada-texto" disabled="true">
			<input type="checkbox" name="sesiones-registro" value="0" id="check2-horas"><label for="check2-horas" class="sesiones">Horas</label>
			<input id="horas_sesion2" type="text" name="horas_sesion2" class="entrada-texto" placeholder="Horas sesión 2" maxlength="100" disabled="true">

			<input type="checkbox" name="sesiones-registro" value="0" id="check3-sesion"><label for="check3-sesion" class="sesiones">Sesión 3</label>
			<input id="fecha3" type="date" name="fecha" placeholder="Fecha" class="entrada-texto" disabled="true">
			<input type="checkbox" name="sesiones-registro" value="0" id="check3-horas"><label for="check3-horas" class="sesiones">Horas</label>
			<input id="horas_sesion3" type="text" name="horas_sesion3" class="entrada-texto" placeholder="Horas sesión 3" maxlength="100" disabled="true">

			<input type="checkbox" name="sesiones-registro" value="0" id="check4-sesion"><label for="check4-sesion" class="sesiones">Sesión 4</label>
			<input id="fecha4" type="date" name="fecha" placeholder="Fecha" class="entrada-texto" disabled="true">
			<input type="checkbox" name="sesiones-registro" value="0" id="check4-horas"><label for="check4-horas" class="sesiones">Horas</label>
			<input id="horas_sesion4" type="text" name="horas_sesion4" class="entrada-texto" placeholder="Horas sesión 4" maxlength="100" disabled="true">

			<input type="checkbox" name="sesiones-registro" value="0" id="check5-sesion"><label for="check5-sesion" class="sesiones">Sesión 5</label>
			<input id="fecha5" type="date" name="fecha" placeholder="Fecha" class="entrada-texto" disabled="true">
			<input type="checkbox" name="sesiones-registro" value="0" id="check5-horas"><label for="check5-horas" class="sesiones">Horas</label>
			<input id="horas_sesion5" type="text" name="horas_sesion5" class="entrada-texto" placeholder="Horas sesión 5" maxlength="100" disabled="true">
			

			<textarea id="descripcion" name="descripcion" placeholder="Descripción" class="entrada-texto" maxlength="500"></textarea>
			<textarea id="materiales" name="materiales" placeholder="Materiales, Reactivos a utilizar" class="entrada-texto" maxlength="750"></textarea>
			<textarea id="equipo" name="equipo" placeholder="Software, Herramientas, Equipos" class="entrada-texto" maxlength="750"></textarea>
		</div>
		<div id="modal_horas" class="modal">
			<div class="horas-registrar">
				<span class="close" id="cerrar">&times;</span>
				<label class="fecha_horas" id="fecha_horas"></label>
				<h2>horas a usar</h2>
				<label id="lcheck1" class="label-horas"><input class="check" id="check1" type="checkbox" name="checkhora[]" value="1" data="7:00-8:00"/>(1) 7:00 - 8:00</label>
				<label id="lcheck2" class="label-horas"><input class="check" id="check2" type="checkbox" name="checkhora[]" value="2" data="8:00-9:00"/>(2) 8:00 - 9:00</label>
				<label id="lcheck3" class="label-horas"><input class="check" id="check3" type="checkbox" name="checkhora[]" value="3" data="9:00-10:00"/>(3) 9:00 - 10:00</label>
				<label id="lcheck4" class="label-horas"><input class="check" id="check4" type="checkbox" name="checkhora[]" value="4" data="10:00-11:00"/>(4) 10:00 - 11:00</label>
				<label id="lcheck5" class="label-horas"><input class="check" id="check5" type="checkbox" name="checkhora[]" value="5" data="11:00-12:00"/>(5) 11:00 - 12:00</label>
				<label id="lcheck6" class="label-horas"><input class="check" id="check6" type="checkbox" name="checkhora[]" value="6" data="12:00-13:00"/>(6) 12:00 - 13:00</label>
				<label id="lcheck7" class="label-horas"><input class="check" id="check7" type="checkbox" name="checkhora[]" value="7" data="13:00-14:00"/>(7) 13:00 - 14:00</label> 
				<label id="lcheck8" class="label-horas"><input class="check" id="check8" type="checkbox" name="checkhora[]" value="8" data="14:00-15:00"/>(8) 14:00 - 15:00</label>
				<label id="lcheck9" class="label-horas"><input class="check" id="check9" type="checkbox" name="checkhora[]" value="9" data="15:00-16:00"/>(9) 15:00 - 16:00</label>
				<label id="lcheck10" class="label-horas"><input class="check" id="check10" type="checkbox" name="checkhora[]" value="10" data="16:00-17:00"/>(10) 16:00 - 17:00</label>
				<label id="lcheck11" class="label-horas"><input class="check" id="check11" type="checkbox" name="checkhora[]" value="11" data="17:00-18:00"/>(11) 17:00 - 18:00</label>
				<label id="lcheck12" class="label-horas"><input class="check" id="check12" type="checkbox" name="checkhora[]" value="12" data="18:00-19:00"/>(12) 18:00 - 19:00</label>
			</div>
		</div>
		<input id="enviar" type="button" class="boton-enviar" value="Enviar"/>
	</form>
</div>
<script type="text/javascript">
	var nombre = "<?php echo $_SESSION["user"];?>";
	var carrera = "<?php echo $_SESSION["carrera"];?>";

	document.getElementById('maestro').value = nombre+' - '+carrera;

	var modal = document.getElementById('modal_horas');
	// var boton = document.getElementById('boton_horas');
	// var span = document.getElementById('cerrar');

	// boton.onclick = function(){
	// 	modal.style.display = "block";
	// }
	// span.onclick = function(){
	// 	modal.style.display = "none";
	// }

	// window.onclick = function(event){
	// 	if(event.target == modal){
	// 		modal.style.display = "none";
	// 	}
	// }
</script>
<script src="js/registrar.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js"></script> -->