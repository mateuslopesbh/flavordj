<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Ranking</title>
	
	<style>
		table.rank { width: 800px }
		table.rank tr td {
			border: 1px solid #ccc;
			border-collapse: collapse;
		}
	</style>

</head>
<body>

	<table class="rank">
	<tr>
		<td>Posição</td>
		<td>Batida</td>
		<td>DJ</td>
		<td>Email</td>
		<td>Perfil Facebook</td>
	</tr>
<?
include_once("inc/conexao.inc.php");
mysql_set_charset('utf8');

mysql_query("SET @rownum := 0");
$row = mysql_query("SELECT rank, batida, nome, email, facebook  FROM (SELECT @rownum := @rownum + 1 AS rank, batidas.id as batida, cadastro.nome as nome, cadastro.email as email, cadastro.facebookId as facebook FROM  `batidas` JOIN cadastro ON cadastro.idCadastro = batidas.fkCadastro ORDER BY batidas.votos DESC)  as result");

while($result = mysql_fetch_array($row)):
?>

<tr>
	<td><?= $result['rank'] ?></td>
	<td><a href="https://apps.facebook.com/flavordj/?minhaBatida=<?= $result['batida'] ?>" target="_blank">Ouça a batida</a></td>
	<td><?= $result['nome'] ?></td>
	<td><?= $result['email'] ?></td>
	<td><a href="https://www.facebook.com/profile.php?id=<?= $result['facebook'] ?>" target="_blank">Perfil</td>
</tr>


<? endwhile; ?>
</table>
	
</body>
</html>

