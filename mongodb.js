var server = require('http').createServer(handler);
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

// Create a new message
var newMessage = new MessageModel();
newMessage.message = "Hello";
newMessage.author = "Renato";

// Save the message
newMessage.save(function(error){
    if(error){
        console.log(error);
    } else {
        console.log("Message Created!");
    }
})

// List all messages
MessageModel.find({}, function(error, messages){
if(error){
        console.log(error);
    } else {
        console.log(messages);
    }
});

