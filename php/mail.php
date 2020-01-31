<?php
$cuenta = "daniel_pflores@hotmail.com";
$contra = "skateteapa";
$para = "brn_2_b_wild@hotmail.com";
$de = "daniel_pflores@hotmail.com";
$de_nombre = "Daniel P.F.";
$mensaje = "<strong>PRUEBA</strong>";
$asunto = "NINGUNO";

include("phpmailer/class.phpmailer.php");

$mail = new PHPMailer();
$mail->IsSMTP();
$mail->CharSet = 'UTF-8';
$mail->Host = 'smtp.live.com';
$mail->SMTPAuth = true;
$mail->Port = 587;
$mail->Username = $cuenta;
$mail->Password = $contra;
$mail->STMPSecure = 'tls';
$mail->From = $de;
$mail->FromName = $de_nombre;
$mail->isHTML(true);
$mail->Subject = $asunto;
$mail->Body = $mensaje;
$mail->addAddress($para);

if(!$mail -> send()){
	echo "Fallo el envio: " . $mail ->ErrorInfo;
}else{
	echo "Correo enviado";
}
?>