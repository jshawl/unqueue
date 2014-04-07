<?php
  session_start();
  require('config.php');
  require('header.php');
  $url = 'https://getpocket.com/v3/get?consumer_key='.$consumer_key.'&access_token='.$_SESSION['access_token'].'&state=unread&detail_type=simple';
  $data = file_get_contents($url);
  $data = json_decode($data);
  $timestamp = time();
  //print_r($data->list);
  $count = count((array)$data->list);
  $to_mark_as_read = array();
  foreach($data->list as $item){
  	$single['action'] = 'archive';
  	$single['item_id'] = $item->item_id;
  	$single['time'] = $timestamp;
  	$to_mark_as_read[] = $single;
  }
  $_SESSION['to_mark_as_read'] = json_encode($to_mark_as_read);
  //var_dump($data->list);
  echo "<span>you currently have ".$count. " unread items.</span><br>" ;
  echo "<a class='button' href='mark-all-as-read.php'>Mark all as Read</a>";
  require('footer.php');
?>
