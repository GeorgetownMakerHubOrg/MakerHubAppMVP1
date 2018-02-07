// these are the functions you can call from the html pages using google.script.run
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

function getUserTableDataFromNetId(netId){
  var userTableData = userTable
  .getActiveSheet()
  .getDataRange()
  .getValues();

  var userData = dataIntoHashRows(userTableData, 0, 1, function(row){
    if(row["netid"].toString().toLowerCase().trim() == netId.toString().toLowerCase().trim()){
      return true;
    }
    return false;
  }); //, function(row){ return row['NetId'] == netId;}).data;
  
  if(userData.data.length > 0){
    return JSON.parse(JSON.stringify(userData.data[0]));
  }
  return false;
}


function insertUserData(userData){
  insertHashRow(userTable, userData, 0);
}

function updateUserData(netid, userData){
  result  = updateHashRow(userTable, userData, 0, {key: "netid", value: netid});
  return result;
}

