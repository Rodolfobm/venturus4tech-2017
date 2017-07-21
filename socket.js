var server = require('http').createServer(handler);
var io = require('socket.io')(server);

server.listen(3000);

io.set("origins", "*:*");

function handler(request,response){
    response.write('Hello');
    response.end();
}

var messages = [];

var saveMessage = function(message){
    messages.push(message);
};

io.on('connection', function(client){
    console.log('cliente connected');
    
    client.on('join', function(){
        messages.forEach(function(message){
            client.emit('messages',message);
        });
    })
    

    client.on('messages', function(message){
        message.time = new Date().toISOString();
        saveMessage(message);
        io.emit('messages',message);
    })
})