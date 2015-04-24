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

<div id="fb-root"></div>
<script>
  window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '451288254952804',                        // App ID from the app dashboard
      channelUrl : '//lit-castle-9930.herokuapp.com/channel.html', // Channel file for x-domain comms
      status     : true,                                 // Check Facebook Login status
      cache      : false,
      xfbml      : true                                  // Look for social plugins on the page
    });

    // Additional initialization code such as adding Event Listeners goes here
  };

  // Load the SDK asynchronously
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>



<div class="profile-batida">


  <div class="tarja">
      <div style="float: left; width: 350px">
         <img class="foto img-rounded" src="https://graph.facebook.com/<?= $row['facebookId'] ?>/picture?width=75&height=75">
         <div class="info">
            <div class="name">DJ <?= utf8_encode($nome) ?></div>
            <div class="posicao">Posição no ranking: <?= getUserRank($row['id']) ?>º</div>
            <a class="btn btn-warning btn-mini votarBatida" href="<?= $_GET['minhaBatida'] ?>" style="margin-top: 10px">Curtir</a>
         </div>
         <div class="clear"></div>
      </div>

      <div style="float: right; width: 230px">
        <a class="toggleSound play" href="#"></a>
      </div>
      <div class="clear"></div>
  </div>

</div>






<div class="audio1 ply"></div>
<div class="audio2 ply"></div>
<div class="audio3 ply"></div>
<div class="audio4 ply"></div>

<div class="audio5 ply"></div>
<div class="audio6 ply"></div>
<div class="audio7 ply"></div>
<div class="audio8 ply"></div>

<div class="audio9 ply"></div>
<div class="audio10 ply"></div>
<div class="audio11 ply"></div>
<div class="audio12 ply"></div>

<div class="audio13 ply"></div>
<div class="audio14 ply"></div>
<div class="audio15 ply"></div>
<div class="audio16 ply"></div>


<div class="audio17 ply"></div>
<div class="audio18 ply"></div>
<div class="audio19 ply"></div>
<div class="audio20 ply"></div>


<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/jquery.jplayer.min.js"></script>
<script type="text/javascript" src="js/queryLoader.js"></script>
<script type="text/javascript" src="js/funcoes-voto.js"></script>

<script type="text/javascript">

$(document).ready(function(){

<?
$music = explode(';', $player);
$players = "";

foreach($music as $item){
  if($item != 0){

    if(($item >= 1) && ($item <=4)){
      $pct = 1;
      $sub = 0;
    }else  if(($item >= 5) && ($item <= 8)){
      $pct = 2;
      $sub = 4;
    }else if(($item >= 9) && ($item <= 12)){
       $pct = 3;
       $sub = 8;
    }else if(($item >= 13) && ($item <= 16)){
       $pct = 4;
       $sub = 12;
    }else if(($item >= 17) && ($item <= 20)){
      $pct = 5;
      $sub = 16;
    }
?>
    

$(".audio<?= $item ?>").jPlayer({
    ready: function () {
      $(this).jPlayer("setMedia", {
       oga: "https://lit-castle-9930.herokuapp.com/sounds/pct<?= $pct ?>/<?= $item-$sub ?>.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct<?= $pct ?>/<?= $item-$sub ?>.mp3" 
      }).jPlayer("play");
    },
    ended: function (event) {
      $(this).jPlayer("play");
    },
    swfPath: "js",
    supplied: "mp3, oga"
  });


<?
  }
}

?>

// Play Pause
    $('.toggleSound').click(function(){
      if($(this).hasClass('play')){
        $('.ply').jPlayer("stop");
        $(this).removeClass('play').addClass('pause');
      }else{
        $('.ply').jPlayer("play", 0);
        $(this).removeClass('pause').addClass('play');
      }

      return false;
    });


});
</script>