
function getAllStaffChecklistData(){
  var staffChecklistTable = SpreadsheetApp.openById(getStaffChecklistTableId());

  var rows = staffChecklistTable
  .getActiveSheet()
  .getDataRange()
  .getValues();
 
  var staffChecklistData = dataIntoHashRows(rows, 1, 2); //, function(row){ return row['NetId'] == netId;}).data;  
    
  return JSON.parse(JSON.stringify(staffChecklistData));
}