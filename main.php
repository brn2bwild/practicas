<?php
	session_start();

	if(!isset($_SESSION['logged']) || $_SESSION['logged'] != "yes"){
		header("Location: index.php");
	}

	if($_SESSION['tipo'] == "docente"){
		header("Location: php/maestros.php");
	}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!--<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">-->
	<link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="img/fontawesome/css/all.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="icon" href="img/favicon.jpg">
	<title>Prácticas</title>
</head>
	<body> <!--se verifica que sólo se pueda selecionar una fecha posterior al día actual-->
		<div class="wrapper">
			<div id="topnav" class="topnav">
				<a id="registro" href="#registro">Registrar<i class="far fa-calendar-plus"></i></a>
				<a id="editar" href="#editar">Editar<i class="far fa-edit"></i></a>
				<a id="reportes" href="#reportes">Reportes<i class="far fa-file-alt"></i></a>
				<a id="reprogramar" href="#reprogramar">Reprogramar<i class="far fa-calendar-alt"></i></a>
				<a id="realizar" href="#realizar">Realización<i class="far fa-calendar-check"></i></a>
				<a id="validar" href="#validar">Validación<i class="fas fa-check-double"></i></a>
				<a id="jefes" href="#jefes">Jefaturas<i class="fas fa-chart-bar"></i></a>
				<a id="salir" href="#salir">Salir<i class="fas fa-sign-out-alt"></i></a>
				<a id="acerca" href="#acerca">Acerca de<i class="fas fa-question"></i></i></a>
			</div>	
			<div id="contenido" class="contenido"></div>
		</div>
	</body>
	<script src="js/jquery.min.js"></script>
	<script src="js/main.js"></script>
	<script src="js/jspdf/jspdf.debug.js"></script>
	<!--<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/data.js"></script>
	<script src="https://code.highcharts.com/modules/drilldown.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>-->
	<script src="js/highcharts.js"></script>
	<script src="js/data.js"></script>
	<script src="js/drilldown.js"></script>
	<script src="js/exporting.js"></script>
	<script src="js/jquery-1.12.4.js"></script>
  	<script src="js/jquery-ui.js"></script>
  	<!-- <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> -->
</html>
<script type="text/javascript">
	var tipo = "<?php echo $_SESSION['tipo'];?>";
	if(tipo == "administrativo"){
		document.getElementById('registro').style.color="#97A7B3";
		document.getElementById('reportes').style.color="#97A7B3";
		document.getElementById('reprogramar').style.color="#97A7B3";
		document.getElementById('editar').style.color="#97A7B3";
		document.getElementById('jefes').style.color="#97A7B3";
		document.getElementById('realizar').style.color="#97A7B3";
	}else if(tipo == "jefe"){
		document.getElementById('registro').style.color="#97A7B3";
		document.getElementById('reportes').style.color="#97A7B3";
		document.getElementById('editar').style.color="#97A7B3";		
		document.getElementById('realizar').style.color="#97A7B3";
		document.getElementById('reprogramar').style.color="#97A7B3";
	}else if(tipo == "docente"){
		document.getElementById('jefes').style.color="#97A7B3";
		document.getElementById('validar').style.color="#97A7B3";		
	}else if(tipo == "direccion"){
		document.getElementById('registro').style.color="#97A7B3";
		document.getElementById('reportes').style.color="#97A7B3";
		document.getElementById('editar').style.color="#97A7B3";		
		document.getElementById('validar').style.color="#97A7B3";	
		document.getElementById('realizar').style.color="#97A7B3";
		document.getElementById('reprogramar').style.color="#97A7B3";
	}
</script>
