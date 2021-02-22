
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

document.addEventListener('DOMContentLoaded',()=>{

function generateId(){
        let users_data = JSON.parse(localStorage.getItem('users_data'));
        
        var index=-1;
        for(let i=0;i<users_data.length;i++)
        {       
            if(users_data[i].uname===LoggedInUser)
            {
            index=i;
            break;
            }
        }
       // console.log("length:"+users_data[index].todos.length);
        let len=users_data[index].todos.length;
        if(len==0){
            return 0;
        }else{
            return users_data[index].todos[len-1].id;
        }
    
}

function Todo(title,date,categories,status,reminder,reminderDate,isPublic){
    /*let ab=id()+1;
    console.log(ab);*/
    this.id=generateId()+1;
    this.title=title
	this.date=date;
	this.categories =categories;
	this.status=status;
	this.reminder=reminder;
    this.remDate=reminderDate;
	this.isPublic=isPublic;
}

document.getElementById("add").addEventListener("click",addTodo);

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

		let new_todo=new Todo(title.value,date.value,categories,status,reminderStatus,remdate,isPublic);

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
		if(users_data[index].todos.push(new_todo)){
            try{
                localStorage.setItem("users_data",JSON.stringify(users_data));
                alert("New Todo added successfully");
                window.location.href="./todo-list.html";
            }catch(error){
                 alert("Something went wrong \n Error:"+error);
            }
            
        }
        
           
        
		
}

});


