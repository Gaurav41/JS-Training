let	usersData = JSON.parse(localStorage.getItem('users_data'));
var index = -1;
function getTodos(){
	for(var i = 0;i < usersData.length; i++)
	{		
		if(usersData[i].uname === localStorage.getItem('LoggedInUser'))
		{
			index = i;
			break;
		}
	}
	let todos = usersData[index].todos;
	return todos;
}

function showNotifications(notify)
{
	let table_body = document.getElementById("ntbody");
	let tname,date;
	if(table_body){
		let count = notify.length;
		table_body.innerHTML = "";		
		let new_row = "";
		for(var i = 0;i < notify.length; i++)
		{
			new_row += "<tr id=" + i + ">" +
			"<td>" + notify[i].title + "</td>" +
			"<td>" + notify[i].date + "</td>" +
			"<td>" + notify[i].status + "</td>" +
			"<td><a href='editTodo.html?tid=" + notify[i].id + "' target=_blank >View</a></td></tr>";
		}
		table_body.innerHTML += new_row;
	}
}
document.addEventListener('DOMContentLoaded',()=>{
	let notify = [];
	let date = (new Date()).toJSON().slice(0,10);
	let todo_array = getTodos();
	let i = 0;
	for(let j = 0; j < todo_array.length; j++){
		if(todo_array[j].remDate !== "NA"){
			if (todo_array[j].remDate === date && todo_array[j].status != "done" ) {
				notify[i] = todo_array[j];
				console.log("id:" + notify[i].id);
				i++;
			}
		} 
	}
	localStorage.setItem("noti_cnt",notify.length);	
	showNotifications(notify);

	let setNotificationCount = document.getElementById("noti");
	let showNotificationCount = localStorage.getItem("noti_cnt");
	if(setNotificationCount && showNotificationCount)
	{	
		if(showNotificationCount > 0)
			setTimeout(()=>{setNotificationCount.innerHTML = showNotificationCount},3000);
				
		else
			setNotificationCount.style.display = "none";
	}
});
