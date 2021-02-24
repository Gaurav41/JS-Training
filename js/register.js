
function User(uname,fname,lname,gender,password,address){
	this.uname=uname;
	this.fname=fname;
	this.lname=lname;
	this.gender=gender;
	this.password=password;
	this.address=address;
	this.todos=[];
}




document.addEventListener("DOMContentLoaded",()=>{

	let isvalid =false;
	let uname=document.getElementById("username");
	let fname=document.getElementById("f-name");
	let lname=document.getElementById("l-name");
	let address=document.getElementById("address");
	let password=document.getElementById("password");
	let retype_password=document.getElementById("retype-password");
	


		/*document.body.addEventListener('change', function (e) {
            let target = e.target;
            
            if(target.id!=='m'||target.id!=='f'||target.id!=="o"){
            	var err= document.getElementById("gerr");
				err.innerHTML="<br>select gender!"
				err.style.color="red";
            }
        });
	*/
	/**email**/
	/*uname.addEventListener('change',()=>{
		var err=document.getElementById('uerr');
		let regex=/^([\_\-\.0-9a-zA-Z]+)@([\_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){0,50}$/;
		if(regex.test(uname.value))
		{
			err.innerHTML="";	
			
		}else{
			
			err.innerHTML="Invalid email !";	
		}
	});*/

	uname.addEventListener('change',()=>{
		var err=document.getElementById('uerr');
		let regex=/^[a-zA-Z]([0-9a-zA-Z]){0,10}$/;
		if(regex.test(uname.value))
		{
			err.innerHTML="";
			isvalid=true;
			uname.style.border="2px solid green";	
			
		}else{
			isvalid=false;
			err.innerHTML="Invalid username !";	
			err.style.color="red";
			uname.style.border="2px solid red";
		}
	});

	/*/^[0-9]{10})/*/
	fname.addEventListener('change',()=>{
		var err=document.getElementById('ferr');
		let regex=/^^[a-zA-Z]([a-zA-Z]){0,10}$/;
		if(regex.test(fname.value))
		{
			
			err.innerHTML="";
			isvalid=true;	
			fname.style.border="2px solid green";	
			
		}else{
			isvalid=false;
			err.innerHTML="Invalid first name!";
			err.style.color="red";
			fname.style.border="2px solid red";	
		}


	});
	lname.addEventListener('change',()=>{
		var err=document.getElementById('lerr');
		let regex=/^[a-zA-Z]([a-zA-Z]){0,10}$/;
		if(regex.test(lname.value))
		{
			err.innerHTML="";	
			isvalid=true;
			lname.style.border="2px solid green";
		}else{
			isvalid=false;
			err.innerHTML="Invalid last name!";
			err.style.color="red";
			lname.style.border="2px solid red";	
		}

	});

	address.addEventListener('change',()=>{
	});

	password.addEventListener('change',()=>{
		var err=document.getElementById('perr');
		err.style.color="red";
		let pass=password.value;
		if(pass.length<8){
			err.innerHTML="Password lenght must be greater than 8!";
			password.style.border="2px solid red";
			isvalid=false;
		}else if(pass.search(/[0-9]/)==-1){
			isvalid=false;	
			err.innerHTML="Password must contain at least one digit";
			retype_password.style.border="2px solid red";
		}else if(pass.search(/[a-z]/)==-1){
			isvalid=false;
			err.innerHTML="Password must contain at least one small letter";
			password.style.border="2px solid red";
		}else if(pass.search(/[A-Z]/)==-1){
			isvalid=false;
			err.innerHTML="Password must contain at least one uppercase letter";
			password.style.border="2px solid red";
		}else if(pass.search(/[\!\@\#\$\%]/)==-1){
			isvalid=false;
			err.innerHTML="Must contain at least one special character(!,@,#,$,%)";
			password.style.border="2px solid red";
		}
		else{
			err.style.color="green";
			err.innerHTML="valid";	
			isvalid=true;
			password.style.border="2px solid green";
		}

	});

	retype_password.addEventListener('change',()=>{
		var err=document.getElementById('cperr');

		let pass=password.value;
		let cpass=retype_password.value;
		if(pass===cpass){
			isvalid=true;
			err.innerHTML="Password matched!";
			err.style.color="green";
			retype_password.style.border="2px solid green";
			password.style.border="2px solid green";
		}
		else{
			isvalid=false;
			err.innerHTML="Password not matched!";
			err.style.color="red";
			retype_password.style.border="2px solid red";
			password.style.border="2px solid red";


		}

	});

	let user_img;
	const img_input=document.getElementById("uimg");
		if(img_input){
			img_input.addEventListener("change",function(){
				const reader = new FileReader();
				reader.	readAsDataURL(this.files[0]);
				reader.addEventListener('load',()=>{
			
					/*localStorage.setItem("uimg",reader.result);*/
					user_img=reader.result;
					/*alert(user_img);*/
			
				});
			});

		}else{
			user_img=null;
		}

	let submit=document.getElementById("register-btn");
	submit.addEventListener('click',(e)=>{
		e.preventDefault();
		if(isvalid){
			let gender;
	
			if (document.getElementById('m').checked) {
		 	 gender = document.getElementById('m').value;
			}else if (document.getElementById('f').checked) {
		 	 gender = document.getElementById('f').value;
			}else if (document.getElementById('o').checked){
				 gender = document.getElementById('o').value;
			}
			let new_user=new User(uname.value,fname.value,lname.value,gender,password.value,address.value);
			console.log(new_user);
			try{
				let u = JSON.parse(localStorage.getItem('users_data'));
				u.push(new_user);
				if(user_img!=null){
					localStorage.setItem(uname.value,user_img);
				}
				

				localStorage.setItem("users_data",JSON.stringify(u));
				alert("Registration Successful..Kindly login");
				window.location.href="./index.html";

				}catch(error)
				{
					console.log(error);
				}
		}else{
			alert('Please entre all mandatory fields');
		}
		

	});
	let reset=document.getElementById("cancle-btn");
	reset.addEventListener('click',(e)=>{
		
		let err_msg=document.getElementsByClassName("err-msg");
		for( er of err_msg)
		{
			er.innerHTML="";
		}
		let ips=document.getElementsByTagName("input");
		for(  ip of ips)
		{
			ip.style.border="none";

		}

	});

});