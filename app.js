// include dependencies:
var websocket = require("websocket").server;
var http = require("http");


// local variables:
var port = 9600;
var connections = [];


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
    let connection = req.accept(null, req.origin);

    connections.push(connection);

    connection.on("message", function(message) {
        for (let i = 0; i < connections.length; i++) {
            connections[i].sendUTF(message.utf8Data);
        }
    });
});
