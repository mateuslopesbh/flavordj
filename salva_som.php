<?

include_once("inc/conexao.inc.php");



$musica1 = $_POST['m1'];
$musica2 = $_POST['m2'];
$musica3 = $_POST['m3'];
$musica4 = $_POST['m4'];
$facebookId = $_POST['facebookId'];
$nome = utf8_decode($_POST['nome']);
$email = $_POST['email'];
$sexo = $_POST['sexo'];
$usuario = $_POST['usuario'];
$cidade = utf8_decode($_POST['cidade']);


if($_GET['opc'] == 1){

	$cadastro = $row['idCadastro'];

	$sql = mysql_query("INSERT INTO batidas SET 
					s1 = '$musica1', 
					s2 = '$musica2', 
					s3 = '$musica3', 
					s4 = '$musica4',
					fkCadastro = '$usuario'");
	if($sql){
		$id = mysql_insert_id();
		$array = array("success" => 1, "batida" => $id);
		echo json_encode($array);

	}else{
		echo mysql_error();
	}
}else{
	$sql = mysql_query("INSERT INTO cadastro SET 
					facebookId = '$facebookId',
					nome = '$nome',
					email = '$email',
					sexo = '$sexo',
					cidade = '$cidade'");
	if($sql){
		$fkCadastroid = mysql_insert_id();
		$sql = mysql_query("INSERT INTO batidas SET 
					s1 = '$musica1', 
					s2 = '$musica2', 
					s3 = '$musica3', 
					s4 = '$musica4',
					fkCadastro = '$fkCadastroid'");
		if($sql){
			$id = mysql_insert_id();
			$array = array("success" => 1, "batida" => $id);
			echo json_encode($array);

		}else{
			echo mysql_error();
		}

	}else{
		echo mysql_error();
	}
}






?>