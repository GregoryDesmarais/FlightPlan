var events = [];
var pageNo = 1;
var pageCount;
//All available categories from Eventbrite's API.
var categories = {
    101: "Business & Professional",
    102: "Science & Technology",
    103: "Music",
    104: "Film, Media & Entertainment",
    105: "Performing & Visual Arts",
    106: "Fashion & Beauty",
    107: "Health & Wellness",
    108: "Sports & Fitness",
    109: "Travel & Outdoor",
    110: "Food & Drink",
    111: "Charity & Causes",
    112: "Government & Politics",
    113: "Community & Culture",
    114: "Religion & Spirituality",
    115: "Family & Education",
    116: "Seasonal & Holiday",
    117: "Home & Lifestyle",
    118: "Auto, Boat & Air",
    119: "Hobbies & Special Interest",
    120: "School Activities",
    199: "Other",
    null: "None"
};

//Dynamically add filter categories to Filter Dropdown.
$("#filter").empty();
for (x in categories) {
    var newOpt = $("<option>");
    newOpt.val(x)
        .text(categories[x])
    $("#filter").append(newOpt);
}

//On Selection of Filters, hide all rows, then only show rows containing the selected categories.
$("#filter").on("change", function() {
    var categoryFilters = $(this).val();
    if (categoryFilters.length === 0) {
        $("#events").find("tr").show();
        return false;
    } else {
        $("#events").find("tr").hide();
        for (x in categoryFilters) {
            $("#events").find(`tr[data-category='${categoryFilters[x]}']`).show();
        }
    }
});

// api call function 
function eventbriteAPI(destination, startDate, endDate) {

    if (destination) {
        console.log(destination);
    };
    startDate = moment(startDate).format("YYYY-MM-DDThh:mm:ss");
    endDate = moment(endDate).format("YYYY-MM-DDThh:mm:ss");

    var queryURL = `https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search?start_date.range_start=${startDate}&start_date.range_end=${endDate}&location.address=${destination}&page=${pageNo}`;

    $.ajax({
        url: queryURL,
        method: "GET",
        beforeSend: function(request) {
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer QPEWGCGG3AMHB3TDR5S2");
        },
    }).then(function(response) {
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
    }).then(function() { //Additional Then for after the events array is complete.
        $("#events").empty(); //Empty the Events table.
        for (x in events) { //For each element in events array.
            var data = events[x]; //Set data to current element interval.
            if (data.summary === null) //If event does not have a summary, skip it.
                continue;
            var newTR = $(`<tr data-category='${data.category_id}'>`);
            newTR.append(`<td>${data.name.text}</td>`)
                // .append(`<td>${data.summary}</td>`) //Event Summary, Shorter than the description
                .append(`<td >${(data.category_id === null) ? 'None' : categories[data.category_id]}`)
                .append(`<td>${moment(data.start.local).format("MM/DD/YYYY<br>h:mm a")}</td>`) //Formats date/time
                .append(`<td>${data.is_free ? 'Free!' : 'Not Free!'}</td>`) //Terniary operator, outputs based on is_free boolean.
                .append(`<td><a href='${data.url}'>More Info</a>`); //URL to the eventbrite page.
            $("#events").append(newTR);
        }
    });
}


// eventbriteAPI("Charlotte", "2019-09-02", "2019-09-03");

$(document).ready(function () {

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var destination = $("#destination-input").val().trim();
        var origin = $("#origin-input").val().trim();
        var startDate = $("#start-date").val().trim();
        var endDate = $("#end-date").val().trim();
        console.log(`${destination} ${startDate} ${endDate}`);

        if (origin === "" || destination === "" || startDate === "" || endDate === "") {
            $('#modalEmpty').modal();
            $('#modalEmpty').modal('open');
            return false;
        }

        if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
            $('#modalDate').modal();
            $('#modalDate').modal('open');
            return false;
        }; 

        eventbriteAPI(location, startDate, endDate);

    });


});


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
            "Cairo": null,
            "Tokyo": null,
            "Osaka": 'https://placehold.it/250x250',
            "Delhi": null,
            "Shanghai": null,
            "Mexico City": null,
            "Bejing": null,
            "Istanbul": null,
            "Moscow": null,
            "Seoul": null,
            "London": null,
            "Bangalore": null,
            "Hong Kong": null,
            "Hyderabad": null,
            "Singapore": null,
            "Log Angeles": null,
            "Berlin": null,
            "Paris": null,
            "Rome": null,
            "Venice": null,
            "Amsterdam": null,
            "copenhagen": null,
            "Stockholm": null,
            "Oslo": null,
            "Barcelona": null,
            "Madrid": null,
            "Lisbon": null,
            "Prague": null,
            "Vienna": null,
            "Munich": null,
            "Bangkok": null,
            "Sydney": null,
            "Melbourne": null,
            "Auckland": null,
            "Cologne": null,
            "Ho Chi Minh City": null,
            "Taipei": null,
            "Dubai": null,
            "Port Elizabeth": null,
            "Rio De Janeiro": null,
            "Sao Paulo": null,
            "Toronto": null,
            "Montreal": null,
            "Vancouver": null,
            "Seattle": null,
            "Portland": null,
            "San Francisco": null,
            "San Diego": null,
            "Pheonix": null,
            "Las Vegas": null,
            "Denver": null,
            "Salt Lake City": null,
            "Albuquerque": null,
            "El Paso": null,
            "Dallas": null,
            "Oklahoma City": null,
            "Austin": null,
            "San Antonio": null,
            "Houston": null,
            "Memphis": null,
            "Kansas City": null,
            "St. Louis": null,
            "Nashville": null,
            "New Orleans": null,
            "Orlando": null,
            "Tampa": null,
            "Miami": null,
            "Charlotte": null,
            "Raleigh": null,
            "Atlanta": null,
            "Louisville": null,
            "Chicago": null,
            "Cincinnati": null,
            "Columbus": null,
            "Cleveland": null,
            "Detroit": null,
            "Pittsburgh": null,
            "Washington": null,
            "Philadelphia": null,
            "Richmond": null,
            "Boston": null,
            "Minneapolis": null,
            "Sacramento": null,
            "Tuscon": null,
            "Winnipeg": null,
            "Fort Worth": null,

        },
    });
});

$(document).ready(function () {
    $('.datepicker').datepicker();
});

$(document).ready(function(){
    $('.modal').modal();
  });