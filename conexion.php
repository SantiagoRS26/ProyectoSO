<?php 
    $conexion = pg_connect("host=isilo.db.elephantsql.com 
    dbname=gxpwusuf 
    user=gxpwusuf 
    password=mAx2pwxx7Bn9z9UPPesuKyCKEshufPDd");
    if($conexion){
        echo 'Esta conectado';
    }
?>