window.onload = function(e){ 
    var req = new Ajax.Request ("booklist.php",
        {
            method: "get",
            parameters: {categorySelected: false},
            onSuccess: fetchCategories,
        });
}

function fetchCategories(response) {
    var list_of_categories = []

    if (response.responseJSON) {
        list_of_categories = JSON.parse(response.responseJSON);
    } else if (response.responseXML) {
        responseXML = response.responseXML;
        var categories = responseXML.getElementsByTagName("categories")[0];
        var firstchild = categories.firstChild;

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

function onListBooksClick () {
    var radioBtns = document.getElementsByName('category');
    var categoryChosen = "";

    radioBtns.forEach(
        function(button) {
            if (button.checked) {
                categoryChosen = button.value;
            }
        }
    );

    if (categoryChosen) {
        new Ajax.Request ("booklist.php",
            {
                method: "get",
                parameters: {
                    categorySelected: true,
                    category: categoryChosen},
                onSuccess: printBooksfromCategory,
            });
    }
}

function printBooksfromCategory(response) {
    var list_of_books = [];
    if (response.responseJSON) {
        list_of_books = JSON.parse(response.responseJSON);
    }
    else if (response.responseXML) {
        returnXML = data.responseXML;
        var books = returnXML.getElementsByTagName("books")[0];
        var currBook = books.firstChild;
        while (currBook) {
            var bookAuthor = currBook.firstChild.firstChild.nodeValue;
            var bookCat = currBook.firstChild.nextSibling.firstChild.nodeValue;
            var bookYear = currBook.firstChild.nextSibling.
                nextSibling.firstChild.nodeValue;
            var bookName = currBook.lastChild.firstChild.nodeValue;
            list_of_books.push([bookAuthor, bookCat, bookYear, bookName]);
            currBook = currBook.nextSibling;
        }
    } 
    if (list_of_books) {
        var title = document.createElement("div");
        var text = document.createTextNode(list_of_books[0][1] + '":');
        title.appendChild(text);
        $("books").appendChild(title);
    }
    var listbooks = document.createElement("ul");

    for (var i=0; i < list_of_books.length; i++) {
        var li = document.createElement("li");
        var bookItem = list_of_books[i][3] + 
            ", by " + list_of_books[i][0] + 
            " (" + list_of_books[i][2] + ")";
        var row = document.createTextNode(bookItem);
        li.appendChild(row);
        listbooks.appendChild(li);
    }

    $("books").appendChild(listbooks);
}