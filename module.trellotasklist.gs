function getTrelloCards(trelloID){
  var key = "1403bf837c0705e7cca69004b84c0cfc";
  var token = "73f9e12053f852e7dcf40480045bb4202fb5785dadfa1d481aa11f51df173272";
  var staffBoardID = "fnSAa2kH";
//  var trelloID = "donundeenwork";
  var urlauth = "key="+key+"&token="+token;
  var query = "board:"+staffBoardID+"+@"+trelloID+"+-list:OnHold+-list:WaitingToStart+-list:Done+is:open";
  var card_fields = "desc,name,shortUrl,ShortLink,url,idList";
//  var url = "https://api.trello.com/1/members/denny221/cards?"+urlauth;
  var url = "https://api.trello.com/1/search?query="+query+"&card_fields="+card_fields+"&"+urlauth;

  Logger.log("testing treoll"); 
  var responseJSON = UrlFetchApp.fetch(url);
  var trelloCards = JSON.parse(responseJSON);
  Logger.log(JSON.stringify(JSON.parse(responseJSON), null, "  "));
  return trelloCards;
  //https://api.trello.com/1/members/denny221/cards
}