<?

include_once("inc/conexao.inc.php");
$facebookId = $_POST['facebookId'];

$data = mysql_query("SELECT * FROM cadastro WHERE facebookId = {$facebookId}");
$row = mysql_fetch_array($data);

if(mysql_num_rows($data) > 0){

	
	if($row['votou'] == 1){
		$dados = array("success" => 1);
		echo json_encode($dados);
	}else{
		$dados = array("success" => 0);
		echo json_encode($dados);
	}


}else{
	$dados = array("success" => 0);
	echo json_encode($dados);
}




?>