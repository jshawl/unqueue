<?php
  session_start();
  session_destroy();
  require('header.php');
  	echo '<span>You have logged out successfully.</span>';
  	echo '<a href="./" class="button">Start Over</a>';
  require('footer.php');
?>