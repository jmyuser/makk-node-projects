var socket = io.connect();
var isType=false;
var upTime,typing;
$(function() {
    $("#txtSpace").keyup(function(){
		//socket.emit('txtchange',$("#txtSpace").val());
		socket.emit('txtchange',$(this).val());
		upTime = (new Date()).getTime();
		updateTyping();
		
	});
	
	$("#txtSpace").keypress(function(){
		//socket.emit('txtchange',$("#txtSpace").val());
	});
	
	$("#txtName").change(function(){
		socket.emit('name',$("#txtName").val());
	});
	
});

function updateTyping(){
	setTimeout(function(){
		var typingTimer = (new Date()).getTime();
		var timeDiff = typingTimer - upTime;
		if (timeDiff >= 800) {
			socket.emit('stop typing');
		}
	},800);
}

//<span style="color: #ff0000">January 30, 2011</span>

socket.on('txtchange', function(data) {
	$("#type").html(data.status);
    $("#txtSpace").val('');
	$("#txtSpace").val($("#txtSpace").val()+data.text);
	$("#txtSpace").replace(data.text,"<font color='blue'>"+data.text+"</font>");
});

socket.on('stop typing',function(){
	$("#type").html('');
})