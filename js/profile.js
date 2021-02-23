
const LoggedInUser =localStorage.getItem("LoggedInUser");
if(LoggedInUser=="")
{
	window.location.href="./index.html";
}

var logout_btn=document.getElementById("logout");
if(logout_btn){

	logout_btn.addEventListener("click", function(){
	alert("logout")
	localStorage.setItem("LoggedInUser","");

});

}

window.onload = function(){
	var LoggedInUser=localStorage.getItem("LoggedInUser");
	if(LoggedInUser)
	{
		/*alert("Hi "+LoggedInUser);*/
		/*var u=getUserData(LoggedInUser);*/

		let users_data = JSON.parse(localStorage.getItem('users_data'));

		console.log("in getdata");
		var index=-1;
		for(let i=0;i<users_data.length;i++)
		{		
			if(users_data[i].uname===LoggedInUser)
			{
			index=i;
			break;
			}
		}
		let u=users_data[index];
		console.log(u);
		document.getElementById("f-name").value=u.fname;
		document.getElementById("l-name").value=u.lname;
		document.getElementById("username").value=u.uname;
		document.getElementById("username").readOnly=true;

		document.getElementById("address").value=u.address;
		if(u.gender=="Male")
		{
			document.getElementById("m").checked=true;
		}else if(u.gender=="Female")
			{
			document.getElementById("f").checked=true;
			}else{
				document.getElementById("o").checked=true;	
			}

		let user_img=localStorage.getItem(u.uname);
		if(user_img)
		{
			document.getElementById("user-img").setAttribute("src",user_img);
		}
		updateUser(u,index,users_data);
		
	}
}

function updateUser(u,index,users_data){
		var save=document.getElementById("save-btn");
		save.onclick=()=>{
			
			fname=document.getElementById("f-name");
			lname=document.getElementById("l-name");
			address=document.getElementById("address");
			var gender;
			if (document.getElementById('m').checked) {
 	 			gender = document.getElementById('m').value;
			}else if (document.getElementById('f').checked) {
 				gender = document.getElementById('f').value;
				}else{
				gender = document.getElementById('o').value;
			}

			if(update_form_validate(fname,lname,address))
			{
			u.fname=fname.value;
			u.lname=lname.value;
			u.address=address.value;
			u.gender=gender;
			users_data[index]=u;
			try{
				localStorage.setItem("users_data",JSON.stringify(users_data));
			}catch(error)
			{
				alert(error);
			}
			alert("Data Saved Successfully");
			document.getElementById("edit-info-btn").style.display="block";
			document.getElementById("update-info-btn").style.display="none";
			}
	}
}

function update_form_validate(fname,lname,address,gender){

	if(fname.value=="")
	{
		alert("Enter first name");
		fname.focus();
		return false;

	}
	if(lname.value=="")
	{
		alert("Enter last name");
		lname.focus();
		return false;

	}
	if(address.value=="")
	{
		alert("Enter address");
		address.focus();
		return false;

	}
	return true;
}

var edit=document.getElementById("edit-btn");
edit.onclick=()=>{
	document.getElementById("edit-info-btn").style.display="none";
	/*edit.style.display="none";*/
	document.getElementById("update-info-btn").style.display="block";
}	

var cancle=document.getElementById("cancle-btn");
cancle.onclick=()=>{
	document.getElementById("edit-info-btn").style.display="block";
	/*edit.style.display="block";*/
	document.getElementById("update-info-btn").style.display="none";
}	

