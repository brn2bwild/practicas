$(document).ready(function(){
	$("#buscar").click(function(event){
		buscar();
		disponible();
		activar_horas_sesiones(document.getElementById('fecha1').value);
		//datos_resultado();
	});
	$("#reprogramarbtn").click(function(event){reprogramar();});
	//$("#sellaboratorio").load(laboratorios());
	$("#fecha1").load(fechas());
	$("#resultados").change(function(){
		datos_resultado();
		disponible();
		activar_horas_sesiones(document.getElementById('fecha1').value);
	}); //editar_horas();});
	$("#fecha1").change(function(){horas_disponibles();});
	$("#justificante1, #justificante2, #justificante3, #justificante4, #justificante5, #justificante6, #justificante7").change(function(){
		verificarEspecificacion();
	});
	$("#laboratorios").load(laboratorios());
	$("#laboratorios").change(function(event){
		disponible();
		activar_horas_sesiones(document.getElementById('fecha1').value);
		document.getElementById('check2-sesion').checked = false;
		document.getElementById('check3-sesion').checked = false;
		document.getElementById('check4-sesion').checked = false;
		document.getElementById('check5-sesion').checked = false;
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
		validar_fecha("fecha1");
	});
	$("#check1-sesion, #check2-sesion, #check3-sesion, #check4-sesion, #check5-sesion").change(function(){sesiones();});
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
	$("#fecha1").change(function(){
		validar_fecha(this.id);
		activar_horas_sesiones(this.value);
		document.getElementById('check1-horas').checked = false;
		document.getElementById('horas_sesion1').value = "";
	});
	$("#fecha2").change(function(){
		validar_fecha(this.id);
		activar_horas_sesiones(this.value);
		document.getElementById('check2-horas').checked = false;
		document.getElementById('horas_sesion2').value = "";
	});
	$("#fecha3").change(function(){
		validar_fecha(this.id);
		activar_horas_sesiones(this.value);
		document.getElementById('check3-horas').checked = false;
		document.getElementById('horas_sesion3').value = "";
	});
	$("#fecha4").change(function(){
		validar_fecha(this.id);
		activar_horas_sesiones(this.value);
		document.getElementById('check4-horas').checked = false;
		document.getElementById('horas_sesion4').value = "";
	});
	$("#fecha5").change(function(){
		validar_fecha(this.id);
		activar_horas_sesiones(this.value);
		document.getElementById('check5-horas').checked = false;
		document.getElementById('horas_sesion5').value = "";
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
		//alert("Debes ingresar un fecha válida");	DESCOMENTAR ESTAS LINEAS PARA HACER QUE LA HORA SEA ACTUAL
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
		document.getElementById('horas_sesion2').value = "";
		document.getElementById('horas_sesion3').value = "";
		document.getElementById('horas_sesion4').value = "";
		document.getElementById('horas_sesion5').value = "";
	}else if(!document.getElementById('check3-sesion').checked && document.getElementById('check4-sesion').checked){
		alert("No se pueden habilitar las sesiones de manera alternada");
		document.getElementById('check4-sesion').checked = false;
		document.getElementById('check5-sesion').checked = false;
		document.getElementById('check4-horas').checked = false;
		document.getElementById('check5-horas').checked = false;
		document.getElementById('horas_sesion3').value = "";
		document.getElementById('horas_sesion4').value = "";
		document.getElementById('horas_sesion5').value = "";
	}else if(!document.getElementById('check4-sesion').checked && document.getElementById('check5-sesion').checked){
		alert("No se pueden habilitar las sesiones de manera alternada");
		document.getElementById('check5-sesion').checked = false;
		document.getElementById('check5-horas').checked = false;
		document.getElementById('horas_sesion4').value = "";
		document.getElementById('horas_sesion5').value = "";
	}

	document.getElementById('fecha2').disabled = !document.getElementById('check2-sesion').checked;
	document.getElementById('fecha3').disabled = !document.getElementById('check3-sesion').checked;
	document.getElementById('fecha4').disabled = !document.getElementById('check4-sesion').checked;
	document.getElementById('fecha5').disabled = !document.getElementById('check5-sesion').checked;
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

function verificarEspecificacion(){
	var just = $('input:radio[name=justificante]:checked').val();

	if(just != 1){
		document.getElementById("especificacion").hidden = false;
	}else{
		document.getElementById("especificacion").hidden = true;
	}
}

function laboratorios(){
	var laboratorios = document.getElementById("laboratorios");
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
			$("#laboratorios option:first-child").attr('selected','selected');
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
	
	//document.getElementById("fecha1").min = hoy; 	DESCOMENTAR ESTAS LINEAS PARA PODER HACER QUE LAS HORAS SEAN DEL DÍA ACTUAL
	//document.getElementById("fecha2").min = hoy;
	//document.getElementById("fecha3").min = hoy;
	//document.getElementById("fecha4").min = hoy;
	//document.getElementById("fecha5").min = hoy;
}

function reprogramar(){
	var seleccion = $("#resultados option:selected").val();
	var fecha1 = document.getElementById('fecha1').value;
	var fecha2 = document.getElementById('fecha2').value;
	var fecha3 = document.getElementById('fecha3').value;
	var fecha4 = document.getElementById('fecha4').value;
	var fecha5 = document.getElementById('fecha5').value;
	var horas1 = document.getElementById('horas_sesion1').value;
	var horas2 = document.getElementById('horas_sesion2').value;
	var horas3 = document.getElementById('horas_sesion3').value;
	var horas4 = document.getElementById('horas_sesion4').value;
	var horas5 = document.getElementById('horas_sesion5').value;
	var justificacion = $('input:radio[name=justificante]:checked').val();
	var especificacion = document.getElementById("especificacion").value;
	var laboratorio = document.getElementById('laboratorios').value;

	// $("input[type=checkbox]:checked").each(function(){
	// 	horas.push($(this).val());
	// });

	// var horas_seleccionadas = horas.join(',');
	// var seleccion = $("#resultados option:selected").val();
	// var fecha = $("#fecha").val();

	if(seleccion == "0"){
		alert("Debes seleccionar una práctica");
	}else if(fecha1.length == 0 && fecha2.length == 0 && fecha3.length == 0 && fecha4.length == 0 && fecha5.length == 0){
		alert("Debes ingresar una fecha válida");
	}else if(document.getElementById('check1-sesion').checked && horas1.length == 0){
		alert("Debes seleccionar alguna hora disponible en la sesión 1");
	} else if(document.getElementById('check2-sesion').checked  && horas2.length == 0){
		alert("Debes seleccionar alguna hora disponible en la sesión 2");
	} else if(document.getElementById('check3-sesion').checked  && horas3.length == 0){
		alert("Debes seleccionar alguna hora disponible en la sesión 3");
	} else if(document.getElementById('check4-sesion').checked  && horas4.length == 0){
		alert("Debes seleccionar alguna hora disponible en la sesión 4");
	} else if(document.getElementById('check5-sesion').checked  && horas5.length == 0){
		alert("Debes seleccionar alguna hora disponible en la sesión 5");
	}else if(justificacion != 1 && especificacion.length == 0){
		alert("Debes especificar detalles de la razón para la reprogramación");
	}else{
		if(confirm("¿Los datos de reprogramación son correctos?")){
			seleccion = seleccion.split(';');
			var id_sql = seleccion[0];
			var npractica_sql = seleccion[1];

			$.ajax({
				type:  "POST",
				url:   "php/includes/reprogramar_practica.php",
				data:  {id:id_sql,
						npractica:npractica_sql,
						fecha1:fecha1,
						horas1:horas1,
						fecha2:fecha2,
						horas2:horas2,
						fecha3:fecha3,
						horas3:horas3,
						fecha4:fecha4,
						horas4:horas4,
						fecha5:fecha5,
						horas5:horas5,
						justificacion:justificacion,
						especificacion:especificacion,
						laboratorio:laboratorio},
				success: function(respuesta){
					var json = JSON.parse(respuesta);
					if(json.reprogramada){
						alert("La práctica fue reprogramada con éxito");
						if(justificacion == 2 || justificacion == 3){
							var carrera = document.getElementById("nombre").value.split('-')[1].trim();
							var mensaje = document.getElementById("especificacion").value;
							var justificante = justificacion;
							$.ajax({
								type:  "POST",
								url:   "php/gmail.php",
								data:  {mensaje:mensaje,carrera:carrera,justificante:justificante,laboratorio:laboratorio},
								async: false,
								success: function(respuesta){
									var cadena_respuesta = respuesta;
									if(cadena_respuesta.search("true") != -1){
										alert("El área pertinente ha sido notificada");
										location.reload();
									}else if(cadena_respuesta.search("false") != -1){
										alert("Hubo un problema al notificar");
										location.reload();
									}
								}
							});
						}
						location.reload();
					}else{
						alert("Hubo un problema al reprogramar la práctica número "+npractica_sql);
						location.reload();
					}
				}
			});
		}else{
			alert("Verifique que los datos de reprogramación sean correctos");
		}
	}
}

function buscar() {
	var resultados = document.getElementById("resultados");
	resultados.options.length = 0;
	var nombre = document.getElementById("nombre").value.split('-')[0].trim();

	$.ajax({
		type: "POST",
		url:  "php/includes/reprogramar_json.php",
		data: {nombre:nombre},
		success: function(respuesta){
			if(respuesta.substring(0,5) == "Error"){
				alert(respuesta);
			}else{
				var json = JSON.parse(respuesta);
				practicas = json.practicas;
				
				for(practica in practicas){
					resultados.options[resultados.options.length] = new Option(practicas[practica]['practica']+' - '+
																				practicas[practica]['materia']+' - '+
																				practicas[practica]['carrera']+' - '+
																				practicas[practica]['semestre']+' - '+
																				practicas[practica]['grupo']+' - '+
																				practicas[practica]['turno'],
																				practicas[practica]['id']+';'+
																				practicas[practica]['npractica']+';'+
																				practicas[practica]['laboratorio']+';'+
																				practicas[practica]['sesion1_fecha']+';'+
																				practicas[practica]['sesion1_horas']+';'+
																				practicas[practica]['sesion2_fecha']+';'+
																				practicas[practica]['sesion2_horas']+';'+
																				practicas[practica]['sesion3_fecha']+';'+
																				practicas[practica]['sesion3_horas']+';'+
																				practicas[practica]['sesion4_fecha']+';'+
																				practicas[practica]['sesion4_horas']+';'+
																				practicas[practica]['sesion5_fecha']+';'+
																				practicas[practica]['sesion5_horas']);
				}
				$("#resultados option:first-child").attr('selected','selected');	
				
				datos_resultado();
			}
		}
	});
}

function datos_resultado(){
	document.getElementById('laboratorios').value = $("#resultados option:selected").val().split(';')[2].trim();
	document.getElementById('fecha1').value = $("#resultados option:selected").val().split(';')[3].trim();
	document.getElementById('horas_sesion1').value = $("#resultados option:selected").val().split(';')[4].trim();
	document.getElementById('fecha2').value = $("#resultados option:selected").val().split(';')[5].trim();
	document.getElementById('horas_sesion2').value = $("#resultados option:selected").val().split(';')[6].trim();
	document.getElementById('fecha3').value = $("#resultados option:selected").val().split(';')[7].trim();
	document.getElementById('horas_sesion3').value = $("#resultados option:selected").val().split(';')[8].trim();
	document.getElementById('fecha4').value = $("#resultados option:selected").val().split(';')[9].trim();
	document.getElementById('horas_sesion4').value = $("#resultados option:selected").val().split(';')[10].trim();
	document.getElementById('fecha5').value = $("#resultados option:selected").val().split(';')[11].trim();
	document.getElementById('horas_sesion5').value = $("#resultados option:selected").val().split(';')[12].trim();
	
	document.getElementById('check1-sesion').checked = (document.getElementById('fecha1').value.length != 0);
	document.getElementById('check2-sesion').checked = (document.getElementById('fecha2').value.length != 0);
	document.getElementById('check3-sesion').checked = (document.getElementById('fecha3').value.length != 0);
	document.getElementById('check4-sesion').checked = (document.getElementById('fecha4').value.length != 0);
	document.getElementById('check5-sesion').checked = (document.getElementById('fecha5').value.length != 0);

	document.getElementById('check1-horas').checked = (document.getElementById('horas_sesion1').value.length != 0);
	document.getElementById('check2-horas').checked = (document.getElementById('horas_sesion2').value.length != 0);
	document.getElementById('check3-horas').checked = (document.getElementById('horas_sesion3').value.length != 0);
	document.getElementById('check4-horas').checked = (document.getElementById('horas_sesion4').value.length != 0);
	document.getElementById('check5-horas').checked = (document.getElementById('horas_sesion5').value.length != 0);
	
	document.getElementById('fecha1').disabled = !document.getElementById('check1-sesion').checked;
	document.getElementById('fecha2').disabled = !document.getElementById('check2-sesion').checked;
	document.getElementById('fecha3').disabled = !document.getElementById('check3-sesion').checked;
	document.getElementById('fecha4').disabled = !document.getElementById('check4-sesion').checked;
	document.getElementById('fecha5').disabled = !document.getElementById('check5-sesion').checked;
	//act_horas(laboratorio,fecha_programada);
}

// function editar_horas(){
// 	var resultado = $("#resultados").val();
// 	var datos = resultado.split(';');
// 	var laboratorio = $("#resultados").val().split(';')[2];
// 	var fecha_programada = datos[7];
// 	disponible(laboratorio);
// 	act_horas(laboratorio,fecha_programada);
// 	document.getElementById('laboratorios').value = $("#resultados option:selected").val().split(';')[3].trim();
// 	document.getElementById('fecha').value = fecha_programada;
// }

function horas_disponibles(argument) {
	var resultado = $("#resultados").val();
	var datos = resultado.split(';');
	//var laboratorio = datos[3];
	var laboratorio = $("#laboratorios option:selected").val();
	var fecha = $("#fecha").val();
	disponible(laboratorio);
	act_horas(laboratorio,fecha);
}


function activar_horas_sesiones(objeto_fecha){
	//var fecha = document.getElementById(objeto_fecha).value;
	var fecha = objeto_fecha;
	var laboratorio = $("#laboratorios option:selected").val();

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
	var laboratorio = $("#laboratorios option:selected").val();
	$.ajax({
		type:  "POST",
		url:   "php/includes/disponible_json.php",
		data:  {laboratorio:laboratorio},
		async: false,
		success: function(respuesta) {
			var json = JSON.parse(respuesta);
			var horas_disp = json.disponible.split(",");

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

function act_horas(laboratorio,fecha){
	$.ajax({
		type	: 'POST',
		url		: 'php/includes/horas_json.php',
		data	: {fecha:fecha,laboratorio:laboratorio,dato:'horas_ocupadas'},
		async: false,
		success: function(respuesta) {
			var json = JSON.parse(respuesta);
			var horas_sql = json.horas_ocupadas.split(',');

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