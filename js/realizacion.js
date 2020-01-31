$(document).ready(function(){
	$("#periodo").load(periodos());
	$("#tipo").change(function(event){buscar();});
	$("#buscar").click(function(event){buscar();});
	$("#opciones").change(function(event){buscar_resultados();});
	$("#check7-param").change(function(event){
		document.getElementById('reporte-fallas').value = '';
		document.getElementById('reporte-fallas').hidden = !document.getElementById('check7-param').checked;
	});
	$("#check6-param").change(function(event){
		document.getElementById('observaciones').value = '';
		document.getElementById('observaciones').hidden = !document.getElementById('check6-param').checked;
	});
	$("#enviar").click(function(event){
		enviar_datos();
	});
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

function buscar(){
	var nombre = $("#nombre").val().split('-')[0].trim();
	var tipo = $("#tipo option:selected").val();
	var opciones = document.getElementById('opciones');
	var periodo = document.getElementById('periodo').value;

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
						resultados.options[resultados.options.length] = new Option(resultados_json[resultado]['practica']+' - '+resultados_json[resultado]['laboratorio']+' - '+resultados_json[resultado]['carrera']+' - '+resultados_json[resultado]['semestre']+' - '+resultados_json[resultado]['grupo']+' - '+resultados_json[resultado]['turno'],resultados_json[resultado]['id']+';'+resultados_json[resultado]['npractica']);
					}
				}else if(tipo == "laboratorio"){
					for(resultado in resultados_json){
						resultados.options[resultados.options.length] = new Option(resultados_json[resultado]['practica']+' - '+resultados_json[resultado]['materia']+' - '+resultados_json[resultado]['carrera']+' - '+resultados_json[resultado]['semestre']+' - '+resultados_json[resultado]['grupo']+' - '+resultados_json[resultado]['turno'],resultados_json[resultado]['id']+';'+resultados_json[resultado]['npractica']);
					}
				}else if(tipo == "carrera"){
					for(resultado in resultados_json){
						resultados.options[resultados.options.length] = new Option(resultados_json[resultado]['practica']+' - '+resultados_json[resultado]['materia']+' - '+resultados_json[resultado]['laboratorio']+' - '+resultados_json[resultado]['semestre']+' - '+resultados_json[resultado]['grupo']+' - '+resultados_json[resultado]['turno'],resultados_json[resultado]['id']+';'+resultados_json[resultado]['npractica']);
					}
				}

				$("#resultados option:first-child").attr('selected','selected');
			}
		}  
	})
}

function enviar_datos() {
	if($("#resultados option:selected").val() == '-'){
		alert("No hay ninguna práctica seleccionada");
	}else{
		var idsql_practica= $("#resultados option:selected").val().split(';')[0].trim();
		var n_practica= $("#resultados option:selected").val().split(';')[1].trim();
		var eficiciencia = 0;
		var reporte_fallas = $("#reporte-fallas").val();
		var observaciones = $("#observaciones").val();
		var eficiencia = 0;

		$(':checkbox:checked').each(function(i){
			eficiencia += parseInt($(this).val());
		});

		if(eficiencia <= 0){
			alert("Deben seleccionarse los parámetros para la eficiencia de la práctica");
			return false;
		}else if(document.getElementById('observaciones').hidden == false && document.getElementById('observaciones').value == ''){
			alert("Se deben especificar las observaciones realizadas durante la práctica");
			return false;
		}else if(document.getElementById('reporte-fallas').hidden == false && document.getElementById('reporte-fallas').value == ''){
			alert("Se debe especificar el reporte de las fallas");
			return false;
		}

		if(confirm("¿Los datos de realización son correctos?")){
			$.ajax({
				type: 	"POST",
				url: 	"php/includes/realizacion_maestro.php" ,
				data: 	{id:idsql_practica,npractica:n_practica,reporte_fallas:reporte_fallas,observaciones:observaciones,eficiencia:eficiencia},
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
			alert("Verifique que los datos sean correctos");
		}
	}
}