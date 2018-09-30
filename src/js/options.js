var micAccess = document.getElementById("micAccess");
var backgroundChange = document.getElementById("backgroundChange");
var backUrl = document.getElementById("backUrl");
var preDefThemes = document.getElementById("preDefThemes");
var msgPaneThemes = document.getElementById("msgPaneThemes");
var getVoice = document.getElementById("getVoice");
var submit1 = document.getElementById("submit1");
var submit2 = document.getElementById("submit2");
var submit3 = document.getElementById("submit3");
var theme;
var msgTheme;
var theValue;
var warning = document.getElementById("warning");
var customBackground = document.getElementById("customBackground");
var checkLogin = localStorage.getItem("checkLogin");
var getVoice = document.getElementById("getVoice");
var restore = document.getElementById("restore");
var voice;


window.onload = () => {
    if(checkLogin === "true") {
        customBackground.style.display = "block";
    }
    else {
        warning.innerHTML = "Please login for some useful features";
        customBackground.style.display = "none";
    }
};

if(micAccess) {
    micAccess.addEventListener("click", () => {
        navigator.webkitGetUserMedia({
            audio: true
        }, function (stream) {
            stream.stop();
        }, function () {
            console.log("no access");
        });
    });
}
if(preDefThemes) {
preDefThemes.addEventListener("click",(e) => {
    if(e.target!==e.currentTarget){
        theme= e.target.id;
        console.log(theme);
    }

    e.stopPropagation;
    });
}

if(msgPaneThemes) {
 msgPaneThemes.addEventListener("click",(e) => {
     if(e.target!==e.currentTarget){
         msgTheme= e.target.id;
       console.log(msgTheme);
    }

      e.stopPropagation;
      });
  }

if(getVoice) {
  getVoice.addEventListener("click",(e) => {
     if(e.target!==e.currentTarget){
         voice= e.target.id;
    }

     e.stopPropagation;
     });
}

if(submit1) {
			submit1.addEventListener("click",()=>{
			localStorage.setItem("theme",theme);
			alert("success");
      });
}

if(submit2) {
			submit2.addEventListener("click",()=>{
			localStorage.setItem("msgTheme",msgTheme);
			alert("success");
      });
}
if(submit3) {
 			submit3.addEventListener("click",()=>{
 			localStorage.setItem("voice",voice);
 			alert("success");
      });
}
if(backgroundChange) {
    backgroundChange.addEventListener("submit", (e) => {
        e.preventDefault();
        theValue = backUrl.value;
        if (!theValue) {
            alert("Error: No value specified");
        } else {
            localStorage.setItem("theValue", theValue);
            alert("Successfully stored");
        }
    });
}

restore.addEventListener("click", ()=>{
    if(confirm("This will remove your customized settings. This action is irreversible.")){
        userItems = ["theValue", "voice", "msgTheme", "theme"];
        userItems.forEach(item => {
            localStorage.removeItem(item);
        });
    }
});
