var micAccess = document.getElementById("micAccess");
var backgroundChange = document.getElementById("backgroundChange");
var backUrl = document.getElementById("backUrl");
var preDefThemes = document.getElementById("preDefThemes");
var msgPaneThemes = document.getElementById("msgPaneThemes");
var getVoice = document.getElementById("getVoice");
let submitThemeColor = document.getElementById("submit-themecolor");
let submitMsgPaneColor = document.getElementById("submit-panecolor");
let submitSusiVoice = document.getElementById("submit-susivoice");
var theme;
var msgTheme;
var theValue;
var warning = document.getElementById("warning");
var customBackground = document.getElementById("customBackground");
var checkLogin = localStorage.getItem("checkLogin");
var getVoice = document.getElementById("getVoice");
var restore = document.getElementById("restore");
var voice;
var localimage=document.getElementById("localupload");
let themeColorPickerButton = document.getElementById("btn-color-theme");
let themeColorPicker = new LdColorPicker(themeColorPickerButton);
LdColorPicker.init();

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
        }, (stream) => {
            stream.getTracks().forEach(track => track.stop());
            displayNotification("success", " Mic Access Granted", 1000);
        }, () => {
            console.log("no access");
            displayNotification("error", " No Access", 1000);
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

if(submitThemeColor) {
    submitThemeColor.addEventListener("click",()=>{
			localStorage.setItem("theme",theme);
            displayNotification("info", "Theme successfully changed", 1000);
        });
}

if(submitMsgPaneColor) {
    submitMsgPaneColor.addEventListener("click",()=>{
			localStorage.setItem("msgTheme",msgTheme);
            displayNotification("warning", " Message Pane Color Changed", 1000);
        });
}
if(submitSusiVoice) {
    submitSusiVoice.addEventListener("click",()=>{
 			localStorage.setItem("voice",voice);
             displayNotification("success", "Voice successfully changed", 1000);
            });
}
if(backgroundChange) {
    backgroundChange.addEventListener("submit", (e) => {
        e.preventDefault();
        theValue = backUrl.value;
        if (!theValue) {
            displayNotification("error", " Error Background Not Changed", 1000);
        } else {
            localStorage.setItem("theValue", theValue);
            displayNotification("warning", " Background successfully changed", 1000);
        }
    });
}

restore.addEventListener("click", ()=>{
    if(confirm("This will remove your customized settings. This action is irreversible.")){
        userItems = ["theValue", "voice", "msgTheme", "theme"];
        userItems.forEach(item => {
            localStorage.removeItem(item);

        });
        displayNotification("warning", " Restored Settings", 1000);

    }
});

localimage.addEventListener("change",()=>{
    var tmppath = URL.createObjectURL(localimage.files[0]);
    localStorage.setItem("theValue",tmppath);
    displayNotification("success", " Image Updates", 1000);
});

themeColorPicker.on("change", function(color){
    themeColorPickerButton.style.backgroundColor = color;
    theme = color;
});
