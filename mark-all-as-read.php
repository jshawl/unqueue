<?php
  session_start();
  error_reporting(0);
  require('config.php');
  require('header.php');
  $url = 'https://getpocket.com/v3/send';
	$data = array(
		'consumer_key' => $consumer_key, 
		'access_token' => $_SESSION['access_token'],
		'actions' => $_SESSION['to_mark_as_read']
	);
	$options = array(
		'http' => array(
			'method'  => 'POST',
			'content' => http_build_query($data)
		)
	);
	$context  = stream_context_create($options);
	$result = file_get_contents($url, false, $context);
	$_SESSION['to_mark_as_read'] = '';
	echo "<span>You did it! All items marked as read</span><br>";
	echo "<a class='button' href='logout.php'>Logout</a>";
	require('footer.php');
?>
