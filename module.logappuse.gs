var appLogTable = SpreadsheetApp.openById(getAppLogTableId());

function logAppUse(timestamp, netid, action, message){
  var data = {
    timestamp : timestamp,
    netid: netid,
    action : action,
    message : message
  }
  insertHashRow(appLogTable, data, 0);
}