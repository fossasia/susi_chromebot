/* global $ */
/* global chrome */
var loginForm = document.getElementById("login");
var logoutButton = document.getElementById("logout");
var loginButton = document.getElementById("loginbutton");
var noLoggedInBlock = document.getElementById("nologgedin");
var loggedInBlock = document.getElementById("loggedin");
var statusBlock=document.getElementById("error");
var accessToken = "";
var time = "";
var BASE_URL = "https://api.susi.ai";
var checkLogin;
var defaultThemeValue = "";
var password = document.getElementById("password");
var pass = document.getElementById("pass");
var cPass = document.getElementById("cPass");
var cemail = document.getElementById("cemail");
var cpassword = document.getElementById("cpassword");
var passwordlim = document.getElementById("passwordlim");
var newPassword = document.getElementById("newPassword");
var toggle = document.getElementById("toggle");
var settings=document.getElementById("settings");

chrome.storage.sync.get("darktheme", (obj) => {
    if (obj.darktheme === true) {
        defaultThemeValue = "dark";
    } else {
        defaultThemeValue = "light";
    }
});

toggle.addEventListener("click", ()=>{
    toggle.classList.toggle("fa-eye");
    toggle.classList.toggle("fa-eye-slash");
    if (toggle.classList.contains("fa-eye-slash")) {
        document.getElementById("password").type = "password";
    } else {
        document.getElementById("password").type = "text";
    }
});

pass.addEventListener("click", ()=>{
$("#cPass").toggle();
});

newPassword.addEventListener("keyup", ()=>{
    if(newPassword.value.length<6){
        passwordlim.removeAttribute("hidden");
        document.getElementById("csubmit").setAttribute("disabled", "true");
    } else {
        passwordlim.setAttribute("hidden", "true");
        document.getElementById("csubmit").removeAttribute("disabled");
    }
});

cPass.addEventListener("submit", (e)=>{
	e.stopPropagation();
		var loginEP = BASE_URL+"/aaa/changepassword.json?"+"changepassword="+ cemail.value + "&password="+ cpassword.value + "&newpassword=" + newPassword.value + "&access_token=" + accessToken ;
		  $.ajax({
		    	url:loginEP,
		        dataType: "jsonp",
				jsonp: "callback",
				crossDomain: true,		        
		        success: (response) => {
					alert(response.message);
					cPass.style.display = "none";
		        },
		        error : () => {
		            console.log(loginEP);
		        }
		    });
		});


window.onload = () => {
    chrome.storage.sync.get("loggedUser", (userDetails) => {
        if (userDetails.loggedUser && userDetails.loggedUser.email) {
            var msg="You are logged in as "+userDetails.loggedUser.email;
            showStatus(msg,false);
            showLoggedInBlock(true);
        } else {
            showLoggedInBlock(false);
        }
    });
};


let showStatus = (msg,isError) => {
    if(!isError){
        statusBlock.classList.remove('alert-danger');
        statusBlock.classList.add('alert-success');
    }
    statusBlock.style.visibility="visible";
    statusBlock.innerHTML=msg;
};

let showLoggedInBlock = (show) => {
    if (show) {
        noLoggedInBlock.style.display = "none";
        loggedInBlock.style.display = "block";
        if (document.getElementById("passwordchange") != null) {
            document.getElementById("passwordchange").value = "";
        }
        if (document.getElementById("passwordnewconfirm") != null) {
            document.getElementById("passwordnewconfirm").value = "";
        }
        if (document.getElementById("passwordnew") != null) {
            document.getElementById("passwordnew").value = "";
        }
    } else {
        noLoggedInBlock.style.display = "block";
        loggedInBlock.style.display = "none";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
};

let syncUserSettings = () => {
    var listUserSettings = BASE_URL + "/aaa/listUserSettings.json?access_token=" + accessToken;
    $.ajax({
        url: listUserSettings,
        dataType: "jsonp",
        jsonpCallback: "p",
        jsonp: "callback",
        crossDomain: "true",
        success: (response) => {
            if (response.accepted) {
                if (response.settings.theme != null) {
                    var userThemeValue = response.settings.theme;
                    if (defaultThemeValue !== userThemeValue) {
                        defaultThemeValue = userThemeValue;
                        if (defaultThemeValue === "dark") {
                            chrome.storage.sync.set({
                                "darktheme": true
                            }, () => {});
                        } else {
                            chrome.storage.sync.set({
                                "darktheme": false
                            }, () => {});
                        }
                    }
                }
            }
        }
    });
};

let retrieveChatHistory = () => {
    var serverHistoryEndpoint = BASE_URL + "/susi/memory.json?access_token=" + accessToken;
    $.ajax({
        url: serverHistoryEndpoint,
        dataType: "jsonp",
        jsonpCallback: "u",
        jsonp: "callback",
        crossDomain: "true",
        success: (response) => {
            var messages = [];
            for (var i = response.cognitions.length - 1; i >= 0; i--) {
                var queryAnswerPair = response.cognitions[i];
                var queryTimes = new Date(Date.parse(queryAnswerPair.query_date));
                var answerTimes = new Date(Date.parse(queryAnswerPair.answer_date));
                var queryInside = queryAnswerPair.query;
                var answerInside = queryAnswerPair;
                var msgObj = {
                    query: queryInside,
                    answer: answerInside,
                    queryTime: queryTimes,
                    answerTime: answerTimes
                }
                messages.push(msgObj);
                localStorage.setItem("messages", JSON.stringify(messages));
            }
        }

    });
};

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    if (!email) {
        showStatus("Email field cannot be empty",true);
        return;
    }
    else if(!isEmailValid){
        showStatus("Please enter a valid email", true);
        return;
    }
    else if (!password) {
        showStatus("Password field cannot be empty",true);
        return;
    }
    $("#loginbutton").button("loading");
    var loginEndPoint = BASE_URL + "/aaa/login.json?type=access-token&login=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);
    $.ajax({ // Checks if the user has pevious UserSettings to update or not
        url: loginEndPoint,
        dataType: "jsonp",
        jsonpCallback: "p",
        jsonp: "callback",
        crossDomain: true,
        success: (response) => {
            if (response.accepted) {
                accessToken = response.access_token;
                checkLogin = "true";
                localStorage.setItem("checkLogin", checkLogin);

                chrome.storage.sync.set({
                    loggedUser: {
                        email: email,
                        accessToken: accessToken
                    }
                }); // Ends here ~~~~~!
                time = response.validSeconds;
                loginButton.innerHTML = "Login";
                $("#loginbutton").button("reset");
                showStatus(response.message,false);
                syncUserSettings();
                retrieveChatHistory();
                showLoggedInBlock(true);
            } else {
                $("#loginbutton").button("reset");
                showStatus("Log In Failed",true);
            }
        },
        error: (jqXHR) => {
            loginButton.innerHTML = "Login";
            var msg = "";
            var jsonValue = jqXHR.status;
            if (jsonValue === 404) {
                msg = "Login Failed. Try Again";
            } else {
                msg = "Some error occurred. Try Again";
            }
            if (status === "timeout") {
                msg = "Please check your internet connection";
            }
            $("#loginbutton").button("reset");
            showStatus(msg,true);
        }
    });
});
logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.reload();
    checkLogin = "false";
    localStorage.setItem("checkLogin", checkLogin);
    chrome.storage.sync.remove("messagesHistory");
    chrome.storage.sync.remove("loggedUser");
});

document.addEventListener("DOMContentLoaded", showLoggedInBlock(false));

settings.addEventListener("click",()=>
{
    this.location.href="/options.html";
});
