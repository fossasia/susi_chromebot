var message = document.getElementById('message');
var messages = document.getElementById('messages');
var formid = document.getElementById('formid');

formid.addEventListener('submit',function(e){
    e.preventDefault();
    var textarea = document.getElementById('textarea');
    var text = textarea.value;
    var textmessage = '<p>' + text + '</p>';
    console.log(textmessage);
    var newItem = document.createElement("LI");       
    var textnode = document.createTextNode("Water");  
    newItem.appendChild(textnode); 
    message.insertAdjacentElement('beforeend',textmessage);
    console.log(text);
});