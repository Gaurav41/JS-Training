	document.addEventListener("DOMContentLoaded",()=>{
		let url=window.location.href;
		url= new URL(url);
		let params=url.searchParams;
		let id=Number(params.get("id"));
		let data;
		if(id)
		{	
			let	users_data = JSON.parse(localStorage.getItem('users_data'));
			var index=-1;
		
		for(var i=0;i<users_data.length;i++)
		{		
			if(users_data[i].uname===localStorage.getItem('LoggedInUser'))
			{
			index=i;
			break;
			}
		}
		let todos=users_data[index].todos;
		for(let i=0;i<todos.length;i++){
			if(todos[i].id==id)
			{
				data=todos[i].attachment;
			}
		}
		if(data){
			/*alert(data);*/
			let type = data.search("data:application/pdf;");
			if(type>-1)
			{
				document.getElementById("upimg").style.display='none';
				shwpdf(data);	
			}else{
				document.getElementById("upimg").setAttribute("src",data);
			}
			
		}else{
			alert(" no any attachment");	
		}
		
		
		}

function shwpdf(data) {
	// body...
	let a =data.search(',');
	data =data.slice(a+1);
	/*alert(data);*/
	var bin = atob(data);
	
	var obj = document.createElement('object');
	obj.style.width = '100%';
	obj.style.height = '710px';
	obj.type = 'application/pdf';
	obj.data = 'data:application/pdf;base64,' + data;
	document.body.appendChild(obj);
}
});