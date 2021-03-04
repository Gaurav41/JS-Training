const LoggedInUser  =  localStorage.getItem("LoggedInUser");
let	users_data  =  JSON.parse(localStorage.getItem('users_data'));

if(LoggedInUser == "")
{
	window.location.href = "./index.html";
}
function logout(){
	let result = confirm("Are you sure to logout");
	if(result)
	{
		localStorage.setItem("LoggedInUser","");
		window.location.href = "./index.html";
	}

}

var logout_btn = document.getElementById("logout");
if(logout_btn){
	logout_btn.addEventListener("click", logout);

}

//function to show todo action buttons
function showActionButtons(){
	
	let selected_todos  =  document.querySelectorAll(".action-box"); 
		let flag = false;
        for (let i  =  0; i < selected_todos.length; i++) {   
            if(selected_todos[i].checked  ==  true)
            {	
            	flag = true;
            }
        }
        if (flag) {
        	document.getElementById("action-btns").style.opacity = 1;
        	document.getElementById("mrkD-todo").disabled = false;
			document.getElementById("delete-todo").disabled = false;
			document.getElementById("edit-todo").disabled = false;
        }else{
        	document.getElementById("action-btns").style.opacity = 0.4;
        	document.getElementById("mrkD-todo").disabled = true;
			document.getElementById("delete-todo").disabled = true;
			document.getElementById("edit-todo").disabled = true;
        }
}

//function to show clock on page
function showDateTime(){
	var clock_time = document.getElementById("current-time");
	var curr_date = document.getElementById("current-date");
	var d = new Date();
	var date =  d.getDay()
	var month = d.getMonth();
	var months = ["Jan","Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Des"];
	month = months[month];
	curr_date.innerHTML = month+", "+date ;
	setInterval(() =>{
		var d = new Date();
		var hrs = d.getHours();
		clock_time.innerHTML = hrs+":"+d.getMinutes()+":"+d.getSeconds();
	},1000)
	let close_clck_btn = document.getElementById("close-clock");
	close_clck_btn.addEventListener("click",()=>{
			clearInterval();
			document.getElementById("clock").style.display = "none";
	});


}

//function to auto update status of todo as per due date and current date
function updateStatus(){
	let index;
	for( i = 0; i < users_data.length; i++)
		{		
			if(users_data[i].uname === LoggedInUser)
			{
				index=i;
				break;
			}
		}
	let todos = users_data[index].todos;
	let currentDate=new Date();
	let day=currentDate.getDay();
	if(day<10)
		day="0"+ day;
	let month=currentDate.getMonth()+1;
	if (month<10) {
		month="0"+ month;
	}
	let year=currentDate.getFullYear();
	currentDate=year+"-"+month+"-"+day;

	for (var i =0;i<todos.length;i++){
		if(new Date(todos[i].date) < new Date(currentDate) && todos[i].status!=="Done"){
			todos[i].status="Overdue";
		}
	}
	 users_data[index].todos=todos;
	 localStorage.setItem('users_data',JSON.stringify(users_data));
}

function showTodoList(todo_array){	
		if(todo_array.length == 0){
			var table = document.getElementById("list-table");
			table.style.display = "none";

			var div = document.getElementById("no-data-div");
			div.innerHTML  =  "You Don't have any Todo";		
			div.style.display="block";	
		return false;
		}

		let table_body = document.getElementById("table-body");
		table_body.innerHTML = "";
		let todo;
		let new_row = "";
		for(var i = 0;i < todo_array.length; i++)
		{
			todo = todo_array[i];
			var style;
			if (todo.status=="Overdue") {
				style="color:red"
			}else if (todo.status=="Done") {
				style="color:Green"
			}else if (todo.status=="Pending") {
				style=""
			}
			
			new_row  +=  "<tr style="+style+" id = "+i+">"+
			"<td>" +todo.title+"</td>"+
			"<td>"+todo.date+"</td>"+
			"<td>"+todo.categories+"</td>"+
			"<td>"+todo.status +"</td>"+
			"<td>" +todo.reminder+"</td>"+
			"<td>" +todo.remDate+"</td>"+
			"<td>" +todo.isPublic+"</td>"+
			"<td> <input type = 'checkbox' name = " + todo.id + " class = 'action-box' id = td" + i + " value = "+ i +" onchange = showActionButtons();></td>";
			if(todo.attachment !== ""){
				new_row  += "<td><a href = 'view.html?id="+todo.id+"' target = _blank >View</a></td>" + "</tr>";
			}else{
				new_row  += "<td></td></tr>";	
			}

		}
		table_body.innerHTML  += new_row;
		let tableRows = table_body.getElementsByTagName("tr");
		lastRow = tableRows[tableRows.length - 1];
		lastRow.style.borderBottom = "1px solid black";

}
/*window.onload  = showTodoList();*/
document.addEventListener('DOMContentLoaded',()=>{
	showDateTime();
	updateStatus();
	document.getElementById("action-btns").style.opacity = 0.4;
	document.getElementById("mrkD-todo").disabled = true;
	document.getElementById("delete-todo").disabled = true;
	document.getElementById("edit-todo").disabled = true;

	
	var index = -1;
	function getTodos(){
		for(var i = 0; i < users_data.length; i++)
		{		
			if(users_data[i].uname === LoggedInUser)
			{
			index = i;
			break;
			}
		}
		let todos = users_data[index].todos;
	return todos;
	}

	let todo_array =  getTodos();
	showTodoList(todo_array);

	// sortTable; 
	document.getElementById("sort-filter").addEventListener("change",()=>{
		sortBy = document.getElementById("sort-filter").value;
		if (sortBy){
			let col = -1;
			switch(sortBy){
				case "Title" :col = 0; 
							sortTableByName(col);
							document.getElementById("sort-filter").style.backgroundColor = "#adf7b1";
							document.getElementById("sortFilterClose").style.display = "inline";

							break;
				case "Date" : col = 1;
							sortTableByDate(col);
							document.getElementById("sort-filter").style.backgroundColor = "#adf7b1";
							document.getElementById("sortFilterClose").style.display = "inline";
							break;			
				default: showTodoList(todo_array);
							document.getElementById("sortFilterClose").style.display = "none";
						return ;
			}
		}

	});

	//delete selected Todos
	document.getElementById("delete-todo").addEventListener("click",()=>{
		let selected_todos  =  document.querySelectorAll(".action-box"); 
		let flag = false;
		let dindex = [];
        for (let i  =  0; i < selected_todos.length; i++) {   
            if(selected_todos[i].checked  ==  true)
            {	
            	flag = true;
            	dindex.push(Number(selected_todos[i].name));
            }
        }
        if(!flag)
            {
            	alert("Select at least One item to delete");
            	return false;
            }else{
            	if(confirm("are you sure to delete "+dindex.length+ " todo/s")){
            		for (var j  = 0; j < dindex.length; j++) {
          				for(var k = 0;k < todo_array.length; k++)
          				{
          					if(dindex[j] === todo_array[k].id){
          						todo_array.splice(k,1);
          					}
          				}
             		}
             		 users_data[index].todos = todo_array;
        			localStorage.setItem("users_data",JSON.stringify(users_data));
            	}	
            }    
        showTodoList(todo_array);  
	});
	/*function deleteTodo(indices,todo_array){
		for( var i = 0;i < indices.length; i++)
		{
			delete todo_array[i]; 	
		}
		return todo_array;
	}
*/
	
	//edit selected Todo
	document.getElementById("edit-todo").addEventListener("click",()=>{	
		let selected_todos  =  document.querySelectorAll(".action-box");   
		let cnt = 0;
		let tid;
        for (let i  =  0; i < selected_todos.length; i++) {   
            if(selected_todos[i].checked  ==  true)
            {	
            	tid = Number(selected_todos[i].name);
            	cnt++;

            }   
        }
        if(cnt>1)
        {
        	alert("Select only One todo for edit" );
        	return false;
        }else if(cnt == 0)
        {
        	alert("Select One todo for edit" );
        	return false;
        }else{
        	window.location.href = "./editTodo.html?tid="+tid;
        }
        users_data[index].todos = todo_array;
        localStorage.setItem("users_data",JSON.stringify(users_data));
        showTodoList(todo_array);  
	});

	// Mark as done selected Todos
	document.getElementById("mrkD-todo").addEventListener("click",()=>{	
		let selected_todos  =  document.querySelectorAll(".action-box"); 
		let dindex = [];  
		let flag = false;
        for (let i  =  0; i < selected_todos.length; i++) {   
            if(selected_todos[i].checked  ==  true)
            {
            	flag = true;
            	dindex.push(Number(selected_todos[i].name));
            }   
        }
        if(!flag)
            {
            	alert("Select at least One item to Mark as complete");
            	return false;
            }else{
            	if(confirm("Are you sure to Mark done " + dindex.length + " todo/s")){
            		for (var j  = 0; j < dindex.length; j++) {
          				for(var k = 0;k < todo_array.length; k++)
          				{
          					if(dindex[j] === todo_array[k].id){
          						if(todo_array[k].status === "Done"){
          							alert("Todo : " + todo_array[k].title + " is already Marked as Done");
          						}else
          						todo_array[k].status = "Done";
          					}
          				}
             		}
             		 users_data[index].todos = todo_array;
        			localStorage.setItem("users_data",JSON.stringify(users_data));
            	}
            	
            }    
        showTodoList(todo_array);  
        users_data[index].todos = todo_array;
        localStorage.setItem("users_data",JSON.stringify(users_data));
        showTodoList(todo_array);  
	});
	
	
	//Filter by name........................................................
	document.getElementById("nsearch").addEventListener("change",()=>{	
		  document.getElementById("nameSearchClose").style.display = "inline";
		  document.getElementById("nsearch").style.backgroundColor = "#adf7b1";
		  let input, filter_text, table_body, tr, td, txtValue;
		  let flag = false;
		  let err = document.getElementById("error");
		  error.style.display = "none";
		  input  =  document.getElementById("nsearch");
		  filter_text  =  input.value.toUpperCase();
		  table_body  =  document.getElementById("table-body");
		  tr  =  table_body.getElementsByTagName("tr");

		  for (let i  =  0; i < tr.length; i++) {
		    td  =  tr[i].getElementsByTagName("td")[0];
		    if (td) {
		      txtValue  =  td.textContent || td.innerText;
		      if (txtValue.toUpperCase().indexOf(filter_text) > -1) {
		      	flag = true;
		        tr[i].style.display  =  "";
		      } else {
		        tr[i].style.display  =  "none";
		      }
		    }
		  }
		  if(!flag){
		  	error.style.display = "block";
		  	 err.innerHTML = 'No data found';
		  }
	});
	
	//Filter by name close........................................................
	document.getElementById("nameSearchClose").addEventListener("click",()=>{
		document.getElementById("nameSearchClose").style.display = "none";
		document.getElementById("nsearch").style.backgroundColor = "";
		let err = document.getElementById("error");
		error.style.display = "none";
		document.getElementById("nsearch").value = "";
		showTodoList(todo_array);
	});

	//Filter by date........................................................
	document.getElementById("sdate").addEventListener("change",()=>{
		document.getElementById("edate").min = document.getElementById("sdate").value;
		 
	});

	document.getElementById("edate").addEventListener("change",()=>{	
		if(!document.getElementById("sdate").value){
	  	alert("select start date first");
	  	document.getElementById("edate").value = "";
	  	return false;
	  }
	  
	  document.getElementById("dateFilterClose").style.display ="inline";
	  document.getElementById("edate").style.backgroundColor = "#adf7b1";
	  document.getElementById("sdate").style.backgroundColor = "#adf7b1";
	  let sdate,edate, filter_text, table_body, tr, td, txtValue;
	  let flag = false;
	  let err = document.getElementById("error");
	  error.style.display = "none";
	  sdate  =  new Date (document.getElementById("sdate").value);
	  edate  =  new Date(document.getElementById("edate").value); 
	  table_body  =  document.getElementById("table-body");
	  tr  =  table_body.getElementsByTagName("tr");

	  for (let i  =  0; i < tr.length; i++) {
	    td  =  tr[i].getElementsByTagName("td")[1];
	    if (td) {
	      date  =  new Date(td.textContent);
	      if ( date >=  sdate && date <=  edate) {
	      	flag = true;
	        tr[i].style.display  =  "";
	      } else {
	        tr[i].style.display  =  "none";
	      }
	    }
	  }
	  if(!flag){
	  	error.style.display = "block";
	  	 err.innerHTML = 'No data found';
	  }

	});

	//Filter by date close........................................................
	document.getElementById("dateFilterClose").addEventListener("click",()=>{
		document.getElementById("dateFilterClose").style.display = "none";
		let err = document.getElementById("error");
		error.style.display = "none";
		document.getElementById("sdate").style.backgroundColor = "";
		document.getElementById("edate").style.backgroundColor = "";

		document.getElementById("sdate").value = "";
		document.getElementById("edate").value = "";
		showTodoList(todo_array);
	});

	//Filter by Categories........................................................	
	document.getElementById("catFilter").addEventListener("change",()=>{
		document.getElementById("categoryFilterClose").style.display = "inline";
		document.getElementById("catFilter").style.backgroundColor = "#adf7b1";
		let input, filter_text, table_body, tr, td, txtValue;
		let flag = false;
		let err = document.getElementById("error");
		error.style.display = "none";
		table_body  =  document.getElementById("table-body");
		tr  =  table_body.getElementsByTagName("tr");

		let cat = document.getElementById("catFilter").value;
	  	for (let i  =  0; i < tr.length; i++) {
		    td  =  tr[i].getElementsByTagName("td")[2];
		    if (td) {
		      txtValue  =  td.textContent || td.innerText;
		      if (txtValue.toUpperCase().indexOf(cat.toUpperCase()) > -1) {
		      	flag = true;
		        tr[i].style.display  =  "";
		      } else {
		        tr[i].style.display  =  "none";
		      }
		    }
	  	}
	  if(!flag){
	  	error.style.display = "block";
	  	 err.innerHTML = 'No data found';
	  }
	});

	//Filter by categories end........................................
	document.getElementById("categoryFilterClose").addEventListener("click",()=>{
		document.getElementById("categoryFilterClose").style.display = "none";
		let err = document.getElementById("error");
		error.style.display = "none";
		document.getElementById("catFilter").style.backgroundColor = "";

		document.getElementById("catFilter").value = "";
		showTodoList(todo_array);
	});

	
	//Filter by status........................................
	document.getElementById("statusFilter").addEventListener("change",()=>{
		document.getElementById("statusFilterClose").style.display = "inline";
		document.getElementById("statusFilter").style.backgroundColor = "#adf7b1";
		let input, filter_text, table_body, tr, td, txtValue;
		let flag = false;
		let err = document.getElementById("error");
		error.style.display = "none";
		table_body  =  document.getElementById("table-body");
		tr  =  table_body.getElementsByTagName("tr");

		let status = document.getElementById("statusFilter").value;
	  	for (let i  =  0; i < tr.length; i++) {
		    td  =  tr[i].getElementsByTagName("td")[3];
		    if (td) {
		      txtValue  =  td.textContent || td.innerText;
		      if (txtValue.toUpperCase()==(status.toUpperCase())) {
		      	flag = true;
		        tr[i].style.display  =  "";
		      } else {
		        tr[i].style.display  =  "none";
		      }
		    }
	  	}
	  if(!flag){
	  	error.style.display = "block";
	  	 err.innerHTML = 'No data found';
	  }
	});

	//Filter by status end........................................
	document.getElementById("statusFilterClose").addEventListener("click",()=>{
		document.getElementById("statusFilterClose").style.display = "none";
		let err = document.getElementById("error");
		error.style.display = "none";
		document.getElementById("statusFilter").style.backgroundColor = "";

		document.getElementById("statusFilter").value = "";
		showTodoList(todo_array);
	});

	//Sort table by todo title......................................................
	function sortTableByName(col) {

	  var table, rows, switching, i, x, y, shouldSwitch;
	  table  =  document.getElementById("table-body");
	  switching  =  true;
	
	  while (switching) {
	    switching  =  false;
	    rows  =  table.rows;
	    
	    for (i  =  0; i < (rows.length-1); i++) {
	      shouldSwitch  =  false;
	      
	      x  =  rows[i].getElementsByTagName("td")[col];
	      y  =  rows[i + 1].getElementsByTagName("td")[col];
	      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
	        shouldSwitch  =  true;
	        break;
	      }
	    }
	    if (shouldSwitch) {
	      /* If a switch has been marked, make the switch
	      and mark that a switch has been done: */
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching  =  true;
	    }
	  }
	}

	//Sort table by date title......................................................
	function sortTableByDate(col) {
		
	  var table, rows, switching, i, x, y, shouldSwitch;
	  table  =  document.getElementById("table-body");
	  switching  =  true;
	
	  while (switching) {
	    switching  =  false;
	    rows  =  table.rows;
	    
	    for (i  =  0; i < (rows.length-1); i++) {
	      shouldSwitch  =  false;
	      
	      x  =  rows[i].getElementsByTagName("td")[col];
	      y  =  rows[i + 1].getElementsByTagName("td")[col];
	      if (new Date(x.innerHTML.toLowerCase()) > new Date(y.innerHTML.toLowerCase())) {
	        shouldSwitch  =  true;
	        break;
	      }
	    }
	    if (shouldSwitch) {
	      /* If a switch has been marked, make the switch
	      and mark that a switch has been done: */
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching  =  true;
	    }
	  }
	}

	//sort filter close..........................................
	document.getElementById("sortFilterClose").addEventListener("click",()=>{
		document.getElementById("sortFilterClose").style.display = "none";
		let err = document.getElementById("error");
		error.style.display = "none";
		document.getElementById("sort-filter").style.backgroundColor = "";
		document.getElementById("sort-filter").value = "";
		showTodoList(todo_array);
	});


});