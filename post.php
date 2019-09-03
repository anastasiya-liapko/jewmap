<?php
date_default_timezone_set('Europe/Moscow');
include 'config.php';
include 'functions.php';

switch(intval($_GET['request'])){
  case 1:
    $response = getOrgs($db);
    break;
  case 2:
    $response = getDistricts($db);
    break;
  case 3:
    $response = getCities($db, $_GET['district']);
    break;
}

die(json_encode($response));
