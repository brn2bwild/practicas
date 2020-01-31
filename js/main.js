$(document).ready(function(){
	$("#registro").click(function(event){
		$("#contenido").load('php/reg_practica.php');
	});
	$("#editar").click(function(event){
		$("#contenido").load('php/edi_practica.php');
	});
	$("#reprogramar").click(function(event){
		$("#contenido").load('php/rep_practica.php');
	});
	$("#reportes").click(function(event){
		$("#contenido").load('php/gen_reportes.php');
	});
	$("#realizar").click(function(event){
		$("#contenido").load('php/realizacion.php');
	});
	$("#validar").click(function(event){
		$("#contenido").load('php/validacion.php');
	});
	$("#jefes").click(function(event) {
		$("#contenido").load('php/jefes.php');
	});
	$("#acerca").click(function(event){
		$("#contenido").load('php/acerca.php');
	});
	$("#salir").click(function(event){
		$(document).load('php/salir.php');
		window.location.replace('index.php');
	});


});