 var socket = io();
    var username = '';
    $('.add-msg-form').submit(function () {
      if ($('#m').val()) {
        //emit there is a new chat message
        socket.emit('chat message', {user: (username || 'Anon'), message: $('#m').val()});
        //empty the message box
        $('#m').val('');
      }

      return false;
    });
    
    $('.choose-name-form').submit(function(event) {
      event.preventDefault();
      username = $('.username-input').val() || username;
      $('.username-input').val('');
    });
    
    $('#m').keyup(function () {
      if($('#m').val) {
        socket.emit('typing', (username || 'Anon'));
      } else {
        //remove info that defines if the user is typing
        $('.user-typing-info').text('');
      }
    });
    
    socket.on('chat message', function (msg) {
      $('#messages').append($('<li>').append('<b>' + msg.user + ':</b> ' + msg.message));
    });
    
    socket.on('userTyping', function (name) {
      $('.user-typing-info').text(name + ' is typing...');
    });