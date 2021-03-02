//to check for logged in user . if not then redirect to login page
const LoggedInUser  =  localStorage.getItem("LoggedInUser");
if(LoggedInUser  ==  "")
{
    window.location.href  = "./index.html";
}
function logout(){
    if(confirm("Are you sure to logout"))
    {
        localStorage.setItem("LoggedInUser","");
        window.location.href  = "./index.html";
    }
}

//Logout
var logout_btn  =  document.getElementById("logout");
if(logout_btn){
    logout_btn.addEventListener("click", logout);

}

//get TODO id from URL
var  id  =  Number(new URL(window.location.href).searchParams.get("tid"));
var users_data ;
var todos;
var index;
var categories  =  [];

function getData(){
    
    users_data  =  JSON.parse(localStorage.getItem('users_data'));
    index  =  -1;
        for(var i  =  0;i < users_data.length; i++)
        {       
            if(users_data[i].uname  ===  LoggedInUser)
            {
            index  =  i;
            break;
            }
        }
        todos  =  users_data[index].todos;
}

function showRemDateInputField(){
        let select  =  document.getElementById("reminder");
        let rmd  =  document.getElementById("reminder-date");
        let reminderStatus  =  select.options[select.selectedIndex].value;
        if(reminderStatus  ===  "Yes"){           
            rmd.style.display  =  "block";
        }else{
            rmd.style.display  =  "none";
        }
    }

document.addEventListener("DOMContentLoaded",() =>{
    
    let Tdate  =  new Date;
    let dd  =  Tdate.getDate();
    let mm  =  (Tdate.getMonth() + 1);
    let yyyy  =  Tdate.getFullYear();
    if(dd < 10){
        dd  =  "0" + dd;
    }
    if(mm < 10){
        mm  =  "0" + mm;
    }

    let today  =  yyyy + '-' + mm + '-' + dd;

   document.getElementById("date").min  =  today;
   document.getElementById("remD").min = today;

    getData();
    let title,date,status,reminder,remDate,isPublic;
    let categories = [];
    for(var j = 0;j<todos.length;j++)
    {
        
    	if(todos[j].id == id)
    	{  

    		title = todos[j].title;
    		date = (todos[j].date);
    		categories = todos[j].categories;
    		status = todos[j].status;
    		reminder = todos[j].reminder;
    		remDate =  (todos[j].remDate);
    		isPublic = todos[j].isPublic;
    		break;
    	}	
    }

    let ftitle = document.getElementById("title");
    ftitle.value = title;

    let fdate = document.getElementById("date");
    fdate.value = date;

    for (var i  =  0; i<categories.length; i++) {	
    	name = categories[i];
    	document.getElementById(name).checked = true;

    }

    /*if(status == "Done"){
    	document.getElementById("mrkD").checked = true;
    }else if(status == "ongoing"){
    	document.getElementById("mrkO").checked = true;

    }else{
    	document.getElementById("mrkN").checked = true;
    }*/

    document.getElementById("status").value = status;
    if(status=="Overdue"){
        document.getElementById("status").style.color="red";
    }else if(status=="Done"){
        document.getElementById("status").style.color="Green";
    }else if(status=="Pending"){
        document.getElementById("status").style.color="Blue";
    }

    if(status =="Done"){
        document.getElementById("MarkDone").style.display="none";   
    }else{
        document.getElementById("MarkPending").style.display="none"; 
    }


    if(reminder == "No"){
    	document.getElementById("reminder").selectedIndex = 0;
    }else{
    	document.getElementById("reminder").selectedIndex = 1;
    	showRemDateInputField();
    }

    document.getElementById("remD").value = remDate;

    if(isPublic == "Yes"){
    	document.getElementById("isPublic").checked = true;

    }else{
    	document.getElementById("isNotPublic").checked = true;
    }

    document.getElementById("MarkAsDone").addEventListener("change",changeStatusOnPage);
    document.getElementById("MarkAsPending").addEventListener("change",changeStatusOnPage);
    function changeStatusOnPage(){
        if(document.getElementById("MarkAsPending").checked){
            document.getElementById("status").value="Pending";
            document.getElementById("status").style.color="blue";

        }else  if(document.getElementById("MarkAsDone").checked){
            document.getElementById("status").value="Done";
            document.getElementById("status").style.color="Green";

        }else{  
            document.getElementById("status").value = status;
            if(status=="Overdue"){
            document.getElementById("status").style.color="red";
            }else if(status=="Done"){
            document.getElementById("status").style.color="Green";
            }else if(status=="Pending"){
            document.getElementById("status").style.color="Blue";
            }


            }
    }
});

    
function Todo(id,title,date,categories,status,reminder,reminderDate,isPublic){
    this.id = id;
    this.title = title
	this.date = date;
	this.categories  = categories;
	this.status = status;
	this.reminder = reminder;
    this.remDate = reminderDate;
	this.isPublic = isPublic;
}

function validateTitle(){
    let title = document.getElementById("title");
    let regex = /^([a-zA-Z\_\-\.]+)([a-zA-Z0-9\s\_\-\.]+)$/;
    if(title.value == null||title.value.trim() == "")
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
    if(date.value == "" ||date.value == "Invalid Date")
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
    let categories_ip  =  document.querySelectorAll(".cat");   
        for (let i  =  0; i < categories_ip.length; i++) {   
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


function validateRmDate(){
    var rmdate = document.getElementById("remD");  
     if(rmdate.value == "" ||rmdate.value.trim() == ""){
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

document.getElementById("save").addEventListener("click",updateTodo);

function updateTodo(){
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
    var status = "";
    if(document.getElementById("MarkAsDone").checked){
            status="Done";
    }else if( document.getElementById("MarkAsPending").checked){
            status="Pending";
    }else{
        status= document.getElementById("status").value;
    }
        let users_data  =  JSON.parse(localStorage.getItem('users_data'));
        var index = -1;
        for(let i = 0;i < users_data.length; i++)
        {       
            if(users_data[i].uname === LoggedInUser)
            {
            index = i;
            break;
            }
        }

    if(validateTitle() && validateDate() && validateCategories() && validateIsPublic())
    {
        let categories = [];
        let categories_ip  =  document.querySelectorAll(".cat");   
        for (let i  =  0; i < categories_ip.length; i++) {   
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

		let new_todo = new Todo(id,title.value,date.value,categories,status,reminderStatus,remdate,isPublic);

		let users_data  =  JSON.parse(localStorage.getItem('users_data'));
			
    	for(let j = 0;j < todos.length; j++)
        {
    	if(todos[j].id === id)
    	   {
    		todos[j].title = title.value;
    		todos[j].date = date.value;
    		todos[j].categories = categories;
    		todos[j].status = status;
    		todos[j].reminder = reminderStatus;
    		todos[j].remDate = remdate;
    		todos[j].isPublic = isPublic;
    		break;
    	   }
        }
		users_data[index].todos = todos;

            try{
                localStorage.setItem("users_data",JSON.stringify(users_data));
                alert("Todo edited successfully");
                window.location.href = "./todoList.html";
            }catch(error){
                 alert("Something went wrong \n Error:"+error);
           }
    }else{
        //alert("Some thing went wrong");
        return false;
    }
}



document.getElementById("cancle").addEventListener("click",() =>{

window.location.href = "./todoList.html";
});

