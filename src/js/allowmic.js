var micAccess = document.getElementById("micAccess");
var backgroundChange = document.getElementById("backgroundChange");
var backUrl = document.getElementById("backUrl");
var preDefThemes = document.getElementById("preDefThemes");
var nav = document.getElementById("nav");
var msgPaneThemes = document.getElementById("msgPaneThemes");
var submit1 = document.getElementById("submit1");
var submit2 = document.getElementById("submit2");
var theme;
var msgTheme;
var theValue;

window.onload = ()=>{
        $(".micAccess").css("display" , "none");
        $("#preDefThemes").css("display" , "none");
        $(".customBackground").css("display" , "none");
    };

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

if(msgPaneThemes) {
 msgPaneThemes.addEventListener("click",(e) => {
     if(e.target!==e.currentTarget){
         msgTheme= e.target.id;
       console.log(msgTheme);
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
