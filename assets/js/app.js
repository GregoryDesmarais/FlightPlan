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

// eventbriteAPI("Charlotte", "2019-09-02", "2019-09-03");

$(document).ready(function () {

    $("#submit").on("click", function (event) {
        event.preventDefault();
        $("#events").empty(); //Empty the Events table.
        pageNo = 1;
        var location = $("#destination-input").val().trim();
        var startDate = $("#start-date").val().trim();
        var endDate = $("#end-date").val().trim();
        console.log(`${location} ${startDate} ${endDate}`);

        eventbriteAPI(location, startDate, endDate);
    });


});

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