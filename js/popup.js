$(function() {
  var cpa_obj = new Cpa();
  var pop_icon  = {
    "19": "img/icon-19.png",
    "38": "img/icon-38.png"
  },
  pop_icon_black  = {
    "19": "img/icon-19-black.png",
    "38": "img/icon-38-black.png"
  };

  if(ConfigObj.get('isopen')){
    $('#switch').attr('checked', true);
    $('#clearbtn').removeClass('btn_grey');
    chrome.browserAction.setIcon({path:pop_icon});
  } else {
    $('#switch').attr('checked', false);
    $('#clearbtn').addClass('btn_grey');
    chrome.browserAction.setIcon({path:pop_icon_black});
  }

  $('#clearbtn').html( chrome.i18n.getMessage('clearbtn') );

  $('#switch').change(function() {
    var s = $(this).is(':checked');
    ConfigObj.save('isopen', s);
    //$('#clearbtn').click(clear_func);
    if(s){
      cpa_obj.sendEvent('Bookmarks', 'switch_on');
      chrome.browserAction.setIcon({path:pop_icon});
      $('#clearbtn').removeClass('btn_grey');
      Common.show_msg(chrome.i18n.getMessage('appname') , chrome.i18n.getMessage('switch_open_success') );
    } else {
      cpa_obj.sendEvent('Bookmarks', 'switch_off');
      chrome.browserAction.setIcon({path:pop_icon_black});
      Common.show_msg(chrome.i18n.getMessage('appname') , chrome.i18n.getMessage('switch_close_success') );
    }
  });

  if(!ConfigObj.get('last_visited_index')){
    $('#clearbtn').addClass('btn_grey');
  }

  var clear_func = function(){
    ConfigObj.clearcache();
    NotificationObj.clearcache();
    AppDB.delAll(function(){});
    if(ConfigObj.get('isopen')){
      $('#switch').attr('checked', true);
      $('#clearbtn').removeClass('btn_grey');
      chrome.browserAction.setIcon({path:pop_icon});
    } else {
      $('#switch').attr('checked', false);
      $('#clearbtn').addClass('btn_grey');
      chrome.browserAction.setIcon({path:pop_icon_black});
    }
    Common.show_msg(chrome.i18n.getMessage('appname') , chrome.i18n.getMessage('clearmsg') );
    $(this).off();
  };

  $('#clearbtn').click(clear_func);
})
