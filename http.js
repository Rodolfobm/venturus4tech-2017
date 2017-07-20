var http = require('http');

var server = http.createServer(serverCallback);

function serverCallback(request, response){
   console.log("Recebemos uma requisição");
   if(request.url == "/messages"){
      response.write('Messages!');
   } else {
      response.write('Root');
   }
   response.end();
}

server.listen(3000);