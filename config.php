<?php

require('db.cfg.php');

$dblocation = DB_HOST;
$dbname = DB_NAME;
$dbuser = DB_USER;
$dbpasswd = DB_PASS;

$db = mysqli_connect($dblocation, $dbuser, $dbpasswd);

if(! $db) {
    $error = mysqli_connect_error();
    echo $error;
    exit;
}

mysqli_set_charset($db, "utf8");

if(! mysqli_select_db($db, $dbname)) {
    echo "Ошибка доступа к базе данных: {$dbname}";
    exit;
}