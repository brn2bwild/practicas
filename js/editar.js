$(document).ready(function() {
	$("#periodo").load(periodos());
	$("#tipo").change(function(event){buscar();});
	$("#buscar").click(function(event){buscar();});
	$("#opciones").change(function(event){buscar_resultados();});
	$("#resultados").change(function(event){datos();});
	$("#materias").load(materias());
	$("#carrera").change(function(){materias();});
	$("#enviar").click(function(event){enviar_datos();});
});

function periodos(){
	var periodos = document.getElementById('periodo');
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
			$('#periodo option:last').attr('selected','selected');
		}
	})
}

function materias() {
	var carrera = $("#carrera option:selected").val();
	var materias = document.getElementById("materias");
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
		}
	});
}

function buscar(){
	var nombre = $("#nombre").val().split('-')[0].trim();
	var tipo = $("#tipo option:selected").val();
	var periodo = $("#periodo").val();
	var opciones = document.getElementById('opciones');

	$.ajax({
		type: "POST",
		url: "php/includes/realizacion_json.php",
		data: {nombre:nombre,tipo:tipo,periodo:periodo},
		success: function(respuesta) {
			if(respuesta.substring(0,5) == "Error"){
				alert(respuesta);
				opciones.options[opciones.options.length] = new Option("Da click en Buscar", "0");
			}else{
				var json = JSON.parse(respuesta);
				var opciones_json = json.opciones;
				opciones.options.length = 0;
				for(opcion in opciones_json){
					opciones.options[opciones.options.length] = new Option(opciones_json[opcion][tipo],opciones_json[opcion][tipo]);
				}

				$("#opciones option:first-child").attr('selected','selected');

				buscar_resultados();
			}
		}
	});
}

function buscar_resultados(){
	var nombre = $("#nombre").val().split('-')[0].trim();
	var tipo = $("#tipo option:selected").val();
	var opcion = $("#opciones option:selected").val();
	var resultados = document.getElementById('resultados');

	$.ajax({
		type: 	"POST",
		url: 	"php/includes/realizacion_resultados_json.php",
		data: 	{nombre:nombre,tipo:tipo,opcion:opcion},
		success: function(respuesta){
			if(respuesta.substring(0,5) == "Error"){
				alert(respuesta);
				resultados.options.length = new Option("Seleccion alguna opción","-");
			}else{
				var json = JSON.parse(respuesta);
				var resultados_json = json.resultados;

				resultados.options.length = 0;

				if(tipo == "materia"){
					for(resultado in resultados_json){
						resultados.options[resultados.options.length] = new Option(resultados_json[resultado]['practica']+' - '+resultados_json[resultado]['laboratorio']+' - '+resultados_json[resultado]['carrera']+' - '+resultados_json[resultado]['semestre']+' - '+resultados_json[resultado]['grupo']+' - '+resultados_json[resultado]['turno'],resultados_json[resultado]['id']+';'+resultados_json[resultado]['npractica']+';'+resultados_json[resultado]['practica']+';'+resultados_json[resultado]['descripcion']+';'+resultados_json[resultado]['materiales']+';'+resultados_json[resultado]['equipo']+';'+resultados_json[resultado]['carrera']+';'+resultados_json[resultado]['materia']+';'+resultados_json[resultado]['semestre']+';'+resultados_json[resultado]['grupo']+';'+resultados_json[resultado]['turno']);
					}
				}else if(tipo == "laboratorio"){
					for(resultado in resultados_json){
						resultados.options[resultados.options.length] = new Option(resultados_json[resultado]['practica']+' - '+resultados_json[resultado]['materia']+' - '+resultados_json[resultado]['carrera']+' - '+resultados_json[resultado]['semestre']+' - '+resultados_json[resultado]['grupo']+' - '+resultados_json[resultado]['turno'],resultados_json[resultado]['id']+';'+resultados_json[resultado]['npractica']+';'+resultados_json[resultado]['practica']+';'+resultados_json[resultado]['descripcion']+';'+resultados_json[resultado]['materiales']+';'+resultados_json[resultado]['equipo']+';'+resultados_json[resultado]['carrera']+';'+resultados_json[resultado]['materia']+';'+resultados_json[resultado]['semestre']+';'+resultados_json[resultado]['grupo']+';'+resultados_json[resultado]['turno']);
					}
				}else if(tipo == "carrera"){
					for(resultado in resultados_json){
						resultados.options[resultados.options.length] = new Option(resultados_json[resultado]['practica']+' - '+resultados_json[resultado]['materia']+' - '+resultados_json[resultado]['laboratorio']+' - '+resultados_json[resultado]['semestre']+' - '+resultados_json[resultado]['grupo']+' - '+resultados_json[resultado]['turno'],resultados_json[resultado]['id']+';'+resultados_json[resultado]['npractica']+';'+resultados_json[resultado]['practica']+';'+resultados_json[resultado]['descripcion']+';'+resultados_json[resultado]['materiales']+';'+resultados_json[resultado]['equipo']+';'+resultados_json[resultado]['carrera']+';'+resultados_json[resultado]['materia']+';'+resultados_json[resultado]['semestre']+';'+resultados_json[resultado]['grupo']+';'+resultados_json[resultado]['turno']);
					}
				}

				$("#resultados option:first-child").attr('selected','selected');
				document.getElementById('practica').value = resultados_json[resultado]['practica'];
				datos();
			}
		}  
	})
}

function datos(){
	var practica_seleccionada = $("#resultados option:selected").val();
	document.getElementById('practica').value = practica_seleccionada.split(';')[2].trim();
	document.getElementById('descripcion').value = practica_seleccionada.split(';')[3].trim();
	document.getElementById('materiales').value = practica_seleccionada.split(';')[4].trim();
	document.getElementById('equipo').value = practica_seleccionada.split(';')[5].trim();
	document.getElementById('carrera').value = practica_seleccionada.split(';')[6].trim();
	materias();
	document.getElementById('materias').value = practica_seleccionada.split(';')[7].trim();
	document.getElementById('semestre').value = practica_seleccionada.split(';')[8].trim();
	document.getElementById('grupo').value = practica_seleccionada.split(';')[9].trim();
	document.getElementById('turno').value = practica_seleccionada.split(';')[10].trim();
}

function enviar_datos(){
	var id = $("#resultados option:selected").val().split(';')[0].trim();
	var npractica = $("#resultados option:selected").val().split(';')[1].trim();
	var carrera = $("#carrera option:selected").val(); 
	var materia = $("#materias option:selected").val();
	var semestre = $("#semestre option:selected").val();
	var grupo = $("#grupo option:selected").val();
	var turno = $("#turno option:selected").val();
	var practica = document.getElementById('practica').value;
	var descripcion = document.getElementById('descripcion').value;
	var materiales = document.getElementById('materiales').value;
	var equipo = document.getElementById('equipo').value;

	if(confirm("¿Desea cargar los datos de la práctica?")){
		$.ajax({
			type: 	"POST",
			url: 	"php/includes/editar_practica.php",
			data: 	{id:id,npractica:npractica,carrera:carrera,materia:materia,semestre:semestre,grupo:grupo,turno:turno,practica:practica,descripcion:descripcion,materiales:materiales,equipo:equipo},
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