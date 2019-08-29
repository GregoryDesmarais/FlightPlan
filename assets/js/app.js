var events = [];
var pageNo = 1;
var pageCount;

// api call function 
function eventbriteAPI(destination, startDate, endDate) {

  if (destination) {
    console.log(destination);
  };
  if (startDate) {
    startDate = moment(startDate).format("YYYY-MM-DDThh:mm:ss");
  };
  if (endDate) {
    endDate = moment(endDate).format("YYYY-MM-DDThh:mm:ss");
  }

  var queryURL = `https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search?start_date.range_start=${startDate}&start_date.range_end=${endDate}&location.address=${destination}&page=${pageNo}`;

  $.ajax({
    url: queryURL,
    method: "GET",
    beforeSend: function (request) {
      request.withCredentials = true;
      request.setRequestHeader("Authorization", "Bearer QPEWGCGG3AMHB3TDR5S2");
    },
  }).then(function (response) {
    for (i = 0; i < response.events.length; i++) {
      events.push(response.events[i]);
    }
    pageCount = response.pagination.page_count;
    console.log("pass: " + pageNo);
    if (pageCount > 1 && pageCount !== pageNo) {
      for (i = 2; i <= pageCount; i++) {
        pageNo = i;
        eventbriteAPI(destination, startDate, endDate)
      }
    }
  });


}

eventbriteAPI("Charlotte", "2019-08-29", "2019-08-31");

// $(document).ready(function(){
//   for ( i = 0; i < events.length;i++){
//     var event = events[i];
//     var free = event.is_free;
//     var name = event.name;
//     var url = event.url;
//     // var tableEntry = 
//   }
// });


$(document).ready(function () {
  $('select').formSelect();
});

$(document).ready(function () {
  $('input.autocomplete').autocomplete({
    data: {
      "New York": null,
      "Apple": null,
      "Microsoft": null,
      "Google": 'https://placehold.it/250x250'
    },
  });
});

$(document).ready(function () {
  $('.datepicker').datepicker();
});