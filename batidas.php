<html>
<head>
  <title></title>
<? 



function getUserRank($userId){
    
        mysql_query("SET @rownum := 0"); /*as mysql_query function can execute one query at a time */
        $result = mysql_query("SELECT rank, votos FROM ( SELECT @rownum := @rownum + 1 AS rank, votos, id FROM batidas ORDER BY votos DESC) as result WHERE id = $userId");
        $row = mysql_fetch_array($result);

        return $row['rank'];
        
}

include_once("inc/conexao.inc.php");
$id = $_GET['minhaBatida'];


$sql = mysql_query("SELECT c.*, b.* AS categoria FROM batidas AS b INNER JOIN `cadastro` AS c ON b.`fkCadastro` = c.`idCadastro` WHERE id = {$id} ORDER BY b.id ASC");
$row = mysql_fetch_array($sql);

if($row['sexo'] == 'female'){
  $prefixo = "da";
}else{
  $prefixo = "do";
}
$nome = $row['nome'];
$player = $row['s1'].';'.$row['s2'].';'.$row['s3'].$row['s4'];




?>

<meta property="og:title" content="Flavor DJ - Batida <? echo $prefixo; ?>  <?= utf8_encode($nome) ?> " />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://apps.facebook.com/flavordj/?minhaBatida=<?= $_GET['minhaBatida'] ?>" />
<meta property="og:image" content="https://lit-castle-9930.herokuapp.com/img/share/flavor1.jpg" />
<meta property="og:site_name" content="Flavor DJ" />
<meta property="og:description" content="Sinta o sabor da minha batida no FLAVOR DJ: o gerador de som exclusivo do BH DANCE FESTIVAL. BH Dance Festival. A CIDADE NA PISTA." />

<link rel="stylesheet" type="text/css" href="css/estilos.css">
<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">

</head>

<body>

</body>
</html>
