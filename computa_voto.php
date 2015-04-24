<?

include_once("inc/conexao.inc.php");


$facebookId = $_POST['facebookId'];
$batida = $_POST['batida'];


$data = mysql_query("UPDATE cadastro SET votou = 1 WHERE facebookId = {$facebookId}");
if($data){
	$sql = mysql_query("UPDATE batidas SET votos = votos+1 WHERE id = {$batida}");
	if($sql){
		$dados = array("success" => 1);
		echo json_encode($dados);
	}else{
		$dados = array("success" => 0);
		echo json_encode($dados);
	}

}









?>