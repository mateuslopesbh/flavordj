<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#" >
<head>
  <title>Flavor DJ</title>
  <meta charset="utf-8">

  <? 
    if(!isset($_GET['minhaBatida'])){
        include_once('pickup.php');
    }else{
       include('minhaBatida.php');
    } 
  ?>
   





</body>
</html>