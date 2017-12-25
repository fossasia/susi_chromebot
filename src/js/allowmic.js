var micAccess = document.getElementById("micAccess");
var backgroundChange = document.getElementById("backgroundChange");
var backUrl = document.getElementById("backUrl");
var preDefThemes = document.getElementById("preDefThemes");
var nav = document.getElementById("nav");
var submit = document.getElementById("submit");
var theme;
var theValue;

window.onload = ()=>{
        $(".micAccess").css("display" , "none");
        $("#preDefThemes").css("display" , "none");
        $(".customBackground").css("display" , "none");
}

nav.addEventListener("click", (e)=>{
    var currVal;
    if(e.target!==e.currentTarget) {
        currVal = e.target.id;
        if (currVal === "micAccess")
        {$(".micAccess").css("display" , "block");
        $("#preDefThemes").css("display" , "none");
        $(".customBackground").css("display" , "none");
        }
        else if(currVal === "customBackground")
        {$(".customBackground").css("display" , "block");
        $(".micAccess").css("display" , "none");
        $("#preDefThemes").css("display" , "none");
    }
        else if(currVal === "themes")
        {
            $("#preDefThemes").css("display" , "block");
            $(".micAccess").css("display" , "none");
            $(".customBackground").css("display" , "none");
        }

        else if (currVal === "all")
        {
            $("#preDefThemes").css("display" , "block");
            $(".micAccess").css("display" , "block");
            $(".customBackground").css("display" , "block");
        }


        else { 
        console.log("error");
        } 
       e.stopPropagation();
    }


});

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

if(submit) {
    submit.addEventListener("click",()=>{
         localStorage.setItem("theme",theme);
         console.log("success");
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
