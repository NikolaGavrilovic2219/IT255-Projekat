<?php
include("config.php");

function checkIfLoggedIn(){
	global $conn;
	if(isset($_SERVER['HTTP_TOKEN'])){
		$token = $_SERVER['HTTP_TOKEN'];
		$result = $conn->prepare("SELECT * FROM KORISNICI WHERE TOKEN=?");
		$result->bind_param("s",$token);
		$result->execute();
		$result->store_result();
		$num_rows = $result->num_rows;
		if($num_rows > 0)
		{
			return true;
		}
		else{	
			return false;
		}
	}
	else{
		return false;
	}
}

function login($username, $password){
	global $conn;
	$rarray = array();
	if(checkLogin($username,$password)){
		$id = sha1(uniqid());
		$result2 = $conn->prepare("UPDATE KORISNICI SET TOKEN=? WHERE USERNAME=?");
		$result2->bind_param("ss",$id,$username);
		$result2->execute();
		$rarray['token'] = $id;
	} else{
		header('HTTP/1.1 401 Unauthorized');
		$rarray['error'] = "Invalid username/password";
	}
	return json_encode($rarray);
}

function checkLogin($username, $password){
	global $conn;
	$password = md5($password);
	$result = $conn->prepare("SELECT * FROM KORISNICI WHERE USERNAME=? AND PASSWORD=?");
	$result->bind_param("ss",$username,$password);
	$result->execute();
	$result->store_result();
	$num_rows = $result->num_rows;
	if($num_rows > 0)
	{
		return true;
	}
	else{	
		return false;
	}
}

function register($username, $password, $ime, $prezime){
	global $conn;
	$rarray = array();
	$errors = "";
	if(checkIfUserExists($username)){
		$errors .= "Username already exists\r\n";
	}
	if(strlen($username) < 5){
		$errors .= "Username mora imati najmanje 5 karaktera.\r\n";
	}
	if(strlen($password) < 5){
		$errors .= "Password mora imati najmanje 5 karaktera.\r\n";
	}
	if(strlen($ime) < 3){
		$errors .= "Ime mora imati najmanje 3 karaktera.\r\n";
	}
	if(strlen($prezime) < 3){
		$errors .= "Prezime mora imati najmanje 3 karaktera.\r\n";
	}
	if($errors == ""){
		$stmt = $conn->prepare("INSERT INTO KORISNICI (IME, PREZIME, USERNAME, PASSWORD) VALUES (?, ?, ?, ?)");
		$pass =md5($password);
		$stmt->bind_param("ssss", $ime, $prezime, $username, $pass);
		if($stmt->execute()){
			$id = sha1(uniqid());
			$result2 = $conn->prepare("UPDATE KORISNICI SET TOKEN=? WHERE USERNAME=?");
			$result2->bind_param("ss",$id,$username);
			$result2->execute();
			$rarray['token'] = $id;
		}else{
			header('HTTP/1.1 400 Bad request');
			$rarray['error'] = "Database connection error";
		}
	} else{
		header('HTTP/1.1 400 Bad request');
		$rarray['error'] = json_encode($errors);
	}
	
	return json_encode($rarray);
}

function checkIfUserExists($username){
	global $conn;
	$result = $conn->prepare("SELECT * FROM KORISNICI WHERE username=?");
	$result->bind_param("s",$username);
	$result->execute();
	$result->store_result();
	$num_rows = $result->num_rows;
	if($num_rows > 0)
	{
		return true;
	}
	else{	
		return false;
	}
}


function addDeo($naziv, $proizvodjac){
	global $conn;
	$rarray = array();
	$errors = "";
	if(checkIfLoggedIn()){
		if(strlen($naziv) < 3){
			$errors .= "Naziv mora imati najmanje 3 karaktera\r\n";
		}
		if(strlen($proizvodjac) < 3){
			$errors .= "Proizvodjac mora imati najmanje 3 karaktera\r\n";
		}
		if($errors == ""){
				$stmt = $conn->prepare("INSERT INTO DEO (NAZIV, PROIZVODJAC) VALUES (?, ?)");
				$stmt->bind_param("ss", $naziv, $proizvodjac);
				if($stmt->execute()){
					$rarray['success'] = "ok";
				}else{
					$rarray['error'] = "Database connection error";
				}
				return json_encode($rarray);
		} else{
			header('HTTP/1.1 400 Bad request');
			$rarray['error'] = json_encode($errors);
			return json_encode($rarray);
		}
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}

function addServis($deo_id, $vrsta, $opis){
	global $conn;
	$rarray = array();
	$errors = "";
	if(checkIfLoggedIn()){
		if(strlen($vrsta) < 3){
			$errors .= "Vrsta servisa mora imati vise od 3 karaktera.\r\n";
		}
		if(strlen($opis) < 3){
			$errors .= "Opis mora imati vise od 3 karaktera.\r\n";
		}
		if(!isset($deo_id)){
			$errors .= "Morate staviti koji deo je zamenjen.\r\n";
		}
		if($errors == ""){
			$stmt = $conn->prepare("INSERT INTO SERVIS (DEO_ID, VRSTA, OPIS) VALUES (?, ?, ?)");
			$stmt->bind_param("iss", $deo_id, $vrsta, $opis);
			if($stmt->execute()){
				$rarray['success'] = "ok";
			}else{
				$rarray['error'] = "Database connection error";
			}
			return json_encode($rarray);
		} else{
			header('HTTP/1.1 400 Bad request');
			$rarray['error'] = json_encode($errors);
			return json_encode($rarray);
		}
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}

function getServisi(){
	global $conn;
	$rarray = array();
	if(checkIfLoggedIn()){
		$result = $conn->query("SELECT * FROM SERVIS");
		$num_rows = $result->num_rows;
		$servisi = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT * FROM SERVIS");
			while($row = $result2->fetch_assoc()) {
				$row['DEO_NAZIV'] = getDeloviById($row['DEO_ID']); 
				array_push($servisi,$row);
			}
		}
		$rarray['servisi'] = $servisi;
		return json_encode($rarray);
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}

function getDelovi(){
	global $conn;
	$rarray = array();
	if(checkIfLoggedIn()){
		$result = $conn->query("SELECT * FROM DEO");
		$num_rows = $result->num_rows;
		$delovi = array();
		if($num_rows > 0)
		{
			$result2 = $conn->query("SELECT * FROM DEO");
			while($row = $result2->fetch_assoc()) {
				array_push($delovi,$row);
			}
		}
		$rarray['delovi'] = $delovi;
		return json_encode($rarray);
	} else{
		$rarray['error'] = "Please log in";
		header('HTTP/1.1 401 Unauthorized');
		return json_encode($rarray);
	}
}
function deleteServis($id){  
	global $conn;  
	$rarray = array();  
	if(checkIfLoggedIn()){
		$result = $conn->prepare("DELETE FROM SERVIS WHERE ID=?");   
		$result->bind_param("i",$id);   
		$result->execute();   
		$rarray['success'] = "Deleted successfully";  
	} else{   
		$rarray['error'] = "Please log in";  
		header('HTTP/1.1 401 Unauthorized');  
	}  
	return json_encode($rarray); 
}
function getDeloviById($id){
	global $conn;
	$rarray = array();
	$id = intval($id);
	$result = $conn->query("SELECT * FROM DEO WHERE ID=".$id);
	$num_rows = $result->num_rows;
	$rowtoreturn = array();
	if($num_rows > 0)
	{
		$result2 = $conn->query("SELECT * FROM DEO WHERE ID=".$id);
		while($row = $result2->fetch_assoc()) {
			$rowtoreturn = $row;
		}
	}
	return $rowtoreturn['NAZIV']." ".$rowtoreturn['PROIZVODJAC'];
}


?>