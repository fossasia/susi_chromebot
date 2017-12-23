var micAccess = document.getElementById("micAccess");
var backgroundChange = document.getElementById("backgroundChange");
var backUrl = document.getElementById("backUrl");
var preDefThemes = document.getElementById("preDefThemes");
var theme;
var theValue;

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
