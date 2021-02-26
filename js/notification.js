/*
if(localStorage.getItem('LoggedInUser')=="")
{
	window.location.href="./index.html";
}*/
/*function logout(){
	if()
	{
		localStorage.setItem("LoggedInUser","");
		window.location.href="./index.html";
	}
	}

var logout_btn=document.getElementById("logout");
if(logout_btn){
	logout_btn.addEventListener("click", logout);

}*/

let	users_data = JSON.parse(localStorage.getItem('users_data'));

var index=-1;
	function getTodos(){
		
		for(var i=0;i<users_data.length;i++)
		{		
			if(users_data[i].uname===localStorage.getItem('LoggedInUser'))
			{
			index=i;
			break;
			}
		}
		let todos=users_data[index].todos;
	
	return todos;
	}

function showNotifications(notify)
{
	let table_body=document.getElementById("ntbody");
	let tname,date;
	if(table_body){
		let count=notify.length;
		/*alert("count:"+count);*/
		table_body.innerHTML="";
		console.log("show hi");
		
		let new_row="";
		for(var i=0;i<notify.length;i++)
		{
			console.log("showNotifications: "+notify[i].title);		
			new_row += "<tr id="+i+">"+
			"<td>" +notify[i].title+"</td>"+
			"<td>"+notify[i].date+"</td>"+
			"<td>"+notify[i].status +"</td>"+
			"<td><a href='editTodo.html?tid="+ notify[i].id+"' target=_blank >View</a></td></tr>";
		}
		table_body.innerHTML +=new_row;
	}
}
document.addEventListener('DOMContentLoaded',()=>{
	let notify=[];
	let date=(new Date()).toJSON().slice(0,10);
	let todo_array=getTodos();
	let i=0;
	for(j=0;j<todo_array.length;j++){
		/*console.log("rmdate:"+(t.remDate));*/
		if(todo_array[j].remDate !=="NA"){
			if (todo_array[j].remDate===date && todo_array[j].status!="done" ) {
				console.log("hi");
				notify[i]=todo_array[j];
				console.log("id:"+notify[i].id);
				i++;
			}
		}
	}
	localStorage.setItem("noti_cnt",notify.length);

	// for(n of notify)
	// 	console.log("n"+JSON.stringify(n));
	
	showNotifications(notify);


let set_cnt=document.getElementById("noti");
let ncnt=localStorage.getItem("noti_cnt");
if(set_cnt)
{	
	if(ncnt>0)
		setTimeout(()=>{set_cnt.innerHTML=ncnt},3000);
			
	else
		ncnt.style.display="none;"
}
});
