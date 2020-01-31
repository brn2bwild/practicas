$(document).ready(function(){
	$("#selperiodo").load(periodos());
	$("#generar").click(function(){
		var opcion = document.getElementById('selopciones').value;
		if(opcion == "1"){
			guardar()
		}else if(opcion == "2"){
			cal_indicador();
		}
	});
	$("#selopciones").change(function(){opciones_disponibles()});
	$("#selespecificacion1").load(opciones_disponibles());
	$('#selespecificacion1').change(function(){opciones();});
	$('#selperiodo').change(function(){opciones_disponibles();});
});

function opciones(){
	var tipo = document.getElementById('selespecificacion1').value;
	var selector = document.getElementById('selespecificacion2');
	var jefatura = document.getElementById('nombre').value.split('-')[1].trim();
	
	selector.options.length = 0;

	if(jefatura == "Dirección"){
		if(tipo != "institucion"){
			$.ajax({
				type: 	"POST",
				url: 	"php/includes/tipo_json.php",
				data: 	{tipo:tipo,carrera:jefatura}
			}).done(function(respuesta){
				if(respuesta.substring(0,5) == "Error"){
					alert(respuesta);
				}else{
					var json = JSON.parse(respuesta);
					datos = json.datos.split(',');

					for(dato in datos){
						selector.options[selector.options.length] = new Option(datos[dato],datos[dato]);
					}

					$("#selespecificacion2 opcion:first-child").attr('selected','selected');
				}
			});
		}
	}else if(jefatura != "Dirección" && tipo == "carrera"){
		selector.options[selector.options.length] = new Option(jefatura,jefatura);

		$("#selespecificacion2 option:first-child").attr('selected','selected');
	}else if(jefatura != "Dirección" && tipo != "carrera"){
		$.ajax({
			type: 	"POST",
			url: 	"php/includes/tipo_json.php",
			data: 	{tipo:tipo,carrera:jefatura}
		}).done(function(respuesta){
			if(respuesta.substring(0,5) == "Error"){
				alert(respuesta);
			}else{
				var json = JSON.parse(respuesta);
				datos = json.datos.split(',');

				for(dato in datos){
					selector.options[selector.options.length] = new Option(datos[dato],datos[dato]);
				}

				$("#selespecificacion2 opcion:first-child").attr('selected','selected');
			}
		});
	}
}

function cal_indicador(){
	var tipo = document.getElementById('selespecificacion1').value;
	var selector = document.getElementById('selespecificacion2').value;
	var periodo = document.getElementById('selperiodo').value;
	var jefatura = document.getElementById('nombre').value.split('-')[1].trim();

	$.ajax({
		type: 	"POST",
		url: 	"php/includes/indicador_json.php",
		data: 	{tipo:tipo,selector:selector,periodo:periodo,jefatura:jefatura},
	}).done(function(respuesta){
		if(respuesta.substring(0,5) == "Error"){
			alert(respuesta);
		}else{
			var contador_practicas = 0;
			var contador_realizadas = 0;
			var contador_realizadas_noreprogramadas = 0;
			var contador_realizadas_reprogramadas = 0;
			var contador_norealizadas = 0;
			var contador_norealizadas_noreprogramadas = 0;
			var contador_norealizadas_reprogramadas = 0;
			var contador_reprogramaciones = 0;
			var suma_eficiencias = 0;
			var justificante1 = 0;
			var justificante2 = 0;
			var justificante3 = 0;
			var justificante4 = 0;
			var justificante5 = 0;
			var justificante6 = 0;
			var justificante7 = 0;
			var suma_alumnos_programados = 0;
			var suma_alumnos_presentes = 0;
			var porcentaje_alumnos = 0;
			var json = JSON.parse(respuesta);
			var practicas = json.practicas;

			for(practica in practicas){
				contador_practicas++;
				if(practicas[practica]['realizada'] == "1" && practicas[practica]['reprogramada'] == "0"){
					contador_realizadas++;
					contador_realizadas_noreprogramadas++;
					suma_eficiencias += parseInt(practicas[practica]['eficiencia']);
					suma_alumnos_programados += parseInt(practicas[practica]['alumnos_programados']);
					suma_alumnos_presentes += parseInt(practicas[practica]['alumnos_presentes']);
				}else if(practicas[practica]['realizada'] == "1" && practicas[practica]['reprogramada'] != "0"){
					contador_realizadas++;
					contador_realizadas_reprogramadas++;
					contador_reprogramaciones += parseInt(practicas[practica]['reprogramada']);
					if(practicas[practica]['justificacion'] == "1"){
						justificante1++;
					}else if(practicas[practica]['justificacion'] == "2"){
						justificante2++;
					}else if(practicas[practica]['justificacion'] == "3"){
						justificante3++;
					}else if(practicas[practica]['justificacion'] == "4"){
						justificante4++;
					}else if(practicas[practica]['justificacion'] == "5"){
						justificante5++;
					}else if(practicas[practica]['justificacion'] == "6"){
						justificante6++;
					}else if(practicas[practica]['justificacion'] == "7"){
						justificante7++;
					}
					suma_eficiencias += parseInt(practicas[practica]['eficiencia']);
					suma_alumnos_programados += parseInt(practicas[practica]['alumnos_programados']);
					suma_alumnos_presentes += parseInt(practicas[practica]['alumnos_presentes']);
				}else if(practicas[practica]['realizada'] == "0" && practicas[practica]['reprogramada'] == "0"){
					contador_norealizadas++;
					contador_norealizadas_noreprogramadas++;
				}else if(practicas[practica]['realizada'] == "0" && practicas[practica]['reprogramada'] != "0"){
					contador_norealizadas++;
					contador_norealizadas_reprogramadas++;
					if(practicas[practica]['justificacion'] == "1"){
						justificante1++;
					}else if(practicas[practica]['justificacion'] == "2"){
						justificante2++;
					}else if(practicas[practica]['justificacion'] == "3"){
						justificante3++;
					}else if(practicas[practica]['justificacion'] == "4"){
						justificante4++;
					}else if(practicas[practica]['justificacion'] == "5"){
						justificante5++;
					}else if(practicas[practica]['justificacion'] == "6"){
						justificante6++;
					}else if(practicas[practica]['justificacion'] == "7"){
						justificante7++;
					}
					contador_reprogramaciones += parseInt(practicas[practica]['reprogramada']);
				}
			}
			
			var porcentaje_alumnos = (suma_alumnos_presentes/suma_alumnos_programados)*100;
			var eficacia = (parseInt(contador_realizadas)/parseInt(contador_practicas))*100;
			var eficiencia_reprogramaciones = (parseInt(contador_realizadas)/(parseInt(contador_realizadas)+(parseInt(contador_reprogramaciones)*0.3)))*100;
			var eficiencia_practica = parseInt(suma_eficiencias)/parseInt(contador_practicas);
			var efectividad_reprogramaciones = (eficiencia_reprogramaciones*eficacia)/100;
			var efectividad_practica = (eficiencia_practica*eficacia)/100;
			var practicas_reprogramadas = parseInt(contador_realizadas_reprogramadas)+parseInt(contador_norealizadas_reprogramadas);
			
			graficar_contadores(
				contador_practicas,
				contador_realizadas,
				contador_realizadas_reprogramadas,
				contador_realizadas_noreprogramadas,
				contador_norealizadas,
				contador_norealizadas_reprogramadas,
				contador_norealizadas_noreprogramadas,
				practicas_reprogramadas,
				contador_reprogramaciones,
				eficacia,eficiencia_reprogramaciones,
				eficiencia_practica,
				efectividad_reprogramaciones,
				efectividad_practica,
				justificante1,
				justificante2,
				justificante3,
				justificante4,
				justificante5,
				justificante6,
				justificante7,
				porcentaje_alumnos);
		}
	});
}

function graficar_contadores(
	practicas_programadas,
	practicas_realizadas,
	realizadas_reprogramadas,
	realizadas_noreprogramadas,
	practicas_norealizadas,
	norealizadas_reprogramadas,
	norealizadas_noreprogramadas,
	practicas_reprogramadas,
	reprogramaciones,
	eficacia,
	eficiencia_reprogramaciones,
	eficiencia_practica,
	efectividad_reprogramaciones,
	efectividad_practica,
	justificante1,
	justificante2,
	justificante3,
	justificante4,
	justificante5,
	justificante6,
	justificante7,
	porcentaje_alumnos){
	
	var periodo = document.getElementById('selperiodo').value;

	// Highcharts.chart('practicas',{
	// 	chart:{
	// 		type: 'column'
	// 	},
	// 	title:{
	// 		text: 'Relación de prácticas periodo '+ periodo
	// 	},
	// 	xAxis:{
	// 		categories:['Realizadas','No realizadas','Reprogramaciones']
	// 	},
	// 	yAxis:{
	// 		min: 0,
	// 		title:{
	// 			text: 'Total de prácticas'
	// 		}
	// 	},
	// 	tooltip:{
	// 		pointFormat:'{series.name}: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
	// 		shared: false
	// 	},
	// 	plotOptions:{
	// 		column:{
	// 			stacking: 'point',
	// 			dataLabels: {
	// 				enabled: true,
	// 				color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
	// 			}
	// 		}
	// 	},
	// 	credits:{
	// 		enabled: false
	// 	},
	// 	series: [{
	// 		name: 'Sin reprogramar',
	// 		data: [parseInt(realizadas_noreprogramadas),parseInt(norealizadas_noreprogramadas),0],
	// 		y: parseInt(realizadas_noreprogramadas)+parseInt(realizadas_reprogramadas)
	// 	},{
	// 		name: 'Reprogramadas',
	// 		data: [parseInt(realizadas_reprogramadas),parseInt(norealizadas_reprogramadas),0]
	// 	},{
	// 		name: 'Reprogramaciones',
	// 		data: [0,0,parseInt(reprogramaciones)]
	// 	}]
	// });

	Highcharts.chart('practicas', {
	  	chart: {
	    	type: 'column'
	  	},
	  	title: {
	    	text: 'Relación de prácticas periodo '+ periodo
	  	},
	  	xAxis: {
	    	categories: ['Realizadas', 'No realizadas', 'Pears', 'Grapes', 'Bananas']
	  	},
	  	yAxis: {
	    	min: 0,
	    	title: {
	      		text: 'Total de prácticas'
	    	},
	    	stackLabels: {
	      		enabled: true,
	      		style: {
	        		fontWeight: 'bold',
	        		color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
	      		}
	    	}
	  	},
	  	legend: {
		    align: 'right',
		    x: 0,
		    verticalAlign: 'top',
		    y: 25,
		    floating: true,
		    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
		    borderColor: '#CCC',
		    borderWidth: 1,
		    shadow: false
	  	},
	  	tooltip: {
		    headerFormat: '<b>{point.x}</b><br/>',
		    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
	  	},
	  	plotOptions: {
		    column: {
		      	stacking: 'normal',
		      	dataLabels: {
		        	enabled: true,
		        	color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
		      	}
	    	}
	  	},
		series: [{
		    name: 'Sin reprogramar',
		    data: [parseInt(realizadas_noreprogramadas), parseInt(norealizadas_noreprogramadas)]
		}, {
		    name: 'Reprogramadas',
		    data: [parseInt(realizadas_reprogramadas), parseInt(norealizadas_reprogramadas)]
		}]

	});

	Highcharts.chart('justificaciones', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Causas de reprogramación de prácticas: ' + periodo
    },
    plotOptions: {
    	pie:{
    		allowPointSelect: true,
    		cursor: 'pointer',
    		dataLabels:{
    			enabled: true,
    			//format: '<b>{point.name}</b>: {point.percentage:.1f} %',
    			style: {
    				color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
    			}
    		}
    	}
    },
    credits:{
    	enabled:false
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.pointer}</b>'
      //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.percentage:.2f}%</b> of total<br/>'
    },
    xAxis:{
    	categories: [
    		'Causas de reprogramación de prácticas'
    	]
    },
    series: [{
      //name: 'Reprogramaciones',
      //colorByPoint: true,
      //data: [{
        name: 'Pase de entrada/salida, día económico: '+justificante1,
        data:[parseInt(justificante1)]
        //y: parseInt(justificante1)
      },{
        name: 'Insuficiencia insumos, equipo, herramientas: '+justificante2,
        data:[parseInt(justificante2)]
        //y: parseInt(justificante2)
      },{
        name: 'Fallas en los equipos por falta de mantenimiento: '+justificante3,
        data:[parseInt(justificante3)]
        //y: parseInt(justificante2)
      },{
      	name: 'Suministro de energía, internet y/o condiciones climatológicas: '+justificante4,
      	data:[parseInt(justificante4)]
      	//y: parseInt(justificante3)
      },{
      	name: 'Ausencia del grupo: '+justificante5,
      	data:[parseInt(justificante5)]
      	//y: parseInt(justificante4)
      },{
      	name: 'Inasistencia del laboratorista: '+justificante6,
      	data:[parseInt(justificante6)]
      	//y: parseInt(justificante5)
      },{
      	name: 'Otros: '+justificante7,
      	data:[parseInt(justificante7)]
      	//y: parseInt(justificante6)
      }]
    //}]
	});

	Highcharts.chart('indicadores', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Indicadores periodo '+periodo
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
    	max: 100,
      title: {
        text: 'Porcentajes totales',
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
      	states:{
      		hover:{
      			enabled: false
      		}
      	},
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.2f}%'
      	}
      }
    },
    credits: {
    	enabled: false
    },
    tooltip: {
      headerFormat: '<span style="font-size:12px">{series.name}</span><br>',
      pointFormat: '{point.name}: <b>{point.y:.2f}%</b> del total<br/>'
    },
    navigation:{
    	buttonOptions:{
    		enabled: true
    	}
    },
    series: [{
      name: 'Indicadores',
      data: [{
        name: 'Eficacia',
        y: parseFloat(eficacia)
      },{
        name: 'Eficiencia por práctica',
        y: parseFloat(eficiencia_practica)
      }
      //,{
      	//name: 'Eficiencia por reprogramaciones',
      	//y: parseFloat(eficiencia_reprogramaciones)
      //}
      ,{
        name: 'Efectividad por práctica',
        y: parseFloat(efectividad_practica)
      }
      //,{
      	//name: 'Efectividad por reprogramaciones',
      	//y: parseFloat(efectividad_reprogramaciones)
      //}
      ,{
      	name: 'Porcentaje de alumnos atendidos',
      	y: parseFloat(porcentaje_alumnos)
      }]
    }]
	},function(chart){
    	var regular = 75;
    	var malo = 50;

    	$.each(chart.series[0].data,function(i,data){
    		if(data.y > regular)
    			data.graphic.attr({fill:'#0C5B28'});
    		else if(data.y < regular && data.y > malo)
    			data.graphic.attr({fill:'#FE7600'});
    		else if(data.y < malo)
    			data.graphic.attr({fill:'#F71735'});
    	});
    });
}

function opciones_disponibles(){
	// var opcion = document.getElementById('selopciones').value;

	// if(opcion == "1"){
	// 	var especifico1 = document.getElementById('selespecificacion1');
	// 	var especifico2 = document.getElementById('selespecificacion2');
	// 	var jefatura = document.getElementById('nombre').value.split('-')[1].trim();
	// 	especifico1.options.length = 0;
	// 	especifico2.options.length = 0;

	// 	if(jefatura == "Dirección"){
	// 		especifico1.options[especifico1.options.length] = new Option("Institución","institucion");
	// 		especifico1.options[especifico1.options.length] = new Option("Carrera","carrera");
	// 		especifico1.options[especifico1.options.length] = new Option("Laboratorio","laboratorio");
	// 		especifico1.options[especifico1.options.length] = new Option("Maestro","maestro");
	// 		especifico1.options[especifico1.options.length] = new Option("Asignatura","materia");
	// 		jefatura = "dirección";
	// 	}else{
	// 		especifico1.options[especifico1.options.length] = new Option("Carrera","carrera");
	// 		especifico1.options[especifico1.options.length] = new Option("Laboratorio","laboratorio");
	// 		especifico1.options[especifico1.options.length] = new Option("Maestro","maestro");
	// 		especifico1.options[especifico1.options.length] = new Option("Asignatura","materia");
	// 	}
	// 	$("#selespecificacion1 option:first-child").attr('selected','selected');

		// $.ajax({
		// 	type: 	"POST",
		// 	url: 	"php/includes/materias_json.php",
		// 	data: 	{carrera:carrera},
		// 	async: 	false,
		// }).done(function(respuesta){
		// 	if(respuesta.substring(0,5) == "Error"){
		// 		alert(respuesta);
		// 	}else{
		// 		json = JSON.parse(respuesta);
		// 		var materias = json.materias.split(',');

		// 		for(materia in materias){
		// 			especifico1.options[especifico1.options.length] = new Option(materias[materia],materias[materia]);
		// 		}

		// 		$("#selespecificacion1 option:first-child").attr('selected','selected');
		// 	}
		// });

		// obt_maestros();

	//}else if(opcion == "2"){
	var especifico1 = document.getElementById('selespecificacion1');
	var especifico2 = document.getElementById('selespecificacion2');
	var jefatura = document.getElementById('nombre').value.split('-')[1].trim();
	especifico1.options.length = 0;
	especifico2.options.length = 0;

	if(jefatura == "Dirección"){
		especifico1.options[especifico1.options.length] = new Option("Institución","institucion");
		especifico1.options[especifico1.options.length] = new Option("Carrera","carrera");
		especifico1.options[especifico1.options.length] = new Option("Laboratorio","laboratorio");
		especifico1.options[especifico1.options.length] = new Option("Maestro","maestro");
		especifico1.options[especifico1.options.length] = new Option("Asignatura","materia");
	}else{
		especifico1.options[especifico1.options.length] = new Option("Carrera","carrera");
		especifico1.options[especifico1.options.length] = new Option("Laboratorio","laboratorio");
		especifico1.options[especifico1.options.length] = new Option("Maestro","maestro");
		especifico1.options[especifico1.options.length] = new Option("Asignatura","materia");
	}
	$("#selespecificacion1 option:first-child").attr('selected','selected');

	opciones();
}

function obt_maestros(){
	var materiasel = document.getElementById('selespecificacion1').value;
	var maestros = document.getElementById('selespecificacion2');
	var periodo = document.getElementById('selperiodo').value;
	maestros.options.length = 0;

	$.ajax({
		type: 	"GET",
		url: 	"php/includes/maestros_json.php",
		data: 	{materia:materiasel,periodo:periodo},
	}).done(function(respuesta){
		if(respuesta.substring(0,5) == "Error"){
			alert(respuesta);
		}else{
			json = JSON.parse(respuesta);
			if(json.maestros == "0"){
				alert("Ningún maestro ha sudido alguna práctica de la materia seleccionada");
			}else{
				var maestrossql = json.maestros.split(',');

				for(maestro in maestrossql){
					maestros.options[maestros.options.length] = new Option(maestrossql[maestro],maestrossql[maestro]);
				}

				$("#selespecificacion2 option:first-child").attr('selected','selected');
			}
		}
	});
}

function periodos(){
	var periodos = document.getElementById('selperiodo');
	periodos.options.length = 0;
	$.ajax({
		type:  "POST",
		url:   "php/includes/periodos_json.php",
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

function guardar(){
	var opcion1 = $("#selespecificacion1 option:selected").text();
	var opcion2 = $("#selespecificacion2 option:selected").text();
	var periodo = $("#selperiodo option:selected").text();
	var jefe = document.getElementById('nombre').value.split('-')[0].trim();
	var jefatura = document.getElementById('nombre').value.split('-')[1].trim();

	if((opcion1.length == 0 || opcion2.length == 0) && opcion1 != "Institución"){
		alert("No hay ninguna opción de reporte seleccionada");
		return false;
	}

	$.ajax({
		type:  "POST",
		url:   "php/includes/reporte_jefe_json.php",
		data:  {jefatura:jefatura,opcion1:opcion1,opcion2:opcion2,periodo:periodo},
	}).done(function(respuesta){
		if(respuesta.substring(0,5) == "Error"){
			alert(respuesta);
		}else{
			var json = JSON.parse(respuesta);
			var cantidad = json.practicas.length;
			// var carrera = json.practicas[0]['carrera'];
			// var periodo = json.practicas[0]['periodo'];
			if(opcion1 == "Carrera" || opcion1 == "Institución"){
				var linea = 63;
			}else{
				var linea = 70;
			}
			var contador = 0;

			numero_paginas = (Math.floor(cantidad/9));
			if(((cantidad/9)-(Math.floor(cantidad/9))) > 0.0){
				numero_paginas++;
			}
			//var doc = new jsPDF('l','mm','legal');

			var doc = new jsPDF('l','mm',[559,257]);
		
			for(var pagina = 0; pagina < numero_paginas; pagina++){
				var i = 0;
				var width = doc.internal.pageSize.width;
				var height = doc.internal.pageSize.height;
				if(opcion1 == 'Carrera'){
					doc.addImage(imgCarrera.onload(),'JPEG',0,0,width,height);
				}else if(opcion1 == 'Laboratorio'){
					doc.addImage(imgLaboratorio.onload(),'JPEG',0,0,width,height);
				}else if(opcion1 == 'Maestro'){
					doc.addImage(imgMaestro.onload(),'JPEG',0,0,width,height);
				}else if(opcion1 == 'Asignatura'){
					doc.addImage(imgMateria.onload(),'JPEG',0,0,width,height);
				}else if(opcion1 == 'Institución'){
					doc.addImage(imgInstitucion.onload(),'JPEG',0,0,width,height);
				}
				doc.setFontType('italic');
				doc.setFontSize(13);
				doc.text(40,45,jefatura);
				doc.text(222,45,periodo);
				if(opcion1 == 'Laboratorio'){
					doc.text(40,52,json.practicas[0]['laboratorio']);
				}else if(opcion1 == 'Maestro'){
					doc.text(40,52,json.practicas[0]['maestro']);
				}else if(opcion1 == 'Asignatura'){
					doc.text(40,52,json.practicas[0]['materia']);
				}

				// if(opcion1 == "Carrera"){
				// 	doc.text(85,220,"Jefe de departamento: "+jefe);
				// 	var fecha = new Date();
				// 	doc.text(260,220,"Fecha: "+fecha.toISOString().substring(0,10));
				// }else 

				if(opcion1 == "Institución"){
					doc.text(85,225,"Jefatura: "+jefe);
					var fecha = new Date();
					doc.text(260,225,"Fecha: "+fecha.toISOString().substring(0,10));
				}else{
					doc.text(85,225,"Jefe de departamento: "+jefe);
					var fecha = new Date();
					doc.text(260,225,"Fecha: "+fecha.toISOString().substring(0,10));
				}
				for(i in json.practicas){
					doc.setFontSize(8);
					if(json.practicas[i]['sesion1_fecha'] != '0000-00-00'){
						doc.text(12,linea-1,json.practicas[i]['sesion1_fecha']);
						//doc.text(33,linea-1,json.practicas[i]['sesion1_horas']);
					}
					if(json.practicas[i]['sesion2_fecha'] != '0000-00-00'){
						doc.text(12,linea+2,json.practicas[i]['sesion2_fecha']);
						//doc.text(33,linea+2,json.practicas[i]['sesion2_horas']);
					}
					if(json.practicas[i]['sesion3_fecha'] != '0000-00-00'){
						doc.text(12,linea+5,json.practicas[i]['sesion3_fecha']);
						//doc.text(33,linea+5,json.practicas[i]['sesion3_horas']);
					}
					if(json.practicas[i]['sesion4_fecha'] != '0000-00-00'){
						doc.text(12,linea+8,json.practicas[i]['sesion4_fecha']);
						//doc.text(33,linea+8,json.practicas[i]['sesion4_horas']);
					}
					if(json.practicas[i]['sesion5_fecha'] != '0000-00-00'){
						doc.text(12,linea+11,json.practicas[i]['sesion5_fecha']);						
						//doc.text(33,linea+11,json.practicas[i]['sesion5_horas']);
					}

					// doc.text(12,linea,json.practicas[i]['sesion1_fecha']);
					// doc.text(12,linea+4,json.practicas[i]['sesion2_fecha']);
					// doc.text(12,linea+8,json.practicas[i]['sesion3_fecha']);
					// doc.text(12,linea+12,json.practicas[i]['sesion4_fecha']);
					// doc.text(12,linea+16,json.practicas[i]['sesion5_fecha']);
					doc.setFontSize(10);
					if(opcion1 == "Institución"){
						doc.text(33,linea,json.practicas[i]['carrera'].substring(0,23));
						doc.text(33,linea+4,json.practicas[i]['carrera'].substring(23,46));
						doc.text(33,linea+8,json.practicas[i]['carrera'].substring(46,69));
						doc.text(33,linea+12,json.practicas[i]['carrera'].substring(69,92));
					}else{
						doc.text(33,linea,json.practicas[i]['practica'].substring(0,23));
						doc.text(33,linea+4,json.practicas[i]['practica'].substring(23,46));
						doc.text(33,linea+8,json.practicas[i]['practica'].substring(46,69));
						doc.text(33,linea+12,json.practicas[i]['practica'].substring(69,92));
					}
					if(opcion1 == "Carrera" || opcion1 == "Institución"){
						doc.text(73,linea,json.practicas[i]['materia'].substring(0,21));
						doc.text(73,linea+4,json.practicas[i]['materia'].substring(21,42));
						doc.text(73,linea+8,json.practicas[i]['materia'].substring(42,63));
						doc.text(73,linea+12,json.practicas[i]['materia'].substring(63,84));
						
						doc.text(112,linea,json.practicas[i]['maestro'].substring(0,23));
						doc.text(112,linea+4,json.practicas[i]['maestro'].substring(23,46));
						doc.text(112,linea+8,json.practicas[i]['maestro'].substring(46,69));
						doc.text(112,linea+12,json.practicas[i]['maestro'].substring(69,92));
						
						doc.text(152,linea,json.practicas[i]['laboratorio'].substring(0,23));
						doc.text(152,linea+4,json.practicas[i]['laboratorio'].substring(23,46));
						doc.text(152,linea+8,json.practicas[i]['laboratorio'].substring(69,92));
						doc.text(152,linea+12,json.practicas[i]['laboratorio'].substring(75,100));

						doc.setFontSize(11);
						doc.text(195,linea+5,json.practicas[i]['semestre']);
						doc.text(208,linea+5,json.practicas[i]['grupo']);
						doc.text(219,linea+5,json.practicas[i]['turno'].substring(0,3));

						if(json.practicas[i]['realizada'] == "0")
							doc.text(237,linea+5,"No");
						else
							doc.text(237,linea+5,"Si");

						doc.text(254,linea+5,json.practicas[i]['eficiencia']+' %');
						doc.text(272,linea+5,json.practicas[i]['fecha_realizacion']);
						doc.text(298,linea+5,json.practicas[i]['reprogramada']);
						doc.text(315,linea+5,json.practicas[i]['justificacion']);

						doc.setFontSize(10);
						doc.text(328,linea,json.practicas[i]['especificacion'].substring(0,23));
						doc.text(328,linea+4,json.practicas[i]['especificacion'].substring(23,46));
						doc.text(328,linea+8,json.practicas[i]['especificacion'].substring(46,69));
						doc.text(328,linea+8,json.practicas[i]['especificacion'].substring(69,92));

						doc.text(368,linea,json.practicas[i]['observacion_prof'].substring(0,23));
						doc.text(368,linea+4,json.practicas[i]['observacion_prof'].substring(23,46));
						doc.text(368,linea+8,json.practicas[i]['observacion_prof'].substring(46,69));
						doc.text(368,linea+12,json.practicas[i]['observacion_prof'].substring(69,92));
						
						doc.text(409,linea,json.practicas[i]['observaciones'].substring(0,23));
						doc.text(409,linea+4,json.practicas[i]['observaciones'].substring(23,46));
						doc.text(409,linea+8,json.practicas[i]['observaciones'].substring(46,69));
						doc.text(409,linea+12,json.practicas[i]['observaciones'].substring(69,92));

						doc.text(450,linea,json.practicas[i]['fallas'].substring(0,23));
						doc.text(450,linea+4,json.practicas[i]['fallas'].substring(23,46));
						doc.text(450,linea+8,json.practicas[i]['fallas'].substring(46,69));
						doc.text(450,linea+12,json.practicas[i]['fallas'].substring(69,92));

						doc.text(491,linea,json.practicas[i]['seguimiento'].substring(0,23));
						doc.text(491,linea+4,json.practicas[i]['seguimiento'].substring(23,46));
						doc.text(491,linea+8,json.practicas[i]['seguimiento'].substring(46,69));
						doc.text(491,linea+12,json.practicas[i]['seguimiento'].substring(69,92));
					}else{
						if(opcion1 == "Laboratorio"){
							doc.text(76,linea,json.practicas[i]['materia'].substring(0,21));
							doc.text(76,linea+4,json.practicas[i]['materia'].substring(21,42));
							doc.text(76,linea+8,json.practicas[i]['materia'].substring(42,63));
							doc.text(76,linea+12,json.practicas[i]['materia'].substring(63,84));
							doc.text(119,linea,json.practicas[i]['maestro'].substring(0,23));
							doc.text(119,linea+4,json.practicas[i]['maestro'].substring(23,46));
							doc.text(119,linea+8,json.practicas[i]['maestro'].substring(46,69));
							doc.text(119,linea+12,json.practicas[i]['maestro'].substring(69,92));
						}else if(opcion1 == "Maestro"){
							doc.text(76,linea,json.practicas[i]['materia'].substring(0,21));
							doc.text(76,linea+4,json.practicas[i]['materia'].substring(21,42));
							doc.text(76,linea+8,json.practicas[i]['materia'].substring(42,63));
							doc.text(76,linea+12,json.practicas[i]['materia'].substring(63,84));
							doc.text(119,linea,json.practicas[i]['laboratorio'].substring(0,23));
							doc.text(119,linea+4,json.practicas[i]['laboratorio'].substring(23,46));
							doc.text(119,linea+8,json.practicas[i]['laboratorio'].substring(46,69));
							doc.text(119,linea+12,json.practicas[i]['laboratorio'].substring(69,92));
						}else if(opcion1 == "Asignatura"){
							doc.text(76,linea,json.practicas[i]['laboratorio'].substring(0,21));
							doc.text(76,linea+4,json.practicas[i]['laboratorio'].substring(21,42));
							doc.text(76,linea+8,json.practicas[i]['laboratorio'].substring(42,63));
							doc.text(76,linea+12,json.practicas[i]['laboratorio'].substring(63,84));
							doc.text(119,linea,json.practicas[i]['maestro'].substring(0,23));
							doc.text(119,linea+4,json.practicas[i]['maestro'].substring(23,46));
							doc.text(119,linea+8,json.practicas[i]['maestro'].substring(46,69));
							doc.text(119,linea+12,json.practicas[i]['maestro'].substring(69,92));
						}						
						doc.setFontSize(11);
						doc.text(165,linea+5,json.practicas[i]['semestre']);
						doc.text(178,linea+5,json.practicas[i]['grupo']);
						doc.text(194,linea+5,json.practicas[i]['turno'].substring(0,3));

						if(json.practicas[i]['realizada'] == "0")
							doc.text(215,linea+5,"No");
						else
							doc.text(215,linea+5,"Si");

						doc.text(231,linea+5,json.practicas[i]['eficiencia']+' %');
						if(json.practicas[i]['fecha_realizacion'] == "0000-00-00"){
							doc.text(251,linea+5,"-------");
						}else{	
							doc.text(251,linea+5,json.practicas[i]['fecha_realizacion']);
						}
						doc.text(280,linea+5,json.practicas[i]['reprogramada']);
						doc.text(300,linea+5,json.practicas[i]['reprogramada']);
						doc.text(300,linea+5,json.practicas[i]['justificacion']);

						doc.setFontSize(10);
						doc.text(310,linea,json.practicas[i]['especificacion'].substring(0,23));
						doc.text(310,linea+4,json.practicas[i]['especificacion'].substring(23,46));
						doc.text(310,linea+8,json.practicas[i]['especificacion'].substring(46,69));
						doc.text(310,linea+8,json.practicas[i]['especificacion'].substring(69,92));

						doc.text(353,linea,json.practicas[i]['observacion_prof'].substring(0,24));
						doc.text(353,linea+4,json.practicas[i]['observacion_prof'].substring(24,48));
						doc.text(353,linea+8,json.practicas[i]['observacion_prof'].substring(48,72));
						doc.text(353,linea+12,json.practicas[i]['observacion_prof'].substring(72,96));
						
						doc.text(397,linea,json.practicas[i]['observaciones'].substring(0,24));
						doc.text(397,linea+4,json.practicas[i]['observaciones'].substring(24,48));
						doc.text(397,linea+8,json.practicas[i]['observaciones'].substring(48,72));
						doc.text(397,linea+12,json.practicas[i]['observaciones'].substring(72,96));

						doc.text(441,linea,json.practicas[i]['fallas'].substring(0,24));
						doc.text(441,linea+4,json.practicas[i]['fallas'].substring(24,48));
						doc.text(441,linea+8,json.practicas[i]['fallas'].substring(48,72));
						doc.text(441,linea+12,json.practicas[i]['fallas'].substring(72,96));

						doc.text(485,linea,json.practicas[i]['seguimiento'].substring(0,24));
						doc.text(485,linea+4,json.practicas[i]['seguimiento'].substring(24,48));
						doc.text(485,linea+8,json.practicas[i]['seguimiento'].substring(48,72));
						doc.text(485,linea+12,json.practicas[i]['seguimiento'].substring(72,96));
					}
					doc.setFontSize(11);
					porcentaje_alum = parseInt(json.practicas[i]['alumnos_presentes'])*100/parseInt(json.practicas[i]['alumnos_programados']);
					doc.text(533,linea+5,porcentaje_alum.toFixed(2)+'%');
					linea = linea + 17.1;
					contador++;
					if(contador == 9 && pagina+1 < numero_paginas){
						pagina++;
						if(opcion1 == "Carrera" || opcion1 == "Institución"){
							var linea = 63;
						}else{
							var linea = 70;
						}
						contador = 0;
						doc.addPage();
						var width = doc.internal.pageSize.width;
						var height = doc.internal.pageSize.height;
						if(opcion1 == 'Carrera'){
							doc.addImage(imgCarrera.onload(),'JPEG',0,0,width,height);
						}else if(opcion1 == 'Laboratorio'){
							doc.addImage(imgLaboratorio.onload(),'JPEG',0,0,width,height);
						}else if(opcion1 == 'Maestro'){
							doc.addImage(imgMaestro.onload(),'JPEG',0,0,width,height);
						}else if(opcion1 == 'Asignatura'){
							doc.addImage(imgMateria.onload(),'JPEG',0,0,width,height);
						}else if(opcion1 == 'Institución'){
							doc.addImage(imgInstitucion.onload(),'JPEG',0,0,width,height);
						}

						doc.setFontType('italic');
						doc.setFontSize(13);
						doc.text(40,45,jefatura);
						doc.text(222,45,periodo);
						if(opcion1 == 'Laboratorio'){
							doc.text(40,52,json.practicas[0]['laboratorio']);
						}else if(opcion1 == 'Maestro'){
							doc.text(40,52,json.practicas[0]['maestro']);
						}else if(opcion1 == 'Asignatura'){
							doc.text(40,52,json.practicas[0]['materia']);
						}
						if(opcion1 == "Carrera"){
							doc.text(85,220,"Jefe de departamento: "+jefe);
							var fecha = new Date();
							doc.text(260,220,"Fecha: "+fecha.toISOString().substring(0,10));
						}else if(opcion1 == "Institución"){
							doc.text(85,225,"Jefatura: "+jefe);
							var fecha = new Date();
							doc.text(260,225,"Fecha: "+fecha.toISOString().substring(0,10));
						}else{
							doc.text(85,225,"Jefe de departamento: "+jefe);
							var fecha = new Date();
							doc.text(260,225,"Fecha: "+fecha.toISOString().substring(0,10));
						}
					}
				}
			}
			if(opcion1 == "Carrera" || opcion1 == "Institución"){
				doc.save(jefatura+'-'+periodo+'.pdf');
			}else{
				doc.save(opcion2+'-'+jefatura+'-'+periodo+'.pdf');
			}
		}
	});
}

var imgCarrera = new Image();
var imgLaboratorio = new Image();
var imgMaestro = new Image();
var imgMateria = new Image();
var imgInstitucion = new Image();

imgInstitucion.onload = function(){
	var dataURI = convertBase64(imgInstitucion);
	return dataURI;
}
imgInstitucion.src = "img/reporte_global_institucion.jpg"

imgCarrera.onload = function(){
	var dataURI = convertBase64(imgCarrera);
	return dataURI;
}
imgCarrera.src = "img/reporte_global_jefe_carrera.jpg"

imgLaboratorio.onload = function(){
	var dataURI = convertBase64(imgLaboratorio);
	return dataURI;
}
imgLaboratorio.src = "img/reporte_global_jefe_laboratorio.jpg"

imgMaestro.onload = function(){
	var dataURI = convertBase64(imgMaestro);
	return dataURI;
}
imgMaestro.src = "img/reporte_global_jefe_maestro.jpg"

imgMateria.onload = function(){
	var dataURI = convertBase64(imgMateria);
	return dataURI;
}
imgMateria.src = "img/reporte_global_jefe_materia.jpg"


function convertBase64(img){
	var canvas = document.createElement("canvas");

	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");

	ctx.drawImage(img,0,0);

	var dataURL = canvas.toDataURL("image/jpeg");

	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}