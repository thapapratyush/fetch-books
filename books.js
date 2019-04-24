window.onload = function(e){ 
    var req = new Ajax.Request ("booklist.php",
        {
            method: "get",
            parameters: {categorySelected: false},
            onSuccess: fetchCategories,
        });
}