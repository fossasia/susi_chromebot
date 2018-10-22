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
var alerts = document.getElementById("alertback");
var voice;
var localimage=document.getElementById("localupload");


window.onload = () => {
    if (checkLogin === "true") {
        customBackground.style.display = "block";
    }
    else {
        warning.innerHTML = "Please login for some useful features";
        customBackground.style.display = "none";
    }
};

if (micAccess) {
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
if (preDefThemes) {
    preDefThemes.addEventListener("click", (e) => {
        if (e.target !== e.currentTarget) {
            theme = e.target.id;
            console.log(theme);
        }

        e.stopPropagation;
    });
}

if (msgPaneThemes) {
    msgPaneThemes.addEventListener("click", (e) => {
        if (e.target !== e.currentTarget) {
            msgTheme = e.target.id;
            console.log(msgTheme);
        }

        e.stopPropagation;
    });
}

if (getVoice) {
    getVoice.addEventListener("click", (e) => {
        if (e.target !== e.currentTarget) {
            voice = e.target.id;
        }

        e.stopPropagation;
    });
}

if (submit1) {
    submit1.addEventListener("click", () => {
        localStorage.setItem("theme", theme);
        document.getElementById("alerts").innerHTML = "<strong>Success</strong> Successfully, updated the theme color ";
        document.getElementById("alertback").style.display = "block";
    });
}

if (submit2) {
    submit2.addEventListener("click", () => {
        localStorage.setItem("msgTheme", msgTheme);
        document.getElementById("alerts").innerHTML = "<strong>Success</strong> Successfully, updated the message pane color ";
        document.getElementById("alertback").style.display = "block";
    });
}
if (submit3) {
    submit3.addEventListener("click", () => {
        localStorage.setItem("voice", voice);
        document.getElementById("alerts").innerHTML = "<strong>Success</strong>,Changed the Voice Output";
        document.getElementById("alertback").style.display = "block";
    });

}
if (backgroundChange) {
    backgroundChange.addEventListener("submit", (e) => {
        e.preventDefault();
        theValue = backUrl.value;
        if (!theValue) {
            document.getElementById("alerts").innerHTML = "<strong>Error</strong>  ";
            document.getElementById("alertback").style.display = "block";
        } else {
            localStorage.setItem("theValue", theValue);
            document.getElementById("alerts").innerHTML = "<strong>Success</strong>,Stored  ";
            document.getElementById("alertback").style.display = "block";
        }
    });
}

restore.addEventListener("click", () => {
    if (confirm("This will remove your customized settings. This action is irreversible.")) {
        userItems = ["theValue", "voice", "msgTheme", "theme"];
        userItems.forEach(item => {
            localStorage.removeItem(item);
        });
    }
});

alerts.addEventListener("click", () => {
    alerts.style.display = "none";
});


localimage.addEventListener("change",()=>{
    var tmppath = URL.createObjectURL(localimage.files[0]);
    localStorage.setItem("theValue",tmppath);
    alert("Image Updated");
});
