$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      ` <div class="message" data-message-id="${message.id}">
          <div class="message__upper-info">
            <div class="message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="message__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`;
      return html;
    } else {
      var html =
      ` <div class="message" data-message-id="${message.id}">
          <div class="message__upper-info">
            <div class="message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="message__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message_text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`;
      return html;
    };
  }

  $('#new_message').on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      // dataにメッセージのidを入れて、既に表示されているメッセージと同じものを２度表示しない条件を書くべき！
      var html = buildHTML(data);
      $('.main-chat__messages').append(html);
      $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('error!');
      $('.submit-btn').prop('disabled', false);
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__messages').append(insertHTML);
        $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  $(".autolink").each(function(){
    $(this).html( $(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">$1</a> ') );
  });

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 3000);
  };
});

