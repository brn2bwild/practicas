<?php
    require_once('conexionBD.php');

    $id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);
    $observaciones = filter_var($_POST['observaciones'], FILTER_SANITIZE_STRING);
    $fallas = filter_var($_POST['fallas'], FILTER_SANITIZE_STRING);
    $parametros = $_POST['parametros'];
    $eficiencia = 0;

    foreach($parametros as $parametro){
        $eficiencia += intval($parametro);
    }

    if($fallas != ''){$eficiencia -= 5;}

    $conexion = conectarBD();

    if($conexion){
        $stmt = $conexion->prepare("UPDATE practicas_programadas SET
                                     realizada = '1',
                                     observacion_prof = :observaciones,
                                     fallas = :fallas,
                                     eficiencia = :eficiencia
                                      WHERE id = :id");

        $stmt->bindParam(":observaciones", $observaciones);
        $stmt->bindParam(":fallas", $fallas);
        $stmt->bindParam(":eficiencia", $eficiencia);
        $stmt->bindParam(":id", $id);
        echo $stmt->execute();
    }
?>