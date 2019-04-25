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

    populateCategoriestoUI(list_of_categories);
    handleSubmitBtn();
}

function populateCategoriestoUI(categories){
    // Create radio buttons for each element and populate
    var inputForm = document.createElement("form");
    inputForm.name = "chooseCategory";

    for (var i = 0; i < categories.length; i++) {
        var input = document.createElement("input");
        input.type = "radio";
        input.name = "category";
        input.value = categories[i][1];

        var label = document.createElement("label");
        var textNode = document.createTextNode(categories[i][0] + " ");
        label.appendChild(textNode);
        inputForm.appendChild(input);
        inputForm.appendChild(label);
    }

    $("categories").appendChild(inputForm);
}

function handleSubmitBtn(){
    var submitBtn = document.createElement("input");
    submitBtn.type = "button";
    submitBtn.value = "List Book Categories";
    //attach the onclick handler to handle later
    submitBtn.onclick = onListBooks;
    inputForm.appendChild(submitBtn);
}