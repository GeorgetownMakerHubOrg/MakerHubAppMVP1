function postTrelloPurchaseRequest(title, description, netid){
  
  var key = getTrelloKey();
  var token = getTrelloToken();
  var staffBoardID = "qt98f1rh";
  var trelloID = "donundeenwork";
  var urlauth = "key="+key+"&token="+token;
  var listId = "57b3274bf7be7c7168d70648";
  
  description += "\n\nby: " + netid;

  var url = "https://api.trello.com/1/cards?name="+encodeURIComponent(title)+"&desc="+encodeURIComponent(description)+"&pos=top&idList="+listId+"&keepFromSource=all&"+urlauth;
  var options = {
    'method' : 'post'
  };
 var result = UrlFetchApp.fetch(url, options);
 Logger.log(result);

}

function getAllTrelloLists(){
 ///1/boards/[board_id]/lists
  var key = getTrelloKey();
  var token = getTrelloToken();
  var staffBoardID = "A8bbje6l";
  var trelloID = "donundeenwork";
  var urlauth = "key="+key+"&token="+token;
  var url = "https://api.trello.com/1/boards/A8bbje6l/lists?"+urlauth;
  var options = {
    'method' : 'get'
  };
  var result = UrlFetchApp.fetch(url, options);
  Logger.log(JSON.stringify(result, null, " " )); 
  Logger.log(result); 
  
}