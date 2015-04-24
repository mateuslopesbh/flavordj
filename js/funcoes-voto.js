function computa_voto(batida){
	   
   FB.api('/me', function(response) {
  // console.log(response);


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

					alert('Voto computado com sucesso! Obrigado por participar.');
					
	       		}

			}, 'json');
   		}
    }, 'json'); 


	});
}


$(document).ready(function(){
	
	$('.votarBatida').click(function(){
			var batida = $(this).attr('href');
			alert('Aguarde...');

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
					   //  console.log('Sua batida não foi compartilhada.');
					   }
					 }, {scope: 'email, publish_stream'});
				  }
			});

		return false;
	});

});