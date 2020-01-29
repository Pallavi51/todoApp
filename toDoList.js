var todoApp = {
    id: 0 ,
    
    todos: [],

    add: function (obj) {

        this.todos.push(obj);

    },

    edit: function (id, obj) {
           
    },

    delete: function (id) {

        this.todos.splice(id , 1);

    }
}

var CHECK = "fa-check-circle";
var UNCHECK = "fa-circle-thin";
var list = document.getElementById("list");

function addItem(){

    var getTitle = document.querySelector(".add_title");
    var getDesc = document.querySelector(".add_description");

    if(getTitle !== "" && getDesc !== ""){
        var title = getTitle.value;
        var desc = getDesc.value;
        
        todoApp.add({
            title: title,
            description: desc,
            id : todoApp.id,
            done: false
        });

        displayItem(title , desc , todoApp.id , false);
        
    } 
    todoApp.id++;       
}

function displayItem(title , desc , id , done){

    var DONE = done ? CHECK : UNCHECK ;

    var text = `<li class ="item">
                    <p class="text1" id="${id}" job="title" contenteditable="true">${title}</p> 
                    <p class="text2" id="${id}" job="description" contenteditable="true">${desc}</p>
                    <i class=" fa ${DONE} co" id="${id}" job="complete"></i>     
                    <i class = "fa fa-trash-o delete" job="remove" id="${id}"></i>  
                    <i class="material-icons" job="edit" id="${id}">mode edit</i>  
                  </li>`; 
     
    var position="beforeend" ;

   
    list.insertAdjacentHTML(position ,text);

}

list.addEventListener("click" , function(event){

    var element = event.target ;
    var jobValue = event.target.attributes.job.value;
    if(jobValue == "complete"){
        doneTask(element);
    }else if(jobValue == "remove"){
        deleteTODO(element);
    }else if (jobValue == "edit"){
        editTodo(element);
    }
    //console.log(element.id);
    
    
   

});

function deleteTODO(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    todoApp.delete(element.id);
}

function doneTask(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);

    todoApp.todos[element.id].done = todoApp.todos[element.id].done ? false : true;
}

function editTodo(element){
    var editableEl = document.getElementById(element.id).contentEditable;
    var editableEl2 = document.getElementById(element.id).contentEditable;
    if(document.activeElement !== editableEl && document.activeElement !== editableEl2){
       var value1 = document.getElementById(element.id).textContent;
       var value2 = document.getElementById(element.id).textContent;
       todoApp.todos[element.id].title = todoApp.todos.fill(value1 ,todoApp.todos[element.id].title);

      
        }    
    }

    function searchResult(){
        var searchTitle = document.getElementById("search_ttl").value;
        var result = todoApp.todos.filter(cur => cur.title === searchTitle);
        displaySearch(result);
        console.log(result);
    }

    function displaySearch(arr){
        var DONE = arr[0].done ? CHECK : UNCHECK ;

        var text = `<li class ="item">
        <p class="text1" id="${arr[0].id}" job="title" contenteditable="true">${arr[0].title}</p> 
        <p class="text2" id="${arr[0].id}" job="description" contenteditable="true">${arr[0].description}</p>
        <i class=" fa ${DONE} co" id="${arr[0].id}" job="complete"></i>     
        <i class = "fa fa-trash-o delete" job="remove" id="${arr[0].id}"></i>  
        <i class="material-icons" job="edit" id="${arr[0].id}">mode edit</i>  
      </li>`; 

      var position="beforeend" ;

   
      list.insertAdjacentHTML(position ,text);
  
    }


function setEventListener(){
    document.getElementById("add_button").addEventListener("click", addItem);
    document.getElementById("search_button").addEventListener("click", searchResult);

   
}

setEventListener();