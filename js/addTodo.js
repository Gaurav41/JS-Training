//to check for logged in user . if not then redirect to login page
const LoggedInUser  = localStorage.getItem("LoggedInUser");
if(LoggedInUser == "")
{
    window.location.href = "./index.html";
}
function logout(){
        if(confirm("Are you sure to logout"))
        {
            localStorage.setItem("LoggedInUser","");
            window.location.href = "./index.html";
        }
    }

//logout
var logout_btn = document.getElementById("logout");
if(logout_btn){
    logout_btn.addEventListener("click", logout);

}


function showRemDateInputField(){
        let select = document.getElementById("reminder");
        let rmd = document.getElementById("reminder-date");
        let reminderStatus = select.options[select.selectedIndex].value; 
        if(reminderStatus=="Yes")   
        rmd.style.display = "block";
        else
        rmd.style.display = "none";
           
        document.getElementById("remD").max = document.getElementById("date").value;

    }

document.addEventListener('DOMContentLoaded',() =>{
    let error = document.getElementById("error");
    let Tdate = new Date;
    let dd = Tdate.getDate();
    let mm = (Tdate.getMonth() + 1);
    let yyyy = Tdate.getFullYear();
    if(dd < 10){
        dd = "0" + dd;
    }
    if(mm < 10){
        mm = "0"+ mm;
    }

    let today =  yyyy+'-'+mm+'-'+dd;
    document.getElementById("date").min = today;
    document.getElementById("remD").min = today;

let attachment = "";
    const file = document.getElementById("attachment");
        if(file){
            file.addEventListener("change",function(){
                const reader = new FileReader();//
                reader. readAsDataURL(this.files[0]);//Starts reading the contents of the specified Blob, once finished, 
                                                    //the result attribute contains a data: URL representing the file's data.
                reader.addEventListener('load',() =>{
                    attachment = reader.result;
                    
                });
                reader.addEventListener('error',() =>{
                    alert("Opps attachment uploading failed!!!");
                    
                });
            });

        };

function generateId(){
        let users_data = JSON.parse(localStorage.getItem('users_data'));
        
        var index = -1;
        for(let i = 0;i<users_data.length;i++)
        {       
            if(users_data[i].uname ===  LoggedInUser)
            {
            index = i;
            break;
            }
        }
        let len = users_data[index].todos.length;
        if(len == 0){
                id = 0;
            return id;
        }else{
            id = users_data[index].todos[len - 1].id;
            return id + 1;
        }
    
}

function Todo(title,date,categories,status,reminder,reminderDate,isPublic,attachment){

    this.id = generateId() + 1;
    this.title = title
	this.date = date;
	this.categories = categories;
	this.status = status;
	this.reminder = reminder;
    this.remDate = reminderDate;
	this.isPublic = isPublic;
    this.attachment = attachment;
}


function validateTitle(){
    let title = document.getElementById("title");
    let regex = /^([a-zA-Z\_\-\.]+)([a-zA-Z0-9\s\_\-\.]+)$/;
    if(title.value == null || title.value.trim() == "")
    {
        error.innerHTML = "Please enter todo title";
        error.style.display = "block";
        title.focus();
        return false;
    }else if(!regex.test(title.value))
        {   
                       
            error.innerHTML = "Invalid title (title should start with alphabate) !"; 
            error.style.display = "block";
            return false;
        }else{
             error.style.display = "none";
             return true;

        }
    
}

function validateDate(){
    let date = document.getElementById("date");
    if(date.value == "" || date.value == "Invalid Date")
    {
        error.innerHTML = "Please select a date";
        error.style.display = "block";
        date.focus();
        return false;
    }else
        error.style.display = "none";
        return true;


}

function validateCategories(){
    
    let flag = false;
    let categories_ip = document.querySelectorAll(".cat");   
        for (let i = 0; i < categories_ip.length; i++) {   
            if(categories_ip[i].checked  ==  true)
            {
                flag = true; 
                break;           
            }
               
        }
        if(!flag){
            error.innerHTML = "Please select categories";
            error.style.display = "block";
            return false;
        }else error.style.display = "none";
        return true;


}
/*
function validateStatus(){
    if(document.getElementById("mrkD").checked||document.getElementById("mrkO").checked||document.getElementById("mrkN").checked){
        error.style.display = "none";
        return true;

    }else{
        error.innerHTML = "Please select status";
        error.style.display = "block";
        return false;
    }
}*/

function validateRmDate(){
    var rmdate = document.getElementById("remD");  
     if(rmdate.value == "" || rmdate.value.trim() == ""){
        error.innerHTML = "Please select a reminder date";
        error.style.display = "block";
        rmdate.focus();
        return false;
     }
     else{
         error.style.display = "none";
        return true;

     }

} 
function validateIsPublic(){
    let isPublic;
   if(document.getElementById("isPublic").checked){
        isPublic = document.getElementById("isPublic").value;
        error.style.display = "none";

    }
    else if(document.getElementById("isNotPublic").checked){
            isPublic = document.getElementById("isNotPublic").value;
            error.style.display = "none";

    }else {
        error.innerHTML = "Please select isPublic option";
        error.style.display = "block";
        return false;
    }
    return true;


} 

document.getElementById("add").addEventListener("click",addTodo);

function addTodo(){

	let error = document.getElementById("error");
    let select = document.getElementById("reminder");
    let reminderStatus = select.options[select.selectedIndex].value;
    let remdate = document.getElementById("remD");  

    if(reminderStatus == "Yes")
    {   
        if (validateRmDate()) {
            remdate = remdate.value;
        }else{
            return false;
        }
        
    }else{
        remdate = "NA";
    }
    
    /*var status = "";
    if(document.getElementById("mrkD").checked){
        status = document.getElementById("mrkD").value;
        error.style.display = "none";
    }else if(document.getElementById("mrkO").checked){
        status = document.getElementById("mrkO").value;
        error.style.display = "none";
    }else if(document.getElementById("mrkN").checked){
        status = document.getElementById("mrkN").value;
        error.style.display = "none";
    }*/

    var status = "Pending";

	let users_data = JSON.parse(localStorage.getItem('users_data'));
	var index = -1;
		for(let i = 0;i < users_data.length;i++)
		{		
			if(users_data[i].uname ===  LoggedInUser)
			{
			index = i;
			break;
			}
		}
		
    if(validateTitle()&&validateDate() && validateCategories() && validateIsPublic())
    {
        let categories = [];
        let categories_ip = document.querySelectorAll(".cat");   
        for (let i = 0; i < categories_ip.length; i++) {   
            if(categories_ip[i].checked  ==  true)
            {
                categories.push(categories_ip[i].value);
                           
            }
        }
        
        if(document.getElementById("isPublic").checked){
            isPublic = document.getElementById("isPublic").value;
        }
        else {
                isPublic = document.getElementById("isNotPublic").value;
              }
        let new_todo = new Todo(title.value,date.value,categories,status,reminderStatus,remdate,isPublic,attachment);


        if(users_data[index].todos.push(new_todo)){
            try{
                localStorage.setItem("users_data",JSON.stringify(users_data));
                if(confirm("New Todo added successfully Do you want to add more?"))
                {
                     let formElements = document.querySelector('form').elements;  
                     for(let i = 0; i < formElements.length; i++)
                     {
                       if(formElements[i].type  ==  "text" || formElements[i].type  ==  "date" ){
                         formElements[i].value = "";
                       }
                        if(formElements[i].checked){
                            formElements[i].checked = false;
                        }
                        if(formElements[i].type  ==  "select-one"){
                            formElements[i].selectedIndex = 0;
                        }
                         if(formElements[i].type  ==  "file"){
                            formElements[i].value = "";
                        }

                     }
                    let rmd = document.getElementById("reminder-date");
                    rmd.style.display = "none";
          
                }else{
                    window.location.href = "./todoList.html";   
                }
            }catch(error){
                 alert("Something went wrong \n Error:"+ error);
            }
        }
    }else{
        //alert("Some thing went wrong");
        return false;
    }
		       
		
}

});


