
const LoggedInUser =localStorage.getItem("LoggedInUser");
if(LoggedInUser=="")
{
	window.location.href="./index.html";
}

function showActions(){
	
	let selected_todos = document.querySelectorAll(".action-box"); 
		let flag=false;
        for (let i = 0; i < selected_todos.length; i++) {   
            if(selected_todos[i].checked == true)
            {	
            	flag=true;
            }
        }
        if (flag) {
        	document.getElementById("mrkD-todo").disabled=false;
			document.getElementById("delete-todo").disabled=false;
			document.getElementById("edit-todo").disabled=false;

        }else{
        		document.getElementById("mrkD-todo").disabled=true;
				document.getElementById("delete-todo").disabled=true;
				document.getElementById("edit-todo").disabled=true;

        }

}
/*window.onload =showTodoList();*/
document.addEventListener('DOMContentLoaded',()=>{

	document.getElementById("mrkD-todo").disabled=true;
	document.getElementById("delete-todo").disabled=true;
	document.getElementById("edit-todo").disabled=true;

	
	let	users_data = JSON.parse(localStorage.getItem('users_data'));
	var index=-1;
	function getTodos(){
		
		for(var i=0;i<users_data.length;i++)
		{		
			if(users_data[i].uname===LoggedInUser)
			{
			index=i;
			break;
			}
		}
		let todos=users_data[index].todos;
	
	return todos;

};

	let todo_array= getTodos();
	todo_array=sortByTitle(todo_array);
	showTodoList(todo_array);


	document.getElementById("sort-filter").addEventListener("change",()=>{
		sortBy=document.getElementById("sort-filter").value;
		if(todo_array.length>1){
			if(sortBy=="Date"){
			todo_array=sortByDate(todo_array);
		}else if(sortBy=="Status")
		{	
			todo_array=sortByStatus(todo_array);
		}else{ 
			//sortBy=="Title"
			todo_array=sortByTitle(todo_array);

		}
		}

		showTodoList(todo_array);
	});


	document.getElementById("delete-todo").addEventListener("click",()=>{

		console.log("in deletd fun");
		let selected_todos = document.querySelectorAll(".action-box"); 
		let flag=false;
		let dindex=[];
        for (let i = 0; i < selected_todos.length; i++) {   
            if(selected_todos[i].checked == true)
            {	
            	flag=true;
            	/*console.log("i"+i);*/
            	/*todo_array.splice(i-1,1);*/
            	// dindex.push(i);
            	dindex.push(Number(selected_todos[i].name));
            }
        }
        	console.log("dindex : "+dindex);

         if(!flag)
            {
            	alert("Select at least One item to delete");
            	return false;
            }else{
            	if(confirm("are you sure to delete "+dindex.length+ "todos")){
            		for (var j =0; j < dindex.length; j++) {
          				for(var k=0;k<todo_array.length;k++)
          				{
          					if(dindex[j]===todo_array[k].id){
          						todo_array.splice(k,1);
          					}
          				}
             		}
             		 users_data[index].todos=todo_array;
        			localStorage.setItem("users_data",JSON.stringify(users_data));
            	}
            	
            }    
        
        showTodoList(todo_array);  
	});
	
	document.getElementById("edit-todo").addEventListener("click",()=>{	
		console.log("in edit todo fuunnn");
		let selected_todos = document.querySelectorAll(".action-box");   
		let cnt=0;
		let tid;
        for (let i = 0; i < selected_todos.length; i++) {   
            if(selected_todos[i].checked == true)
            {	
            	tid=Number(selected_todos[i].name);
            	cnt++;

            }   
        }
        if(cnt>1)
        {
        	alert("Select only One todo for edit" );
        	return false;
        }else if(cnt==0)
        {
        	alert("Select One todo for edit" );
        	return false;
        }else{
        	window.location.href="./edit-todo.html?tid="+tid;
        }

        users_data[index].todos=todo_array;
        localStorage.setItem("users_data",JSON.stringify(users_data));
        showTodoList(todo_array);  


	});

	document.getElementById("mrkD-todo").addEventListener("click",()=>{	
		let selected_todos = document.querySelectorAll(".action-box"); 
		let dindex=[];  
		let flag=false;
        for (let i = 0; i < selected_todos.length; i++) {   
            if(selected_todos[i].checked == true)
            {
            	flag=true;
            	dindex.push(Number(selected_todos[i].name));
            }   
        }
        if(!flag)
            {
            	alert("Select at least One item to Mark as compelete");
            	return false;
            }else{
            	if(confirm("are you sure to Mark done "+dindex.length+ "todos")){
            		for (var j =0; j < dindex.length; j++) {
          				for(var k=0;k<todo_array.length;k++)
          				{
          					if(dindex[j]===todo_array[k].id){
          						todo_array[k].status="done";
          					}
          				}
             		}
             		 users_data[index].todos=todo_array;
        			localStorage.setItem("users_data",JSON.stringify(users_data));
            	}
            	
            }    
        
        showTodoList(todo_array);  
        users_data[index].todos=todo_array;
        localStorage.setItem("users_data",JSON.stringify(users_data));
        showTodoList(todo_array);  

	});
	
	
function showTodoList(todo_array)
{	
	let tname,date,categories;
	let table_body=document.getElementById("table-body");
	table_body.innerHTML="";
	console.log(todo_array);
	let todo;
	let new_row="";
	for(var i=0;i<todo_array.length;i++)
	{
		todo=todo_array[i];
		new_row += "<tr id="+i+">"+

		"<td>" +todo.title+"</td>"+
		"<td>"+todo.date+"</td>"+
		"<td>"+todo.categories+"</td>"+
		"<td>"+todo.status +"</td>"+
		"<td>" +todo.reminder+"</td>"+
		"<td>" +todo.remDate+"</td>"+
		"<td>" +todo.isPublic+"</td>"+
		"<td> <input type='checkbox' name="+todo.id+" class='action-box' id=td"+i+" value="+i+" onchange=showActions();></td>"+
		"</tr>";
	}
	table_body.innerHTML +=new_row;
}

function sortByDate(todo_array){
	todo_array.sort(function(a,b){
		aDate=Date.parse(a.date);
		bDate=Date.parse(b.date);
	  return aDate- bDate;
});
	return todo_array;
}

function sortByTitle(todo_array){
	todo_array.sort(function(a,b){
		aTitle=a.title.toUpperCase();
		bTitle=b.title.toUpperCase();
		if(aTitle>bTitle)
			return 1;
		if (aTitle<bTitle) {
			return -1;
		}
		return 0;
});
		return todo_array;

}

function sortByStatus(todo_array){
	
	todo_array.sort(function(a,b){
		aStatus=a.status.toUpperCase();
		bStatus=b.status.toUpperCase();
		if(aStatus>bStatus)
			return 1;
		if (aStatus<bStatus) {
			return -1;
		}
		return 0;
});
	return todo_array;
}

function deleteTodo(indices,todo_array){
	for( var i=0;i<indices.length;i++)
	{
		delete todo_array[i]; 	
	}
	return todo_array;
}




});