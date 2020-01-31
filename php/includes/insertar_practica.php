<?php
    require_once('conexionBD.php');

    $maestro = filter_var($_POST['docente'], FILTER_SANITIZE_STRING);
    $carrera = filter_var($_POST['carrera'], FILTER_SANITIZE_STRING);
    $materia = filter_var($_POST['materia'], FILTER_SANITIZE_STRING);
    $semestre = filter_var($_POST['semestre'], FILTER_SANITIZE_STRING);
    $grupo = filter_var($_POST['grupo'], FILTER_SANITIZE_STRING);
    $turno = filter_var($_POST['turno'], FILTER_SANITIZE_STRING);
    $laboratorio = filter_var($_POST['laboratorio'], FILTER_SANITIZE_STRING);
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $numero = filter_var($_POST['numero'], FILTER_SANITIZE_STRING);
    $fechasesion1 = filter_var($_POST['fsesion1'], FILTER_SANITIZE_STRING);
    $strsesion1horas = '';
    if($fechasesion1 != '') {
        $arraysesion1horas = $_POST['formSesion1check'];
        $strsesion1horas = join(',', $arraysesion1horas);
    }
    $fechasesion2 = filter_var($_POST['fsesion2'], FILTER_SANITIZE_STRING);
    $strsesion2horas = '';
    if($fechasesion2 != '') {
        $arraysesion2horas = $_POST['formSesion2check'];
        $strsesion2horas = join(',', $arraysesion2horas);
    }
    $fechasesion3 = filter_var($_POST['fsesion3'], FILTER_SANITIZE_STRING);
    $strsesion3horas = '';
    if($fechasesion3 != '') {
        $arraysesion3horas = $_POST['formSesion3check'];
        $strsesion3horas = join(',', $arraysesion3horas);
    }
    $fechasesion4 = filter_var($_POST['fsesion4'], FILTER_SANITIZE_STRING);
    $strsesion4horas = '';
    if($fechasesion4 != '') {
        $arraysesion4horas = $_POST['formSesion4check'];
        $strsesion4horas = join(',', $arraysesion4horas);
    }
    $fechasesion5 = filter_var($_POST['fsesion5'], FILTER_SANITIZE_STRING);
    $strsesion5horas = '';
    if($fechasesion5 != '') {
        $arraysesion5horas = $_POST['formSesion5check']; 
        $strsesion5horas = join(',', $arraysesion5horas);
    }else
    $materiales = filter_var($_POST['materiales'], FILTER_SANITIZE_STRING);
    $equipo = filter_var($_POST['equipo'], FILTER_SANITIZE_STRING);
    $descripcion = filter_var($_POST['descripcion'], FILTER_SANITIZE_STRING);
    $periodo = filter_var($_POST['periodo'], FILTER_SANITIZE_STRING);

    $conexion = conectarBD();

    if($conexion){
        $stmt = $conexion->prepare("INSERT INTO practicas_programadas(
                                    maestro,
                                    materia,
                                    carrera,
                                    semestre,
                                    grupo,
                                    turno,
                                    laboratorio,
                                    practica,
                                    npractica,
                                    descripcion,
                                    materiales,
                                    equipo,
                                    sesion1_fecha,
                                    sesion1_horas,
                                    sesion2_fecha,
                                    sesion2_horas,
                                    sesion3_fecha,
                                    sesion3_horas,
                                    sesion4_fecha,
                                    sesion4_horas,
                                    sesion5_fecha,
                                    sesion5_horas,
                                    periodo,
                                    fecha_programada) 
                                    VALUES (
                                    :maestro,
                                    :materia,
                                    :carrera,
                                    :semestre,
                                    :grupo,
                                    :turno,
                                    :laboratorio,
                                    :nombre,
                                    :numero,
                                    :descripcion,
                                    :materiales,
                                    :equipo,
                                    :sesion1f,
                                    :sesion1h,
                                    :sesion2f,
                                    :sesion2h,
                                    :sesion3f,
                                    :sesion3h,
                                    :sesion4f,
                                    :sesion4h,
                                    :sesion5f,
                                    :sesion5h,
                                    :periodo,
                                    CURDATE()
                                    )");

        $stmt->bindParam(":maestro", $maestro);
        $stmt->bindParam(":materia", $materia);
        $stmt->bindParam(":carrera", $carrera);
        $stmt->bindParam(":semestre", $semestre);
        $stmt->bindParam(":grupo", $grupo);
        $stmt->bindParam(":turno", $turno);
        $stmt->bindParam(":laboratorio", $laboratorio);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":numero", $numero);
        $stmt->bindParam(":descripcion", $descripcion);
        $stmt->bindParam(":materiales", $materiales);
        $stmt->bindParam(":equipo", $equipo);
        $stmt->bindParam(":sesion1f", $fechasesion1);
        $stmt->bindParam(":sesion1h", $strsesion1horas);
        $stmt->bindParam(":sesion2f", $fechasesion2);
        $stmt->bindParam(":sesion2h", $strsesion2horas);
        $stmt->bindParam(":sesion3f", $fechasesion3);
        $stmt->bindParam(":sesion3h", $strsesion3horas);
        $stmt->bindParam(":sesion4f", $fechasesion4);
        $stmt->bindParam(":sesion4h", $strsesion4horas);
        $stmt->bindParam(":sesion5f", $fechasesion5);
        $stmt->bindParam(":sesion5h", $strsesion5horas);
        $stmt->bindParam(":periodo", $periodo);
        // $stmt->bindParam(":fecha_programacion", CURDATE());

        echo $stmt->execute();
    }
?>