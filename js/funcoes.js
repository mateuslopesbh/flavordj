	// Global Vars to set 
 	var  musicas = new Array(11);
 	musicas[0] = 0; // Wheel A
 	musicas[1] = 0; // Whell B
 	musicas[2] = "0;"; // A1
 	musicas[3] = "0;"; // A2
 	musicas[4] = "0;"; // A3
 	musicas[5] = "0;"; // A4
 	musicas[6] = "0;"; // B1
 	musicas[7] = "0;"; // B2
 	musicas[8] = "0;"; // B3
 	musicas[9] = "0;"; // B4
 	musicas[10] = 0; // Sings



	function ativa_facebook(){


	   alert('Aguarde...');

	   FB.api('/me', function(response) {
	   // console.log(response);

			// NORMAL ACTION

	    $.post('getUser.php', { facebookId: response.id}, function(data){
		    if(data.success){

	   			//INSERE APENAS BATIDA
		        $.post('salva_som.php?opc=1', { 
					m1: musicas[0],
					m2: musicas[1], 
					m3: musicas[2]+musicas[3]+musicas[4]+musicas[5]+musicas[6]+musicas[7]+musicas[8]+musicas[9],
					m4: musicas[10],
					usuario: data.usuario

				}, function(data){
					if(data.success){

						var image = Math.floor((Math.random()*3)+1);

						FB.api('/me/feed', 'post', { message: 'Sinta o sabor da minha batida no FLAVOR DJ: o gerador de som exclusivo do BH DANCE FESTIVAL. BH Dance Festival. A CIDADE NA PISTA.', link: 'https://apps.facebook.com/flavordj/?minhaBatida='+data.batida, picture: 'https://lit-castle-9930.herokuapp.com/img/share/flavor'+image+'.jpg' }, function(response) {
						  if (!response || response.error) {
						    alert('Error occured');
						  } else {
						    alert('Sua batida foi compartilhada com sucesso!');
						  }
						});
		       		}

				}, 'json');

	   		}else{

	   			//INSERE BATIDA E USUARIO
		        $.post('salva_som.php?opc=2', { 

		        	


					m1: musicas[0],
					m2: musicas[1], 
					m3: musicas[2]+musicas[3]+musicas[4]+musicas[5]+musicas[6]+musicas[7]+musicas[8]+musicas[9],
					m4: musicas[10],
					facebookId: response.id,
					nome: response.name,
					email: response.email,
					sexo: response.gender,
					cidade: ''
				}, function(data){
					if(data.success){

						var image = Math.floor((Math.random()*3)+1);

						FB.api('/me/feed', 'post', { message: 'Sinta o sabor da minha batida no FLAVOR DJ: o gerador de som exclusivo do BH DANCE FESTIVAL. BH Dance Festival. A CIDADE NA PISTA.', link: 'https://apps.facebook.com/flavordj/?minhaBatida='+data.batida, picture: 'https://lit-castle-9930.herokuapp.com/img/share/flavor'+image+'.jpg' }, function(response) {
						  if (!response || response.error) {
						    alert('Error occured');
						  } else {
						    alert('Sua batida foi compartilhada com sucesso!');
						  }
						});
		       		}

				}, 'json');
	   		}
	    }, 'json'); 


		});
	}

	function computa_voto(batida){
		   
	   FB.api('/me', function(response) {
	   //console.log(response);


		// NORMAL ACTION

	    $.post('getVoto.php', { facebookId: response.id}, function(data){
			if(data.success){
					alert('Você já votou em uma batida, obrigado por participar!');
	   		}else{
	   			//INSERE NO BD
		        $.post('computa_voto.php', {

					facebookId: response.id,
					batida:  batida

				}, function(data){
					if(data.success){

						
		       		}

				}, 'json');
	   		}
	    }, 'json'); 


		});
	}





	function login() {

		alert('Você ainda não tem o aplicativo do Flavor DJ. Instale-o primeiro para compartilhar sua batida.');

	    FB.login(function(response) {
	        if (response.authResponse) {
	            ativa_facebook();
	        } else {

	        }
	    }, {scope: 'email, publish_stream'});
	}

	


		function desativaetp1(){
			$('.audio1').jPlayer("stop");
			$('.audio2').jPlayer("stop");
			$('.audio3').jPlayer("stop");
			$('.audio4').jPlayer("stop");

			musicas[0] = "0;";

			$('.etapa1, .guide .etapa1 div, .etapa1 li').removeClass('ativo');
			$('.etapa1').css('z-index', 2);
		}


		function desativaetp2(){
			$('.audio5').jPlayer("stop");
			$('.audio6').jPlayer("stop");
			$('.audio7').jPlayer("stop");
			$('.audio8').jPlayer("stop");

			musicas[1] = "0;";

			$('.etapa2, .guide .etapa2 div, .etapa2 li').removeClass('ativo');
			$('.etapa2').css('z-index', 2);
		}

		function desativaetpr(idPlayer, cod){

			musicas[cod] = "0;";
			$('.audio'+idPlayer).jPlayer("stop");
			$('.etapa3').css('z-index', 2);
		}

		
		function desativaetp5(){
			$('.audio17').jPlayer("stop");
			$('.audio18').jPlayer("stop");
			$('.audio19').jPlayer("stop");
			$('.audio20').jPlayer("stop");


			musicas[10] = "0;";


			$('.etapa5, .guide .etapa5 div, .etapa5 li').removeClass('ativo');
			$('.etapa5').css('z-index', 2);
		}




		function ativa_anima(){

			$('.whel1 div.a').delay(300).animate({ height: '0px' }, 1000);
			$('.whel1 div.b').delay(300).animate({ height: '0px' }, 1000, function(){
				$('.whel2 div.a').delay(300).animate({ width: '0px' }, 1000);
				$('.whel2 div.b').delay(300).animate({ width: '0px' }, 1000);
			});

		}
		


		$(document).ready(function(){


		//login_start();


		
	


		$('.etapa1').click(function(){
			
			if($(this).hasClass('ativo')){
				desativaetp1();
			}else{	

				desativaetp1();
				
				$(this).addClass('ativo');
				$(this).css('z-index', 1);
				var audioPlayer = $(this).attr('href');

				musicas[0] = audioPlayer;


				$('.guide .etapa1 div.p'+audioPlayer).addClass('ativo');
				$('.visor .etapa1 li.p'+audioPlayer).addClass('ativo');
				$(".audio"+audioPlayer).jPlayer("play", 0);
			}
			
			

			return false;
		})


		$('.etapa2').click(function(){
			
			if($(this).hasClass('ativo')){
				desativaetp2();
			}else{	

				desativaetp2();
				
				$(this).addClass('ativo');
				$(this).css('z-index', 1);
				var audioPlayer = $(this).attr('href');

				musicas[1] = audioPlayer;

				$('.guide .etapa2 div.p'+audioPlayer).addClass('ativo');
				$('.visor .etapa2 li.p'+audioPlayer).addClass('ativo');
				$(".audio"+audioPlayer).jPlayer("play", 0);
			}
			
			

			return false;
		})


		$('.etapa3').click(function(){
			var audioPlayer = $(this).attr('href');
			var codigo = $(this).data('codigo');

			if($(this).hasClass('ativo')){

				desativaetpr(audioPlayer,codigo);
				$('.guide .etapa3 div.p'+audioPlayer).removeClass('ativo');
				$('.visor .etapa3 li.p'+audioPlayer).removeClass('ativo');
				$(this).removeClass('ativo');

			}else{	
				
				$(this).addClass('ativo');
				$('.guide .etapa3 div.p'+audioPlayer).addClass('ativo');
				$('.visor .etapa3 li.p'+audioPlayer).addClass('ativo');
				$(this).css('z-index', 1);
				
				musicas[codigo] = audioPlayer+";";

				$(".audio"+audioPlayer).jPlayer("play", 0);
			}
			
			

			return false;
		})

		$('.etapa4').click(function(){
			var audioPlayer = $(this).attr('href');
			var cod = $(this).data('codigo');
			
			if($(this).hasClass('ativo')){
				desativaetpr(audioPlayer, cod);
				$('.guide .etapa4 div.p'+audioPlayer).removeClass('ativo');
				$('.visor .etapa4 li.p'+audioPlayer).removeClass('ativo');
				$(this).removeClass('ativo');
			}else{	

				
				$(this).addClass('ativo');
				$('.guide .etapa4 div.p'+audioPlayer).addClass('ativo');
				$('.visor .etapa4 li.p'+audioPlayer).addClass('ativo');

				musicas[cod] = audioPlayer+";";
				
				$(".audio"+audioPlayer).jPlayer("play", 0);
			}
			
			

			return false;
		})

		$('.etapa5').click(function(){
			
			if($(this).hasClass('ativo')){
				desativaetp5();
			}else{	

				desativaetp5();
				
				$(this).addClass('ativo');
				var audioPlayer = $(this).attr('href');

				musicas[10] = audioPlayer;

				$('.guide .etapa5 div.p'+audioPlayer).addClass('ativo');
				$('.visor .etapa5 li.p'+audioPlayer).addClass('ativo');
				$(".audio"+audioPlayer).jPlayer("play", 0);
			}
			
			

			return false;
		})


			$(".audio1").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct1/1.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct1/1.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio2").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct1/2.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct1/2.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio3").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct1/3.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct1/3.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio4").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct1/4.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct1/4.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});


			$(".audio5").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct2/1.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct2/1.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio6").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct2/2.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct2/2.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio7").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct2/3.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct2/3.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio8").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct2/4.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct2/4.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio9").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct3/1.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct3/1.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio10").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct3/2.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct3/2.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio11").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct3/3.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct3/3.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio12").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct3/4.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct3/4.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio13").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct4/1.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct4/1.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio14").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct4/2.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct4/2.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio15").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct4/3.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct4/3.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio16").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct4/4.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct4/4.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});


			$(".audio17").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct5/1.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct5/1.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio18").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct5/2.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct5/2.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio19").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct5/3.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct5/3.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});

			$(".audio20").jPlayer({
				ready: function (event) { 
					$(this).jPlayer("setMedia", { oga: "https://lit-castle-9930.herokuapp.com/sounds/pct5/4.ogg", mp3: "https://lit-castle-9930.herokuapp.com/sounds/pct5/4.mp3"  }
					)}, swfPath: "js", supplied: "oga, mp3", wmode: "window", loop: true, preload: 'auto'
			});


			
			$('body').queryLoader2( { onLoadComplete: ativa_anima() } );


			function login_start() {

				//alert('Você ainda não tem o aplicativo do Flavor DJ. Instale-o primeiro para compartilhar sua batida.');

			    FB.login(function(response) {
			        if (response.authResponse) {
			         //   ativa_facebook();
			        } else {

			        }
			    }, {scope: 'email, publish_stream'});
			}





			// Share 
			var cont = 0
			var i = 0;
			$('a.share').click(function(){

				cont = 0;

				for(i = 0; i<11; i++){

					if((musicas[i] == "0;") || (musicas[i] == 0)){
						cont++;
					}
				}


				if(cont == 11){
					alert('Você precisa selecionar pelo menos um ingrediente para sua batida.');
					
				}else{



					
					FB.getLoginStatus(function(response) {


						 // console.log(response);

						  if (response.status === 'connected') {

						   // NORMAL ACTION	
						   ativa_facebook();


						  } else if (response.status === 'not_authorized') {
						    
						  		login();
						  		window.location.reload();

						  } else {
							    login();
							    window.location.reload();
						 	}
						});


					
				}

				return false;
			});




			$('.votarBatida').click(function(){

					var batida = $(this).attr('href');

					FB.getLoginStatus(function(response) {



						  if (response.status === 'connected') {

						   // NORMAL ACTION	
						   computa_voto(batida);


						  } else if (response.status === 'not_authorized') {
						    
						    FB.login(function(response) {

							   if (response.authResponse) {
							    	
							     	// NORMAL ACTION	
						  		    computa_voto(batida);

							   } else {
							    // console.log('Sua batida não foi compartilhada.');
							   }
							 }, {scope: 'email, publish_stream'});

						  } else {
						    FB.login(function(response) {

							   if (response.authResponse) {
							    	
							     	// NORMAL ACTION	
						  			computa_voto(batida);

							   } else {
							     //console.log('Sua batida não foi compartilhada.');
							   }
							 }, {scope: 'email, publish_stream'});
						  }
					});


			});



		});
