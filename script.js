var message = document.getElementById('message');
var messages = document.getElementById('messages');
var formid = document.getElementById('formid');
var messages = document.getElementById("messages");


formid.addEventListener('submit',function(e){
	e.preventDefault();
	
	var textarea = document.getElementById('textarea');
	var text = textarea.value;
	var newParagraph = document.createElement('p');
	var myTextNode = document.createTextNode(text);
	newParagraph.appendChild(myTextNode);

	var newMyMsgDiv = document.createElement('div');
	newMyMsgDiv.setAttribute('class','mynewmessage is-pulled-right is-clearfix');
	newMyMsgDiv.appendChild(newParagraph);
	messages.appendChild(newMyMsgDiv);
	
	textarea.value = '';
	
	setTimeout(function(){
		var newParagraph = document.createElement('p');

		var newSusiMsgDiv = document.createElement('div');
		var newMsgDiv = document.createElement('div');
		newMsgDiv.setAttribute('class','newmessage');
		var susiTextNode = document.createTextNode("hi from susi");
		newSusiMsgDiv.setAttribute('class','susinewmessage is-pulled-left');
		newParagraph.appendChild(susiTextNode);
		newSusiMsgDiv.appendChild(newParagraph);
		newMsgDiv.appendChild(newSusiMsgDiv);
		messages.appendChild(newMsgDiv);
		messages.scrollTop = messages.scrollHeight;
	},2000);
	messages.scrollTop = messages.scrollHeight;
});