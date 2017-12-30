/* global $ */
/* global chrome */
var loginForm = document.getElementById("login");
var logoutButton = document.getElementById("logout");
var loginButton = document.getElementById("loginbutton");
var noLoggedInBlock = document.getElementById("nologgedin");
var loggedInBlock = document.getElementById("loggedin");
var accessToken = "";
var time = "";
var BASE_URL = "https://api.susi.ai";

<<<<<<< HEAD

window.onload = function(){
	chrome.storage.sync.get("loggedUser",function(userDetails){
		if(userDetails.loggedUser.email){
			showLoggedInBlock(true);
		}
		else{
			showLoggedInBlock(false);
		}
	});

};

=======
>>>>>>> f145072... Add files via upload
function showLoggedInBlock(show){
	if(show){
		noLoggedInBlock.style.display="none";
		loggedInBlock.style.display="block";
		document.getElementById("passwordchange").value="";
		document.getElementById("passwordnewconfirm").value = "";
		document.getElementById("passwordnew").value = "";
	}
	else{
		noLoggedInBlock.style.display="block";
		loggedInBlock.style.display="none";
		document.getElementById("username").value = "";
		document.getElementById("password").value = "";
	}
}

loginForm.addEventListener("submit", function login(event){
	event.preventDefault();
	var email=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	if(!email){
		alert("Email field cannot be empty");
		return;
	}
	else if(!password){
		alert("Password field cannot be empty");
		return;
	}
	var loginEndPoint = BASE_URL+"/aaa/login.json?type=access-token&login="+ encodeURIComponent(email)+ "&password="+ encodeURIComponent(password);
	$.ajax({
		url: loginEndPoint,
		dataType: "jsonp",
		jsonpCallback: "p",
		jsonp: "callback",
		crossDomain: true,
		success: function (response) {
			if(response.accepted){
				accessToken = response.accessTken;
				chrome.storage.sync.set({
					loggedUser:{
						email:email,
						accessToken: accessToken
					}
				});

				time = response.validSeconds;
				loginButton.innerHTML="Login";
				alert(response.message);
				showLoggedInBlock(true);

			}
			else {
				alert("Login Failed. Try Again");
			}
		},
		error: function ( jqXHR) {
			loginButton.innerHTML="Login";
			var msg = "";
			var jsonValue =  jqXHR.status;
			if (jsonValue === 404) {
				msg = "Login Failed. Try Again";
			}
			else {
				msg = "Some error occurred. Try Again";
			}
			if (status === "timeout") {
				msg = "Please check your internet connection";
			}
			alert(msg);
		}
	});

});

logoutButton.addEventListener("click", function logout(e){
    e.preventDefault();
    window.location.reload();
	chrome.storage.sync.remove("messagesHistory");
	chrome.storage.sync.remove("loggedUser");
});

document.addEventListener("DOMContentLoaded", showLoggedInBlock(false));
