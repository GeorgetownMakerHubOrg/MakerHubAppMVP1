function getUserTableId(){
  
  return "1SpdTq17B9f0Khzhyt35z_YLWmb9rIasfk6vK4HkaCp8";
}



function getSafetyTableId(){
  return "17ZATDqYl6CVOdLigEmEd3g0fGpHiiUQMszYXJ1iT1fI";
}
function getAppLogTableId(){
  return "1a2E6VqnEKslzx_LU-J_8Emh669OOTQMf_w_-9wZ2smQ";
}

var staffScheduleCal = false;
function getStaffScheduleCal(){
  var staffScheduleCalName = "Maker Hub Staff and Volunteer Schedule";
  if(!staffScheduleCal){
    var calendars = CalendarApp.getCalendarsByName(staffScheduleCalName);
    staffScheduleCal = calendars[0];
  }
  return staffScheduleCal;
}

function getTrelloKey(){
  var key = "1403bf837c0705e7cca69004b84c0cfc";
  return key;
}

function getTrelloToken(){
  var token = "73f9e12053f852e7dcf40480045bb4202fb5785dadfa1d481aa11f51df173272";
  return token;  
}

