<?php
    require_once('conexionBD.php');

    $id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);
    $maestro = filter_var($_POST['docente'], FILTER_SANITIZE_STRING);
    $carrera = filter_var($_POST['carrera'], FILTER_SANITIZE_STRING);
    $materia = filter_var($_POST['materia'], FILTER_SANITIZE_STRING);
    $semestre = filter_var($_POST['semestre'], FILTER_SANITIZE_STRING);
    $grupo = filter_var($_POST['grupo'], FILTER_SANITIZE_STRING);
    $turno = filter_var($_POST['turno'], FILTER_SANITIZE_STRING);
    $numero = filter_var($_POST['numero'], FILTER_SANITIZE_STRING);
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $materiales = filter_var($_POST['materiales'], FILTER_SANITIZE_STRING);
    $equipo = filter_var($_POST['equipo'], FILTER_SANITIZE_STRING);
    $descripcion = filter_var($_POST['descripcion'], FILTER_SANITIZE_STRING);

    $conexion = conectarBD();

    if($conexion){
        $stmt = $conexion->prepare("UPDATE practicas_programadas SET 
                                    maestro = :maestro,
                                    materia = :materia,
                                    carrera = :carrera,
                                    semestre = :semestre,
                                    grupo = :grupo,
                                    turno = :turno,
                                    practica = :nombre,
                                    npractica = :numero,
                                    descripcion = :descripcion,
                                    materiales = :materiales,
                                    equipo = :equipo
                                    WHERE id = :id");

        $stmt->bindParam(":maestro", $maestro);
        $stmt->bindParam(":materia", $materia);
        $stmt->bindParam(":carrera", $carrera);
        $stmt->bindParam(":semestre", $semestre);
        $stmt->bindParam(":grupo", $grupo);
        $stmt->bindParam(":turno", $turno);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":numero", $numero);
        $stmt->bindParam(":descripcion", $descripcion);
        $stmt->bindParam(":materiales", $materiales);
        $stmt->bindParam(":equipo", $equipo);
        $stmt->bindParam(":id", $id);

        echo $stmt->execute();
    }
?>