$(document).ready(function(){
	$("#selperiodo").load(periodos());
	$("#selperiodo").change(function(){materias()});
	$("#buscar").click(function(){opciones()});
	$("#generar").click(function(){guardar()});
	$("#seltipo").change(function(){
		var opciones = document.getElementById('selopcion');
		var opcion = $("#seltipo option:selected").val();

		opciones.options.length = 0;

		if(opcion == "materia"){
			document.getElementById('semestre').hidden = false;
			document.getElementById('grupo').hidden = false;
			document.getElementById('turno').hidden = false;
			opciones.options[opciones.options.length] = new Option("Da click en Buscar para seleccionar la materia",0);
		}else if(opcion == "laboratorio"){
			document.getElementById('semestre').hidden = true;
			document.getElementById('grupo').hidden = true;
			document.getElementById('turno').hidden = true;
			opciones.options[opciones.options.length] = new Option("Da click en Buscar para seleccionar el laboratorio",0);
		}
	});
});

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

function opciones() {
	var opciones = document.getElementById('selopcion');
	var tipo = document.getElementById('seltipo').value;
	var nombre = document.getElementById('nombre').value.split('-')[0].trim();
	var periodo = document.getElementById('selperiodo').value;

	opciones.options.length = 0;

	$.ajax({
		type:  "POST",
		url:   "php/includes/repopciones_json.php",
		data:  {nombre:nombre,periodo:periodo,tipo:tipo}
	}).done(function(respuesta){
		if(respuesta.substring(0,5) == "Error"){
			alert(respuesta);
		}else{
			
			if(tipo == "materia"){
				document.getElementById('semestre').hidden = false;
				document.getElementById('grupo').hidden = false;
				document.getElementById('turno').hidden = false;
			} else {
				document.getElementById('semestre').hidden = true;
				document.getElementById('grupo').hidden = true;
				document.getElementById('turno').hidden = true;
			}

			var json = JSON.parse(respuesta);
			opciones_sql = json.opciones;

			for(materia in opciones_sql){
				opciones.options[opciones.options.length] = new Option(opciones_sql[materia][tipo],opciones_sql[materia][tipo]);
			}

			$("#selopcion option:first-child").attr('selected','selected');
		}
	});
}

function materias(){
	var materias = document.getElementById('selopcion');
	var nombre = document.getElementById('nombre').value.split('-')[0].trim();
	var periodo = document.getElementById('selperiodo').value;

	materias.options.length = 0;

	$.ajax({
		type:  "POST",
		url:   "php/includes/repmaterias_json.php",
		data:  {nombre:nombre,periodo:periodo}
	}).done(function(respuesta){
		if(respuesta.substring(0,5) == "Error"){
			alert(respuesta);
		}else{
			var json = JSON.parse(respuesta);
			materias_sql = json.materias.split(',');

			for(materia in materias_sql){
				materias.options[materias.options.length] = new Option(materias_sql[materia],materias_sql[materia]);
			}

			$("#selopcion option:first-child").attr('selected','selected');
		}
	});
}

function guardar(){
	var nombre = $("#nombre").val().split('-')[0].trim();
	var opcion = $("#selopcion option:selected").val();
	var periodo = $("#selperiodo option:selected").text();
	var tipo = $("#seltipo option:selected").val();
	var semestre = $("#semestre option:selected").val();
	var grupo = $("#grupo option:selected").val();
	var turno = $("#turno option:selected").val();

	if(opcion == 0){
		alert("Debes seleccionar alguna opción");
		return false;
	}

	$.ajax({
		type:  "POST",
		url:   "php/includes/reporte_json.php",
		data:  {nombre:nombre,opcion:opcion,periodo:periodo,tipo:tipo,semestre:semestre,grupo:grupo,turno:turno}
	}).done(function(respuesta){
		if(respuesta.substring(0,5) == "Error"){
			alert(respuesta);
		}else{
			var json = JSON.parse(respuesta);
			var cantidad = json.practicas.length;

			var carrera = json.practicas[0]['carrera'];
			var periodo = json.practicas[0]['periodo'];
			var semestre = json.practicas[0]['semestre'];
			var grupo = json.practicas[0]['grupo'];
			var turno = json.practicas[0]['turno'];
			var opcionsel = json.practicas[0][tipo];

			var linea = 70.1;
			var contador = 0;

			var numero_paginas = 0;

			numero_paginas = (Math.floor(cantidad/7));
			if(((cantidad/7)-(Math.floor(cantidad/7))) > 0.0){
				numero_paginas++;
			}

			if(document.getElementById("reporte-full").checked){
				var doc = new jsPDF('l','mm','letter');
				//alert(numero_paginas);
			
				for(var pagina = 0; pagina < numero_paginas; pagina++){
					var i = 0;
					var width = doc.internal.pageSize.width;
					var height = doc.internal.pageSize.height;
					if(tipo == 'materia'){
						doc.addImage(imgPractica.onload(),'JPEG',0,0,width,height);
					}else if(tipo == 'laboratorio'){
						doc.addImage(imgLaboratorio.onload(),'JPEG',0,0,width,height);
					}
					doc.setFontType('italic');
					doc.setFontSize(11);
					doc.text(40,39,nombre);
					doc.text(40,45,opcionsel);
					doc.text(40,51,periodo);
					if(tipo == 'materia'){
						doc.text(189,45,carrera);
						doc.text(189,51,semestre);
						doc.text(192,51,grupo);
						doc.text(197,51,turno);
					}
					doc.setFontSize(10);

					for(i in json.practicas){
						doc.setFontSize(8);
						if(json.practicas[i]['sesion1_fecha'] != '0000-00-00'){
							doc.text(12,linea-1,json.practicas[i]['sesion1_fecha']);
							doc.text(33,linea-1,json.practicas[i]['sesion1_horas']);
						}
						if(json.practicas[i]['sesion2_fecha'] != '0000-00-00'){
							doc.text(12,linea+2,json.practicas[i]['sesion2_fecha']);
							doc.text(33,linea+2,json.practicas[i]['sesion2_horas']);
						}
						if(json.practicas[i]['sesion3_fecha'] != '0000-00-00'){
							doc.text(12,linea+5,json.practicas[i]['sesion3_fecha']);
							doc.text(33,linea+5,json.practicas[i]['sesion3_horas']);
						}
						if(json.practicas[i]['sesion4_fecha'] != '0000-00-00'){
							doc.text(12,linea+8,json.practicas[i]['sesion4_fecha']);
							doc.text(33,linea+8,json.practicas[i]['sesion4_horas']);
						}
						if(json.practicas[i]['sesion5_fecha'] != '0000-00-00'){
							doc.text(12,linea+11,json.practicas[i]['sesion5_fecha']);						
							doc.text(33,linea+11,json.practicas[i]['sesion5_horas']);
						}
						doc.setFontSize(10);
						
						doc.text(52,linea,json.practicas[i]['practica'].substring(0,28));
						doc.text(52,linea+4,json.practicas[i]['practica'].substring(28,56));
						doc.text(52,linea+8,json.practicas[i]['practica'].substring(56,84));
						if(tipo == 'materia'){
							doc.text(103,linea,json.practicas[i]['laboratorio'].substring(0,26));
							doc.text(103,linea+4,json.practicas[i]['laboratorio'].substring(26,52));
						}else if(tipo == 'laboratorio'){
							doc.text(103,linea,json.practicas[i]['materia'].substring(0,26));
							doc.text(103,linea+4,json.practicas[i]['materia'].substring(26,52));
							doc.text(103,linea+8,json.practicas[i]['semestre']);
							doc.text(106,linea+8,json.practicas[i]['grupo']);
							doc.text(109,linea+8,json.practicas[i]['turno'].substring(0,3));
							var carrera_reporte = json.practicas[i]['carrera'].split(' ');
							doc.text(116,linea+8,carrera_reporte[0]+' '+carrera_reporte[1].substring(0,14));
						}
						doc.text(148,linea,json.practicas[i]['materiales'].substring(0,36));
						doc.text(148,linea+4,json.practicas[i]['materiales'].substring(36, 72));
						doc.text(148,linea+8,json.practicas[i]['materiales'].substring(72, 108));
						doc.text(213,linea,json.practicas[i]['equipo'].substring(0,32));
						doc.text(213,linea+4,json.practicas[i]['equipo'].substring(32,64));
						doc.text(213,linea+8,json.practicas[i]['equipo'].substring(64,96));
						linea = linea + 15.1;
						contador++;
						if(contador == 7 && pagina+1 < numero_paginas){
							doc.addPage();
							var width = doc.internal.pageSize.width;
							var height = doc.internal.pageSize.height;
							if(tipo == 'materia'){
								doc.addImage(imgPractica.onload(),'JPEG',0,0,width,height);
							}else if(tipo == 'laboratorio'){
								doc.addImage(imgLaboratorio.onload(),'JPEG',0,0,width,height);
							}
							doc.setFontType('italic');
							doc.setFontSize(11);
							doc.text(40,39,nombre);
							doc.text(40,45,opcionsel);
							doc.text(189,45,carrera);
							doc.text(40,51,periodo);
							if(tipo == 'materia'){
								doc.text(189,51,semestre);
								doc.text(192,51,grupo);
								doc.text(197,51,turno);
							}
							doc.setFontSize(10);
							linea = 70.1;
							contador = 0;
							pagina++;
						}
					}
				}
				doc.save(opcionsel+'_'+nombre+'_'+periodo+'.pdf');
			}

			if(document.getElementById("materiales-full").checked){
				linea_materiales = 43
				linea_practica = 37
				contador_materiales = 0;
				var materiales_doc = new jsPDF('v','mm','letter');

				//var paginas_materiales = Math.round(cantidad / 3);
				//if((cantidad % 3) >= 1){paginas_materiales++;} 

				var paginas_materiales = (Math.floor(cantidad/3));
				if(((cantidad/3)-(Math.floor(cantidad/3))) > 0.0){
					paginas_materiales++;
				}
				//alert(paginas_materiales);

				for (var pagina_mat = 0; pagina_mat < paginas_materiales; pagina_mat++) {
					j = 0;
					var width = materiales_doc.internal.pageSize.width;
					var height = materiales_doc.internal.pageSize.height;					
					materiales_doc.setFontType('italic');
					materiales_doc.setFontSize(11);
					materiales_doc.text(15,20,'Listas de materiales completas para cada práctica');
					materiales_doc.text(15,25,json.practicas[j][tipo].substring(0,100));

					for(j in json.practicas){
						if(tipo == 'materia'){
							materiales_doc.text(15,linea_practica-5,json.practicas[j]['laboratorio'].substring(0,100));
						}else if(tipo == 'laboratorio'){
							materiales_doc.text(15,linea_practica-5,json.practicas[j]['materia'].substring(0,100));
						}
						materiales_doc.text(15,linea_practica,json.practicas[j]['practica'].substring(0,100));
						materiales_doc.text(15,linea_materiales,json.practicas[j]['materiales'].substring(0, 105));
						materiales_doc.text(15,linea_materiales+5,json.practicas[j]['materiales'].substring(105, 210));
						materiales_doc.text(15,linea_materiales+10,json.practicas[j]['materiales'].substring(210, 315));
						materiales_doc.text(15,linea_materiales+15,json.practicas[j]['materiales'].substring(315, 420));
						materiales_doc.text(15,linea_materiales+20,json.practicas[j]['materiales'].substring(420, 525));
						materiales_doc.text(15,linea_materiales+25,json.practicas[j]['materiales'].substring(525, 630));
						materiales_doc.text(15,linea_materiales+30,json.practicas[j]['materiales'].substring(630, 650));
						materiales_doc.text(15,linea_materiales+35,json.practicas[j]['equipo'].substring(0, 105));
						materiales_doc.text(15,linea_materiales+40,json.practicas[j]['equipo'].substring(105, 210));
						materiales_doc.text(15,linea_materiales+45,json.practicas[j]['equipo'].substring(210, 315));
						materiales_doc.text(15,linea_materiales+50,json.practicas[j]['equipo'].substring(315, 420));
						materiales_doc.text(15,linea_materiales+55,json.practicas[j]['equipo'].substring(420, 525));
						materiales_doc.text(15,linea_materiales+60,json.practicas[j]['equipo'].substring(525, 630));
						materiales_doc.text(15,linea_materiales+65,json.practicas[j]['equipo'].substring(630, 650));
						linea_materiales = linea_materiales + 77;
						linea_practica = linea_practica + 77;
						contador_materiales++;
						if(pagina_mat+1 < paginas_materiales && contador_materiales == 3){
							materiales_doc.addPage();
							var width = materiales_doc.internal.pageSize.width;
							var height = materiales_doc.internal.pageSize.height;					
							materiales_doc.setFontType('italic');
							materiales_doc.setFontSize(11);
							materiales_doc.text(15,15,'Listas de materiales completas por práctica');
							materiales_doc.text(15,20,json.practicas[j][tipo].substring(0,100));
							linea_materiales = 43
							linea_practica = 37
							contador_materiales = 0;
							pagina_mat++;
						}
					}
				}
				materiales_doc.save('Materiales,Insumos,Equipo_'+materia+'_'+nombre+'_'+periodo+'.pdf');
			}

			if(!document.getElementById("materiales-full").checked && !document.getElementById("reporte-full").checked){
				alert("Debes seleccionar un tipo de archivo a generar");
			}
			
		}
	});
}

var imgPractica = new Image();
var imgLaboratorio = new Image();

imgLaboratorio.onload = function(){
	var dataURI = convertBase64(imgLaboratorio);
	return dataURI;
}

imgLaboratorio.src = "img/reporte_global_profesor_laboratorio.jpg"

imgPractica.onload = function(){
	var dataURI = convertBase64(imgPractica);
	return dataURI;
}

imgPractica.src = "img/reporte_global_profesor_materia.jpg"

function convertBase64(img){
	var canvas = document.createElement("canvas");

	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");

	ctx.drawImage(img,0,0);

	var dataURL = canvas.toDataURL("image/jpeg");

	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}