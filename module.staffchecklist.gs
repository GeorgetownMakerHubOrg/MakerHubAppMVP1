
function getAllStaffChecklistData(){
  var staffChecklistTable = SpreadsheetApp.openById(getStaffChecklistTableId());

  var rows = staffChecklistTable
  .getActiveSheet()
  .getDataRange()
  .getValues();
 
  var staffChecklistData = dataIntoHashRows(rows, 1, 2); //, function(row){ return row['NetId'] == netId;}).data;  
    
  return JSON.parse(JSON.stringify(staffChecklistData));
}

function updateChecklistData(netid, checklistData, filedata){
  var staffChecklistTable = SpreadsheetApp.openById(getStaffChecklistTableId());
  Logger.log("updating checklist");
  Logger.log(netid);
  result  = updateHashRow(staffChecklistTable, checklistData, 1, {key: "NetId", value: netid});
  if(filedata && checklistData["Pic on Website"]){
    result = saveHeadshotFile(checklistData["Pic on Website"], filedata);
  }
  return result;
}


function saveHeadshotFile(filename, filedata){
  var foldername = "Staff Pics and Bios";
  var folder, folders = DriveApp.getFoldersByName(foldername);
  try{
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(foldername);
    }

    var contentType = filedata.substring(5,filedata.indexOf(';')),
        bytes = Utilities.base64Decode(filedata.substr(filedata.indexOf('base64,')+7)),
        blob = Utilities.newBlob(bytes, contentType, filename);

    folder.createFile(blob);
    
    Logger.log("file saved");

    return "OK";

  } catch (f) {
    Logger.log("file not saved");
    Logger.log(f.toString());
    return f.toString();
  }
}