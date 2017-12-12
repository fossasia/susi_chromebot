var micAccess = document.getElementById("micAccess");
var backgroundChange = document.getElementById("backgroundChange");
var backUrl = document.getElementById("backUrl");
var preDefThemes = document.getElementById("preDefThemes");
var theme;
var theValue;

preDefThemes.addEventListener("click",(e) => {
    if(e.target!==e.currentTarget){
    theme= e.target.id;
    console.log(theme);
    }
    
    e.stopPropagation;
});

submit.addEventListener("click",()=>{
    localStorage.setItem("theme",theme);
    console.log("success");
    alert("success");
});
micAccess.addEventListener("click", () => {
    navigator.webkitGetUserMedia({
        audio: true
    }, function (stream) {
        stream.stop();
    }, function () {
        console.log("no access");
    });
});

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
