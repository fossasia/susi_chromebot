var micAccess = document.getElementById("micAccess");
var backgroundChange = document.getElementById("backgroundChange");
var backUrl = document.getElementById("backUrl");
var theValue;
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
