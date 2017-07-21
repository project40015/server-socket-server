var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = 0;

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket){
  socket.on('server-information-packet-request', function(uuid){
    console.log('Requested UUID for: ' + uuid);
     io.emit('server-information-packet-request', uuid);
  });
  socket.on('server-information-packet-result', function(uuid, rank, faction){
    console.log(uuid + ' information:' );
    console.log('  rank: ' + rank);
    console.log('  faction: ' + faction);
     io.emit('server-information-packet-result', uuid, rank, faction);
  });
  socket.on('punishment', function(id, type, reason, applied, expiration, punisherUuid, punishedUuid){
    console.log(punisherUuid + ' punished ' + punishedUuid + ' with ' + type + '!')
    io.emit('punishment', id, type, reason, applied, expiration, punisherUuid, punishedUuid);
  });
  socket.on('revert-punishment', function(id){
    console.log('Punishment: ' + id + ' has been reverted.')
    io.emit('revert-punishment', id);
  });
});

http.listen(3000, function(){
  console.log('listening on 3000');
});