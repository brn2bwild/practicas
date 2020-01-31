$(document).ready(function(){
    $('#modalAgregar').on('hidden.bs.modal', function(e){
        location.reload();
    });
    $('#modalEditar').on('hidden.bs.modal', function(e){
        location.reload();
    });
});

function eliminarDatos(_id) {
    alertify.confirm('Borrar práctica', '¿Desea borrar la practica?',
        function () {
            $.ajax({
                type: "POST",
                url: "includes/eliminar_practica.php",
                data: "id="+_id,
                success:function (respuesta) {
                    if(respuesta==1){
                        alertify.success('Práctica borrada');
                        location.reload();
                    }else{
                        // console.log(respuesta);
                        alertify.alert('Error al borrar la práctica');
                    }
                    
                }
            })
        },
        function () {
            // alertify.error('Cancelado');
        }
    )
}

// function obtenerDatosconf(_id) {
//     console.log(_id);
// }

function obtenerDatosEditar(_id) {
    $.ajax({
        type: "POST",
        url: "includes/obtener_datos.php",
        data: "id="+_id,
        success:function (respuesta) {
            respuesta = JSON.parse(respuesta);
            $('#idact').val(respuesta[0].id);
            $('#docenteact').val(respuesta[0].maestro);
            let carrera = document.getElementById('carreraact');
            carrera.value = respuesta[0].carrera;
            let materia = document.getElementById('materiaact');
            materia.value = respuesta[0].materia;
            let grupo = document.getElementById('grupoact');
            grupo.value = respuesta[0].grupo;
            let turno = document.getElementById('turnoact');
            turno.value = respuesta[0].turno;
            $('#semestreact').val(respuesta[0].semestre);
            $('#numeroact').val(respuesta[0].npractica);
            $('#nombreact').val(respuesta[0].practica);
            $('#materialesact').val(respuesta[0].materiales);
            $('#equipoact').val(respuesta[0].equipo);
            $('#descripcionact').val(respuesta[0].descripcion);
            // console.log(respuesta);
        }
    });
}

function obtenerDatosConfirmar(_id) {
    $.ajax({
        type: "POST",
        url: "includes/obtener_datos.php",
        data: "id="+_id,
        success:function (respuesta) {
            respuesta = JSON.parse(respuesta);
            $('#idconf').val(respuesta[0].id);
            $('#numeroconf').val(respuesta[0].npractica);
            $('#nombreconf').val(respuesta[0].practica);
            $('#carreraconf').val(respuesta[0].carrera);
            $('#laboratorioconf').val(respuesta[0].laboratorio);
        }
    });
    
}

function confirmarPractica() {
    var data = $('#formConfirmarPractica').serialize();

    // console.log(data);
    $.ajax({
        type: "POST",
        url: "includes/confirmar_practica.php",
        data: data,
        success:function(respuesta){
            if(respuesta==1){
                alertify.alert("Practica confirmada");
                console.log("práctica confimada");
            }else{
                alertify.alert("Error al confirmar práctica");
                console.log(respuesta);
            }
        }
    });
    return false;
}

function actualizarDatos() {
    var data = $('#formActualizarPractica').serialize();
    console.log(data);
    $.ajax({
        type: "POST",
        url: "includes/actualizar_practica.php",
        data: data,
        processData: false,
        cache: false,
        success:function(respuesta) {
            if(respuesta==1){
                // $('#formActuPractica')[0].reset();
                alertify.alert("Datos actualizados");
                console.log("datos actualizados");
            }else{
                alertify.alert("Error al actulizar los datos");
                console.log(respuesta);
            }
        }
    });

    return false;
}

function insertarDatos() {
    var data = $('#formRegistrarPractica').serialize();
    $.ajax({
        type:   "POST",
        url:    "includes/insertar_practica.php",
        data:   data,
        processData: false,
        cache: false,
        success:function(respuesta) {
            if(respuesta==1){
                $('#formRegistrarPractica')[0].reset();
                alertify.alert("Datos registrados");
                console.log("datos registrados");
            }else{
                alertify.alert("Error al registrar los datos");
                console.log("datos no registrados");
            }
        }
    });

    return false;
}