// 追加されているユーザーを検索から排除するための配列
const added_user_id = [];

$(function(){

  $('#user-search-field').on('keyup', function(){
    let url = '/users';
    let input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      data: {keyword: input}
    })
    .done(function(users){
      $('#user-search-result').empty();
      if(added_user_id.some(function(user_id){return user_id === String($('.js-arr').prop('value'));})){
        ;
      }else{
        if($('.js-arr').prop('value') === undefined){
          ;
        }else{
          added_user_id.push($('.js-arr').prop('value'));
        }
      }

      if (users.length !== 0){
        users.forEach(function(user){
          // 追加済みユーザーID配列と比較し、すでにあるなら検索結果から排除する
          if(added_user_id.some(function(user_id){return user_id === String(user.id);})){
            ;
          }else{
            let html =` <div class="chat-group-user clearfix">
                          <p class="chat-group-user__name">${user.name}</p>
                          <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">招待</div>
                        </div>`;
            $('#user-search-result').append(html)
          }
        })
      } else if(users.length === 0){
        return false;
      } else {
        const html = `<div class ="chat-group-user clearfix">
                      <p class="chat-group-user__name">ユーザーが見つかりません</p>
                    </div>`;
        $('#user-search-result').append(html)
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });


  $(document).on('click', '.chat-group-user__btn--add', function(){
    $(this).parent().remove();
    added_user_id.push($(this).attr('data-user-id'));
    const user_id = $(this).attr('data-user-id');
    const user_name = $(this).attr('data-user-name');
    let html =` 
    <div class="chat-group-user clearfix">
      <input name='group[user_ids][]' type='hidden' value='${user_id}'>
        <p class="chat-group-user__name">${user_name}</p>
        <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${user_id}" data-user-name="${user_name}">削除</div>
    </div>
    ` ;
    $('#chat-group-users').append(html)
  });

  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
    const user_id_ad_bef = $('.js-arr').prop('value');
    const index_bef = added_user_id.indexOf(user_id_ad_bef);

    const user_id_ad = $(this).attr('data-user-id');
    const index = added_user_id.indexOf(user_id_ad);

    if(index >= 0){
      added_user_id.splice(index, 1);
    }else{
      ;
    }

    if(index >= 0){
      added_user_id.splice(index_bef, 1);
    }else{
      ;
    }
  });
});