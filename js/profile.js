
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


window.onload = function(){
	
	/*if(localStorage.getItem("LoggedInUser");)
	{*/
		
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
		}else{
			
		}
		var ip=document.getElementsByClassName("ip-rw");
		for(var j=0;j<ip.length;j++){
		ip[j].readOnly=true;
		
		}
		updateUser(u,index,users_data);
		
	/*}*/
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
			alert("Profile Saved Successfully");
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

document.addEventListener("DOMContentLoaded",()=>{

var edit=document.getElementById("edit-btn");
edit.onclick=()=>{
	var req=document.getElementsByClassName("requiredE");
	for(var i=0;i<req.length;i++){
		req[i].style.visibility="visible";
	}
	var ip=document.getElementsByClassName("ip-rw");
		for(var j=0;j<ip.length;j++){
		ip[j].readOnly=false;
		
		}
	document.getElementById("edit-info-btn").style.display="none";
	/*edit.style.display="none";*/
	document.getElementById("update-info-btn").style.display="block";
}	

var cancle=document.getElementById("cancle-btn");
cancle.onclick=()=>{
	var ip=document.getElementsByClassName("ip-rw");
		for(var j=0;j<ip.length;j++){
		ip[j].readOnly=true;
		
		}
	var req=document.getElementsByClassName("requiredE");
	for(var i=0;i<req.length;i++){
		req[i].style.visibility="hidden";
	}
	document.getElementById("edit-info-btn").style.display="block";
	/*edit.style.display="block";*/
	document.getElementById("update-info-btn").style.display="none";
}	
});

let cp=document.getElementById("change-profile");

cp.addEventListener("click",()=>{

	let cps=document.getElementById("upload-img-container");
	cps.style.display="block";
	
	let user_img;
	let new_pic=document.getElementById("new-profile-img");
		if(new_pic){
			new_pic.addEventListener("change",function(){
				const reader = new FileReader();
				reader.	readAsDataURL(this.files[0]);
				reader.addEventListener('load',()=>{
					user_img=reader.result;
			
				});
			});
			let upld_btn =document.getElementById("upld_btn");
			upld_btn.addEventListener("click",()=>{
				localStorage.setItem(localStorage.getItem("LoggedInUser"),user_img);
				alert("Profile picture uploaded");
				cps.style.display="none";
				document.getElementById("user-img").setAttribute("src",user_img);

			});

		}

});


