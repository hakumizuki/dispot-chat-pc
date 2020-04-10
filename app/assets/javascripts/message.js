$(function(){
  function buildHtml(message){
    if ( message.image ) {
      let html =
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
      let html =
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
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHtml(data);
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
  // $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});だとうまくいかないなあ
});