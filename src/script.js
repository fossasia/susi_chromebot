/*jslint browser:true */
/* global SpeechSynthesisUtterance */
/* global webkitSpeechRecognition */
/* global chrome */

var messages = document.getElementById("messages");
var formid = document.getElementById("formid");
var textarea = document.getElementById("textarea");
var mic = document.getElementById("mic");
var micimg = document.getElementById("micimg");
var micmodal = document.getElementById("micmodal");
var setting = document.getElementById("setting");
var clear = document.getElementById("clear");
var settings = document.getElementById("settings");
var scrollIconElement = document.getElementById("scrollIcon");
var dark = false;
var upCount = 0;
var shouldSpeak = true;
var storageItems= [];
var storageArr = [];

function handleScroll(){
 	var scrollIcon = scrollIconElement;
 	var end=messages.scrollHeight - messages.scrollTop === messages.clientHeight;
 	if(end){
 		//hide icon
 		scrollIcon.style.display="none";
 	}
 	else{
 		//show icon
 		scrollIcon.style.display="block";
 	}
}

messages.addEventListener("scroll",handleScroll);

function getCurrentTime() {
    var ap="AM";
    var currDate=new Date();
    var hours=currDate.getHours();
    var minutes=currDate.getMinutes();
    var time="";
    if(hours>12){
        ap="PM";
        hours-=12;
    }
    if(hours===12){
        ap="PM";
    }
    if(minutes<10){
        minutes="0"+minutes;
    }
    time=hours+":"+minutes+" "+ap;
    return time;
}


function loading(condition=true){
    if(condition === true){
        var newDiv = document.createElement("div");
        var newImg = document.createElement("img");
        newImg.setAttribute("src","images/loading.gif");
        newImg.setAttribute("style","height:10px;width:auto");
        newDiv.appendChild(newImg);
        if(dark === true)
        {
            newDiv.setAttribute("class","susinewmessage message-dark");
        }
        else{
            newDiv.setAttribute("class","susinewmessage");
        }
        messages.appendChild(newDiv);
        messages.scrollTop = messages.scrollHeight;
    }
    else{
        messages.childNodes[messages.childElementCount].innerHTML = "";
    }
}

function restoreMessages(storageItems){
    if(!storageItems){
        return;
    }
    storageItems.map((item) => {
        loading(true);
        loading(false);
        var newDiv =  messages.childNodes[messages.childElementCount];
        newDiv.setAttribute("class",item.senderClass);
        newDiv.innerHTML = item.content;
    });
    chrome.storage.local.get("askSusiQuery",(items) => {
        if(items.askSusiQuery){
            var query = items.askSusiQuery ;
			textarea.value=query;
			document.getElementById("but").click();
			chrome.storage.local.remove("askSusiQuery");
            chrome.browserAction.setBadgeText({text: ""});
     }
    });
}

chrome.storage.sync.get("message",(items) => {
    if(items){
     storageItems=items.message;
     restoreMessages(storageItems);

 }
});

function speakOutput(msg,speak=false){
    if(speak){
        var voiceMsg = new SpeechSynthesisUtterance(msg);
        window.speechSynthesis.speak(voiceMsg);
    }
}

function composeImage(image) {
    var newImg = document.createElement("img");
    newImg.setAttribute("src", image);
    newImg.setAttribute("class", "susi-img");
    return newImg;
}

function composeLink(link) {
    var newA = document.createElement("a");
    newA.appendChild(document.createTextNode(link));
    newA.setAttribute("href", link);
    newA.setAttribute("target", "_blank");
    newA.setAttribute("class", "link");
    return newA;
}

function composeReplyAnswer(response,replyData){
    response.reply = replyData;
    if(replyData.startsWith("https")) {
        response.image = true;
    }
    return response;
}

function composeReplyTable(response,columns,data) {
    var keys = Object.keys(columns);
    var table = document.createElement("table");
    table.setAttribute("class","table-response");
    table.setAttribute("id","table-res");
    var tableHead = document.createElement("thead");
    var trHead = document.createElement("tr");
    keys.map((key) => {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(columns[key]));
        trHead.appendChild(th);
    });
    tableHead.appendChild(trHead);
    table.appendChild(tableHead);
    var tableBody = document.createElement("tbody");
    data.map((item) => {
        var trItem = document.createElement("tr");
        var flag = false;
        keys.map((key) => {
            if(item[key]){
                flag=true;
                var tdItem = document.createElement("td");
                if(item[key].startsWith("http")) {
                    var linkItem = composeLink(item[key]);
                    tdItem.appendChild(linkItem);
                    trItem.appendChild(tdItem);
                }
                else {
                tdItem.appendChild(document.createTextNode(item[key]));
                trItem.appendChild(tdItem);
                }
            }
        });
        if(flag) {
            tableBody.appendChild(trItem);
        }
    });
    table.appendChild(tableBody);
    response.tableType = true;
    response.table = table;
    return response;
}

function composeSusiMessage(response) {
    var newP = document.createElement("p");
    var newDiv =  messages.childNodes[messages.childElementCount];
    newDiv.setAttribute("class", "susinewmessage");
    if(dark === true)
    {
        newDiv.setAttribute("class", "message-susi-dark susinewmessage");
    }
    var t = getCurrentTime();
    var currtime = document.createElement("p");
    currtime.setAttribute("class","time");
    var time = document.createTextNode(t);
    currtime.append(time);
    var susiTextNode;
    if(response.error===true){
        susiTextNode = document.createTextNode(response.errorText);
        newP.appendChild(susiTextNode);
        newDiv.appendChild(newP);
        speakOutput(response.errorText,shouldSpeak);
    }
    else {
            if (response.reply && !response.image) {
                susiTextNode = document.createTextNode(response.reply);
                newP.appendChild(susiTextNode);
                newDiv.appendChild(newP);
                speakOutput(response.reply,shouldSpeak);
            }
            else if(response.image) {
                var newImg = composeImage(response.reply);
                newDiv.appendChild(document.createElement("br"));
                newDiv.appendChild(newImg);
            }
            else if(response.tableType) {
                    newDiv.appendChild(response.table);
                    if(dark === true)
                    {
                    	newDiv.setAttribute("class", "table-height susinewmessage message-susi-dark");
                	}
                    else
                    {
                  	  	newDiv.setAttribute("class", "table-height susinewmessage");
              	  	}
            }
            else {
                console.log("could not make response");
            }
    }
    newDiv.appendChild(document.createElement("br"));
    newDiv.appendChild(currtime);
    messages.appendChild(newDiv);
    var storageObj = {
        senderClass: "",
        content: ""
        };
    var susimessage = newDiv.innerHTML;
    storageObj.content = susimessage;
    storageObj.senderClass = "susinewmessage";
    chrome.storage.sync.get("message",(items) => {
        if(items.message){
            storageArr = items.message;
            console.log("this was true");
        }
        storageArr.push(storageObj);
        chrome.storage.sync.set({"message":storageArr},() => {
            console.log("saved");
        });
    });
    messages.scrollTop = messages.scrollHeight;
}

function composeResponse(action,data) {
    var response = {
        error: false,
        reply: "",
        image: false,
        tableType: false
    };
    switch(action.type){
        case "answer" : response = composeReplyAnswer(response,action.expression);
                        break;
        case "table" :  response = composeReplyTable(response,action.columns,data);
                        break;
        default :       response.error = true;
                        response.errorText = "No matching action type";
                        break;
    }
    return response;
}

function getResponse(query) {
    loading();
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
        	if (data.answers && data.answers[0]) {
        		data.answers[0].actions.map((action) => {
		            var response = composeResponse(action,data.answers[0].data);
		            loading(false);
		            composeSusiMessage(response);
		            if(action.type !== data.answers[0].actions[data.answers[0].actions.length-1].type){
		                loading(); //if not last action then create another loading box for susi response
		            }
		        });
        	} else {
        		var response = composeResponse({
        			type: "answer",
        			expression: "No response found"
        		});
	          loading(false);
	          composeSusiMessage(response);
        	}
        }
    });
}

function composeMyMessage(text) {
    var newP = document.createElement("p");
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "mynewmessage");
    if(dark === true)
    {
        newDiv.setAttribute("class", "message-dark mynewmessage");
    }
    var myTextNode = document.createTextNode(text);
    newP.appendChild(myTextNode);
    newDiv.appendChild(newP);
    var t = getCurrentTime();
    var currtime = document.createElement("p");
    currtime.setAttribute("class","time");
    var time = document.createTextNode(t);
    currtime.append(time);
    newDiv.appendChild(document.createElement("br"));
    newDiv.appendChild(currtime);
    messages.appendChild(newDiv);
    textarea.value = "";
    messages.scrollTop = messages.scrollHeight;
    var storageObj = {
        senderClass: "",
        content: ""
        };
    var mymessage = newDiv.innerHTML;
    storageObj.content = mymessage;
    storageObj.senderClass = "mynewmessage";
    chrome.storage.sync.get("message",(items) => {
        if(items.message){
            storageArr = items.message;
        }
        storageArr.push(storageObj);
        chrome.storage.sync.set({"message":storageArr},() => {
            console.log("saved");
        });
    });
}

function submitForm() {
    var text = textarea.value;
    text = text.trim();
    if (text === "") {
        return console.log("Empty Query!");
    }
    composeMyMessage(text);
    if(window.navigator.onLine){
        getResponse(text);
    }
    else {
        loading();
        var response = {
            error: true,
            errorText: "Not connected to Internet!"
        };
        loading(false);
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

recognition.onstart = function () {
    micimg.setAttribute("src","images/mic-animate.gif");
};

reset();

recognition.onend = function(){
    reset();
    micmodal.classList.remove("active");
    micimg.setAttribute("src","images/mic.gif");
};

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
  navigator.getUserMedia({ audio:true },
  function(){
  if (recognizing) {
    	recognition.stop();
    	reset();
    	micmodal.classList.remove("active");
  } else {
		recognition.start();
		recognizing = true;
		micmodal.className += " active";
  }
} , function () {
		alert("Please Enable Mic by setting option(Note: If you have blocked the mic before you have to remove it from chrome settings and then enable from extension)");
	});
}

mic.addEventListener("click", function () {
    toggleStartStop();
});

setting.addEventListener("click", function () {
    chrome.tabs.create({
        url: chrome.runtime.getURL("options.html")
    });
});

clear.addEventListener("click", function() {
	chrome.storage.sync.clear();
});

settings.addEventListener("click", function () {
    window.open("options.html", "Popup", "location,status,scrollbars,resizable,width=800, height=800");
});

textarea.onkeyup = function (e) {
    var prevMessages,myQuery;
    try{
        if (e.which === 38){
            upCount = upCount + 1;
            prevMessages = document.getElementsByClassName("mynewmessage");
            myQuery = prevMessages[prevMessages.length - upCount].getElementsByTagName("p")[0].textContent;
            textarea.value = myQuery;
        }
        if (e.which === 40){
            upCount = upCount - 1;
            prevMessages = document.getElementsByClassName("mynewmessage");
            myQuery = prevMessages[prevMessages.length - upCount].getElementsByTagName("p")[0].textContent;
            textarea.value = myQuery;
        }
        if (e.which === 13 && !e.shiftKey) {
            upCount = 0;
            e.preventDefault();
            submitForm();
        }
    }
    catch(excep){
    }
};

formid.addEventListener("submit", function (e) {
    e.preventDefault();
    submitForm();
});


chrome.storage.sync.get("darktheme", (obj) => {
    if(obj.darktheme === true ){
    console.log("Dark theme state true");
    document.getElementById("check").click();
    }
});

function check(){

    if(dark === false)
    {
        dark = true;
        chrome.storage.sync.set({"darktheme": true}, () => {
        });
    }
    else
    {
        dark = false;
        chrome.storage.sync.set({"darktheme": false}, () => {
        });
    }

    var box = document.getElementById("box");
    box.classList.toggle("box-modified");
    var field = document.getElementById("field");
    field.classList.toggle("fieldmod");
    var body = document.getElementById("body");
    body.classList.toggle("body");
    var butt = document.getElementById("but");
    butt.classList.toggle("butmod");
    mic.classList.toggle("butmod");
    var headerbox = document.getElementById("headerbox");
    headerbox.classList.toggle("header-modified");
    var surroundbox = document.getElementById("surroundbox");
    surroundbox.classList.toggle("surroundbox-modified");
    formid.classList.toggle("darkform");
    textarea.classList.toggle("textarea-mod");
    var icon = document.getElementById("icon");
    icon.classList.toggle("icon-mod");
    var icon1 = document.getElementById("icon1");
    icon1.classList.toggle("icon1-mod");
    var doc = document.getElementById("doc");
    doc.classList.toggle("dark");
    var dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("drop-dark");
    $(".susinewmessage").toggleClass("message-susi-dark");
    $(".mynewmessage").toggleClass("message-dark");
}

function changeSpeak(){
    shouldSpeak = !shouldSpeak;
    var SpeakIcon = document.getElementById("speak-icon");
    if(!shouldSpeak){
        SpeakIcon.innerText = "volume_off";
    }else{
        SpeakIcon.innerText = "volume_up";
    }
    console.log("Should be speaking? " + shouldSpeak);
}

scrollIconElement.addEventListener("click",function(e){
 	$(messages).stop().animate({
 		scrollTop: $(messages)[0].scrollHeight
 	}, 800);
 	e.preventDefault();
 });

document.getElementById("check").addEventListener("click", check);
document.getElementById("speak").addEventListener("click",changeSpeak);
