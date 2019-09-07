var pageNo = 1;
var pageCount;
var events = [];

//Dynamically add filter categories to Filter Dropdown.
$("#filter").empty();
for (x in categories) {
    var newOpt = $("<option>");
    newOpt.val(x)
        .text(categories[x])
    $("#filter").append(newOpt);
}

//On Selection of Filters, hide all rows, then only show rows containing the selected categories.
$("#filter").on("change", function () {
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
        beforeSend: function (request) {
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer QPEWGCGG3AMHB3TDR5S2");
        },
    }).then(function (response) {
        if(response.events.length === 0)
        {
            alert("There are no more events");
        }
        for (i = 0; i < response.events.length; i++) {
            events.push(response.events[i]);
        }
        console.log(events.length);
        buildTable(events);
        events = [];
    });
}

function buildTable(events){
    for (x in events) { //For each element in events array.
        var data = events[x]; //Set data to current element interval.
        var newTR = $(`<tr data-category='${data.category_id}'>`);
        newTR.append(`<td>${data.name.text}</td>`)
            // .append(`<td>${data.summary}</td>`) //Event Summary, Shorter than the description
            .append(`<td >${(data.category_id === null) ? 'None' : categories[data.category_id]}`)
            .append(`<td>${moment(data.start.local).format("MM/DD/YYYY<br>h:mm a")}</td>`) //Formats date/time
            .append(`<td>${data.is_free ? 'Free!' : 'Not Free!'}</td>`) //Terniary operator, outputs based on is_free boolean.
            .append(`<td><a href='${data.url}' target="_blank">More Info</a>`); //URL to the eventbrite page.
        $("#events").append(newTR);
    }
    $("#events").parent().trigger("update");
}

$("#moreEvents").click(function()
{
    console.log(pageNo);
    pageNo++;
    console.log(pageNo);
    var location = $("#destination-input").val().trim();
    var startDate = $("#start-date").val().trim();
    var endDate = $("#end-date").val().trim();
    eventbriteAPI(location, startDate, endDate);

})

function skyscannerAPI(from, to, date){
    var date1 = moment(date).format("YYYY-MM-DD");
    console.log(date1);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + from + "-sky/" + to + "-sky/" + date1,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "15873b5e23mshf948e6e3feda7b2p1db4fajsn89e6f75dccf9"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        for (i = 0; i < response.Carriers.length; i++) {
            if (response.Quotes[0].OutboundLeg.CarrierIds[0] == response.Carriers[i].CarrierId) {             
                var row2 = `
                <tr>
                <td>${from}</td>
                <td>${response.Carriers[i].Name}</td>
                <td>${date}</td>
                <td>${response.Quotes[0].MinPrice}</td>
                </tr>
                `
                $(".flight").append(row2);
            }
        }
    });

}

// eventbriteAPI("Charlotte", "2019-09-02", "2019-09-03");

$(document).ready(function () {

    $("#submit").on("click", function (event) {
        event.preventDefault();
        $("#events").empty(); //Empty the Events table.
        pageNo = 1
        var destination = $("#destination-input").val().trim();
        var origin = $("#origin-input").val().trim();
        var startDate = $("#start-date").val().trim();
        var endDate = $("#end-date").val().trim();
        console.log(`${destination} ${startDate} ${endDate}`);
      
        if (origin === "" || destination === "" || startDate === "" || endDate === "") {
            $('#modalEmpty').modal('open');
            return false;
        }

        if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
            $('#modalDate').modal('open');
            return false;
        }; 

        eventbriteAPI(destination, startDate, endDate);
        skyscannerAPI(origin, destination, startDate);
        skyscannerAPI(destination, origin, endDate);
    });


});

$(document).ready(function () {
    $('select').formSelect();
    $('.datepicker').datepicker();
    $('.modal').modal();
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

$("#events").parent().tablesorter();
});