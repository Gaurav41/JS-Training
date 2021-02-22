let id=Number(new URL(window.location.href).searchParams.get("tid"));
LoggedInUser=localStorage.getItem('LoggedInUser');
let	users_data = JSON.parse(localStorage.getItem('users_data'));
	var index=-1;
		for(var i=0;i<users_data.length;i++)
		{		
			if(users_data[i].uname===LoggedInUser)
			{
			index=i;
			break;
			}
		}
		let todos=users_data[index].todos;

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


document.addEventListener("DOMContentLoaded",()=>{


/*console.log(todos[0]);
console.log(id);
console.log(todos[0].id===id);*/

let title,date,categories,status,reminder,remDate,isPublic;
for(var j=0;j<todos.length;j++)
{
	if(todos[j].id===id)
	{
		title=todos[j].title;
		date=(todos[j].date);
		categories=todos[j].categories;
		status=todos[j].status;
		reminder=todos[j].reminder;
		remDate= (todos[j].remDate);
		isPublic=todos[j].isPublic;
		console.log(date);
		break;
	}	
}

let ftitle=document.getElementById("title");
ftitle.value=title;
/*let categories_field=document.querySelectoreAll(".cat");
*/
console.log();
let fdate=document.getElementById("date");
fdate.value=date;

for (var i = 0; i<categories.length; i++) {	
	name=categories[i];
	document.getElementById(name).checked=true;

}

if(status=="done"){
	document.getElementById("mrkD").checked=true;
}else if(status=="ongoing"){
	document.getElementById("mrkO").checked=true;

}else{
	document.getElementById("mrkN").checked=true;
}


if(reminder=="No"){
	document.getElementById("reminder").selectedIndex=0;
}else{
	document.getElementById("reminder").selectedIndex=1;
	showRemDate();
}

document.getElementById("remD").value=remDate;

if(isPublic=="Yes"){
	document.getElementById("isPublic").checked=true;

}else{
	document.getElementById("isNotPublic").checked=true;
}



});


	function Todo(id,title,date,categories,status,reminder,reminderDate,isPublic){
    this.id=id;
    this.title=title
	this.date=date;
	this.categories =categories;
	this.status=status;
	this.reminder=reminder;
    this.remDate=reminderDate;
	this.isPublic=isPublic;
}

document.getElementById("save").addEventListener("click",addTodo);

function addTodo(){

    console.log("add todo");
	 let error=document.getElementById("error");
	console.log("in validate");
    let title=document.getElementById("title");
    if(title.value==="")
    {
        error.innerHTML="Please enter todo title";
        error.style.display="block";
        date.focus();
        return false;
    }
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
    let remdate;
    if(reminderStatus=="Yes")
    {
     remdate=document.getElementById("remD");
     
     if(remdate.value==""){
     	error.innerHTML="Please select a reminder date";
     	error.style.display="block";
    	remdate.focus();
     	return false;
     }
     else{
        remdate=remdate.value;
     }
    }else{
        remdate="NA";
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

		let new_todo=new Todo(id,title.value,date.value,categories,status,reminderStatus,remdate,isPublic);

		let users_data = JSON.parse(localStorage.getItem('users_data'));
		console.log("in update todo");
			
	for(var j=0;j<todos.length;j++)
{
	if(todos[j].id===id)
	{
		todos[j].title=title.value;
		todos[j].date=date.value;
		todos[j].categories=categories;
		todos[j].status=status;
		todos[j].reminder=reminderStatus;
		todos[j].remDate=remdate;
		todos[j].isPublic=isPublic;
		break;
	}
}
		users_data[index].todos=todos;

            try{
                localStorage.setItem("users_data",JSON.stringify(users_data));
                alert("New Todo added successfully");
                window.location.href="./todo-list.html";
            }catch(error){
                 alert("Something went wrong \n Error:"+error);
            }
}



document.getElementById("cancle").addEventListener("click",()=>{

window.location.href="./todo-list.html";
});