/* Variables */
var userTable = SpreadsheetApp.openById(getUserTableId());
var safetyTable = SpreadsheetApp.openById(getSafetyTableId());

var MeritBadges = [
  'Laser Cutter',
  '3D Printing',	
  'Hand Tools',	
  'HandiBot',	
  'Power Tools',
  'Print Shop',	
  'Sewing Machine',
  'Embroidery Machine',	
  'Vinyl Cutter',
  'FormLabs',	
  'Soldering',
  'Arduino',
  'Button Maker',
  'Raspberry Pi'
];

function getMeritBadges(){
  return MeritBadges; 
}

/*
================================ DOGET =====================================
This functions gets called when the pages loads every time.
============================================================================
*/
function doGet(e) {
  Logger.log("Opening page...");  
  var html = HtmlService
      .createTemplateFromFile('index')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return html;
}

/*
=============================== INCLUDE ====================================
this function let you include other files' content in your index.html
============================================================================
*/
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

/*
=============================== INCLUDEMODULES ====================================
this function let you include ALL the modules for a particular section
============================================================================
*/

function includeModules(section){
  var sectionContent = ""; 
  var modules = getModules();
  for (var i = 0 ; i < modules.length; i++){
    var module = modules[i];
    var modeleSectionFilename = "module."+module+"."+section;
    try{
      var moduleSectionContent = HtmlService.createHtmlOutputFromFile(modeleSectionFilename)
        .getContent();
      sectionContent += moduleSectionContent;
    }catch(e){
      Logger.log("ERROR IN includeModule");
      Logger.log(e);
    }
  }
  return sectionContent;
}


/* 
=========================== DATAINTOHASHROWS ===============================
Any time you get some rows from a google sheet, run it through this function
so that it uses the column names as keys, instead of just numbers.
data : the data from the sheet
keysRow : the row that holds the column names (starts a 0, NOT 1)
startsRow : the row that holds the FIRST row of data (starts a 0, NOT 1)
filterFunction: a function that gets a row of data (with the column names as
keys), and returns true or false, based on whatever criteria you want.
============================================================================
*/
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

/* 
============================ INSERTHASHROW =================================
Insert a new row into a sheet. Use column names as keys. You don't have to 
have blank columns in the row
table: the google sheets object
data: the row, with column names as keys
keysrow: which row of the table holds the column names (starts a 0, NOT 1)
============================================================================
*/
function insertHashRow(table, data, keysrow){
  var insertArray = [];
  var idKey= {};
  var keyId= {};
    
  var range = "A"+(keysrow+1).toString() +":"+(keysrow+1).toString();

  tableMetaData = table
  .getActiveSheet()
  .getRange(range)
  .getValues();  
  
  for (var k = 0; k < tableMetaData[0].length; k++) { 
    var key = tableMetaData[0][k];
    // key is text, k is number
    if(key.trim() == ""){
       continue;
    }
    insertArray.push(""); 
    idKey[k] = key;
    keyId[key] = k;
  }
   
  datakeys = Object.keys(data);

  for(var i = 0; i < datakeys.length; i++){
    var key = datakeys[i];
    var k = keyId[key];
    insertArray[k] = data[key];
  }
  
  table.getActiveSheet().appendRow(insertArray);
}

/* 
============================ UPDATEHASHROW =================================
update a row in a sheet. Use column names as keys.  
table: the google sheets object
data: the row, with column names as keys. Missing columns will be updated to 
blank, NOT left alone.
keysrow: which row of the table holds the column names (starts a 0, NOT 1)
updateKey: object {key: column Name of identifying key of row to update 
(eg 'NetId'), value : value for that cell in that row (eg 'dhu3')
============================================================================
*/
function updateHashRow(table, data, keysrow, updateKey){
  Logger.log("updating2");
  var insertArray = [];
  var idKey= {};
  var keyId= {};
    
  var range = "A"+(keysrow+1).toString() +":"+(keysrow+1).toString();

  tableMetaData = table
  .getActiveSheet()
  .getRange(range)
  .getValues();  
  
  for (var k = 0; k < tableMetaData[0].length; k++) { 
    var key = tableMetaData[0][k];
    // key is text, k is number
    if(key.trim() == ""){
       continue;
    }
    insertArray.push(""); 
    idKey[k] = key;
    keyId[key] = k;
  }
   
  datakeys = Object.keys(data);

  for(var i = 0; i < datakeys.length; i++){
    var key = datakeys[i];
    var k = keyId[key];
    insertArray[k] = data[key];
  }
  
  var index = findRowNumForQuery(table, keysrow, keysrow + 1, function(row){
    if(row[updateKey.key] == updateKey.value){
      return true;
    }else{
      return false;
    }
  });
    
  var toDelete = index + 1;
  
  if(index){
    table.getActiveSheet().deleteRow(toDelete);
  }
  table.getActiveSheet().appendRow(insertArray);
  
  return index;
  
}


function findRowNumForQuery(table, keysRow, startRow, queryFunction){
  var tableData = table.getActiveSheet().getDataRange().getValues();

  var data = dataIntoHashRows(tableData, keysRow, startRow).data;
    
  for (var i = 0; i < data.length; i++) { 
    var res = queryFunction(data[i]);
    if(res == true){
      return i + startRow;
    }
  }
  return false;
}


function getImageUrl(imagename){
  var results = PicasaApp.find(imagename);
  if(results.length > 0){
    return results[0].getUrl();
  }
  return false;
}