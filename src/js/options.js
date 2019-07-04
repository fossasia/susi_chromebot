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
if(themeColorPickerButton) {
    let themeColorPicker = new LdColorPicker(themeColorPickerButton);
    LdColorPicker.init();
    themeColorPicker.on("change", (color)=>{
        themeColorPickerButton.style.backgroundColor = color;
        theme = color;
    });
}


const isImageURL = url => {
    let pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    return (pattern.test(url) && ((/\.(jpeg|jpg|gif|png)$/).test(url) != null));
};

window.onload = () => {
    if(checkLogin === "true") {
        customBackground.style.display = "block";
    }
    else {
        warning.innerHTML = "Please login for some useful features <button type='button' id='loginbutton' class=' btn btn-success ' style='color:white; float:right '>Login</button>";
        customBackground.style.display = "none";
        document.getElementById("loginbutton").addEventListener("click",function(){
            window.location.href = "login.html";
        });
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

var button_clicked=document.getElementsByClassName("button_clicked");
var f2=0,j;
for(j=0;j<button_clicked.length;j++)
{
	button_clicked[j].addEventListener("click",()=>{
		f2=1;
	});
}
if(submitThemeColor) {
    submitThemeColor.addEventListener("click",()=>{
			localStorage.setItem("theme",theme);
			if(f2===1)
			alert("Success");
      });
}

var message_pane_button_clicked=document.getElementsByClassName("message_pane_button_clicked");
var f1=0,i;
for(i=0;i<message_pane_button_clicked.length;i++)
{
	message_pane_button_clicked[i].addEventListener("click",()=>{
		f1=1;
	});
}
if(submitMsgPaneColor) {
    submitMsgPaneColor.addEventListener("click",()=>{
			localStorage.setItem("msgTheme",msgTheme);
			if(f1===1)
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

if(restore) {
    restore.addEventListener("click", ()=>{
        if(confirm("This will remove your customized settings. This action is irreversible.")){
            userItems = ["theValue", "voice", "msgTheme", "theme"];
            userItems.forEach(item => {
                localStorage.removeItem(item);
            });
        }
    });
}

if(localimage) {
    localimage.addEventListener("change",()=>{
        var tmppath = URL.createObjectURL(localimage.files[0]);
        localStorage.setItem("theValue",tmppath);
        alert("Image Updated");
    });
}
