//This JS file provides functioanality to index(Login) page

//User Authentication function 
function isAuthenticateUser(uname,pass)
{	
	if(localStorage.getItem('users_data')){
		let u = JSON.parse(localStorage.getItem('users_data'));

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


//get Data from user through UI
function getLoginCredentialsFromUser(){
    var uname = document.getElementById("username").value;
    var upass = document.getElementById("password").value;
    var login_msg = document.getElementById("login_msg");
	login_msg.style.color = 'red';
	if(uname.trim() !== "" && upass.trim() !== "")
	{		
		if(isAuthenticateUser(uname,upass))
		{	
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


document.addEventListener("DOMContentLoaded",()=>{

		var login_btn = document.getElementById("login-btn");
		if(login_btn){
			login_btn.addEventListener("click", getLoginCredentialsFromUser);
		}
});


	


