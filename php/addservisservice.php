<?php
header('Access-Control-Allow-Methods: GET, POST');  
include("functions.php");

if(isset($_POST['deo_id']) && isset($_POST['vrsta']) && isset($_POST['opis'])){
	
	
$deo_id = $_POST['deo_id'];	
$vrsta = $_POST['vrsta'];
$opis = $_POST['opis'];

echo addServis($deo_id, $vrsta, $opis);
}
?>