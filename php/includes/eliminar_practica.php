<?php
    require_once('conexionBD.php');

    $id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);

    $conexion = conectarBD();

    if($conexion){
        $stmt = $conexion->prepare('DELETE FROM practicas_programadas WHERE id = :id');
        $stmt->bindParam(':id', $id);
        echo $stmt->execute();
    }
?>