$(document).ready(function(){
	$("#fecha").load(fechas());
	$("#sellaboratorio").load(laboratorios());
	$("#periodo").load(periodos());
	$("#materia").load(document.getElementById('selcarrera').value = document.getElementById('maestro').value.split('-')[1].trim());
	$("#materia").load(materias());
	$("#selcarrera").change(function(){materias();practica();});
	$("#sellaboratorio").change(function(){
		disponible();
		activar_horas_sesiones("#fecha");
		practica();
		document.getElementById('fecha2').value = "";
		document.getElementById('fecha3').value = "";
		document.getElementById('fecha4').value = "";
		document.getElementById('fecha5').value = "";
		document.getElementById('check1-horas').checked = false;
		document.getElementById('check2-horas').checked = false;
		document.getElementById('check3-horas').checked = false;
		document.getElementById('check4-horas').checked = false;
		document.getElementById('check5-horas').checked = false;
		document.getElementById('horas_sesion1').value = "";
		document.getElementById('horas_sesion2').value = "";
		document.getElementById('horas_sesion3').value = "";
		document.getElementById('horas_sesion4').value = "";
		document.getElementById('horas_sesion5').value = "";
	});
	$("#selmateria").change(function(){practica();});
	$("#semestre").change(function(){practica();});
	$("#grupo").change(function(){practica();});
	$("#turno").change(function(){practica();});
	$("#alumnos").keypress(function(e){
		if(e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)){
			return false;
		}
	});
	$("#alumnos").change(function(e){
		capacidad = parseInt(document.getElementById("capacidad").value);
		cantidad = parseInt(document.getElementById("alumnos").value);

		if(cantidad > capacidad){
			alert("Capacidad máxima de alumnos excedida");
			document.getElementById("alumnos").value = "";
		}
	});
	$("#enviar").click(function(event){enviar_datos();});
	$("#check1-sesion, #check2-sesion, #check3-sesion, #check4-sesion, #check5-sesion").change(function(){sesiones();});

	$("#fecha").change(function(){validar_fecha(this.id);activar_horas_sesiones(this.value);practica();document.getElementById('horas_sesion1').value = "";});
	$("#fecha2").change(function(){validar_fecha(this.id);activar_horas_sesiones(this.value);document.getElementById('horas_sesion2').value = "";});
	$("#fecha3").change(function(){validar_fecha(this.id);activar_horas_sesiones(this.value);document.getElementById('horas_sesion3').value = "";});
	$("#fecha4").change(function(){validar_fecha(this.id);activar_horas_sesiones(this.value);document.getElementById('horas_sesion4').value = "";});
	$("#fecha5").change(function(){validar_fecha(this.id);activar_horas_sesiones(this.value);document.getElementById('horas_sesion5').value = "";});

	$("#check1-horas").change(function(){
		if(document.getElementById('check1-horas').checked){
			if(document.getElementById('fecha').value.length == 0){
				alert("Se debe seleccionar una fecha para poder seleccionar las horas");
				document.getElementById('check1-horas').checked = false;
			}else{
				activar_horas_sesiones(document.getElementById('fecha').value);
				horas_sesion(this.id);
			}
		}else{
			document.getElementById('horas_sesion1').value = "";
		}
	});
	$("#check2-horas").change(function(){
		if(!document.getElementById('check2-sesion').checked){
			alert("No se pueden cargar horas sin habilitar la sesión");
			document.getElementById('check2-horas').checked = false;
		}
		if(document.getElementById('check2-horas').checked){
			if(document.getElementById('fecha2').value.length == 0){
				alert("Se debe seleccionar una fecha para poder seleccionar las horas");
				document.getElementById('check2-horas').checked = false;
			}else{
				activar_horas_sesiones(document.getElementById('fecha2').value);
				horas_sesion(this.id);
			}
		}
	});
	$("#check3-horas").change(function(){
		if(!document.getElementById('check3-sesion').checked){
			alert("No se pueden cargar horas sin habilitar la sesión");
			document.getElementById('check3-horas').checked = false;
		}
		if(document.getElementById('check3-horas').checked){
			if(document.getElementById('fecha3').value.length == 0){
				alert("Se debe seleccionar una fecha para poder seleccionar las horas");
				document.getElementById('check3-horas').checked = false;
			}else{
				activar_horas_sesiones(document.getElementById('fecha3').value);
				horas_sesion(this.id);
			}
		}
	});
	$("#check4-horas").change(function(){
		if(!document.getElementById('check4-sesion').checked){
			alert("No se pueden cargar horas sin habilitar la sesión");
			document.getElementById('check4-horas').checked = false;
		}
		if(document.getElementById('check4-horas').checked){
			if(document.getElementById('fecha4').value.length == 0){
				alert("Se debe seleccionar una fecha para poder seleccionar las horas");
				document.getElementById('check4-horas').checked = false;
			}else{
				activar_horas_sesiones(document.getElementById('fecha4').value);
				horas_sesion(this.id);
			}
		}
	});
	$("#check5-horas").change(function(){
		if(!document.getElementById('check5-sesion').checked){
			alert("No se pueden cargar horas sin habilitar la sesión");
			document.getElementById('check5-horas').checked = false;
		}
		if(document.getElementById('check5-horas').checked){
			if(document.getElementById('fecha5').value.length == 0){
				alert("Se debe seleccionar una fecha para poder seleccionar las horas");
				document.getElementById('check5-horas').checked = false;
			}else{
				activar_horas_sesiones(document.getElementById('fecha5').value);
				horas_sesion(this.id);
			}
		}
	});

	$("#check2-sesion").change(function(){
		if(!document.getElementById('check2-sesion').checked){
			document.getElementById('fecha2').value = "";
			document.getElementById('check2-horas').checked = false;
			document.getElementById('horas_sesion2').value = "";
		}
	});
	$("#check3-sesion").change(function(){
		if(!document.getElementById('check3-sesion').checked){
			document.getElementById('fecha3').value = "";
			document.getElementById('check3-horas').checked = false;
			document.getElementById('horas_sesion3').value = "";
		}
	});
	$("#check4-sesion").change(function(){
		if(!document.getElementById('check4-sesion').checked){
			document.getElementById('fecha4').value = "";
			document.getElementById('check4-horas').checked = false;
			document.getElementById('horas_sesion4').value = "";
		}
	});
	$("#check5-sesion").change(function(){
		if(!document.getElementById('check5-sesion').checked){
			document.getElementById('fecha5').value = "";
			document.getElementById('check5-horas').checked = false;
			document.getElementById('horas_sesion5').value = "";
		}
	});
});

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
		
	if((fecha - fecha_hoy) < 0){
		//alert("Debes ingresar un fecha válida");
		//document.getElementById(objeto).value = "";
	}else if(objeto == "fecha"){
		var fecha1 = new Date(document.getElementById('fecha').value);
		var fecha2 = new Date(document.getElementById('fecha2').value);

		if((fecha2 - fecha1) < 0){
			alert("La fecha de la sesión 2 debe ser igual o posterior a la sesión 1");
			document.getElementById(objeto).value = "";
		}
	}else if(objeto == "fecha2"){
		var fecha1 = new Date(document.getElementById('fecha').value);
		var fecha2 = new Date(document.getElementById('fecha2').value);

		if((fecha2 - fecha1) < 0){
			alert("La fecha de la sesión 2 debe ser igual o posterior a la sesión 1");
			document.getElementById(objeto).value = "";
		}
	}else if(objeto == "fecha3"){
		var fecha1 = new Date(document.getElementById('fecha2').value);
		var fecha2 = new Date(document.getElementById('fecha3').value);

		if((fecha2 - fecha1) < 0){
			alert("La fecha de la sesión 3 debe ser igual o posterior a la sesión 2");
			document.getElementById(objeto).value = "";
		}
	}else if(objeto == "fecha4"){
		var fecha1 = new Date(document.getElementById('fecha3').value);
		var fecha2 = new Date(document.getElementById('fecha4').value);

		if((fecha2 - fecha1) < 0){
			alert("La fecha de la sesión 4 debe ser igual o posterior a la sesión 3");
			document.getElementById(objeto).value = "";
		}
	}else if(objeto == "fecha5"){
		var fecha1 = new Date(document.getElementById('fecha4').value);
		var fecha2 = new Date(document.getElementById('fecha5').value);

		if((fecha2 - fecha1) < 0){
			alert("La fecha de la sesión 5 debe ser igual o posterior a la sesión 4");
			document.getElementById(objeto).value = "";
		}
	}
}

function horas_sesion(check){
	document.getElementById('modal_horas').style.display = "block";

	document.getElementById('cerrar').onclick = function(){
		var horas = Array();
		$("input:checkbox[class=check]:checked").each(function(){
			horas.push($(this).val());
		});
		var horas_seleccionadas = horas.join(',');

		if(horas_seleccionadas.length == 0){
			document.getElementById(check).checked = false;
		}

		modal.style.display = "none";
			
		if(check == "check1-horas"){
			document.getElementById('horas_sesion1').value = horas_seleccionadas;
		}else if(check == "check2-horas"){
			document.getElementById('horas_sesion2').value = horas_seleccionadas;
		}else if(check == "check3-horas"){
			document.getElementById('horas_sesion3').value = horas_seleccionadas;
		}else if(check == "check4-horas"){
			document.getElementById('horas_sesion4').value = horas_seleccionadas;
		}else if(check == "check5-horas"){
			document.getElementById('horas_sesion5').value = horas_seleccionadas;
		}
	}
}

function sesiones(){
	if(!document.getElementById('check1-sesion').checked){
		alert("No se puede inhabilitar la sesion 1");
		document.getElementById('check1-sesion').checked = true;
	}else if(!document.getElementById('check2-sesion').checked && document.getElementById('check3-sesion').checked){
		alert("No se pueden habilitar las sesiones de manera alternada");
		document.getElementById('check3-sesion').checked = false;
		document.getElementById('check4-sesion').checked = false;
		document.getElementById('check5-sesion').checked = false;
		document.getElementById('check3-horas').checked = false;
		document.getElementById('check4-horas').checked = false;
		document.getElementById('check5-horas').checked = false;
	}else if(!document.getElementById('check3-sesion').checked && document.getElementById('check4-sesion').checked){
		alert("No se pueden habilitar las sesiones de manera alternada");
		document.getElementById('check4-sesion').checked = false;
		document.getElementById('check5-sesion').checked = false;
		document.getElementById('check4-horas').checked = false;
		document.getElementById('check5-horas').checked = false;
	}else if(!document.getElementById('check4-sesion').checked && document.getElementById('check5-sesion').checked){
		alert("No se pueden habilitar las sesiones de manera alternada");
		document.getElementById('check5-sesion').checked = false;
		document.getElementById('check5-horas').checked = false;
	}

	document.getElementById('fecha2').disabled = !document.getElementById('check2-sesion').checked;
	document.getElementById('fecha3').disabled = !document.getElementById('check3-sesion').checked;
	document.getElementById('fecha4').disabled = !document.getElementById('check4-sesion').checked;
	document.getElementById('fecha5').disabled = !document.getElementById('check5-sesion').checked;
}


function enviar_datos(){
	var maestro = document.getElementById('maestro').value.split('-')[0].trim();
	var carrera = document.getElementById('selcarrera').value;
	var periodo = document.getElementById('selperiodo').value;
	var materia = document.getElementById('selmateria').value;
	var laboratorio = document.getElementById('sellaboratorio').value;
	var semestre = document.getElementById('semestre').value;
	var grupo = document.getElementById('grupo').value;
	var turno = document.getElementById('turno').value;
	var practica = document.getElementById('practica').value;
	var npractica = document.getElementById('npractica').value;
	var descripcion = document.getElementById('descripcion').value;
	var materiales = document.getElementById('materiales').value;
	var equipo = document.getElementById('equipo').value;
	var fecha1 = document.getElementById('fecha').value;
	var fecha2 = document.getElementById('fecha2').value;
	var fecha3 = document.getElementById('fecha3').value;
	var fecha4 = document.getElementById('fecha4').value;
	var fecha5 = document.getElementById('fecha5').value;
	var horas1 = document.getElementById('horas_sesion1').value;
	var horas2 = document.getElementById('horas_sesion2').value;
	var horas3 = document.getElementById('horas_sesion3').value;
	var horas4 = document.getElementById('horas_sesion4').value;
	var horas5 = document.getElementById('horas_sesion5').value;
	var alumnos = document.getElementById('alumnos').value;

	if(materia == null){
		alert("Debes selecionar la materia");
		return false;
	} else if(practica.length==0){
		alert("Debes ingresar el nombre de la práctica");
		return false;
	} else if(descripcion.length == 0){
		alert("Debes ingresar la descripción de la materia");
		return false;
	} else if(semestre.length == 0){
		alert("Debes seleccionar el semestre");
		return false;
	} else if(grupo.length == 0){
		alert("Debes seleccionar un grupo");
		return false;
	} else if(turno.length == 0){
		alert("Debes seleccionar un turno");
		return false;
	} else if(materiales.length == 0){
		alert("Debes ingresar materiales y/o reactivos a utilizar");
		return false;
	} else if(equipo.length == 0){
		alert("Debes ingresar software, herramientas y/o equipos a utilizar");
		return false;
	}else if(fecha.length == 0 && fecha2.length == 0 && fecha3.length == 0 && fecha4.length == 0 && fecha5.length == 0){
		alert("Debes ingresar un fecha válida");
		return false;
	} else if(npractica.length == 0){
		alert("Debes introducir el numero de práctica");
		return false;
	}else if(document.getElementById('check1-sesion').checked && horas1.length == 0){
		alert("Debes seleccionar alguna hora disponible en la sesión 1");
		return false;
	} else if(document.getElementById('check2-sesion').checked  && horas2.length == 0){
		alert("Debes seleccionar alguna hora disponible en la sesión 2");
		return false;
	} else if(document.getElementById('check3-sesion').checked  && horas3.length == 0){
		alert("Debes seleccionar alguna hora disponible en la sesión 3");
		return false;
	} else if(document.getElementById('check4-sesion').checked  && horas4.length == 0){
		alert("Debes seleccionar alguna hora disponible en la sesión 4");
		return false;
	} else if(document.getElementById('check5-sesion').checked  && horas5.length == 0){
		alert("Debes seleccionar alguna hora disponible en la sesión 5");
		return false;
	} else if(alumnos.length == 0){
		alert("Debes asignar la cantidad de alumnos");
		return false;
	} else {
		//alert("Práctica registrada con éxito");
		if(confirm("¿Los datos de la práctica son correctos?")){
			$.ajax({
				type: 	"POST",
				url: 	"php/includes/cargar_datos.php",
				data: 	{maestro:maestro,
						carrera:carrera,
						periodo:periodo,
						materia:materia,
						laboratorio:laboratorio,
						semestre:semestre,
						grupo:grupo,
						turno:turno,
						practica:practica,
						npractica:npractica,
						descripcion:descripcion,
						materiales:materiales,
						equipo:equipo,
						alumnos:alumnos,
						fecha1:fecha1,
						horas1:horas1,
						fecha2:fecha2,
						horas2:horas2,
						fecha3:fecha3,
						horas3:horas3,
						fecha4:fecha4,
						horas4:horas4,
						fecha5:fecha5,
						horas5:horas5},
				success: function(respuesta){
					if(respuesta.substring(0,5) == "Error"){
						alert(respuesta);
					}else{
						alert(respuesta);
						location.reload();
					}
				}
			});
		}else{
			alert("Verifique que los datos de la práctica sean correctos");
		}
	}
}

function periodos(){
	var periodos = document.getElementById('selperiodo');
	periodos.options.length = 0;
	$.ajax({
		type:  "GET",
		url:   "php/includes/periodos_json.php",
		async: false,
	}).done(function(respuesta){
		if(respuesta.substring(0,5) == "Error"){
			alert(respuesta);
		}else{
			var json = JSON.parse(respuesta);

			var periodos_sql = json.periodos.split(",");
			for(periodo in periodos_sql){
				periodos.options[periodos.options.length] = new Option(periodos_sql[periodo],periodos_sql[periodo]);
			}
			$('#selperiodo option:last').attr('selected','selected');
		}
	})
}

function materias() {
	var carrera = $("#selcarrera option:selected").val();
	var materias = document.getElementById("selmateria");
	var items = materias.options.length = 0;

	$.ajax({
		type: "POST",
		url:  "php/includes/materias_json.php",
		data: {carrera:carrera},
		async: false,
		success: function(respuesta){
			var json = JSON.parse(respuesta);
			var materias_sql = json.materias.split(",");

			for(materia in materias_sql){
				materias.options[materias.options.length] = new Option(materias_sql[materia],materias_sql[materia]);
			}
			$("#selmateria option:first-child").attr('selected','selected');
			practica();
		}
	});
}

function practica(){
	var maestro = $("#maestro").val().split('-')[0].trim();
	var carrera = $("#selcarrera option:selected").val();
	var materia = $("#selmateria option:selected").text();
	var semestre = $("#semestre option:selected").val();
	var grupo = $("#grupo option:selected").val();
	var turno = $("#turno option:selected").val();

	$.ajax({
		type: "POST",
		url:  "php/includes/npractica_json.php",
		data: {maestro:maestro,carrera:carrera,materia:materia,semestre:semestre,grupo:grupo,turno:turno},
		async: false,
		success: function(respuesta){
			var json = JSON.parse(respuesta);
			document.getElementById("npractica").value = parseInt(json.npractica)+1;
		}
	});
}

function laboratorios(){
	var laboratorios = document.getElementById('sellaboratorio');
	var items = laboratorios.options.length = 0;

	$.ajax({
		type: "GET",
		url:  "php/includes/laboratorios_json.php",
		async: false,
		success: function(respuesta){
			var json = JSON.parse(respuesta);
			var laboratorios_sql = json.laboratorios.split(",");
			for(laboratorio in laboratorios_sql){
				laboratorios.options[laboratorios.options.length] = new Option(laboratorios_sql[laboratorio],laboratorios_sql[laboratorio]);
			}
			$("#sellaboratorio option:first-child").attr('selected','selected');
			practica();
			disponible();
		}  
	});
}

function fechas() {
	var hoy = new Date();
	var dd = ''+hoy.getDate();
	var mm = ''+(hoy.getMonth()+1);
	var yy = hoy.getFullYear();

	if(mm.length < 2) mm = '0'+mm;
	if(dd.length < 2) dd = '0'+dd;

	hoy = yy+"-"+mm+"-"+dd;
	
	// document.getElementById("fecha").min = hoy;
	// document.getElementById("fecha2").min = hoy;
	// document.getElementById("fecha3").min = hoy;
	// document.getElementById("fecha4").min = hoy;
	// document.getElementById("fecha5").min = hoy;
	document.getElementById("fecha").disabled = false;
}

function topNav(){
	var x = document.getElementById("topnav");
	if(x.className === "topnav"){
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

function closeNav(){
	document.getElementById("sidenav").style.width = "0";
}

function activar_horas_sesiones(objeto_fecha){
	var fecha = objeto_fecha;
	var laboratorio = $("#sellaboratorio option:selected").val();

	document.getElementById('fecha_horas').innerHTML = "Fecha: "+fecha;

	$.ajax({
		type	: 'POST',
		url		: 'php/includes/horas_sesiones_json.php',
		data	: {fecha:fecha,laboratorio:laboratorio},
		async: false,
		success: function(respuesta) {
			var json = JSON.parse(respuesta);
			var horas_sql = json.horas_ocupadas.split(',');

			//alert(horas_sql);

			var horas = ['1','2','3','4','5','6','7','8','9','10','11','12'];
			for(x in horas){
				for(y in horas_sql){
					if(horas_sql[y] == horas[x]){
						desac_check(horas[x]);
						break;
					} else{
						act_check(horas[x]);
					}
				}	
			}
		}
	});
}

function disponible(){
	var laboratorio = $("#sellaboratorio option:selected").val();

	$.ajax({
		type:  "POST",
		url:   "php/includes/disponible_json.php",
		data:  {laboratorio:laboratorio},
		async: false,
		success: function(respuesta) {
			var json = JSON.parse(respuesta);
			var horas_disp = json.disponible.split(",");
			var capacidad = json.capacidad;

			document.getElementById("capacidad").value = capacidad;
			document.getElementById("alumnos").value = "";

			var horas = ['1','2','3','4','5','6','7','8','9','10','11','12'];
			for(x in horas){
				for(y in horas_disp){
					if(horas_disp[y] == horas[x]){
						document.getElementById("check"+horas[x]).style.visibility = 'visible';
						document.getElementById("lcheck"+horas[x]).style.visibility = 'visible';
						break;
					}else{
						document.getElementById("check"+horas[x]).style.visibility = 'hidden';						
						document.getElementById("lcheck"+horas[x]).style.visibility = 'hidden';
					}
				}
			}
		}
	});
}

function act_check(checkbox){
	document.getElementById("check"+checkbox).checked = false;
	document.getElementById("check"+checkbox).disabled = false;
	document.getElementById("lcheck"+checkbox).disabled = false;
	document.getElementById("lcheck"+checkbox).style.opacity = 1.0;
}

function desac_check(checkbox){
	document.getElementById("check"+checkbox).checked = false;
	document.getElementById("check"+checkbox).disabled = true;
	document.getElementById("lcheck"+checkbox).disabled = true;
	document.getElementById("lcheck"+checkbox).style.opacity = 0.5;
}