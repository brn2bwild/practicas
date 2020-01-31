<?php
	session_start();

	if(!isset($_SESSION['logged']) || $_SESSION['logged'] != "yes" || $_SESSION['tipo'] != "docente"){
		exit();
	}
?>
<div class="wrapper-reprogramar">
	<h2>Reprogramar práctica</h2>
	<div class="datos-reprogramar">
		<input class="entrada-texto" id="nombre" placeholder="Nombre" readonly="true" style="text-align: center;">
		<input type="button" class="boton-buscar" id="buscar" value="Buscar">
		<select name="resultado" id="resultados" class="entrada-texto">
			<option value="0" selected="true">Presione BUSCAR para seleccionar una práctica</option>
		</select>
		<select id="laboratorios" class="entrada-texto"></select>
		
		<input type="checkbox" name="sesiones-registro" value="0" id="check1-sesion"><label for="check1-sesion" class="sesiones">Sesión 1</label>
		<input id="fecha1" type="date" name="fecha" placeholder="Fecha" class="entrada-texto" disabled="true">
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

		<div class="justificante-reprogramar">
			<h2>Justificación</h2>
			<input type="radio" name="justificante" id="justificante1" value="1" checked="true">
			<label for="justificante1" class="radio-justificantes">Pase de entrada/salida, día económico</label>
			<input type="radio" name="justificante" id="justificante2" value="2">
			<label for="justificante2" class="radio-justificantes">Insuficiencia en los insumos, herramientas y/o equipo</label>
			<input type="radio" name="justificante" id="justificante3" value="3">
			<label for="justificante3" class="radio-justificantes">Fallas en el equipo por falta de mantenimiendo preventivo y/o correctivo</label>
			<input type="radio" name="justificante" id="justificante4" value="4">
			<label for="justificante4" class="radio-justificantes">Fallas en el suministro eléctrico, fallas en el servicio de internet, condiciones climatológicas</label>
			<input type="radio" name="justificante" id="justificante5" value="5">
			<label for="justificante5" class="radio-justificantes">Ausencia del grupo</label>
			<input type="radio" name="justificante" id="justificante6" value="6">
			<label for="justificante6" class="radio-justificantes">Inasistencia el laboratorista</label>
			<input type="radio" name="justificante" id="justificante7" value="7">
			<label for="justificante7" class="radio-justificantes">Otros (especifique)</label>
			<input type="text" name="especificacion" id="especificacion" class="entrada-texto" placeholder="Especifique la razón específica de la reprogramación" maxlength="100" hidden="true">
		</div>
	</div>
	<div id="modal_horas" class="modal">
		<div class="horas-reprogramar">
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
	
	<input type="button" class="boton-reprogramar" id="reprogramarbtn" value="Reprogramar">

</div>

<script type="text/javascript">
	var nombre = "<?php echo $_SESSION["user"];?>";
	var carrera = "<?php echo $_SESSION["carrera"];?>";

	document.getElementById("nombre").value = nombre+' - '+carrera;

	var modal = document.getElementById('modal_horas');
</script>
<script src="js/reprogramar.js"></script>
