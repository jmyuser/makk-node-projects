//var express = require('express'), app = express.createServer();
var express = require("express"); 
var http = require('http');
app = express();
var server = http.createServer(app);

//var jade = require('jade');

app.engine('html', require('ejs').renderFile);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set("view options", { layout: false });

app.use(express.static(__dirname + '/public'));


var io = require('socket.io').listen(server);
var num =0;
io.sockets.on('connection', function (socket) {
    console.log("Connection...");
	
	socket.on('txtchange', function (data) {	
		socket.broadcast.emit('txtchange',{
			'status': socket.username+' is typing',
			'text' : data,
			'color' : 'red'
		});
	});	
	
	socket.on('name',function(data){
		socket.username=data;
	});
	
	socket.on('stop typing',function(){
		socket.broadcast.emit('stop typing');
	})
	
});
app.get('/', function(req, res){
  res.render('home.html');
});
server.listen(5000);
