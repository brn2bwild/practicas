$(document).ready(function(){
	$("#laboratorios").load(laboratorios());
	$("#fecha").load(fechas());
	$("#fecha").change(function(){validar_fecha(this.id);});
	$("#buscar").click(function(event){buscar();});
	$("#practicas").change(function(event){datos_practica();});
	//$("#laboratorios").change(function(event){buscar();});
	$("#alumnos-asistencia").keypress(function(e){
		if(e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)){
			return false;
		}
	});
	$("#alumnos-asistencia").change(function(e){
		programados = parseInt(document.getElementById("alumnos-programados").value);
		presentes = parseInt(document.getElementById("alumnos-asistencia").value);

		if(presentes > programados){
			alert("La cantidad de alumnos presentes debe ser igual o menor a los alumnos programados");
			document.getElementById("alumnos-asistencia").value = "";
		}
	});
	$("#boton-validar").click(function(event){validar_practica();});
	$("#visualizar").click(function(){

		var laboratorio = document.getElementById('laboratorios').value;
		var fecha = document.getElementById('fecha').value;
		var practicas;
		document.getElementById('fecha_visualizar').value = fecha;
		document.getElementById('laboratorio').value = laboratorio;

		$.ajax({
			type:  "POST",
			url:   "php/includes/practicas_visualizar_json.php",
			data:  {fecha:fecha,laboratorio:laboratorio}
		}).done(function(respuesta){
			if(respuesta.substring(0,5) == "Error"){
				alert(respuesta);
			}else{
				var json = JSON.parse(respuesta);
				practicas = json.practicas;
				visualizar_practicas(practicas);
			}
		});
	});
});

function visualizar_practicas(practicas){
	document.getElementById('modal_practicas').style.display = 'block';
	var etiquetas = document.getElementById('practicas_programadas');
	for(practica in practicas){
		var etiqueta_practica = document.createElement("INPUT");				
		var etiqueta_maestro= document.createElement("INPUT");
		var etiqueta_materia= document.createElement("INPUT");
		var etiqueta_materiales= document.createElement("TEXTAREA");
		var etiqueta_equipo= document.createElement("TEXTAREA");
		etiqueta_practica.setAttribute("id","practica"+practica);
		etiqueta_practica.setAttribute("type", "text");
		etiqueta_practica.setAttribute("value", practicas[practica]['practica']);
		etiqueta_practica.setAttribute("class", "etiqueta_practica");
		etiqueta_practica.setAttribute("disabled", "true");
		etiqueta_maestro.setAttribute("id","maestro"+practica);
		etiqueta_maestro.setAttribute("value", practicas[practica]['maestro']);
		etiqueta_maestro.setAttribute("class", "etiqueta_maestro");
		etiqueta_maestro.setAttribute("disabled", "true");
		etiqueta_materia.setAttribute("id","materia"+practica);
		etiqueta_materia.setAttribute("value", practicas[practica]['materia']);
		etiqueta_materia.setAttribute("class", "etiqueta_materia");
		etiqueta_materia.setAttribute("disabled", "true");

		etiqueta_materiales.setAttribute("id","materiales"+practica);
		var texto_materiales = document.createTextNode(practicas[practica]['materiales']);
		etiqueta_materiales.appendChild(texto_materiales);
		etiqueta_materiales.setAttribute("class", "etiqueta_materiales");
		etiqueta_materiales.setAttribute("disabled", "true");

		etiqueta_equipo.setAttribute("id","equipo"+practica);
		var texto_equipo = document.createTextNode(practicas[practica]['equipo']);
		etiqueta_equipo.appendChild(texto_equipo);
		etiqueta_equipo.setAttribute("class", "etiqueta_equipo");
		etiqueta_equipo.setAttribute("disabled", "true");

		etiquetas.appendChild(etiqueta_practica);
		etiquetas.appendChild(etiqueta_maestro);
		etiquetas.appendChild(etiqueta_materia);
		etiquetas.appendChild(etiqueta_materiales);
		etiquetas.appendChild(etiqueta_equipo);
	}

	document.getElementById('cerrar').onclick = function(){
		modal.style.display = 'none';
		for(practica in practicas){
			var etiqueta_practica = document.getElementById("practica"+practica);
			var etiqueta_maestro = document.getElementById("maestro"+practica);
			var etiqueta_materia = document.getElementById("materia"+practica);
			var etiqueta_materiales = document.getElementById("materiales"+practica);
			var etiqueta_equipo = document.getElementById("equipo"+practica);
			etiqueta_practica.parentNode.removeChild(etiqueta_practica);
			etiqueta_maestro.parentNode.removeChild(etiqueta_maestro);
			etiqueta_materia.parentNode.removeChild(etiqueta_materia);
			etiqueta_materiales.parentNode.removeChild(etiqueta_materiales);
			etiqueta_equipo.parentNode.removeChild(etiqueta_equipo);
		}
	}
}

function validar_fecha(objeto){
	var fecha = new Date(document.getElementById(objeto).value);
	var hoy = new Date();
	var dd = ''+hoy.getDate();
	var mm = ''+(hoy.getMonth()+1);
	var yy = hoy.getFullYear();

	if(mm.length < 2) mm = '0'+mm;
	if(dd.length < 2) dd = '0'+dd;

	hoy = yy+"-"+mm+"-"+dd;
	var fecha_hoy = new Date(hoy);
		

	//para poder limitar la fecha
	// if((fecha - fecha_hoy) < -345600000){
	//  	alert("Debes ingresar un fecha válida");
	// 	document.getElementById(objeto).value = "";
	// }




	// }else if(objeto == "fecha"){
	// 	var fecha1 = new Date(document.getElementById('fecha').value);
	// 	var fecha2 = new Date(document.getElementById('fecha2').value);

	// 	if((fecha2 - fecha1) < 0){
	// 		alert("La fecha de la sesión 2 debe ser igual o posterior a la sesión 1");
	// 		document.getElementById(objeto).value = "";
	// 	}
	// }else if(objeto == "fecha2"){
	// 	var fecha1 = new Date(document.getElementById('fecha').value);
	// 	var fecha2 = new Date(document.getElementById('fecha2').value);

	// 	if((fecha2 - fecha1) < 0){
	// 		alert("La fecha de la sesión 2 debe ser igual o posterior a la sesión 1");
	// 		document.getElementById(objeto).value = "";
	// 	}
	// }else if(objeto == "fecha3"){
	// 	var fecha1 = new Date(document.getElementById('fecha2').value);
	// 	var fecha2 = new Date(document.getElementById('fecha3').value);

	// 	if((fecha2 - fecha1) < 0){
	// 		alert("La fecha de la sesión 3 debe ser igual o posterior a la sesión 2");
	// 		document.getElementById(objeto).value = "";
	// 	}
	// }else if(objeto == "fecha4"){
	// 	var fecha1 = new Date(document.getElementById('fecha3').value);
	// 	var fecha2 = new Date(document.getElementById('fecha4').value);

	// 	if((fecha2 - fecha1) < 0){
	// 		alert("La fecha de la sesión 4 debe ser igual o posterior a la sesión 3");
	// 		document.getElementById(objeto).value = "";
	// 	}
	// }else if(objeto == "fecha5"){
	// 	var fecha1 = new Date(document.getElementById('fecha4').value);
	// 	var fecha2 = new Date(document.getElementById('fecha5').value);

	// 	if((fecha2 - fecha1) < 0){
	// 		alert("La fecha de la sesión 5 debe ser igual o posterior a la sesión 4");
	// 		document.getElementById(objeto).value = "";
	// 	}
	// }
}

function validar_practica(){
	var nombre = $("#nombre").val().split('-')[0].trim();
	//var carrera = $("#nombre").val().split('-')[1].trim();
	var laboratorio = $("#laboratorios option:selected").val();
	var alumnos_presentes = $("#alumnos-asistencia").val();
	var seguimiento = $("#seguimiento").val();
	var observaciones = $("#observaciones").val();
	var eficiencia = 0;
	var validada = 0;

	$(':checkbox:checked').each(function(i){
		eficiencia += parseInt($(this).val());
	});

	if($("#practicas option:selected").val() == '-'){
		alert("No hay ninguna práctica seleccionada");
		return false
	}else{
		var idsql = $("#practicas option:selected").val().split(';')[0].trim();
		var npractica = $("#practicas option:selected").val().split(';')[1].trim();
	}
	if(alumnos_presentes == 0){
		alert("Debes ingresar la cantidad de alumnos presentes en la práctica");
		return false;
	}
	if(document.getElementById('check4-param').checked){
		validada = 1;
	}else{
		validada = 0;
	}

	$.ajax({
		type: 	"POST",
		url: 	"php/includes/validacion_laboratorista.php",
		data: 	{id:idsql,npractica:npractica,nombre:nombre,alumnos_presentes:alumnos_presentes,observaciones:observaciones,seguimiento:seguimiento,eficiencia:eficiencia,validada:validada},
		success: function(respuesta){
			if(respuesta.substring(0,5) == "Error"){
				alert(respuesta);
			}else{
				alert(respuesta);
				location.reload();
			}
		}
	});
}

function buscar(){
	var selpracticas = document.getElementById("practicas");
	selpracticas.options.length = 0;
	var laboratorio = $("#laboratorios").val();
	var fecha = $("#fecha").val();
	document.getElementById("alumnos-programados").value = "";
	document.getElementById("alumnos-asistencia").value = "";
	document.getElementById("seguimiento").value = "";
	if(fecha.length == 0){
		alert("Debes seleccionar una fecha");
		selpracticas.options[selpracticas.options.length] = new Option("Seleccione alguna práctica para confirmar","0");
		return false;
	}else{
		$.ajax({
		type:  "POST",
		url:   "php/includes/practicas_validacion_json.php",
		data:  {laboratorio:laboratorio,fecha:fecha},
		success: function(respuesta){
			if(respuesta.substring(0,5) == "Error"){
				alert(respuesta);
				selpracticas.options[selpracticas.options.length] = new Option("Seleccione alguna práctica para confirmar","0");
				$("#materiales").val('');
				$("#equipo").val('');
				$("#observacion_profesor").val('');
				$("#fallas").val('');
				$("#seguimiento").val('');
			}else{
				var json = JSON.parse(respuesta);
				practicas = json.practicas;

				for(practica in practicas){
					selpracticas.options[selpracticas.options.length] = new Option(practicas[practica]['npractica']+' - '+practicas[practica]['practica']+' - '+practicas[practica]['maestro']+' - '+practicas[practica]['materia']+' - '+practicas[practica]['carrera']+' - '+practicas[practica]['semestre']+' - '+practicas[practica]['grupo'],practicas[practica]['id']+';'+practicas[practica]['npractica']+';'+practicas[practica]['materiales']+';'+practicas[practica]['equipo']+';'+practicas[practica]['observacion_prof']+';'+practicas[practica]['fallas']+';'+practicas[practica]['alumnos_programados']+';'+practicas[practica]['alumnos_presentes']);
				}

				$("#practicas option:first-child").attr('selected','selected');
				datos_practica();
			}
		}
	});
	}
}

function datos_practica() {
	var seleccion = $("#practicas option:selected").val();
	$("#alumnos-programados").val(seleccion.split(';')[6].trim());
	document.getElementById("alumnos-asistencia").value = "";
	document.getElementById("seguimiento").value = "";
	$("#materiales").val(seleccion.split(';')[2].trim());
	$("#equipo").val(seleccion.split(';')[3].trim());
	$("#observacion_profesor").val(seleccion.split(';')[4].trim());
	$("#fallas").val(seleccion.split(';')[5].trim());

	if(seleccion.split(';')[5].trim().length > 0){
		document.getElementById('fallas').hidden = false;
		document.getElementById('seguimiento').hidden = false;
	}else{
		document.getElementById('fallas').hidden = true;
		document.getElementById('seguimiento').hidden = true;
	}
}

function fechas() {
	// var limite = new Date();
	// var dd = ''+limite.getDate()-3;
	// var mm = ''+(limite.getMonth()+1);
	// var yy = limite.getFullYear();

	// if(mm.length < 2) mm = '0'+mm;
	// if(dd.length < 2) dd = '0'+dd;

	// limite = yy+"-"+mm+"-"+dd;
	
	// document.getElementById("fecha").min = limite;
	// document.getElementById("fecha").disabled = false;
	// var $fecha = $("#fecha");
	// $fecha.datepicker({
	// 	minDate: -4,
	// 	dateFormat:"yy-mm-dd"
	// });

	var hoy = new Date();
	var dd = ''+hoy.getDate();
	var mm = ''+(hoy.getMonth()+1);
	var yy = hoy.getFullYear();

	if(mm.length < 2) mm = '0'+mm;
	if(dd.length < 2) dd = '0'+dd;

	hoy = yy+"-"+mm+"-"+dd;

	document.getElementById('fecha_visualizar').defaultValue = hoy;
	document.getElementById('fecha').defaultValue = hoy;
}

function laboratorios(){
	var laboratorios = document.getElementById('laboratorios');
	laboratorios.options.length = 0;
	var carrera = document.getElementById('nombre').value.split('-')[1].trim();
	document.getElementById("alumnos-asistencia").value = "";
	document.getElementById("seguimiento").value = "";

	$.ajax({
		type:  "POST",
		url:   "php/includes/laboratorios_confirmar.php",
		data: 	{carrera:carrera}, 
		success: function(respuesta){
			var json = JSON.parse(respuesta);
			var laboratorios_sql = json.laboratorios.split(",");

			for(laboratorio in laboratorios_sql){
				laboratorios.options[laboratorios.options.length] = new Option(laboratorios_sql[laboratorio],laboratorios_sql[laboratorio]);
			}
			$("#laboratorios").val($("#laboratorios option:first").val());
		}
	});
}