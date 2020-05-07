// include dependencies:
var websocket = require("websocket").server;
var http = require("http");


// local variables:
var username = "You";
var port = 9600;


// create server, and have listen on port 9600:
var server = http.createServer();

server.listen(port, function() {
    console.log("Server listening on port " + port);
});

var ws_server = new websocket({
    httpServer: server
});


// on server request, send message:
ws_server.on("request", function(req) {
    var connection = req.accept(null, req.origin);

    connection.on("message", function(message) {
        connection.send(message.utf8Data);
    });
});
