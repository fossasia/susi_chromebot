/*jslint browser:true */
/* global SpeechSynthesisUtterance */
/* global webkitSpeechRecognition */
/* global chrome */

var messages = document.getElementById("messages");
var formid = document.getElementById("formid");
var textarea = document.getElementById("textarea");
var mic = document.getElementById("mic");
var setting = document.getElementById("setting");

function composeResponse(data){
    var link = data.answers[0].data[0].link;
    var image1 = data.answers[0].data[0].answer;
    var image2 = data.answers[0].data[0].webformatURL;
    var image3 = data.answers[0].data[0].image;
    var answer = data.answers[0].data[0].answer;
    var image;
    try {
        if (image2.startsWith("https")) {
            image=image2;
            answer="";
        }
    }catch(err)
    {}
    try {
        if (image3.startsWith("https")) {
            image=image3;
        }
    }
    catch(err)
    {}
    try {
        if (image1.startsWith("https")) {
            image=image1;
            answer="";	
        }
    }
    catch(err)
    {}
    return {
        error: false,
        link,
        image,
        answer
    };
}

function loading(condition=true){
    if(condition === true){
        var newDiv = document.createElement("div");
        var newImg = document.createElement("img");
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

function composeLink(link) {
    var newA = document.createElement("a");
    newA.appendChild(document.createTextNode(link));
    newA.setAttribute("href", link);
    newA.setAttribute("target", "_blank");
    return newA;
}

function composeImage(image) {
    var newImg = document.createElement("img");
    newImg.setAttribute("src", image);
    newImg.setAttribute("class", "susi-img"); 
    return newImg;
}

function speakOutput(msg){
    var voiceMsg = new SpeechSynthesisUtterance(msg);
    window.speechSynthesis.speak(voiceMsg);
}

function composeSusiMessage(response) {
    var newP = document.createElement("p");
    var newDiv =  messages.childNodes[messages.childElementCount];
    newDiv.setAttribute("class", "susinewmessage");
    var susiTextNode;
    if(response.error===true){
        susiTextNode = document.createTextNode(response.errorText);
        newP.appendChild(susiTextNode);
        newDiv.appendChild(newP);
        speakOutput(response.errorText);
    }
    else {
            susiTextNode = document.createTextNode(response.answer);
            newP.appendChild(susiTextNode);
            newDiv.appendChild(newP);
            if (response.link) {
                var newA = composeLink(response.link);
                newDiv.appendChild(document.createElement("br"));
                newDiv.appendChild(newA);
            }
            if (response.image) {
                var newImg = composeImage(response.image);
                newDiv.appendChild(document.createElement("br"));
                newDiv.appendChild(newImg);
            }
            speakOutput(response.answer);   
    }
    messages.appendChild(newDiv);
    messages.scrollTop = messages.scrollHeight;
}

function getResponse(query) {
    $.ajax({
        dataType: "jsonp",
        type: "GET",
        url: "https://api.susi.ai/susi/chat.json?timezoneOffset=-300&q=" + query,
        error: function(xhr,textStatus,errorThrown) {
        	console.log(xhr);
        	console.log(textStatus);
        	console.log(errorThrown);
            loading(false);
            var response = {
                error: true,
                errorText: "Sorry! request could not be made"
            };
            composeSusiMessage(response);        
        },
        success: function (data) {
            var recQuery = data.answers[0].data[0].query;
            if (query !== recQuery) {
                return getResponse(query);
            }
            var response = composeResponse(data);
            loading(false);
            composeSusiMessage(response);
        }
    });
}

function composeMyMessage(text) {
    var newP = document.createElement("p");
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "mynewmessage");
    var myTextNode = document.createTextNode(text);
    newP.appendChild(myTextNode);
    newDiv.appendChild(newP);
    messages.appendChild(newDiv);
    textarea.value = "";
    messages.scrollTop = messages.scrollHeight;
}

function submitForm() {
    var text = textarea.value;
    text = text.trim();
    if (text === "") {
        return console.log("Empty Query!");
    }
    composeMyMessage(text);
    loading();
    if(window.navigator.onLine){
        getResponse(text);
    }
    else {
        loading(false);
        var response = {
            error: true,
            errorText: "Not connected to Internet!"
        };
        composeSusiMessage(response);
    }
}


var recognizing;

function reset() {
    recognizing = false;
}

var recognition = new webkitSpeechRecognition();
recognition.onerror = function(e){
    console.log(e.error);
};

//recognition.continuous = true;
reset();
recognition.onend = reset();

recognition.onresult = function (event) {
    var interimText=" ";
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      textarea.value = event.results[i][0].transcript;
      submitForm();
    }
    else {
        interimText += event.results[i][0].transcript;
        textarea.value += interimText;
    }
  }
};

function toggleStartStop() {
  if (recognizing) {
    recognition.stop();
    reset();
  } else {
    recognition.start();
    recognizing = true;
  }
}

mic.addEventListener("click", function () {
    toggleStartStop();
});

setting.addEventListener("click", function () {
    chrome.tabs.create({
        url: chrome.runtime.getURL("options.html")
    });
});

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
