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

$dbase =  db_connect();

if($dbase){
    $categorySelected = $_GET["categorySelected"];
    if(!$categorySelected){         //fetch all categories if no category selected
        $sql = "select * from category;";
        $categories = mysqli_query($dbase, $sql);
        $elem = new SimpleXMLElement("<?xml version='1.0'?>");
        while ($row = $categories->fetch_assoc()) {
            $running = $elem->addChild($row[category]);
            $running->addChild("name", $row[category]);
            $running->addChild("id", $row[category_id]);
        }
        echo $elem->asXML();
    }
}
mysqli_close($dbase);
?>