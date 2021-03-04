const LoggedInUser = localStorage.getItem("LoggedInUser");
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

var logout_btn = document.getElementById("logout");
if(logout_btn){
	logout_btn.addEventListener("click", logout);

}

//showpdf on page
function showpdf(data) {
		let a =data.search(',');
		data =data.slice(a+1);
		var bin = atob(data);
		var obj = document.createElement('object');
		obj.style.width = '100%';
		obj.style.height = '710px';
		obj.type = 'application/pdf';
		obj.data = 'data:application/pdf;base64,' + data;
		document.body.appendChild(obj);
}

document.addEventListener("DOMContentLoaded",()=>{
		let url = window.location.href;
		url = new URL(url);
		let params = url.searchParams;
		let id = Number(params.get("id"));
		let data;
		if(id>-1)
		{	
			let	users_data = JSON.parse(localStorage.getItem('users_data'));
			var index = -1 ;
		
		for(var i = 0;i < users_data.length; i++)
		{		
			if(users_data[i].uname === localStorage.getItem('LoggedInUser'))
			{
			index = i;
			break;
			}
		}
		let todos = users_data[index].todos;
		for(let i = 0;i < todos.length; i++){
			if(todos[i].id == id)
			{
				data = todos[i].attachment;
			}
		}
		if(data){
			let type = data.search("data:application/pdf;");
			if(type >-1 )
			{
				document.getElementById("upimg").style.display = 'none';
				showpdf(data);	
			}else{
				document.getElementById("upimg").setAttribute("src",data);
			}
			
		}else{
			alert(" no any attachment");	
		}
		
		
		}

	
});