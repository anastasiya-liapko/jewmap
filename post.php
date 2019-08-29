<?php
date_default_timezone_set('Europe/Moscow');
include 'config.php';
include 'functions.php';

switch(intval($_GET['request'])){
  case 1:
    $response = getOrgs($db);
  break;
}

die(json_encode($response));
