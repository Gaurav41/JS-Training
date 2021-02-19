
const LoggedInUser =localStorage.getItem("LoggedInUser");
if(LoggedInUser=="")
{
	window.location.href="./index.html";
}

function showRemDate(){
	let select=document.getElementById("reminder");
	let rmd=document.getElementById("reminder-date");
    let reminderStatus=select.options[select.selectedIndex].value;
    if(reminderStatus==="Yes"){
    	
    	rmd.style.display="block";
    }else{
    	rmd.style.display="none";
    }
	

}

function Todo(date,categories,status,reminder,reminderDate,isPublic){
	this.date=date;
	this.categories =categories;
	this.status=status;
	this.reminder=reminder;
	this.isPublic=isPublic;
}

document.getElementById("add").addEventListener("click",addTodo);
function addTodo(){
console.log("add todo");

	if(isValidate())
	{

	}
	/*window.location.href="./index.html";*/
	console.log("added");
}


function isValidate(){
	 let error=document.getElementById("error");
	console.log("in validate");
	let date=document.getElementById("date");
	if(date.value=="")
    {
    	error.innerHTML="Please select a date";
    	error.style.display="block";
    	date.focus();
    	return false;
    }

	let categories=[];
	let flag=false;
	let categories_ip = document.querySelectorAll(".cat");   
        for (let i = 0; i < categories_ip.length; i++) {   
            if(categories_ip[i].checked == true)
            {
            	categories.push(categories_ip[i].value);
            	flag=true;

            }
               
        }
        if(!flag){
    	error.innerHTML="Please select categories";
    	error.style.display="block";
    	return false;
    	
    }

    let status;
    if(document.getElementById("mrkD").checked){
    	status=document.getElementById("mrkD").value;
    }else if(document.getElementById("mrkO").checked){
    	status=document.getElementById("mrkO").value;
    }else if(document.getElementById("mrkN").checked){
    	status=document.getElementById("mrkN").value;
    }

    let select=document.getElementById("reminder");
    let reminderStatus=select.options[select.selectedIndex].value;
    console.log(reminderStatus);
    let remdate="NA";
    if(reminderStatus=="Yes")
    {

     remdate=document.getElementById("remD");
     
     if(remdate.value==""){
     	error.innerHTML="Please select a reminder date";
     	error.style.display="block";
    	remdate.focus();
     	return false;
     }
    }
    
   let isPublic;
   if(document.getElementById("isPublic").checked){
    	isPublic=document.getElementById("isPublic").value;
    }
   	else if(document.getElementById("isNotPublic").checked){
   		    	isPublic=document.getElementById("isNotPublic").value;
   	}else {
   		error.innerHTML="Please select isPublic option";
     	error.style.display="block";
     	return false;
   	}
   	

   	
		categories = JSON.stringify(categories);

		let new_todo=new Todo(date,categories,status,reminderStatus,remdate.value,isPublic);

		addNewTodo(JSON.stringify(new_todo));


		


    
    
}

function addNewTodo(new_todo){
		let users_data = JSON.parse(localStorage.getItem('users_data'));
		console.log("in addNewTodo");
		var index=-1;
		for(let i=0;i<users_data.length;i++)
		{		
			if(users_data[i].uname===LoggedInUser)
			{
			index=i;
			break;
			}
		}
		// let u=users_data[index];
		// u["todos"].push(new_todo);

		users_data[index].todos.push(new_todo);
		localStorage.setItem("users_data",JSON.stringify(users_data));



}

