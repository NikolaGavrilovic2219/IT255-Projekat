<?php
header('Access-Control-Allow-Methods: POST');  
include("functions.php");

if(isset($_POST['ime']) && isset($_POST['prezime']) && isset($_POST['username']) && isset($_POST['password'])){
	
$ime = $_POST['ime'];
$prezime = $_POST['prezime'];
$username = $_POST['username'];
$password = $_POST['password'];
echo register($username,$password,$ime,$prezime);

}
?>