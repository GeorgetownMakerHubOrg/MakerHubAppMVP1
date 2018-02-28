function getTrelloCards(trelloID){
  var key = "1403bf837c0705e7cca69004b84c0cfc";
  // 5dc13ffbefc417230bae573973399bb2717a06d9b033cb59769f7bd0d0b089d5
  var token = "73f9e12053f852e7dcf40480045bb4202fb5785dadfa1d481aa11f51df173272";
  //var token = "5dc13ffbefc417230bae573973399bb2717a06d9b033cb59769f7bd0d0b089d5";
  var staffBoardID = "A8bbje6l";
  var trelloID = "donundeenwork";
  var urlauth = "key="+key+"&token="+token;
  var query = "board:"+staffBoardID+"+@"+trelloID+"+-list:OnHold+-list:WaitingToStart+-list:Done+is:open";
  var card_fields = "desc,name,shortUrl,ShortLink,url,idList";
//  var url = "https://api.trello.com/1/members/denny221/cards?"+urlauth;
  var url = "https://api.trello.com/1/search?query="+query+"&card_fields="+card_fields+"&"+urlauth;

  Logger.log("testing treoll"); 
  Logger.log(url);
  var responseJSON = UrlFetchApp.fetch(url);
  var trelloCards = JSON.parse(responseJSON);
  Logger.log(JSON.stringify(JSON.parse(responseJSON), null, "  "));
  return trelloCards;
  //https://api.trello.com/1/members/denny221/cards
}

function postTrelloFeatureRequest(title, description){
  
  var key = "1403bf837c0705e7cca69004b84c0cfc";
  // 5dc13ffbefc417230bae573973399bb2717a06d9b033cb59769f7bd0d0b089d5
  var token = "73f9e12053f852e7dcf40480045bb4202fb5785dadfa1d481aa11f51df173272";
  //var token = "5dc13ffbefc417230bae573973399bb2717a06d9b033cb59769f7bd0d0b089d5";
  var staffBoardID = "A8bbje6l";
  var trelloID = "donundeenwork";
  var urlauth = "key="+key+"&token="+token;
  var listId = "5a95ef010f5747ac837f42ad";

  var url = "https://api.trello.com/1/cards?name="+encodeURIComponent(title)+"&desc="+encodeURIComponent(description)+"&pos=top&idList="+listId+"&keepFromSource=all&"+urlauth;
  var options = {
    'method' : 'post'
  };
 var result = UrlFetchApp.fetch(url, options);
 Logger.log(result);

}