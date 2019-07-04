/* global $ */
var signupForm = document.getElementById("signupForm");
var notsignupBlock = document.getElementById("notsignup");
var signupBlock = document.getElementById("signedup");
var BASE_URL = "https://api.susi.ai";
var passwordlim = document.getElementById("passwordlim");
var password = document.getElementById("password");

window.onload = () => {
	showsignupBlock(true);
};

let showsignupBlock = (show) => {
	if(show) {
		notsignupBlock.style.display="block";
		signupBlock.style.display="none";
	}
	else{
		signupBlock.style.display="block";
		notsignupBlock.style.display="none";
	}
};

password.addEventListener("keyup", ()=>{
    if(password.value.length<6 || password.value.length>64){
		passwordlim.removeAttribute("hidden");
	} else {
		passwordlim.setAttribute("hidden", "true");
    }
});

signupForm.addEventListener("submit", (event) => {
	event.preventDefault();
	var email=document.getElementById("email").value;
	if(!email){
		alert("Email field cannot be empty");
		return;
	}
	var password=document.getElementById("password").value;
	if(!password){
		alert("Password field cannot be empty");
		return;
	}
	var signupEndPoint = BASE_URL+"/aaa/signup.json?signup="+ encodeURIComponent(email)+"&password="+encodeURIComponent(password);
	if(document.getElementById("cpassword").value===document.getElementById("password").value) {
		$.ajax({
		url: signupEndPoint,
		dataType: "jsonp",
		jsonpCallback: "p",
		jsonp: "callback",
		crossDomain: true,
		success: (response) => {
			if(response.accepted){
				alert(response.message);
				showsignupBlock(false);
			}
		},
		error: (jqXHR) => {
			var msg = "";
			console.log(jqXHR);
			var jsonValue =  jqXHR.status;
			if (jsonValue === 404) {
				msg = "Signup Failed. Try Again";
			}
			alert(msg);
		}
	});
}
else { alert("Passwords do not match"); }
});
