var server = require('http').createServer(handler);
var io = require('socket.io')(server);

server.listen(3000);

function handler(request, response) {
    console.log("Recebemos um request");
    response.write('Hello World');
    response.end();
};

var messages = [];

var saveMessage = function(userName,userMessage){
    messages.push({author:userName,message:userMessage});
    if(messages.length > 10){
        messages.shift();
    }
}

io.on('connection', function (client) {
    console.log('Client connected');

    client.on('join', function(name){
        client.name = name;
        messages.forEach(function(message) {
            client.emit("messages", message.author + ": " + message.message)   
        });
    });
    
    client.on('messages', function (message) {
        io.emit("messages", client.name + ": " + message);
        saveMessage(client.name,message);
    });
});