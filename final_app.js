var server = require('http').createServer(handler);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

server.listen(3000);

function handler(request, response) {
    console.log("Recebemos um request");
    response.write('Hello World');
    response.end();
};

// Create the database connection
mongoose.connect('mongodb://localhost/chat');

// Define message schema
var messageSchema = new Schema({
    message: String,
    author: String,
    sent: {type: Date, default: Date.now}
});

// Create a Message Model
var MessageModel = mongoose.model('messages', messageSchema);

// Save the message
var saveMessage = function(userMessage){
    var newMessage = new MessageModel();
    newMessage.author = userMessage.author;
    newMessage.message = userMessage.message;
    
    newMessage.save(function(error){
        if(error){
            console.log(error);
        } else {
            io.emit("messages", newMessage);
        }
    })
};

io.on('connection', function (client) {
    console.log('Client connected');

    MessageModel.find({}, function(error, messages){
            if(error){
                console.log(error);
            } else {
                messages.forEach(function(message) {
                    client.emit("messages", message);
                });
            }
        });
    
    client.on('messages', function (message) {
        saveMessage(message);
    });
});