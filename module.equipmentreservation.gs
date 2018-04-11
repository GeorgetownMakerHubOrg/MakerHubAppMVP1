


function getOverlappingEquipmentReservations(equipmentName, startDate, endDate){
  cal = getReservationCal();
  var filterFunction = function(event){
    if(event.getDescription().match(equipmentName)){
      return true; 
    }
  }
  return getOverlappingEvents(cal, startDate, endDate, filterFunction); 
}

function createReservationEvent(startTime, endTime, title, description, guests){
  var cal = getReservationCal();
  return createCalEvent(cal, startTime, endTime, title, description, guests);
}

function getEquipmentReservationEvents(startTime, endTime){
  var cal = getReservationCal();
  return getCalEvents(cal, startTime, endTime);
}


function getCalEvents(cal, startTime, endTime){
  var realStartDate = new Date(startTime);
  var realEndDate = new Date(endTime);
  try{
    var events = cal.getEvents(new Date(startTime), new Date(endTime));
    var returnEvents = events.map(function(event){
      Logger.log(JSON.stringify(event));
      var returnEvent = {
        id: event.getId(),
        calendarName : cal.getName(),
        startTime: event.getStartTime().toString(),
        endTime : event.getEndTime().toString(),
        title : event.getTitle(),
        description : event.getDescription(),
        guestList : event.getGuestList(true).map(function(guest){
          return {name : guest.getName(),
                  email : guest.getEmail(),
                  status: guest.getGuestStatus()
                 };
        }),
        creators : event.getCreators(),
        dateCreated : event.getDateCreated.toString(),
        location : event.getLocation()
      }
      return returnEvent;
    });
    return returnEvents;
  }catch (error){
    Logger.log(error);
    throw error; 
  }
}




function getOverlappingEvents(cal, startDate, endDate, filterFunction){
  // find out if there are events that match the matchFunction, and also overlap the range between startDate and EndDate 
  if(!cal){
    cal = getStaffScheduleCal();
    startDate = new Date("January 20, 2018, 16:30 ");
    endDate = new Date("January 20, 2018, 17:00 "); 
    
  }
  var events = cal.getEvents(new Date(startDate), new Date(endDate));
  Logger.log(events);
  var newEvents = events;
  if(filterFunction){
    newEvents = events.filter(filterFunction);
  }
  Logger.log(newEvents);
  return JSON.parse(JSON.stringify(newEvents));
}


/////////////////////





/// Create Events
function createCalEvent(cal, startTime, endTime, title, description, guests){
   
  var guestlist = "";
  if(guests){
    var guestEmails = guests.map(function(g){
      if(g.indexOf("@") < 0){
        return g+"@georgetown.edu";
      }
    });
    guestlist = guestEmails.join(",");
  }
  
  var options = {
    location: "Maker Hub",
    description: description,
    guests : guestlist
  };
  
  var startDate = new Date(startTime);
  var endDate = new Date(endTime);  
  var event = cal.createEvent(title, new Date(startTime), new Date(endTime), options)

  var returnEvent = {
        id: event.getId(),
        startTime: event.getStartTime().toString(),
        endTime : event.getEndTime().toString(),
        title : event.getTitle(),
        description : event.getDescription(),
        guestList : event.getGuestList(true).map(function(guest){
          return {name : guest.getName(),
                  email : guest.getEmail(),
                  status: guest.getGuestStatus()
                 };
        }),
        creators : event.getCreators(),
        dateCreated : event.getDateCreated.toString(),
        location : event.getLocation()
      }
  return returnEvent;
}





var equipmentList = {
  "FDM 3D Printer" : {
    runsAfterHourse : true,
    requiresFullTimeAuthorizedUser : false,
    meritBadge : "3D Printing",
    items : {
        "MakerBot 1" : {},
        "MakerBot 2" : {},
        "Ultimaker 2+" : {},
        "Taz 6 FlexyDually" : {},
        "MonoPrice Selecct" : {}        
    }
  },
  "SLA 3D Printer" : {
    runsAfterHourse : true,
    requiresFullTimeAuthorizedUser : false,
    meritBadge : "FormLabs",
    items : {
      "Form2 Resin Printer" : {}
    }
  },
  "Vinyl Cutter" : {
    runsAfterHourse : false,
    requiresFullTimeAuthorizedUser : false,
    meritBadge : "Vinyl Cutter",
    items : {
      "Silhouette 1" : {},
      "Silhouette 2" : {},
    }
  },
  "Laser Cutter" : {
    requiresFullTimeAuthorizedUser : true,
    runsAfterHourse : false,
    meritBadge : "Laser Cutter",
    requiresFullSupervision : true,
    items : {
      "VLS 4.60 Laser Cutter" : {}
    }
  },
  "Sewing Machine" : {
    requiresFullTimeAuthorizedUser : false,
    runsAfterHourse : false,
    meritBadge : "Sewing Machine",
    items : {
      "Janome HD 3000" : {}, 
    }    
  },
  "Embroidery Machine" : {
    requiresFullTimeAuthorizedUser : false,
    runsAfterHourse : false,
    meritBadge : "Embroidery Machine",
    items : {
      "Brother PE-770 Embroidery Machine" : {} 
    }
  },
  "Button Maker" : {
    requiresFullTimeAuthorizedUser : false,
    runsAfterHourse : false,
    meritBadge : "Button Maker",
    items : {
      "1 inch Button Maker" : {}, 
      "1.5 inch Button Maker" : {}, 
      "2.25 inch Button Maker" : {}, 
    }
  }
}


// lists of things:

var openHours = {
  "Monday" : {
    open : "12:00",
    openHour : 12,
    close : "17:00",
    closeHour :  17,
    index: 1
  },
  "Tuesday" : {
    open : "17:00",
    openHour : 17,
    close : "20:00",
    closeHour : 20,
    index: 2
  },
  "Wednesday" : {
    open : "17:00",
    openHour : 17,
    close : "20:00",
    closeHour : 20,
    index: 3
  },
  "Thursday" : {
    open : "17:00",
    openHour : 17,
    close : "20:00",
    closeHour : 20,
    index: 4
  },
  "Friday" : {
    open : "12:00",
    openHour : 12,
    close : "17:00",
    closeHour :  17,
    index: 5
  },
  "Saturday" : {
    open : "12:00",
    openHour : 12,
    close : "17:00",
    closeHour :  17,
    index: 6
  }
};

function getEquipmentList(){
 return equipmentList; 
}

function getOpenHours(){
  return openHours; 
}

