//check for database
//if no database then create new user_data in local strage
if(!(localStorage.getItem('users_data')))
		localStorage.setItem('users_data',JSON.stringify([]));

//constructure for creating new user object
function User(uname,fname,lname,gender,password,address){
	this.uname  =  uname;
	this.fname  =  fname;
	this.lname  =  lname;
	this.gender  =  gender;
	this.password  =  password;
	this.address  =  address;
	this.todos  =  [];
}

//check for availability of user name for new user.
function isUsernameAvailable(newUsername){
	let users_data  =  localStorage.getItem('users_data');
	if(users_data){
		users_data  =  JSON.parse(users_data);
	} 
	if(users_data){
		for(var i  =  0;i < users_data.length; i++){
		if(users_data[i].uname  ==  newUsername)	//username already exists.
			return false;
		}	
	}
	return true;
}

document.addEventListener("DOMContentLoaded",() =>{
	let isUnameValid  =  false;
	let isFnameValid  =  false;
	let isLnameValid  =  false;
	let isGenderValid  =  false;
	let isAddressValid  =  false;
	let isPassValid  =  false;
	let isRPassValid  =  false;
	let uname  =  document.getElementById("username");
	let fname  =  document.getElementById("f-name");
	let lname  =  document.getElementById("l-name");
	let address  =  document.getElementById("address");
	let password  =  document.getElementById("password");
	let retype_password  =  document.getElementById("retype-password");
	
	//email validation........................................................
	uname.addEventListener('change',validateUsername);
	function validateUsername(){
		var username = uname.value;
		var err = document.getElementById('uerr');
		err.innerHTML = "";
		if(username == null || username.trim() == ""){
			err.innerHTML = "Enter email address!";	
			err.style.color = "red";
			uname.style.border = "2px solid red";
			uname.focus();
			return false;
		}
		let regex = /^([0-9a-zA-Z\_\-\.]+)@([a-zA-Z\.]+)\.([a-zA-Z]+)$/;
		if(regex.test(username))
		{	
			if(isUsernameAvailable(username)){
				err.innerHTML = "";
				isUnameValid = true;
				uname.style.border = "2px solid green";
				return true;
			}else{
				err.innerHTML = "Username already Exits!";	
				err.style.color = "red";
				uname.style.border = "2px solid red";
				isUnameValid = false;
				return false;	
			}		
		}else{
			isUnameValid = false;
			err.innerHTML = "Invalid username !";	
			err.style.color = "red";
			uname.style.border = "2px solid red";
			return false;
		}
    }

    //first Name validation..................................................
	fname.addEventListener('change',validateFirstName);
	function validateFirstName(){
		var err = document.getElementById('ferr');
		err.innerHTML = "";
		if(fname.value == "" || fname.value == null){
			
			err.innerHTML = "Enter First Name";
			err.style.color = "red";
			fname.style.border = "2px solid red";	
			fname.focus();
			return false;
		}
		let regex = /^[a-zA-Z]([a-zA-Z]){3,50}$/;
		if(regex.test(fname.value))
		{	
			err.innerHTML = "";
			isFnameValid = true;	
			fname.style.border = "2px solid green";
			return true;		
		}else {
				isFnameValid = false;
				err.innerHTML = "Invalid first name! Should contain only Alphabates & length  = 4 or more";
				err.style.color = "red";
				fname.style.border = "2px solid red";	
				return true;
				}

	}

    //Last Name validation..................................................
	lname.addEventListener('change',validateLastName);
	function validateLastName(){
		var err = document.getElementById('lerr');

		if(lname.value == "" || lname.value == null){
			err.innerHTML = "Enter Last Name";
			err.style.color = "red";
			lname.style.border = "2px solid red";	
			lname.focus();
			return false;
		}
		let regex = /^[a-zA-Z]([a-zA-Z]){3,50}$/;
		if(regex.test(lname.value))
		{
			err.innerHTML = "";	
			isLnameValid = true;
			lname.style.border = "2px solid green";
			return true;
		}else {
				isLnameValid = false;
				err.innerHTML = "Invalid first name! Should contain only Alphabates & length  = 4 or more";
				err.style.color = "red";
				lname.style.border = "2px solid red";	
				return false;
				}

	}

	/*address.addEventListener('change',() = >{
		let add = address.value;
		if (add.trim() == "") {
			isAddressValid = true;
		}else{
			var err = document.getElementById('aerr');
			err.innerHTML = "";
			let regex = /([0-9a-zA-Z\_\-\.\,]+){3,50}$/;
			if(regex.test(add))
			{	
				
					err.innerHTML = "";
					isAddressValid = true;
					uname.style.border = "2px solid green";
						
				
			}else{
				isAddressValid = false;
				err.innerHTML = "Invalid username !";	
				err.style.color = "red";
				uname.style.border = "2px solid red";
			}

		}
	});*/

    //Password Name validation..................................................
	password.addEventListener('change',validatePassword)
	function validatePassword(){
		var err = document.getElementById('perr');
		err.style.color = "red";
		if(password.value == "" || password.value == null){
			err.innerHTML = "Enter Password";
			password.style.border = "2px solid red";
			return false;
		}
		let pass = password.value;
		if(pass.length < 8){
			err.innerHTML = "Password lenght must be greater than 8!";
			password.style.border = "2px solid red";
			isPassValid = false;
		}else if(pass.search(/[0-9]/) == -1){
			isPassValid = false;	
			err.innerHTML = "Password must contain at least one digit";
			retype_password.style.border = "2px solid red";
		}else if(pass.search(/[a-z]/) == -1){
			isPassValid = false;
			err.innerHTML = "Password must contain at least one small letter";
			password.style.border = "2px solid red";
		}else if(pass.search(/[A-Z]/) == -1){
			isPassValid = false;
			err.innerHTML = "Password must contain at least one uppercase letter";
			password.style.border = "2px solid red";
		}else if(pass.search(/[\!\@\#\$\%]/) == -1){
			isPassValid = false;
			err.innerHTML = "Must contain at least one special character(!,@,#,$,%)";
			password.style.border = "2px solid red";

		}
		else{
			err.style.color = "green";
			err.innerHTML = "valid";	
			isPassValid = true;
			password.style.border = "2px solid green";
			return true;
		}
		return false;

	}

    //Retyped Password validation..................................................
	retype_password.addEventListener('change',validateRetypedPassword);
	function validateRetypedPassword(){
		var err = document.getElementById('cperr');
		
		if(retype_password.value == "" || retype_password.value == null){
			alert("Retype Password");
			return false;
		}
		let pass = password.value;
		let cpass = retype_password.value;
		if(pass === cpass){
			isRPassValid = true;
			err.innerHTML = "Password matched!";
			err.style.color = "green";
			retype_password.style.border = "2px solid green";
			password.style.border = "2px solid green";
			return true;
		}
		else{
			isRPassValid = false;
			err.innerHTML = "Password not matched!";
			err.style.color = "red";
			retype_password.style.border = "2px solid red";
			password.style.border = "2px solid red";
			return false;
		}
	}

 	//get and store user profile image and store in DB as DataURL.............................
	let user_img;
	const img_input = document.getElementById("uimg");
		if(img_input){
			img_input.addEventListener("change",function(){
				const reader  =  new FileReader();
				reader.	readAsDataURL(this.files[0]);
				reader.addEventListener('load',() =>{
					user_img = reader.result;
				});
			});

		}else{
			user_img = null;
		}

	//submit registration form
	let submit = document.getElementById("register-btn");
	submit.addEventListener('click',(e) =>{
		e.preventDefault();
		if(!validateUsername()){
			alert("Enter valid username");
			return false;
		}
		if(!validateFirstName()){
			alert("Enter valid First Name");
			return false;
		}
		if(!validateLastName()){
			alert("Enter valid Last Name");
			return false;
		}
		let gender = "";
			if (document.getElementById('m').checked) {
		 	 gender  =  document.getElementById('m').value;
			}else if (document.getElementById('f').checked) {
		 	 gender  =  document.getElementById('f').value;
			}else if (document.getElementById('o').checked){
				 gender  =  document.getElementById('o').value;
			}
		if (gender == "") {
			alert("Please select gender");
			return false;
		}
		if(!validatePassword()){
			alert("Enter valid Password");
			return false;
		}
		if(!validateRetypedPassword()){
			alert("Password Unmattached");
			return false;
		}


		//Create new user Object..................................................
		let new_user = new User(uname.value,fname.value,lname.value,gender,password.value,address.value);
		try{
			let u  =  JSON.parse(localStorage.getItem('users_data'));
			u.push(new_user);
			if(user_img != null){
				localStorage.setItem(uname.value,user_img);
			}
			localStorage.setItem("users_data",JSON.stringify(u));
			alert("Registration Successful..Kindly login");
			window.location.href = "./index.html";
			}catch(error)
				{
					alert(error);
				}		
	});

	//Reset Form (remove error and border set during form validation)..................................................
	let reset = document.getElementById("cancle-btn");
	reset.addEventListener('click',(e) =>{
		
		let err_msg = document.getElementsByClassName("err-msg");
		for( er of err_msg)
		{
			er.innerHTML = "";
		}
		let ips = document.getElementsByTagName("input");
		for(  ip of ips)
		{
			ip.style.border = "none";

		}

	});

});