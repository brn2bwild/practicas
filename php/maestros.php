<?php
    session_start();

    if(!isset($_SESSION['logged']) && $_SESSION['logged'] != 'yes' && $_SESSION['tipo'] == 'docente'){
        header("Location: index.php");
    }
    $nombre = $_SESSION['user'];
    require_once('includes/conexionBD.php');
    $conexion = conectarBD();

    $capacidad = 34;

    if($conexion){
        $stmt = $conexion->prepare("SELECT * FROM practicas_programadas WHERE maestro = :nombre ORDER BY id DESC");
        $stmt->bindParam(":nombre", $nombre);
        $stmt->execute();
        $practicas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $conexion->prepare("SELECT * FROM materias ORDER BY carrera");
        $stmt->execute();
        $materias = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $conexion->prepare("SELECT * FROM laboratorios ORDER BY laboratorio");
        $stmt->execute();
        $laboratorios = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $conexion->prepare("SELECT * FROM periodos ORDER BY id DESC");
        $stmt->execute();
        $periodos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // echo json_encode($practicas);
    }else{
        echo '<script type="text/javascript">';
        echo 'alertify.alert("Error al conectarse a la base de datos")';
        echo '</script>';
    }
?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/fontawesome/css/all.css">
    <link rel="stylesheet" href="../css/alertify.min.css">
    <link rel="stylesheet" href="../css/themes/default.min.css">
    <link rel="stylesheet" href="../css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="icon" href="../img/favicon.jpg">
    <title>Maestros</title>
</head>
<body>
    <nav class="navbar" id="navbar">
        <div class="navbar-header-icon">
            <a href="javascript:void(0);" class="icon" onclick="navbarResponsive()">&#9776;</a>
        </div> 
        <div class="navbar-header-menu" id="header-menu">
            <a id="practicas" href="#practicas">Prácticas</a>
            <a id="indicadores" href="#indicadores">Indicadores</a>
        <div>
    </nav>   
    <!-- <div id="contenido" class="container-body"></div> -->
    <div class="card-header">
        <?php echo $nombre ?>
    </div>
    <div class="card-body">
        <span class="btn btn-primary" data-toggle="modal" data-target="#agregarPractica">
            Agregar práctica <i class="fa fa-plus-circle"></i>
        </span>
        <hr>
        <div id="tablaDatatable">
        <table class="table table-hover table-condensed table-bordered" id="iddatatable">
            <thead style="background-color: rgb(2,25,36);color: white; font-weight: bold;">
                <tr>
                    <td></td>
                    <td>No.</td>
                    <td>Nombre</td>
                    <td>Materia</td>
                    <td>Carrera</td>
                    <td>Semestre</td>
                    <td>Grupo</td>
                    <td>Turno</td>
                    <td>Laboratorio</td>
                    <td>Estado</td>
                    <td>Editar</td>
                    <td>Eliminar</td>
                </tr>
            </thead>
            <!-- <tfoot style="background-color: #ccc;color: white; font-weight: bold;">
                <tr>
                    <td>Nombre</td>
                    <td>Año</td>
                    <td>Empresa</td>
                    <td>Editar</td>
                    <td>Eliminar</td>
                </tr>
            </tfoot> -->
            <tbody >
                <?php foreach($practicas as $practica){ ?>
                <tr>
                    <td><?php echo $practica['id']?></td>
                    <td><?php echo $practica['npractica']?></td>
                    <td><?php echo $practica['practica']?></td>
                    <td><?php echo $practica['materia']?></td>
                    <td><?php echo $practica['carrera']?></td>
                    <td><?php echo $practica['semestre']?></td>
                    <td><?php echo $practica['grupo']?></td>
                    <td><?php echo $practica['turno']?></td>
                    <td><?php echo $practica['laboratorio']?></td>
                    <td><a href="#" data-toggle="modal" data-target="<?php
                        if($practica['realizada'] == '0'){
                            echo "#modalConfirmar";
                        }else if($practica['realizada'] == '1' || $practica['realizada'] == '2'){
                            echo "";
                        }
                    ?>" class="<?php
                    if($practica['realizada'] == '1'){
                        echo "btn btn-primary";
                    }else if($practica['realizada'] == '2'){
                        echo "btn btn-success";
                    }else if($practica['realizada'] == '0'){
                        echo "btn btn-secondary";
                    }
                    ?>" onclick="obtenerDatosConfirmar('<?php echo $practica['id'] ?>')">
                    <?php 
                        if($practica['realizada'] == '0'){
                            echo "Programada";
                        }else if($practica['realizada'] == '1'){
                            echo "Realizada";
                        }else if($practica['realizada'] == '2'){
                            echo "Validada";
                        }?>
                    </a></td>
                    <td style="text-align: center;">
                        <span class="btn btn-warning btn-sm" data-toggle="modal" data-target="<?php
                            if($practica['realizada'] == '0'){
                                echo "#modalEditar";
                            }else if($practica['realizada'] == '1' || $practica['realizada'] == '2'){
                                echo "";
                            }
                        ?>" onclick="obtenerDatosEditar('<?php echo $practica['id'] ?>')">
                            <i class="fas fa-edit"></i>
                        </span>
                    </td>
                    <td style="text-align: center;">
                        <span class="btn btn-danger btn-sm" onclick="eliminarDatos('<?php echo $practica['id'] ?>')">
                            <i class="fas fa-trash"></i>
                        </span>
                    </td>
                </tr>
                <?php } ?>
            </tbody>
        </table>
        </div>
    </div>
    <div class="card-footer text-muted">
        By Tesalia
    </div>
    
    <!-- Modal agregar -->
    <div class="modal fade" id="agregarPractica" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar nueva práctica</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="formRegistrarPractica" onsubmit="return insertarDatos()" method="post">
                        <div class="form-row">
                            <div class="form-group col-sm">
                                <input id="docente" name="docente" class="form-control" value="<?php echo $nombre;?>" readonly="true" hidden>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="carrera">Carrera</label>
                                <select id="carrera" name="carrera" class="custom-select">
                                    <option value="Ing. Informática" selected="true">Ing. Informática</option>
                                    <option value="Ing. Electromecánica">Ing. Electromecánica</option>
                                    <option value="Ing. Agronomía">Ing. Agronomía</option>
                                    <option value="Ing. Industrial">Ing. Industrial</option>
                                    <option value="Ing. Administración">Ing. Administración</option>
                                    <option value="Ing. Bioquímica">Ing. Bioquímica</option>
                                    <option value="Ing. Energías Renovables">Ing. Energías Renovables</option>
                                </select>
                            </div>
                            <div class="form-group col-md-8">
                                <label for="materia">Materia</label>
                                <select id="materia" name="materia" class="custom-select"></select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="periodo">Periodo</label>
                                <select id="periodo" name="periodo" class="custom-select">
                                    <?php
                                        foreach($periodos as $periodo){
                                            echo '<option value="'.$periodo["periodo"].'">'.$periodo["periodo"].'</option>';
                                        }
                                    ?>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="semestre">Semestre</label>
                                <input type="number" id="semestre" name="semestre" min="1" max="13" class="form-control" required="true">
                            </div>
                            <div class="form-group col-md-2">
                                <label for="grupo">Grupo</label>
                                <select id="grupo" name="grupo" class="custom-select">
                                    <option value="A" selected>A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="turno">Turno</label>
                                <select id="turno" name="turno" class="custom-select">
                                    <option value="Matutino" selected>Matutino</option>
                                    <option value="Vespertino">Vespertino</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-9">
                                <label for="laboratorio">Laboratorio</label>
                                <select id="laboratorio" name="laboratorio" class="custom-select">
                                    <!-- <option value="0" selected>Seleccione un laboratorio</option> -->
                                    <?php
                                        foreach($laboratorios as $laboratorio){
                                            echo '<option value="'.$laboratorio["laboratorio"].'">'.$laboratorio["laboratorio"].'</option>';
                                        }
                                    ?>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="capacidad">Cantidad alumnos</label>
                                <input type="number" id="capacidad" name="capacidad" class="form-control" placeholder="Capacidad máxima: <?php echo $capacidad;?> alumnos" min="1" max="<?php echo $capacidad;?>" required="true">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="numero">No. de práctica</label>
                                <input type="number" id="numero" name="numero" class="form-control" required="true">
                            </div>
                            <div class="form-group col-sm">
                                <label for="practica">Nombre de la práctica</label>
                                <input type="text" id="nombre" name="nombre" class="form-control" required="true">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-1">
                                <label>Sesion 1</label>
                            </div>
                            <div class="form-group col-sm-2">
                                <input type="date" name="fsesion1" id="fsesion1" min="2000-01-01" max="2050-01-01" class="form-control">
                            </div>
                            <div class="form-row col-sm- sesiones" id="formSesion1">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-1">
                                <label for="fsesion1">Sesion 2</label>
                            </div>
                            <div class="form-group col-sm-2">
                                <input type="date" name="fsesion2" id="fsesion2" min="2000-01-01" max="2050-01-01" class="form-control">
                            </div>
                            <div class="form-row col-sm- sesiones" id="formSesion2">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-1">
                                <label for="fsesion1">Sesion 3</label>
                            </div>
                            <div class="form-group col-sm-2">
                                <input type="date" name="fsesion3" id="fsesion3" min="2000-01-01" max="2050-01-01" class="form-control">
                            </div>
                            <div class="form-row col-sm- sesiones" id="formSesion3">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-1">
                                <label for="fsesion1">Sesion 4</label>
                            </div>
                            <div class="form-group col-sm-2">
                                <input type="date" name="fsesion4" id="fsesion4" min="2000-01-01" max="2050-01-01" class="form-control">
                            </div>
                            <div class="form-row col-sm- sesiones" id="formSesion4">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-1">
                                <label for="fsesion1">Sesion 5</label>
                            </div>
                            <div class="form-group col-sm-2">
                                <input type="date" name="fsesion5" id="fsesion5" min="2000-01-01" max="2050-01-01" class="form-control">
                            </div>
                            <div class="form-row col-sm- sesiones" id="formSesion5">
                            </div>
                        </div>
                        <label for="materiales">Materiales</label>
                        <textarea type="text" id="materiales" name="materiales" class="form-control noresize"></textarea>
                        <label for="equipo">Equipo</label>
                        <textarea type="text" id="equipo" name="equipo" class="form-control noresize"></textarea>
                        <label for="descripcion">Descripción</label>
                        <textarea type="text" id="descripcion" name="descripcion" class="form-control noresize"></textarea>
                        <br>
                        <input type="submit" value="Guardar" class="btn btn-primary">
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal horas-->
    <div class="modal fade" id="modalConfirmar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="titulomodalConfirmar">Realización de práctica</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form id="formConfirmarPractica" onsubmit="return confirmarPractica()" method="POST">
                        <div class="form-row">
                            <div class="form-group col-sm">
                                <input id="idconf" name="id" class="form-control" readonly="true" hidden>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for=numeroconf>No. de práctica</label>
                                <input id="numeroconf" name="numero" class="form-control" readonly="true">
                            </div>
                            <div class="form-group col-sm">
                                <label for=nombreconf>Nombre de la práctica</label>
                                <input id="nombreconf" name="nombre" class="form-control" readonly="true">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for=carreraconf>Carrera</label>
                                <input id="carreraconf" name="carrera" class="form-control" readonly="true">
                            </div>
                            <div class="form-group col-sm">
                                <label for=laboratorioconf>Laboratorio</label>
                                <input id="laboratorioconf" name="laboratorio" class="form-control" readonly="true">
                            </div>
                        </div>
                        <br>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" name="parametros[]" id="parametros1" value="10">
                            <label class="custom-control-label" for="parametros1">El laboratorio se encuentra en condiciones adecuadas para la realización de la práctica (Laboratorio límpio y en orden, equipos funcionando y en orden). (10%)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" name="parametros[]" id="parametros2" value="10">
                            <label class="custom-control-label" for="parametros2">La práctica se realizó con un protocolo (o manual) definido, siendo mayormente un proceso práctico, aplicando los conocimientos adquiridos en el aula. (10%)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" name="parametros[]" id="parametros3" value="10">
                            <label class="custom-control-label" for="parametros3">Los materiales y/o equipo utilizado, se usó de manera adecuada y eficiente. (10%)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" name="parametros[]" id="parametros4" value="10">
                            <label class="custom-control-label" for="parametros4">Se hizo una descripción de la actividad a los alumnos para la realización de la práctica, así como para el mejor aprovechamiento de los equipos y/o materiales utilizados en la práctica. (10%)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" name="parametros[]" id="parametros5" value="10">
                            <label class="custom-control-label" for="parametros5">Se presenta evidencia de la realización de la práctica por parte de los alumnos. (10%)</label>
                        </div>
                        <br>
                        <label for="observacionesconf">Observaciones</label>
                        <textarea type="text" id="observacionesconf" name="observaciones" class="form-control noresize"></textarea>
                        <br>
                        <label for="fallasconf">Reporte de fallas</label>
                        <textarea type="text" id="fallasconf" name="fallas" class="form-control noresize"></textarea>
                        <br>
                        <button type="submit" class="btn btn-primary" id="btnSeleccionar">Confirmar</button>
                    </form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
				</div>
			</div>
		</div>
	</div>

    <!-- Modal editar-->
	<div class="modal fade" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Actualizar práctica</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form id="formActualizarPractica" onsubmit="return actualizarDatos()" method="POST">
                        <div class="form-row">
                            <div class="form-group col-sm">
                                <input id="idact" name="id" class="form-control" readonly="true" hidden>
                            </div>
                            <div class="form-group col-sm">
                                <input id="docenteact" name="docente" class="form-control" readonly="true" hidden>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="carrera">Carrera</label>
                                <select id="carreraact" name="carrera" class="custom-select">
                                    <option value="Ing. Informática" selected="true">Ing. Informática</option>
                                    <option value="Ing. Electromecánica">Ing. Electromecánica</option>
                                    <option value="Ing. Agronomía">Ing. Agronomía</option>
                                    <option value="Ing. Industrial">Ing. Industrial</option>
                                    <option value="Ing. Administración">Ing. Administración</option>
                                    <option value="Ing. Bioquímica">Ing. Bioquímica</option>
                                    <option value="Ing. Energías Renovables">Ing. Energías Renovables</option>
                                </select>
                            </div>
                            <div class="form-group col-md-8">
                                <label for="materia">Materia</label>
                                <select id="materiaact" name="materia" class="custom-select">
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="semestre">Semestre</label>
                                <input type="number" id="semestreact" name="semestre" min="1" max="13" class="form-control" required="true">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="grupo">Grupo</label>
                                <select id="grupoact" name="grupo" class="custom-select">
                                    <option value="A" selected>A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="turno">Turno</label>
                                <select id="turnoact" name="turno" class="custom-select">
                                    <option value="Matutino" selected>Matutino</option>
                                    <option value="Vespertino">Vespertino</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="numero">No. de práctica</label>
                                <input type="number" id="numeroact" name="numero" class="form-control" required="true">
                            </div>
                            <div class="form-group col-sm">
                                <label for="practica">Nombre de la práctica</label>
                                <input type="text" id="nombreact" name="nombre" class="form-control" required="true">
                            </div>
                        </div>
                        <label for="materiales">Materiales</label>
                        <textarea type="text" id="materialesact" name="materiales" class="form-control noresize"></textarea>
                        <label for="equipo">Equipo</label>
                        <textarea type="text" id="equipoact" name="equipo" class="form-control noresize"></textarea>
                        <label for="descripcion">Descripción</label>
                        <textarea type="text" id="descripcionact" name="descripcion" class="form-control noresize"></textarea>
                        <br>
					    <button type="submit" class="btn btn-warning" id="btnActualizar">Actualizar</button>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
				</div>
			</div>
		</div>
	</div>
    <script src="../js/jquery.min.js"></script>
    <script src="../js/popper.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/alertify.min.js"></script>
    <script src="../js/jquery.dataTables.min.js"></script>
    <script src="../js/dataTables.bootstrap4.min.js"></script>
    <script src="../js/maestros.js"></script>
    <script>
        $(document).ready(function(){
            $('#iddatatable').DataTable({
                "columnDefs":[{
                    "visible": false,
                    "orderable": false,
                    "searchable": false,
                    "targets": 0
                }],
                "order":[[0, 'desc']]
            });
            // t.on('order.dt search.dt', function(){
            //     t.column(0, {search:'applied', order:'applied'}).nodes().each(function(cell, i){
            //         cell.innerHTML = i+1;
            //     }).draw();
            // })
            $('#carrera').change(function() {materiasCarrera('carrera');});
            $('#carreraact').change(function() {materiasCarrera('carreraact');});
            $('#agregarPractica').on('show.bs.modal', function() {rellenarModal();});
            $('#laboratorio').change(function() {rellenarModal();});
            $('#materia').load(materiasCarrera('carrera'));
            $('#materiaact').load(materiasCarrera('carreraact'));
            $('#periodo').load(periodos('periodo'));
            $('#periodoact').load(periodos('periodoact'));
            // $('#modalConfirmar').on('hidden.bs.modal', function(){
            // });
            // $('#modalConfirmar').on('click', '.btn-primary', function(){
            // });
            // $("#practicas").addClass("active");
            // $("#contenido").load("practicas.php");
            // $("#practicas").click(function(event){
            //     $("#contenido").load("practicas.php");
            //     $("#practicas").addClass("active");
            //     $("#indicadores").removeClass("active");
            // });
            // $("#indicadores").click(function(event){
            //     $("#contenido").load("indicadores.php");
            //     $("#indicadores").addClass("active");
            //     $("#practicas").removeClass("active");
            // });
        });

        var array_materias = <?php echo json_encode($materias); ?>;

        function periodos(_selectPeriodo) {
            $('#'+_selectPeriodo+' option:first-child').attr('selected','selected');
        }

        function rellenarModal() {
            var laboratorioSeleccionado = document.getElementById('laboratorio').value;
            var arrayLaboratorios = <?php echo json_encode($laboratorios); ?>;        
            var sesiones = document.getElementsByClassName('sesiones');
            for(var i=0; i<sesiones.length;i++){
                var sesion = document.getElementById(sesiones[i].id);
                while(sesion.firstChild){
                    sesion.removeChild(sesion.firstChild);
                }
                for(laboratorio in arrayLaboratorios){
                    if(arrayLaboratorios[laboratorio]['laboratorio'] == laboratorioSeleccionado){
                        var horasLaboratorio = arrayLaboratorios[laboratorio]['disponible'].split(',');
                        for(hora in horasLaboratorio){
                            var nuevoCheck = document.createElement('div');
                            var horaFormato;
                            switch (horasLaboratorio[hora]){
                                case "1":
                                    horaFormato = "7:00";
                                    break;
                                case "2":
                                    horaFormato = "8:00";
                                    break;
                                case "3":
                                    horaFormato = "9:00";
                                    break;
                                case "4":
                                    horaFormato = "10:00";
                                    break;
                                case "5":
                                    horaFormato = "11:00";
                                    break;
                                case "6":
                                    horaFormato = "12:00";
                                    break;
                                case "7":
                                    horaFormato = "13:00";
                                    break;
                                case "8":
                                    horaFormato = "14:00";
                                    break;
                                case "9":
                                    horaFormato = "15:00";
                                    break;
                                case "10":
                                    horaFormato = "16:00";
                                    break;
                                case "11":
                                    horaFormato = "17:00";
                                    break;
                                case "12":
                                    horaFormato = "18:00";
                                    break;
                            }
                            nuevoCheck.className = 'form-group col-';
                            nuevoCheck.innerHTML = '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" value="'+horasLaboratorio[hora]+'" id="'+sesiones[i].id+'check'+horasLaboratorio[hora]+'" name="'+sesiones[i].id+'check[]"><label class="custom-control-label tooltip-test" title="'+horaFormato+'" for="'+sesiones[i].id+'check'+horasLaboratorio[hora]+'"></label></div>';
                            // nuevoCheck.className = "custom-control custom-checkbox";
                            // nuevoCheck.innerHTML = '<input type="checkbox" class="custom-control-input" name="checkHoras" id="customCheck'+horasLaboratorio[hora]+'" value="'+horasLaboratorio[hora]+'"><label class="custom-control-label" for="customCheck'+horasLaboratorio[hora]+'">'+horasLaboratorio[hora]+'<m /label>';
                            document.getElementById(sesiones[i].id).appendChild(nuevoCheck);
                        }
                    }
                }
            }
        }
        
        function materiasCarrera(_carrera) {
            var carrera = $('#'+_carrera+' option:selected').val();
            var selectMaterias = document.getElementById('materia');
            selectMaterias.options.length = 0;
            for(materia in array_materias){
                if(array_materias[materia].carrera == carrera){
                    selectMaterias.options[selectMaterias.options.length] = new Option(array_materias[materia].materia, array_materias[materia].materia);
                }
            }
            $('#materia option:first-child').attr('selected','selected');

            var selectMaterias = document.getElementById('materiaact');
            selectMaterias.options.length = 0;
            for(materia in array_materias){
                if(array_materias[materia].carrera == carrera){
                    selectMaterias.options[selectMaterias.options.length] = new Option(array_materias[materia].materia, array_materias[materia].materia);
                }
            }
            $('#materiaact option:first-child').attr('selected','selected');
        }

        function navbarResponsive() {
            var x = document.getElementById("header-menu");
            if (x.className === "navbar-header-menu") {
                x.className += " responsive";
            } else {
                x.className = "navbar-header-menu";
            }
        }
    </script>
</body>
</html>