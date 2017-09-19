var message = document.getElementById('message');
var messages = document.getElementById('messages');
var formid = document.getElementById('formid');

formid.addEventListener('submit',function(e){
    e.preventDefault();
    var textarea = document.getElementById('textarea');
    var text = textarea.value;
    var newP = document.createElement('p');
    var newDiv = document.createElement('div'); 
    newP.setAttribute('class','message');      
    var textnode = document.createTextNode(text);  
    newP.appendChild(textnode); 
    //message.insertAdjacentElement('beforeend',textmessage);
    newDiv.appendChild(newP);
    messages.appendChild(newDiv);
    console.log(text);
});