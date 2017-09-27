navigator.webkitGetUserMedia({
    audio: true
}, function(stream) {
    stream.stop();
}, function () {
    console.log('no access');
});     