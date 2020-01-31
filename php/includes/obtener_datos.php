<?php
    require_once('conexionBD.php');

    $id = filter_var($_POST['id'], FILTER_SANITIZE_STRING);

    $conexion = conectarBD();

    if($conexion){
        $stmt = $conexion->prepare("SELECT * FROM practicas_programadas WHERE id = :id");
        $stmt->bindParam("id", $id);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
?>