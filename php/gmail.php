<?php

	$mensaje = strip_tags($_POST['mensaje']);
	$carrera = strip_tags($_POST['carrera']);
	$justificante = strip_tags($_POST['justificante']);
	$laboratorio = strip_tags($_POST['laboratorio']);

	include("phpmailer/class.phpmailer.php");

	$account="sistema.practicas.itss@gmail.com";
	$password="laboratorio2018";
	#$to="brn2bwild.dpf@gmail.com";
	$from="practicas@itss.com";
	$from_name="Control de Prácticas ITSS";
	#$msg="<strong>Insuficiencia de insumos, reactivos y/o herramientas</strong><br><br>".$mensaje; // HTML message
	#$subject="Notificacion sistema de practicas ITSS";
	/*End Config*/

	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->CharSet = 'UTF-8';
	$mail->Host = "smtp.gmail.com";
	$mail->SMTPAuth= true;
	$mail->Port = 465; // Or 587
	$mail->Username= $account;
	$mail->Password= $password;
	$mail->SMTPSecure = 'ssl';
	$mail->From = $from;
	$mail->FromName= $from_name;
	$mail->isHTML(true);

	if($justificante == '2'){
		if($carrera == 'Ing. Informática'){
			$to="brn2bwild.dpf@gmail.com";
			$tocc="brn2bwild.dpf@gmail.com";
		}else if($carrera == 'Ing. Electromecánica'){
			$to="brn2bwild.dpf@gmail.com";
			$tocc="brn2bwild.dpf@gmail.com";
		}else if($carrera == 'Ing. Industrial'){
			$to="brn2bwild.dpf@gmail.com";
			$tocc="brn2bwild.dpf@gmail.com";
		}else if($carrera == 'Ing. Administración'){
			$to="brn2bwild.dpf@gmail.com";
			$tocc="brn2bwild.dpf@gmail.com";
		}else if($carrera == 'Ing. Energías Renovables'){
			$to="brn2bwild.dpf@gmail.com";
			$tocc="brn2bwild.dpf@gmail.com";
		}else if($carrera == 'Ing. Agronomía'){
			$to="brn2bwild.dpf@gmail.com";
			$tocc="brn2bwild.dpf@gmail.com";
		}

		$msg="<strong>Insuficiencia de insumos, reactivos y/o herramientas</strong><br><br>En el laboratorio: ".utf8_decode($laboratorio)." - ".utf8_decode($mensaje).", en la carrera de: ".utf8_decode($carrera); // HTML message
		$asunto="Notificación sistema de prácticas ITSS - ".$carrera;
		$subject="=?ISO-8859-1?B?".base64_encode(utf8_decode($asunto))."=?=";

		$mail->addAddress($tocc);

	}else if($justificante == '3'){
		if($carrera == 'Ing. Informática'){
			$to="brn2bwild.dpf@gmail.com";
		}else if($carrera == 'Ing. Electromecánica'){
			$to="brn2bwild.dpf@gmail.com";
		}else if($carrera == 'Ing. Industrial'){
			$to="brn2bwild.dpf@gmail.com";
		}else if($carrera == 'Ing. Administración'){
			$to="brn2bwild.dpf@gmail.com";
		}else if($carrera == 'Ing. Energías Renovables'){
			$to="brn2bwild.dpf@gmail.com";
		}else if($carrera == 'Ing. Agronomía'){
			$to="brn2bwild.dpf@gmail.com";
		}

		$msg="<strong>Falla detectada en el equipo de laboratorio por falta de mantenimiento preventio y/o correctivo</strong><br><br>En el laboratorio: ".utf8_decode($laboratorio)." - ".utf8_decode($mensaje).", en la carrera de: ".utf8_decode($carrera); // HTML message
		$asunto="Notificación sistema de prácticas ITSS - ".$carrera;
		$subject="=?ISO-8859-1?B?".base64_encode(utf8_decode($asunto))."=?=";
	}

	$mail->Subject = $subject;
	$mail->Body = $msg;
	$mail->addAddress($to);

	if(!$mail->send()){
		$respuesta = array("notificado" => "false");
		echo json_encode($respuesta);
	 #echo "Mailer Error: " . $mail->ErrorInfo;
	}else{
		#echo "E-Mail has been sent";
		$respuesta = array("notificado" => "true");
		echo json_encode($respuesta);
	}
?>
