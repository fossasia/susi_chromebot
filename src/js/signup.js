/* global $ */
var signupForm = document.getElementById("signupForm");
var notsignupBlock = document.getElementById("notsignup");
var signupBlock = document.getElementById("signedup");
var BASE_URL = "https://api.susi.ai";
var passwordlim = document.getElementById("passwordlim");
var password = document.getElementById("password");
var cpassword = document.getElementById("cpassword");
var toggle = document.getElementById("toggle");
var ctoggle = document.getElementById("ctoggle");

toggle.addEventListener("click", ()=>{
    toggle.classList.toggle("fa-eye");
    toggle.classList.toggle("fa-eye-slash");
    if (toggle.classList.contains("fa-eye")) {
        document.getElementById("password").type = "password";
    } else {
        document.getElementById("password").type = "text";
    }
});

ctoggle.addEventListener("click", ()=>{
    ctoggle.classList.toggle("fa-eye");
    ctoggle.classList.toggle("fa-eye-slash");
    if (ctoggle.classList.contains("fa-eye")) {
        document.getElementById("cpassword").type = "password";
    } else {
        document.getElementById("cpassword").type = "text";
    }
});


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
    if(password.value.length<6){
		passwordlim.removeAttribute("hidden");
		document.getElementById("signupbutton").setAttribute("disabled", "true");
    } else {
		passwordlim.setAttribute("hidden", "true");
		document.getElementById("signupbutton").removeAttribute("disabled");
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
