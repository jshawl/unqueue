<?php
    session_start();
    error_reporting(0);
	require_once('config.php');
	$request_token = $_GET['request_token'];
	$url = 'https://getpocket.com/v3/oauth/authorize';
	$data = array(
		'consumer_key' => $consumer_key, 
		'code' => $request_token
	);
	$options = array(
		'http' => array(
			'method'  => 'POST',
			'content' => http_build_query($data)
		)
	);
	$context  = stream_context_create($options);
	$result = file_get_contents($url, false, $context);
	// our $result contains our access token

	$access_token = explode('&',$result);
	if($access_token[0]!=''){
		$access_token = $access_token[0];
		$access_token = explode('=',$access_token);
		$access_token = $access_token[1];
		echo $access_token;
		$_SESSION['access_token'] = $access_token;
		header('Location: confirm.php');
	} else{
		echo "Something went wrong. :( ";
	}

?>