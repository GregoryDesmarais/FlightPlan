// api call function 
function eventbriteAPI (destination, startDate, endDate){
  
  if (destination){
    console.log(destination);
  };
  if (startDate){
    startDate = moment(startDate).format("YYYY-MM-DDThh:mm:ss");
  };
  if (endDate){
    endDate = moment(endDate).format("YYYY-MM-DDThh:mm:ss");
  }
  
  var queryURL = `https://www.eventbriteapi.com/v3/events/search?start_date.range_start=${startDate}&start_date.range_end=${endDate}&location.address=${destination}`;

  $.ajax({
    url: queryURL,
    method: "GET",
    beforeSend: function (request)
    {
        request.withCredentials = true;
        request.setRequestHeader("Authorization", "Bearer QPEWGCGG3AMHB3TDR5S2");
        // request.setRequestHeader()
    },
  }).then(function (response) {
    var events = response.events;

  });
}


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