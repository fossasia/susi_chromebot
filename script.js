var message = document.getElementById('message');
var messages = document.getElementById('messages');
var formid = document.getElementById('formid');
var messages = document.getElementById("messages");
var textarea = document.getElementById('textarea');


textarea.onkeyup = function(e) {
  if (e.which == 13 && !e.shiftKey) {
    e.preventDefault();
    var textarea = document.getElementById('textarea');
    var text = textarea.value;
    var newP = document.createElement('p');
    var newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'mynewmessage');
    var myTextNode = document.createTextNode(text);
    newP.appendChild(myTextNode);
    newDiv.appendChild(newP);
    messages.appendChild(newDiv);
    textarea.value = '';
    setTimeout(function() {
      var newP = document.createElement('p');
      var newDiv = document.createElement('div');
      var susiTextNode = document.createTextNode("hi from susi");
      newDiv.setAttribute('class', 'susinewmessage');
      newP.appendChild(susiTextNode);
      newDiv.appendChild(newP);
      messages.appendChild(newDiv);
      messages.scrollTop = messages.scrollHeight;
    }, 2000);
    messages.scrollTop = messages.scrollHeight;
  }
};

formid.addEventListener('submit',function(e){
    e.preventDefault();
    var textarea = document.getElementById('textarea');
    var text = textarea.value;
    var newP = document.createElement('p');
    var newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'mynewmessage');
    var myTextNode = document.createTextNode(text);
    newP.appendChild(myTextNode);
    newDiv.appendChild(newP);
    messages.appendChild(newDiv);
    textarea.value = '';
    setTimeout(function() {
      var newP = document.createElement('p');
      var newDiv = document.createElement('div');
      var susiTextNode = document.createTextNode("hi from susi");
      newDiv.setAttribute('class', 'susinewmessage');
      newP.appendChild(susiTextNode);
      newDiv.appendChild(newP);
      messages.appendChild(newDiv);
      messages.scrollTop = messages.scrollHeight;
    }, 2000);
    messages.scrollTop = messages.scrollHeight;
  });
