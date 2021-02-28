
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

let allUsersData = JSON.parse(localStorage.getItem('users_data'));
var index=-1;
		for(let i=0;i<allUsersData.length;i++)
		{		
			if(allUsersData[i].uname===LoggedInUser)
			{
			index=i;
			break;
			}
		}
		let u=allUsersData[index];
		console.log(u);



window.onload = loadData();
function loadData(){
	
	/*if(localStorage.getItem("LoggedInUser");)
	{*/
		

		console.log("in getdata");
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
		/*var ip=document.getElementsByClassName("ip-rw");
		for(var j=0;j<ip.length;j++){
		ip[j].readOnly=true;
		
		}*/
		var x = document.getElementsByTagName("input");
	    for ( var counter = 0; counter < x.length; counter++)
	    {
	       x[counter].disabled = "true";
	    }

	    document.getElementById('address').disabled=true;
		document.getElementById('m').disabled=true;
		document.getElementById('f').disabled=true;
		document.getElementById('o').disabled=true;
/*		updateUser(u,index,users_data);
*/		
	/*}*/
}
let	err=document.getElementById("error");
	err.innerHTML="";
	err.style.display="none";

let fname=document.getElementById("f-name");
fname.addEventListener('change',()=>{

	if(fname.value=="")
	{
		/*alert("Enter first name");*/
		err.innerHTML="Enter first name";
		err.style.display="block";
		fname.focus();

		return false;

	}else{
		let regex=/^[a-zA-Z]([a-zA-Z]){3,50}$/;
		if(regex.test(fname.value))
		{	
			err.innerHTML="Valid name";
			err.style.display="none";
		}else {
				err.innerHTML="Invalid first name! Should contain only Alphabates & length =4 or more";
				err.style.display="block";
				fname.focus();
				return false;
				}
	}
});

let lname=document.getElementById("l-name");
lname.addEventListener("change",()=>{
	if(lname.value=="")
	{
		/*alert("Enter first name");*/
		err.innerHTML="Enter last name";
		err.style.display="block";
		lname.focus();

		return false;

	}else{
		let regex=/^[a-zA-Z]([a-zA-Z]){3,50}$/;
		if(regex.test(lname.value))
		{	
			err.innerHTML="Valid name";
			err.style.display="none";
		}else {
				err.innerHTML="Invalid last name! Should contain only Alphabates & length =4 or more";
				err.style.display="block";
				lname.focus();
				return false;
				}
	}
});


var save=document.getElementById("save-btn");
save.addEventListener("click",()=>{
			
			fname=document.getElementById("f-name");
			lname=document.getElementById("l-name");
			address=document.getElementById("address");
			let gender="";
			if (document.getElementById('m').checked) {
 	 			gender = document.getElementById('m').value;
			}else if (document.getElementById('f').checked) {
 				gender = document.getElementById('f').value;
				}else if (document.getElementById('o').checked){
				gender = document.getElementById('o').value;
			}
			if(gender=="")
			{
				err.innerHTML="Select Gender";
				c
				return false;	
			}else{
				err.style.display="none";
			}
			
			if(u.fname==fname.value && u.lname==lname.value && u.address==address.value && u.gender==gender){
				alert("Nothing to update");
				return false;
			}
			u.fname=fname.value;
			u.lname=lname.value;
			u.address=address.value;
			u.gender=gender;
			allUsersData[index]=u;
			try{
				localStorage.setItem("users_data",JSON.stringify(allUsersData));
			}catch(error)
			{
				alert(error);
			}
			alert("Profile Updated Successfully");
			loadData();
			document.getElementById("edit-info-btn").style.display="block";
			document.getElementById("update-info-btn").style.display="none";
			
	});



document.addEventListener("DOMContentLoaded",()=>{

var edit=document.getElementById("edit-btn");
edit.onclick=()=>{
	var req=document.getElementsByClassName("requiredE");
	for(var i=0;i<req.length;i++){
		req[i].style.visibility="visible";
	}
	
	document.getElementById('address').disabled=false;	
	document.getElementById('m').disabled=false;
	document.getElementById('f').disabled=false;
	document.getElementById('o').disabled=false;
	document.getElementById("edit-info-btn").style.display="none";

	/*edit.style.display="none";*/
	document.getElementById("update-info-btn").style.display="block";
	document.getElementById("save-btn").disabled=false;
	document.getElementById("cancle-btn").disabled=false;
	var ip=document.getElementsByClassName("ip-rw");
		for(var j=0;j<ip.length;j++){
		ip[j].disabled=false;
		}
	let username=document.getElementById("username");
		username.readOnly=true;
		username.disabled=true;

}	

var cancle=document.getElementById("cancle-btn");
cancle.onclick=()=>{
	loadData();
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


