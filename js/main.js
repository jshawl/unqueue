;(function(){
	var settings = {
		consumer_key: '',
		redirect_uri: ''
	};
	var bindUI = {
		login: function(){
			$('.js-login').bind('click', function(event){
				event.preventDefault();
				oAuth.get_request_token();
			});
		}
	};
	var oAuth = {
		get_request_token: function(){
			// make a post request
			
			$.post('https://getpocket.com/v3/oauth/request?consumer_key='+settings.consumer_key+'&redirect_uri='+settings.redirect_uri, function(data) {
  				console.log(data);
			});
		}
	}
	$(function(){
		bindUI.login();
	});
})(jQuery);
