<?php
  session_start();

  if(isset($_SESSION['logged'])){
    if($_SESSION['logged']=="yes" && ($_SESSION['tipo']=="docente" || $_SESSION['tipo']=="administrativo" || $_SESSION['tipo']=="jefe" || $_SESSION['tipo']=="direccion")){
      header("Location: main.php");
    }
  }
?>
<html >
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="css/main.css"> 
  <link rel="icon" href="img/favicon.jpg">
  <title>Prácticas</title> 
</head>
<body>
  <div class="body-login">
    <div class="login-page">
      <div class="form">
        <!-- <form class="login-form" action="php/validar_login.php" onsubmit=" return validar_login()"> -->
        <form method="POST" class="login-form" action="" id="acceso">
          <input type="text" placeholder="Clave" name="clave" id="claveAcceso" autocomplete="off" maxlength="10" required/>
          <input type="password" placeholder="Contraseña" name="pass" id="passAcceso" autocomplete="off" maxlength="8" required/>
          <button type="submit" id="acceder" value="Acceder">Acceder</button>
          <p class="message">¿No estás registrado? <a href="#">Crear una cuenta</a></p>
        </form>

        <!-- <form class="register-form" action="php/validar_reg.php" onsubmit=" return validar_reg()"> -->
        <form method="POST" class="register-form" action="php/registrar.php" id="registro">
          <input type="text" placeholder="nombre*" name="nombre" id="rnombre" required/>
          <input type="text" placeholder="clave*" name="clave" id="rclave" maxlength="10" required/>
          <select id="selcarrera" name="tagcarrera">
            <option value="Ing. Electromecánica" selected="true">Ing. Electromecánica</option>
            <option value="Ing. Informática">Ing. Informática</option>
            <option value="Ing. Agronomía">Ing. Agronomía</option>
            <option value="Ing. Industrial">Ing. Industrial</option>
            <option value="Ing. Administración">Ing. Administración</option>
            <option value="Ing. Bioquímica">Ing. Bioquímica</option>
            <option value="Ing. Energías Renovables">Ing. Energías Renovables</option>
            <option value="Dirección">Dirección</option>
          </select>
          <input type="password" placeholder="contraseña*" name="pass" id="pass" maxlength="8" required/>
          <input type="password" placeholder="repetir contraseña*" name="passr" id="passr" maxlength="8" required/>
          <input type="text" placeholder="email" name="mail" id="email" required/>
          <button type="submit" id="crear">Crear</button>
          <p class="message">¿Ya estás registrado? <a href="#">Acceder</a></p>
        </form>
      </div>
    </div>
  </div>
  <script src='js/jquery.min.js'></script>
  <script src="js/index.js"></script>
  <script type="text/javascript">

    $("#acceso").on("submit",function(e){
      e.preventDefault();
      var formData = new FormData(document.getElementById("acceso"));
      $.ajax({
        type:   "POST",
        url:    "php/acceder.php",
        data:   formData,
        contentType: false,
        processData: false,
        dataType: "HTML"
      }).done(function(echo){
        if(echo !== ""){
          alert(echo);
        }else{
          window.location.replace("");
        }
      });
    });

    $("#registro").on("submit",function(e){
      e.preventDefault();
      var formData = new FormData(document.getElementById("registro"));
      $.ajax({
        type:  "POST",
        url:   "php/registrar.php",
        data:  formData,
        contentType: false,
        processData: false,
        dataType: "HTML"
      }).done(function(echo){
        if(echo !== ""){
          alert(echo);
        }else{
          alert("Datos registrados")
          window.location.replace("");
        }
      });
    });
  </script>
</body>
</html>