

function insertIHelpedSomoneData(iHelpedSomeoneData){
  var iHelpedSomeoneTable = SpreadsheetApp.openById(getIHelpedSomeoneTableId());
  insertHashRow(iHelpedSomeoneTable, iHelpedSomeoneData, 0);
  return("data inserted into " + getIHelpedSomeoneTableId());
}
