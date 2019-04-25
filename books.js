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
        console.log(responseXML);  
    } else {
        console.log("Could not parse the response");
    }
}