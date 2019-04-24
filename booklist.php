<?php
define("DB_SERVER", "localhost");
define("DB_USER", "prat");
define("DB_PASS", "password");
define("DB_NAME", "listofbooks");

function db_connect() {
    $conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
    if(mysqli_connect_errno()) {
        $err = "Failed to connect to database";
        $err .= mysqli_connect_error();
        $err .= " (" . mysqli_connect_errno() . ")";
        exit($err);
    }
    return $conn;
}
?>