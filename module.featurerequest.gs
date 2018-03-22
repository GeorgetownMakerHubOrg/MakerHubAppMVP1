function postTrelloFeatureRequest(title, description, netid){
  
  var key = getTrelloKey();
  var token = getTrelloToken();
  var staffBoardID = "A8bbje6l";
  var trelloID = "donundeenwork";
  var urlauth = "key="+key+"&token="+token;
  var listId = "5a95ef010f5747ac837f42ad";
  
  description += "\n\nby: " + netid;

  var url = "https://api.trello.com/1/cards?name="+encodeURIComponent(title)+"&desc="+encodeURIComponent(description)+"&pos=top&idList="+listId+"&keepFromSource=all&"+urlauth;
  var options = {
    'method' : 'post'
  };
 var result = UrlFetchApp.fetch(url, options);
 Logger.log(result);

}