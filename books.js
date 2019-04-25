window.onload = function(e){ 
    var req = new Ajax.Request ("booklist.php",
        {
            method: "get",
            parameters: {categorySelected: false},
            onSuccess: fetchCategories,
        });
}

function fetchCategories(response) {
    if (response.responseXML) {
        responseXML = response.responseXML;
        var categories = responseXML.getElementsByTagName("categories")[0];
        var firstchild = categories.firstChild;

        var list_of_categories = []
        while (firstchild != null) {
            var name = firstchild.firstChild.firstChild.nodeValue;
            var id = firstchild.lastChild.firstChild.nodeValue;
            list_of_categories.push([name, id]);
            //move on to the next sibling to find other categories
            firstchild = firstchild.nextSibling;
        }  
    } else {
        console.log("Could not parse the response");
    }
}