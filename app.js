var list = document.getElementById("list");


// data from firbase

firebase.database().ref('todos').on('child_added', function (data) {

    list.innerHTML +=
        `<li id="toList"><div class="li_maindiv" id="mainDiv" >
<div class="li_div1" id="li_div1" >
<input class="spanText" disabled="true" id="span_Text" value="${data.val().value}" >
</div>
<div class="li_div2" >
<button class="btn btn-success" onclick="updateItem(this)" style="display:none" id=${data.val().key}>UPDATE</button>
<button class="btn btn-primary" onclick="editItem(this)" id=${data.val().key}>EDIT</button>
<button class="btn btn-danger" id="${data.val().key}" onclick="delItem(this)">DELETE</button>
</div>
</div>
</li>`
})


function addTodo() {
    var todo_item = document.getElementById("todo_item");
    //adding data into firebase database

    var database = firebase.database().ref('todos')
    var key = database.push().key;
    var todo = {
        value: todo_item.value,
        key: key
    }

    database.child(key).set(todo);




    todo_item.value = ""
    swal({
        title: "Task Added!",
        text: "Your Task Successfully Added!",
        icon: "success",
        button: "Thanks",
    });
}


function delItem(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.parentNode.parentNode.remove()
    swal("Task Deleted!")
}

function delAll() {


    list.innerHTML = ""
    firebase.database().ref('/').remove()

    swal("You Deleted All Tasks!", "success")

}
function editItem(e) {
    console.log(e.parentNode.childNodes[3])
    e.parentNode.childNodes[1].style.display = "block"
    e.parentNode.childNodes[3].style.display = "none"
    val = document.getElementById("span_Text")
    val.disabled = false

}

updateItem = (e) => {
    val = document.getElementById("span_Text")
    val.disabled = true
    e.parentNode.childNodes[3].style.display = "block"
    e.parentNode.childNodes[1].style.display = "none"

    var editValue = val.value
    val.value = editValue

    var editTodo = {
        value: editValue,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)
    swal("Task Updated!")
}





