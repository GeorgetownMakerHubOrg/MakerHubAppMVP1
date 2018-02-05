
var userTable = SpreadsheetApp
        .openById(getUserTableId());


// this functions gets called when the pages loads every time.
function doGet(e) {
  Logger.log("opening");  
  parameter = e.parameter;
  var page= e.parameter.page;
  if(!page){
    page = 'index';
  }
     return HtmlService
     .createTemplateFromFile(page)
    // .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
     .evaluate();
}


// this function let you include other files' content in your index.html
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}



function getUserData(filter, sort){
  var userlist = {};
  var allUserData = userTable
  .getActiveSheet()
  .getDataRange()
  .getValues();
 
  var userData = dataIntoHashRows(allUserData, 0, 1); //, function(row){ return row['NetId'] == netId;}).data;  
  
  Logger.log(userData);
  
  userlist.userData = userData;
  
  return JSON.parse(JSON.stringify(userlist));
}


///// Utility Functions
function dataIntoHashRows(data, keysRow, startRow, filterFunction){
  var idKey= {};
  var keyId= {};
  var newData = [];
  Logger.log("data");

  for (var k = 0; k < data[keysRow].length; k++) { 
    var key = data[keysRow][k];
    key = key.replace("?","");
    key = key.replace("'","");
    key = key.replace(":","");
    if(key.trim() == ""){
       continue;
    }
    
    idKey[k] = key;
    keyId[key] = k;
  }
    
  for (var i = startRow; i < data.length; i++) { 
    var newRow = {};
    for (var j = 0; j < data[i].length; j++) { 
      if(!idKey[j] || idKey[j].trim() == ""){
        continue; 
      }
      newRow[idKey[j]] = data[i][j];
    }
    if(!filterFunction || filterFunction(newRow) == true){
      newData.push(newRow);
    }
  }
  
  return {data:newData, keyId: keyId, idKey: idKey};
  
}