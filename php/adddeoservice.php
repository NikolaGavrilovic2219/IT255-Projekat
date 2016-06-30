<?php
header('Access-Control-Allow-Methods: GET, POST');  
include("functions.php");

if(isset($_POST['naziv']) && isset($_POST['proizvodjac'])){
	
$naziv = $_POST['naziv'];
$proizvodjac = $_POST['proizvodjac'];
echo addDeo($naziv,$proizvodjac);
}
?>