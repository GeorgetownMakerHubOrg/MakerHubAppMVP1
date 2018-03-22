function getTrelloCards(trelloID){
  var key = getTrelloKey();
  var token = getTrelloToken();
  var staffBoardID = "A8bbje6l";
  var trelloID = "donundeenwork";
  var urlauth = "key="+key+"&token="+token;
  var query = "board:"+staffBoardID+"+@"+trelloID+"+-list:OnHold+-list:WaitingToStart+-list:Done+is:open";
  var card_fields = "desc,name,shortUrl,ShortLink,url,idList";
  var url = "https://api.trello.com/1/search?query="+query+"&card_fields="+card_fields+"&"+urlauth;

  Logger.log("testing treoll"); 
  Logger.log(url);
  var responseJSON = UrlFetchApp.fetch(url);
  var trelloCards = JSON.parse(responseJSON);
  Logger.log(JSON.stringify(JSON.parse(responseJSON), null, "  "));
  return trelloCards;
}

