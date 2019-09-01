var events = [];
var pageNo = 1;
var pageCount;
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
    199: "Other"
};


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
    }).then(function() {
        $("#events").empty();
        for (x in events) { //For each element in events array.
            var data = events[x]; //Set data to current element interval.
            var newTR = $("<tr>");
            newTR.append(`<td>${data.summary}</td>`) //Event Summary, Shorter than the description
                .append(`<td data-category='${data.category_id}'>${(data.category_id === null) ? 'None' : categories[data.category_id]}`)
                .append(`<td>${moment(data.start.local).format("h:mm a")}</td>`) //Formats time as 02:00 am/pm
                .append(`<td>${data.is_free ? 'Free!' : 'Not Free!'}</td>`) //Terniary operator, outputs based on is_free boolean.
                .append(`<td><a href='${data.url}'>More Info</a>`); //URL to the eventbrite page.
            $("#events").append(newTR);
        }
    });
}


eventbriteAPI("Charlotte", "2019-09-02", "2019-09-03");

// $(document).ready(function(){
//   for ( i = 0; i < events.length;i++){
//     var event = events[i];
//     var free = event.is_free;
//     var name = event.name;
//     var url = event.url;
//     // var tableEntry = 
//   }
// });


$(document).ready(function() {
    $('select').formSelect();
});

$(document).ready(function() {
    $('input.autocomplete').autocomplete({
        data: {
            "New York": null,
            "Apple": null,
            "Microsoft": null,
            "Google": 'https://placehold.it/250x250'
        },
    });
});

$(document).ready(function() {
    $('.datepicker').datepicker();
});