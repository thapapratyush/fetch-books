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
        if ($format == "json") {
            $list_of_categories = array();
            while ($row = $all_categories->fetch_assoc()) {
                array_push($list_of_categories, $row[category]);
            }
            $response = array("categories" => $list_of_categories);
            echo json_encode($response);
        } else {
            $elem = new SimpleXMLElement("<?xml version='1.0'?>");
            while ($row = $categories->fetch_assoc()) {
                $running = $elem->addChild($row[category]);
                $running->addChild("name", $row[category]);
                $running->addChild("id", $row[category_id]);
            }
            echo $elem->asXML();
        }
    } else{
        $categoryChosen = $_GET["category"];
        
        //query the databse with the category that is chosen
        $sql = "select t.title_name, a.author, y.year, c.category from title t ";
        $sql .= "join category c on c.category_id = t.category_id and ";
        $sql .= "c.category_id=" . $categoryChosen . " ";
        $sql .= "join year y on y.title_id = t.title_id ";
        $sql .= "join author a on a.author_id = t.author_id;";
        $list_books = mysqli_query($dbase, $sql);
        
        if ($format == "json") {
            $list_books = array();
            while ($row = $list_books->fetch_assoc()) {
                array_push($list_books, $row[category]);
            }
            $response = array("books" => $list_books);
            echo json_encode($response);
        } else {
            $booksXML = new SimpleXMLElement("<?xml version='1.0'?><books></books>");   //create an XML element and populate it after querying the database
            while ($row = $list_books->fetch_assoc()) {
                $currBook = $booksXML->addChild("book");
                $currBook->addChild("author", $row[author]);
                $currBook->addChild("name", $row[category]);
                $currBook->addChild("year", $row[year]);
                $currBook->addChild("title", $row[title_name]);
            }
            Header('Content-type: text/xml');
        }
    }
}
    mysqli_close($dbase);
?>
