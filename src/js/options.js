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


const isImageURL = url => {
    let pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    return (pattern.test(url) && ((/\.(jpeg|jpg|gif|png)$/).test(url) != null));
};

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
        }, () => {
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

if(submitThemeColor) {
    submitThemeColor.addEventListener("click",()=>{
			localStorage.setItem("theme",theme);
			alert("Success");
      });
}

if(submitMsgPaneColor) {
    submitMsgPaneColor.addEventListener("click",()=>{
			localStorage.setItem("msgTheme",msgTheme);
			alert("Success");
      });
}
if(submitSusiVoice) {
    submitSusiVoice.addEventListener("click",()=>{
 			localStorage.setItem("voice",voice);
 			alert("Success");
      });
}
if(backgroundChange) {
    backgroundChange.addEventListener("submit", (e) => {
        e.preventDefault();
        theValue = backUrl.value;
        if (!theValue) {
            alert("Error: No value specified");
        } else if(!isImageURL(theValue)){
            alert("Please enter valid image URL");
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

localimage.addEventListener("change",()=>{
    var tmppath = URL.createObjectURL(localimage.files[0]);
    localStorage.setItem("theValue",tmppath);
    alert("Image Updated");
});

themeColorPicker.on("change", function(color){
    themeColorPickerButton.style.backgroundColor = color;
    theme = color;
});
