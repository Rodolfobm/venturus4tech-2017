var server = require('http').createServer(handler);
var io = require('socket.io')(server);

server.listen(3000);

function handler(request, response) {
    console.log("Recebemos um request");
    response.write('Hello World');
    response.end();
};

var messages = [];

var saveMessage = function(userMessage){
    messages.push(userMessage);
    if(messages.length > 10){
        messages.shift();
    }
}

io.on('connection', function (client) {
    console.log('Client connected');

    client.on('join', function(name){
        client.name = name;
        messages.forEach(function(message) {
            client.emit("messages", message)
        });
    });
    
    client.on('messages', function (message) {
        var userMessage = {};
        userMessage.author = client.name;
        userMessage.message = message;
        io.emit("messages", userMessage);
        saveMessage(userMessage);
    });
});