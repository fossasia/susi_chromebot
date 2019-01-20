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
var inputbox=document.getElementById("inputbox");
var f2=0,j,f3=0;

var button_color_theme=document.getElementById("btn-color-theme");
inputbox.addEventListener("click",()=>{
  if(f3===0)
  {
      button_color_theme.disabled=true;
      f3=1;
  }
  else
  {
    button_color_theme.disabled=false;
    f3=0;
  }

});


for(j=0;j<button_clicked.length;j++)
{
  if(j===4)
    {
      button_clicked[j].addEventListener("click",()=>{
          if(f2===0)
          {
            f2=1;
            inputbox.setAttribute("hidden",true);
          }
          else
          {
            f2=0;
            inputbox.removeAttribute("hidden");
          }
        });
    }
  else
	{
      button_clicked[j].addEventListener("click",()=>{
        if(f2===0)
		    {
          f2=1;
        }
    else
    {
      f2=0;
    }
	     });
  }
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
