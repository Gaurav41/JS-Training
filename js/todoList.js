
const LoggedInUser =localStorage.getItem("LoggedInUser");
if(LoggedInUser=="")
{
	window.location.href="./index.html";
}
function logout(){
	
	if(confirm("Are you sure to logout"))
	{
		localStorage.setItem("LoggedInUser","");
		window.location.href="./index.html";
	}
	}

var logout_btn=document.getElementById("logout");
if(logout_btn){
	logout_btn.addEventListener("click", logout);

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
        	document.getElementById("action-btns").style.opacity=1;
        	document.getElementById("mrkD-todo").disabled=false;
			document.getElementById("delete-todo").disabled=false;
			document.getElementById("edit-todo").disabled=false;

        }else{
        	
        		document.getElementById("action-btns").style.opacity=0.4;
        		document.getElementById("mrkD-todo").disabled=true;
				document.getElementById("delete-todo").disabled=true;
				document.getElementById("edit-todo").disabled=true;

        }

}
/*window.onload =showTodoList();*/
document.addEventListener('DOMContentLoaded',()=>{
	
	
	document.getElementById("action-btns").style.opacity=0.4;
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
	showTodoList(todo_array);
	// sortTable();

	document.getElementById("sort-filter").addEventListener("change",()=>{
		sortBy=document.getElementById("sort-filter").value;
		if (sortBy){
			let col=-1;
			switch(sortBy){
				case "Title" :col=0; 
							sortTableByStrings(col);
							break;
				case "Status" :col=3; 
							sortTableByStrings(col);
							break;
				case "Date" : col=1;
							sortTableByDate(col);
							break;			
				default: return ;
			}
		}

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
        	window.location.href="./editTodo.html?tid="+tid;
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
            	if(confirm("Are you sure to Mark done "+dindex.length+" todo/s")){
            		for (var j =0; j < dindex.length; j++) {
          				for(var k=0;k<todo_array.length;k++)
          				{
          					if(dindex[j]===todo_array[k].id){
          						if(todo_array[k].status==="done"){
          							alert("Todo : "+todo_array[k].title+" is already Marked as Done");
          						}else
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
		if(todo_array.length==0){
		var table=document.getElementById("list-table");
		table.style.display="none";	
		var div = document.createElement("div");
		div.innerHTML = "You Don't have any Todo";
		div.style.backgroundColor="#adf7b1";
		div.style.margin="20px auto";
		div.style.textAlign="center";
		div.style.width="250px";
		div.style.height="100px";
		div.style.fontSize="25px";
		div.style.paddingTop="40px";

		document.body.appendChild(div);
		return false;
		}
		let tname,date,categories;
		let table_body=document.getElementById("table-body");
		table_body.innerHTML="";
		/*console.log(todo_array);*/
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
			"<td> <input type='checkbox' name="+todo.id+" class='action-box' id=td"+i+" value="+i+" onchange=showActions();></td>";
			if(todo.attachment!==""){
				new_row +="<td><a href='view.html?id="+ todo.id+"' target=_blank >View</a></td>"+"</tr>";
			}else{
				new_row +="<td></td></tr>";	
			}
			
		}
		table_body.innerHTML +=new_row;
	}
	
	function sortByDate(todo_array){
		/*todo_array.sort(function(a,b){
			aDate=Date.parse(a.date);
			bDate=Date.parse(b.date);
		  return aDate- bDate;
		});*/
		return todo_array;
	}

	function sortByTitle(todo_array){
		/*todo_array.sort(function(a,b){
			aTitle=a.title.toUpperCase();
			bTitle=b.title.toUpperCase();
			if(aTitle>bTitle)
				return 1;
			if (aTitle<bTitle) {
				return -1;
			}
			return 0;
		});*/
			return todo_array;

	}

	function sortByStatus(todo_array){
		
		/*todo_array.sort(function(a,b){
			aStatus=a.status.toUpperCase();
			bStatus=b.status.toUpperCase();
			if(aStatus>bStatus)
				return 1;
			if (aStatus<bStatus) {
				return -1;
			}
			return 0;
		});*/
		return todo_array;
	}

	function deleteTodo(indices,todo_array){
		for( var i=0;i<indices.length;i++)
		{
			delete todo_array[i]; 	
		}
		return todo_array;
	}



	document.getElementById("nsearch").addEventListener("change",()=>{	
		  document.getElementById("nfc").style.display="block";
		  document.getElementById("nsearch").style.backgroundColor="#adf7b1";
		  let input, filter_text, table_body, tr, td, txtValue;
		  let flag=false;
		  let err=document.getElementById("error");
		  error.style.display="none";
		  input = document.getElementById("nsearch");
		  filter_text = input.value.toUpperCase();
		  table_body = document.getElementById("table-body");
		  tr = table_body.getElementsByTagName("tr");

		  for (let i = 0; i < tr.length; i++) {
		    td = tr[i].getElementsByTagName("td")[0];
		    if (td) {
		      txtValue = td.textContent || td.innerText;
		      if (txtValue.toUpperCase().indexOf(filter_text) > -1) {
		      	flag=true;
		        tr[i].style.display = "";
		      } else {
		        tr[i].style.display = "none";
		      }
		    }
		  }
		  if(!flag){
		  	error.style.display="block";
		  	 err.innerHTML='No data found';
		  }
	});
	
	document.getElementById("nfc").addEventListener("click",()=>{
		document.getElementById("nfc").style.display="none";
		 document.getElementById("nsearch").style.backgroundColor="";
		let err=document.getElementById("error");
		error.style.display="none";
		document.getElementById("nsearch").value="";
		showTodoList(todo_array);
	});



	document.getElementById("sdate").addEventListener("change",()=>{
		document.getElementById("edate").min=document.getElementById("sdate").value;
		 
	});
	document.getElementById("edate").addEventListener("change",()=>{
		
		if(!document.getElementById("sdate").value){
	  	alert("select start date first");
	  	document.getElementById("edate").value="";
	  	return false;
	  }
	  
	  document.getElementById("dfc").style.display="block";
	  document.getElementById("edate").style.backgroundColor="#adf7b1";
	  document.getElementById("sdate").style.backgroundColor="#adf7b1";
	  let sdate,edate, filter_text, table_body, tr, td, txtValue;
	  let flag=false;
	  let err=document.getElementById("error");
	  error.style.display="none";

	  sdate = new Date (document.getElementById("sdate").value);
	  edate = new Date(document.getElementById("edate").value);
		/*  console.log(sdate+" :"+typeof(sdate));
		*/  

	  table_body = document.getElementById("table-body");
	  tr = table_body.getElementsByTagName("tr");

	  for (let i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[1];
	    if (td) {
	    console.log("********");
	    console.log("sdate:"+sdate);
	      date = new Date(td.textContent);
	      console.log("date:"+date);
	      console.log("edate:"+edate);
	       console.log("********");
	      if ( date >= sdate && date <= edate) {
	      	flag=true;
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    }
	  }
	  if(!flag){
	  	error.style.display="block";
	  	 err.innerHTML='No data found';
	  }

	});
	document.getElementById("dfc").addEventListener("click",()=>{
		document.getElementById("dfc").style.display="none";
		let err=document.getElementById("error");
		error.style.display="none";
		document.getElementById("sdate").style.backgroundColor="";
		document.getElementById("edate").style.backgroundColor="";

		document.getElementById("sdate").value="";
		document.getElementById("edate").value="";
		showTodoList(todo_array);
	});

		
	document.getElementById("catFilter").addEventListener("change",()=>{
		document.getElementById("cfc").style.display="block";
		document.getElementById("catFilter").style.backgroundColor="#adf7b1";
		let input, filter_text, table_body, tr, td, txtValue;
		let flag=false;
		let err=document.getElementById("error");
		error.style.display="none";
		table_body = document.getElementById("table-body");
		tr = table_body.getElementsByTagName("tr");

		let cat=document.getElementById("catFilter").value;
	  	for (let i = 0; i < tr.length; i++) {
		    td = tr[i].getElementsByTagName("td")[2];
		    if (td) {
		      txtValue = td.textContent || td.innerText;
		      if (txtValue.toUpperCase().indexOf(cat.toUpperCase()) > -1) {
		      	flag=true;
		        tr[i].style.display = "";
		      } else {
		        tr[i].style.display = "none";
		      }
		    }
	  	}
	  if(!flag){
	  	error.style.display="block";
	  	 err.innerHTML='No data found';
	  }
	});

	document.getElementById("cfc").addEventListener("click",()=>{
		document.getElementById("cfc").style.display="none";
		let err=document.getElementById("error");
		error.style.display="none";
		document.getElementById("catFilter").style.backgroundColor="";

		console.log("in cf")
		document.getElementById("catFilter").value="";
		/*for (let i = 0; i < tr.length; i++) {
			tr[i].style.display = "";
		}*/
		showTodoList(todo_array);
	});

	function sortTableByStrings(col) {

	  var table, rows, switching, i, x, y, shouldSwitch;
	  table = document.getElementById("table-body");
	  switching = true;
	
	  while (switching) {
	    switching = false;
	    rows = table.rows;
	    
	    for (i = 0; i < (rows.length-1); i++) {
	      shouldSwitch = false;
	      
	      x = rows[i].getElementsByTagName("td")[col];
	      y = rows[i + 1].getElementsByTagName("td")[col];
	      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
	        shouldSwitch = true;
	        break;
	      }
	    }
	    if (shouldSwitch) {
	      /* If a switch has been marked, make the switch
	      and mark that a switch has been done: */
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching = true;
	    }
	  }
	}

	function sortTableByDate(col) {
		
	  var table, rows, switching, i, x, y, shouldSwitch;
	  table = document.getElementById("table-body");
	  switching = true;
	
	  while (switching) {
	    switching = false;
	    rows = table.rows;
	    
	    for (i = 0; i < (rows.length-1); i++) {
	      shouldSwitch = false;
	      
	      x = rows[i].getElementsByTagName("td")[col];
	      y = rows[i + 1].getElementsByTagName("td")[col];
	      if (new Date(x.innerHTML.toLowerCase()) > new Date(y.innerHTML.toLowerCase())) {
	        shouldSwitch = true;
	        break;
	      }
	    }
	    if (shouldSwitch) {
	      /* If a switch has been marked, make the switch
	      and mark that a switch has been done: */
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching = true;
	    }
	  }
	}


});