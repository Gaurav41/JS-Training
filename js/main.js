document.addEventListener("DOMContentLoaded",()=>{
		const img_input = document.getElementById("uimg");
		if(img_input){
			img_input.addEventListener("change",function(){
				const reader = new FileReader();
				reader.	readAsDataURL(this.files[0]);
				reader.addEventListener('load',()=>{
					user_img = reader.result;			
				});
			});
		}
		var login_btn = document.getElementById("login-btn");
		if(login_btn){
			login_btn.addEventListener("click", getLoginCredentialsFromUser);
		}
});

function getLoginCredentialsFromUser(){
    var uname = document.getElementById("username").value;
    var upass = document.getElementById("password").value;
    var login_msg = document.getElementById("login_msg");
	login_msg.style.color = 'red';
	if(uname.trim() !== "" && upass.trim() !== "")
	{		
		if(isAuthenticateUser(uname,upass))
		{	
			console.log("Login Successful");
			localStorage.setItem("LoggedInUser",uname);
			window.location.href = "./todolist.html";

		}else{
			login_msg.innerHTML="";
		}
	
	}else{		
		if(uname == "" || uname.trim() == ""){
			login_msg.innerHTML = "Enter User ID";
			document.getElementById("username").focus();	
		}else{
			login_msg.innerHTML = "Enter Password";
			document.getElementById("password").focus();
		}	
	}
}
	
function isAuthenticateUser(uname,pass)
{	
	if(localStorage.getItem('users_data')){
		let u = JSON.parse(localStorage.getItem('users_data'));
		console.log(u);
		for(let i = 0;i < u.length; i++)
		{
			if(u[i].uname === uname && u[i].password === pass)
			{
				return true;
			}
		}
		alert("Invalid credentials");
		return false;
	}else{
		alert(" OOPS... NO DATABASE EXIST !!! ( Register first )");
		return false;
	}
}


