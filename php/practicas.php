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
                <td>#</td>
                <td>Nombre</td>
                <td>Materia</td>
                <td>Carrera</td>
                <td>Semestre</td>
                <td>Grupo</td>
                <td>Turno</td>
                <td>Laboratorio</td>
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
            <?php foreach($array as $fila){ ?>
            <tr>
                <td><?php echo $fila['numero']?></td>
                <td><?php echo $fila['nombre']?></td>
                <td><?php echo $fila['materia']?></td>
                <td><?php echo $fila['carrera']?></td>
                <td><?php echo $fila['semestre']?></td>
                <td><?php echo $fila['grupo']?></td>
                <td><?php echo $fila['turno']?></td>
                <td><?php echo $fila['laboratorio']?></td>
                <td style="text-align: center;">
                    <span class="btn btn-warning btn-sm" data-toggle="modal" data-target="#modalEditar" onclick="agregaFrmActualizar('<?php echo $fila['id_practica'] ?>')">
                        <i class="fas fa-edit"></i>
                    </span>
                </td>
                <td style="text-align: center;">
                    <span class="btn btn-danger btn-sm" onclick="eliminarDatos('<?php echo $fila['id_practica'] ?>')">
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