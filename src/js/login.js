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
chrome.storage.sync.get("darktheme", (obj) => {
    if (obj.darktheme === true) {
        defaultThemeValue = "dark";
    } else {
        defaultThemeValue = "light";
    }
});
window.onload = function() {
    chrome.storage.sync.get("loggedUser", function(userDetails) {
        if (userDetails.loggedUser.email) {
            var msg="You are logged in as"+userDetails.loggedUser.email;
            showStatus(msg,false);
            showLoggedInBlock(true);
        } else {
            showLoggedInBlock(false);
        }
    });
};

function showStatus(msg,isError){
    if(!isError){
        statusBlock.classList.remove('alert-danger');
        statusBlock.classList.add('alert-success');
    }
    statusBlock.style.visibility="visible";
    statusBlock.innerHTML=msg;
}

function showLoggedInBlock(show) {
    if (show) {
        noLoggedInBlock.style.display = "none";
        loggedInBlock.style.display = "block";
        document.getElementById("passwordchange").value = "";
        document.getElementById("passwordnewconfirm").value = "";
        document.getElementById("passwordnew").value = "";
    } else {
        noLoggedInBlock.style.display = "block";
        loggedInBlock.style.display = "none";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
}

function syncUserSettings() {
    var listUserSettings = BASE_URL + "/aaa/listUserSettings.json?access_token=" + accessToken;
    $.ajax({
        url: listUserSettings,
        dataType: "jsonp",
        jsonpCallback: "p",
        jsonp: "callback",
        crossDomain: "true",
        success: function(response) {
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
}

function retrieveChatHistory() {
    var serverHistoryEndpoint = BASE_URL + "/susi/memory.json?access_token=" + accessToken;
    $.ajax({
        url: serverHistoryEndpoint,
        dataType: "jsonp",
        jsonpCallback: "u",
        jsonp: "callback",
        crossDomain: "true",
        success: function(response) {
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
}
loginForm.addEventListener("submit", function login(event) {
    event.preventDefault();
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (!email) {
        showStatus("Email field cannot be empty",true);
        return;
    } else if (!password) {
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
        success: function(response) {
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
        error: function(jqXHR) {
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
logoutButton.addEventListener("click", function logout(e) {
    e.preventDefault();
    window.location.reload();
    checkLogin = "false";
    localStorage.setItem("checkLogin", checkLogin);
    chrome.storage.sync.remove("messagesHistory");
    chrome.storage.sync.remove("loggedUser");
});

document.addEventListener("DOMContentLoaded", showLoggedInBlock(false));
