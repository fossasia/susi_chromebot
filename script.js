/*jslint browser:true */
var message = document.getElementById("message");
var messages = document.getElementById("messages");
var formid = document.getElementById("formid");
var textarea = document.getElementById("textarea");

function getResponse(query) {
    $.ajax({
        dataType: "jsonp",
        type: "GET",
        url: "https://api.susi.ai/susi/chat.json?timezoneOffset=-300&q=" + query,
        success: function (data) {
            var recQuery = data["answers"][0]["data"][0]["query"];
            if (query !== recQuery) {
                return getResponse(query);
            }
            var link = data["answers"][0]["data"][0]["link"];
            var image = data["answers"][0]["data"][0]["image"];
            var answer = data["answers"][0]["data"][0]["answer"];
            loading(false);
            var newDiv = messages.childNodes[messages.childElementCount];
            var newP = document.createElement("p");
            newP.appendChild(document.createTextNode(answer));
            newDiv.appendChild(newP);
            if (link) {
                var newA = document.createElement("a");
                newA.appendChild(document.createTextNode(link));
                newA.setAttribute("href", link);
                newA.setAttribute("target", "_blank");
                newDiv.appendChild(document.createElement("br"));
                newDiv.appendChild(newA);
            }
            if (image) {
                var newImg = document.createElement("img");
                newDiv.appendChild(document.createElement("br"));
                newImg.setAttribute("src", image);
                newImg.setAttribute("class", "susi-img");
                newDiv.appendChild(newImg);
            }
            newDiv.setAttribute("class", "susinewmessage");
            messages.appendChild(newDiv);
            messages.scrollTop = messages.scrollHeight;
        }
    });
}

function loading(condition=true){
    if(condition == true){
        var newDiv = document.createElement('div');
        var newImg = document.createElement('img');
        newImg.setAttribute("src","loading.gif");
        newImg.setAttribute("style","height:10px;width:auto");
        newDiv.appendChild(newImg);
        newDiv.setAttribute("class","susinewmessage");
        messages.appendChild(newDiv);
        messages.scrollTop = messages.scrollHeight;
    }
    else{
        messages.childNodes[messages.childElementCount].innerHTML = "";
    }
}

function submitForm() {
    var text = textarea.value;
    text = text.trim();
    if (text === "") {
        return console.log("Empty Query!");
    }
    var newP = document.createElement("p");
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "mynewmessage");
    var myTextNode = document.createTextNode(text);
    newP.appendChild(myTextNode);
    newDiv.appendChild(newP);
    messages.appendChild(newDiv);
    textarea.value = "";
    loading();
    getResponse(text);
    messages.scrollTop = messages.scrollHeight;
}

textarea.onkeyup = function (e) {
    if (e.which === 13 && !e.shiftKey) {
        e.preventDefault();
        submitForm();
    }
};

formid.addEventListener("submit", function (e) {
    e.preventDefault();
    submitForm();
});

