<?php
    $a = fopen("books.json","r")or die("Unable to open file!");
    $content = fread($a,filesize("books.json"));
    $assocarray = json_decode($content, true);
    fclose($a);
    print_r($assocarray, true);
?>